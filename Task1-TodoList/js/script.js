import { categoryData, tasksData } from "./data.js";

const navitem = document.querySelector(".nav-item");
const menuCloseBtn = document.querySelector(".close-btn");

// home screen elemets
const categoryContainer = document.querySelector(".categories");
const menu = document.querySelector(".menu-icon");
const totalTasks = document.querySelector(".totalTasks");

// task Screen elements
const taskScreen = document.querySelector(".task-screen");
const taskbackbtn = document.querySelector(".task-screen .back-btn");
const categoryTitle = document.querySelector(".category-title");
const categoryTotalTasks = document.querySelector(".category-tasks");
const progressBarCount = document.querySelector(".progress-bar-count");
const progress = document.querySelector(".progress");
const tasksContainer = document.querySelector(".tasks");

// category screen elements
const categoryScreen = document.querySelector(".category-screen");
const catgorybackbtn = document.querySelector(".back-btn");
const categoriesList = document.getElementById("categories-list");
const categoryCount = document.getElementById("category-count");
const addCategoryButton = document.querySelector(".addCategory-btn");

// task form elements
const formbtn = document.querySelector(".add-task-btn");
const categorySelect = document.getElementById("category-select");
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.querySelector(".addTask-btn");
const editTaskBtn = document.querySelector(".editTask-btn");
const cancleTaskBtn = document.querySelector(".cancle-btn");

let allTasks = tasksData.map((task) => task);
let allCategories = categoryData.map((category) => category);
let selectedCategory = allCategories[0];
let editTask = allTasks[0];

const togglenav = () => {
  document.querySelector(".nav-bar").classList.toggle("show-navbar");
};

function toggleHomeScreen(screen) {
  document.querySelector(".home-screen").classList.toggle("show-homescreen");
  screen.classList.toggle("show-screen");
}

function activateForm() {
  document.querySelector(".task-form").classList.toggle("active");
  document.querySelector(".screen-overlay").classList.toggle("active");
  formbtn.classList.toggle("active");
}

const toggleFormButton = (button1, button2) => {
  button1.classList.add("hide-btn");
  button2.classList.remove("hide-btn");
};

const completedTaskCount = (tasks) => {
  const completedTasks = tasks.filter((task) => task.completed);
  return completedTasks.length;
};

const getprogress = (tasks) => {
  return !tasks.length ? 0 : (completedTaskCount(tasks) / tasks.length) * 100;
};

const categoryTasksCount = () => {
  const categoryTasks = allTasks.filter(
    (task) => task.categoryId === selectedCategory.id
  );

  categoryTotalTasks.textContent = `${categoryTasks.length}`;
  progressBarCount.textContent = `${completedTaskCount(categoryTasks)}-${
    categoryTasks.length
  }`;
  progress.style.width = `${getprogress(categoryTasks)}%`;
  totalTasks.textContent = `${allTasks.length}`;
};

function start() {
  menu.addEventListener("click", togglenav);
  menuCloseBtn.addEventListener("click", togglenav);

  navitem.addEventListener("click", () => {
    togglenav();
    toggleHomeScreen(categoryScreen);
  });

  catgorybackbtn.addEventListener("click", () => {
    toggleHomeScreen(categoryScreen);
  });

  taskbackbtn.addEventListener("click", () => {
    toggleHomeScreen(taskScreen);
  });

  formbtn.addEventListener("click", () => {
    taskInput.value = "";
    categorySelect.value = selectedCategory.title;
    categorySelect.removeAttribute("disabled");
    toggleFormButton(editTaskBtn, addTaskBtn);
    activateForm();
  });
}

// render categories
const renderCategories = () => {
  categoryContainer.innerHTML = "";
  categoriesList.innerHTML = "";
  categorySelect.innerHTML = "";
  categoryCount.innerText = allCategories.length;

  allCategories.forEach((category) => {
    const categoryTasks = allTasks.filter(
      (task) => category.id === task.categoryId
    );

    const div = document.createElement("div");
    const categoryItem = document.createElement("div");
    const option = document.createElement("option");

    option.setAttribute("value", category.title);
    option.innerText = category.title;

    div.classList.add("category");
    categoryItem.classList.add("category-item");

    categoryItem.innerHTML = ` <p>${category.title}</p>
                <div class="icon" id="deleteCategory-btn">
                  <i class="ri-close-circle-line"></i>
                </div>`;

    div.innerHTML = `<div class="image">
                  <h1>${category.title.slice(0, 1).toUpperCase()}</h1>
                </div>
                <div class="content heading">
                  <h3>${category.title}</h3>
                  <p>Total Tasks ${categoryTasks.length}</p>
                </div>`;

    div.addEventListener("click", () => {
      toggleHomeScreen(taskScreen);
      selectedCategory = category;
      categoryTitle.textContent = `${category.title}`;
      categoryTasksCount();
      renderTasks();
    });

    const categoryDeleteBtn = categoryItem.querySelector("#deleteCategory-btn");

    categoryDeleteBtn.addEventListener("click", () => {
      const index = allCategories.findIndex((c) => c.id === category.id);
      allCategories.splice(index, 1);
      allTasks = allTasks.filter((task) => task.categoryId !== category.id);
      saveData();
      renderTasks();
      renderCategories();
    });

    categoryContainer.appendChild(div);
    categoriesList.append(categoryItem);
    categorySelect.append(option);
  });
};

// render tasks in tasks screen
const renderTasks = () => {
  tasksContainer.innerHTML = "";
  const tasks = allTasks.filter(
    (task) => task.categoryId === selectedCategory.id
  );

  if (!tasks.length) {
    tasksContainer.innerHTML = "No Tasks found";
  } else {
    tasks.forEach((task) => {
      const div = document.createElement("div");
      const label = document.createElement("label");
      const checkBox = document.createElement("input");

      div.classList.add("task-wrapper");
      label.classList.add("task");
      label.setAttribute("for", task.id);
      checkBox.type = "checkbox";
      checkBox.id = task.id;
      checkBox.checked = task.completed;

      div.innerHTML = `<div class="task-icons">
                    <div class="edit">
                      <i class="ri-pencil-line"></i>
                    </div>

                    <div class="delete">
                      <i class="ri-delete-bin-line"></i>
                    </div>
                  </div>`;
      label.innerHTML = ` <div class="check-mark">
                      <div class="icon">
                        <img src="./assets/check.png" alt="" />
                      </div>
                    </div>
                    <p class="para">${task.task}</p>`;

      label.prepend(checkBox);
      div.prepend(label);
      tasksContainer.appendChild(div);

      const taskEditBtn = div.querySelector(".edit");
      const taskDeletBtn = div.querySelector(".delete");

      checkBox.addEventListener("change", () => {
        const index = allTasks.findIndex((t) => t.id === task.id);
        allTasks[index].completed = !allTasks[index].completed;
        saveData();
        categoryTasksCount();
      });

      taskEditBtn.addEventListener("click", () => {
        editTask = task;
        taskInput.value = task.task;
        categorySelect.value = task.category;
        categorySelect.setAttribute("disabled", true);
        toggleFormButton(addTaskBtn, editTaskBtn);
        activateForm();
      });

      taskDeletBtn.addEventListener("click", () => {
        const index = allTasks.findIndex((t) => t.id === task.id);
        allTasks.splice(index, 1);
        saveData();
        renderTasks();
        categoryTasksCount();
        renderCategories();
      });
    });

    categoryTasksCount();
    renderCategories();
  }
};

// edit or add tasks
const updateTask = (id) => {
  const newTask = taskInput.value;
  const category = categorySelect.value;

  if (!newTask || !category) {
    return alert("Please insert valid data");
  }

  if (id) {
    const index = allTasks.findIndex((t) => t.id === id);
    allTasks[index].task = newTask;
  } else {
    allTasks.push({
      id: "id" + Math.random().toString(16).slice(2),
      categoryId: allCategories.find((t) => t.title === category).id,
      task: newTask,
      category,
      completed: false,
    });
  }

  saveData();
  renderTasks();
  activateForm();
};

// edit task fuctionality
editTaskBtn.addEventListener("click", () => updateTask(editTask.id));

// add task functionality
addTaskBtn.addEventListener("click", () => {
  updateTask();
});

// cancle task functionality
cancleTaskBtn.addEventListener("click", () => {
  taskInput.value = "";
  activateForm();
});

addCategoryButton.addEventListener("click", () => {
  const categoryInput = document.getElementById("category-input");
  if (categoryInput.value) {
    allCategories.push({ title: categoryInput.value });
    saveData();
    renderCategories();
  } else {
    alert("Enter category");
  }
  categoryInput.value = "";
});

// save and get data form local storage
const saveData = () => {
  localStorage.setItem("tasks", JSON.stringify(allTasks));
  localStorage.setItem("categories", JSON.stringify(allCategories));
};

const getData = () => {
  const localTasks = JSON.parse(localStorage.getItem("tasks"));
  const localCategories = JSON.parse(localStorage.getItem("categories"));
  if (localTasks || localCategories) {
    allTasks = localTasks;
    allCategories = localCategories;
  }
};

// saveData()
getData();
start();
renderTasks();
