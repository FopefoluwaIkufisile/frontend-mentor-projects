const notificationBox = document.querySelectorAll(".notification");
const mark = document.querySelector(".mark");
const notificationNumber = document.querySelector(".notifications-number");


//clear all unread
mark.addEventListener("click", () => {
  notificationNumber.textContent = "0";
  notificationBox.forEach((box) => {
    box.classList.remove("very-light-grayish-blue");
    box.querySelector(".red-dot").classList.remove("show-red-dot");
  });
});


//notification mark showcase
notificationBox.forEach((box) => {
  if (box.classList.contains("very-light-grayish-blue")) {
    box.querySelector(".red-dot").classList.add("show-red-dot");
  }
});

//toggling feature
notificationBox.forEach((box, index) => {
  box.addEventListener("click", (e) => {
    box.classList.remove("very-light-grayish-blue");
    box.querySelector(".red-dot").classList.remove("show-red-dot");
    notificationNumber.textContent = document.querySelectorAll('.very-light-grayish-blue').length;
    const notificationContent = box.querySelector(".notification-bottom");
      if (!e.target.classList.contains("notification-content")) {
        notificationContent.classList.toggle("show-block");
    }
  });
});
