const profileContainer = document.querySelector(".profile-wrapper");
const menuBtn = document.querySelector(".menu-icon");
const linkWrapper = document.querySelector(".links-wrapper");
const blogTitles = document.querySelectorAll(".blog-title");

const categories = document.querySelector(".categories");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const categoryBtns = document.querySelectorAll(".category");

let scrollAmount = 0;
let scrollMax = categories?.scrollWidth - categories?.clientWidth;

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

menuBtn?.addEventListener("click", () => {
  if (window.innerWidth <= 750) {
    linkWrapper.classList.toggle("show");
  }
});

profileContainer?.addEventListener("click", () => {
  profileContainer.classList.toggle("show");
});

const shortText = (text, len) => {
  return text?.trim().split("").slice(0, len).join("") + "...";
};

for (let i = 0; i < blogTitles?.length; i++) {
  if (blogTitles[i].innerText) {
    blogTitles[i].innerText = shortText(blogTitles[i]?.innerText, 28);
  }
}

categoryBtns?.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    categoryBtns.forEach((btn) => btn.classList.remove("active"));
    link.classList.toggle("active");
  });
});
