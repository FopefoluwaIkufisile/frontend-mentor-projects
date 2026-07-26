const menuBar = document.querySelector(".menu");
const menuCase = document.querySelector(".menu-case");
const triangle = document.querySelector(".triangle");
const allLinks = document.querySelectorAll("a");
console.log(allLinks);

allLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
  });
});

menuBar.addEventListener("click", () => {
  menuCase.classList.toggle("show");
  setTimeout(() => {
    triangle.classList.toggle("show-triangle");
  }, 200);
});
