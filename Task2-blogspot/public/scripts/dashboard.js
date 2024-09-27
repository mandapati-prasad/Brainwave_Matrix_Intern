const closeBtn = document.querySelector(".close_btn");
const sideBar = document.querySelector(".sidebar-wrapper");
const menuBtn = document.querySelector(".menu_btn");
const blogTitles = document.querySelectorAll(".blog-title p");

const categories = document.querySelector(".categories");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const categoryBtns = document.querySelectorAll(".category");

let scrollAmount = 0;
let scrollMax = categories?.scrollWidth - categories?.clientWidth;

const toggleSideBar = () => {
  sideBar?.classList.toggle("close");
};

const shortText = (text, len) => {
  return text?.trim().split("").slice(0, len).join("") + "...";
};

nextBtn?.addEventListener("click", (e) => {
  e.preventDefault();
  if (scrollAmount < scrollMax) {
    categories.scrollTo({
      left: (scrollAmount += 300),
      behavior: "smooth",
    });
  }
});

prevBtn?.addEventListener("click", (e) => {
  e.preventDefault();
  if (scrollAmount > 0) {
    categories.scrollTo({
      left: (scrollAmount -= 300),
      behavior: "smooth",
    });
  }
});

closeBtn?.addEventListener("click", () => {
  if (window.innerWidth <= 1024) {
    toggleSideBar();
  }
});

menuBtn?.addEventListener("click", () => {
  if (window.innerWidth <= 1024) {
    toggleSideBar();
  }
});

blogTitles?.forEach((title) => {
  title.innerText = shortText(title?.innerText, 40);
});

categoryBtns?.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    categoryBtns.forEach((btn) => btn.classList.remove("active"));
    link.classList.toggle("active");
  });
});
