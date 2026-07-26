const allLinks = document.querySelectorAll("a");
const allPledges = document.querySelectorAll(".pledge");
const modalCase = document.querySelector(".modal-container");
const menuVariant = document.querySelector(".menu-variants");
const menuOpen = document.querySelector(".open-menu");
const menuClose = document.querySelector(".close-menu");
const menuBox = document.querySelector(".menu-box");
const backBtn = document.querySelector(".book-btn");
const totalBackers = document.querySelector(".total-backers");
const totalBacked = document.querySelector(".total-backed");
const daysLeft = document.querySelector(".days-left");
const bambooStandLeft = document.querySelectorAll(".bamboo-stand-left");
const blackEditionStandLeft = document.querySelector(
    ".black-edition-stand-left"
);
const modalBox = document.querySelector(".modal-box");
const thankYou = document.querySelector(".thank-you-box");
const mahoganySpecialEditionLeft = document.querySelectorAll(
    ".mahogany-special-edition-left"
);

const dynamicValues = {
    "total-backers": 5007,
    "total-backed": 89914,
    "days-left": 56,
    "bamboo-stand-left": 101,
    "black-edition-stand-left": 64,
    "mahogany-special-edition-left": 0,
};
backBtn.addEventListener("click", () => {
    modalBox.classList.remove("hide");
    thankYou.classList.remove("show-flex");
  modalCase.classList.add("show-modal");
});

const upDateValues = () => {
  totalBackers.innerText = dynamicValues["total-backers"];
  totalBacked.innerText = `$${dynamicValues["total-backed"]  <100000 ? dynamicValues["total-backed"] : "100k+"}`;
  daysLeft.innerText = dynamicValues["days-left"];
  bambooStandLeft.forEach((stand) => {
    stand.innerText = dynamicValues["bamboo-stand-left"];
  });
  blackEditionStandLeft.innerText = dynamicValues["black-edition-stand-left"];
  mahoganySpecialEditionLeft.forEach((stand) => {
    stand.innerText = dynamicValues["mahogany-special-edition-left"];
  });
};


modalCase.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("closer") ||
    e.target.classList.contains("modal-container") ||
    e.target.classList.contains("got-it")
  ) {
    modalCase.classList.remove("show-modal");
  }
});

menuVariant.addEventListener("click", () => {
  menuOpen.classList.toggle("hide-menu-img");
  menuClose.classList.toggle("show-menu-img");
  menuBox.classList.toggle("show-menu");
});

allPledges.forEach((pledge) => {
  pledge.addEventListener("click", () => {
    const radio = pledge.querySelector(".radio-btn");
    radio.checked = true;
    const bottom = pledge.querySelector(".bottom-p");
    const textInput = bottom.querySelector('input[type="text"]');
    const buttonPrice =bottom.querySelector(".confirm-value")
    const continueBtn = bottom.querySelector(".pledge-continue");
    textInput.addEventListener("input", ()=>{
        const value = textInput.value;
        buttonPrice.textContent = value;
    })
    continueBtn.addEventListener("click", ()=>{
        dynamicValues["total-backed"] += parseInt(textInput.value);
        dynamicValues["total-backers"] += 1;
        if (pledge.classList.contains("bamboo-stand-pledge")) {
          dynamicValues["bamboo-stand-left"] -= 1;
        } else if (pledge.classList.contains("black-edition-stand-pledge")) {
          dynamicValues["black-edition-stand-left"] -= 1;
        } else if (pledge.classList.contains("mahogany-special-edition-pledge")) {
          dynamicValues["mahogany-special-edition-left"] -= 1;
        }
        upDateValues();
        modalBox.classList.add("hide");
        thankYou.classList.add("show-flex");


    })
  });
});

allLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
  });
});
