const footer = document.querySelector("footer");
const menuOpenDiv = document.querySelector(".menu-icon-cont");
const menuCloseDiv = document.querySelector(".menu-div-image-container");
const allLinks = document.querySelectorAll("a");
const menuContainer = document.querySelector(".menu-container");
const allMenuLinks = document.querySelectorAll(".menu-nav-links a");
const menuDiv = document.querySelector(".menu-div")

const bottomData = [
  {
    id: 1,
    imageurl: "./assets/images/image-retro-pcs.jpg",
    number: "01",
    text: "Reviving Retro PCs",
    description: "What happens when old PCs are given modern upgrades?",
  },
  {
    id: 2,
    imageurl: "./assets/images/image-top-laptops.jpg",
    number: "02",
    text: "Top 10 Laptops of 2022",
    description: "Our best picks for various needs and budgets.",
  },
  {
    id: 3,
    imageurl: "./assets/images/image-gaming-growth.jpg",
    number: "03",
    text: "The Growth of Gaming",
    description: "  How the pandemic has sparked fresh opportunities.",
  },
];

allLinks.forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
  });
});
allMenuLinks.forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    menuContainer.style.display = "none";
  });
});

menuContainer.addEventListener("click", (e) => {
  if (!e.target.classList.contains("menu-div")) {
    menuContainer.style.display = "none";
  }
});

footer.innerHTML = bottomData
  .map((el) => {
    return ` <div class="box">
          <div class="box-image-container">
            <img src="${el.imageurl}" alt="image" />
          </div>
          <div class="right-text">
            <p class="number">${el.number}</p>
            <p class="box-text">${el.text}</p>
            <p class="box-desc">
              ${el.description}
            </p>
          </div>
        </div>`;
  })
  .join("");

menuOpenDiv.addEventListener("click", () => {
  menuContainer.style.display = "flex";
  menuDiv.style.right = "0"
});

menuCloseDiv.addEventListener("click", () => {
  menuContainer.style.display = "none";
  menuDiv.style.right = "-500px"

});
window.addEventListener("resize", () => {
  if (window.innerWidth > 640) {
    menuContainer.style.display = "none";
  }
});
