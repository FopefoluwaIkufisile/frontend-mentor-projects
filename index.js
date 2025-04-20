const allLinks = document.querySelectorAll("a");
const allNavLinks = document.querySelectorAll(".nav-inner .m-link");
const allLinkBox = document.querySelectorAll(".link-box");
const allMainMenuLinks = document.querySelectorAll(".menu-main");
const menuInner = document.querySelector(".menu-inner");
const menuOpen = document.querySelector(".open-menu");
const menuClose = document.querySelector(".close-menu");
const menuVariant = document.querySelector(".menu-variant");


menuVariant.addEventListener("click", ()=>{
  console.log(`clicked `);
  menuInner.classList.toggle("show-inner");
  menuOpen.classList.toggle("hide-menu");
  menuClose.classList.toggle("show-menu");
})

allLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
  });
});

allMainMenuLinks.forEach((link) => {
  const parent = link.closest("div");
  const content = parent.querySelector(".content");
  const menuArrow = link.querySelector(".menu-arrow");
  link.addEventListener("click", () => {
    menuArrow.classList.toggle("turn-around");
    if (content.classList.contains("show-content")) {
      content.classList.remove("show-content");
    } else {
      allMainMenuLinks.forEach((l) => {
        const p = l.closest("div");
        const c = p.querySelector(".content");
        c.classList.remove("show-content");
      });
      content.classList.add("show-content");
    }
  });
});

allNavLinks.forEach((navLink) => {
  const parent = navLink.closest(".nav-inner");
  const box = parent.querySelector(".link-box");
  const openArrow = navLink.querySelector(".open-arrow");
  navLink.addEventListener("click", () => {
    openArrow.classList.toggle("turn-around");
    if (box.classList.contains("show-box")) {
      box.classList.remove("show-box");
    } else {
      allLinkBox.forEach((lbox) => {
        lbox.classList.remove("show-box");
      });
      box.classList.add("show-box");
    }
  });
});
