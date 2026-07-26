const numberReveal = document.querySelector(".number-text");
const nameReveal = document.querySelector(".name-text");
const monthReveal = document.querySelector(".month-text");
const yearReveal = document.querySelector(".year-text");
const cvcReveal = document.querySelector(".cvc-card-text");
const submitBtn = document.querySelector(".confirm");
const numberInput = document.querySelector("#card-number");
const monthAndYear = document.querySelectorAll('input[name="mmyy"]');
const fullName = document.querySelector("#fullname");
const cvc = document.querySelector("#cvc");
const month = document.querySelector("#month");
const year = document.querySelector("#year");
const form = document.querySelector(".form");
const thanks = document.querySelector(".thank-you");
const continuee = document.querySelector(".continue");
const date = new Date().getFullYear();

const lastTwoDigits = Number(date.toString().split("").slice(2, 4).join(""));


const existingData = JSON.parse(localStorage.getItem("formdata")) || {};

fullName.value = existingData["cardholder-name"] || "";
numberInput.value = existingData["card-number"] || "";
month.value = existingData["month"] || "";
year.value = existingData["year"] || "";
cvc.value = existingData["cvc"] || "";

numberReveal.textContent = numberInput.value;
nameReveal.textContent = fullName.value;
monthReveal.textContent = month.value;
yearReveal.textContent = year.value;
cvcReveal.textContent = cvc.value;

numberInput.addEventListener("input", (e) => {
  let value = e.target.value.replace(/\D/g, "");
  value = value.match(/.{1,4}/g)?.join(" ") || "";
  e.target.value = value;
  numberReveal.textContent = value;
  const existingData = JSON.parse(localStorage.getItem("formdata")) || {};
  localStorage.setItem(
    "formdata",
    JSON.stringify({ ...existingData, "card-number": numberInput.value })
  );
});

fullName.addEventListener("input", () => {
  nameReveal.textContent = fullName.value.toUpperCase();
  const existingData = JSON.parse(localStorage.getItem("formdata")) || {};
  localStorage.setItem(
    "formdata",
    JSON.stringify({ ...existingData, "cardholder-name": fullName.value })
  );
});
cvc.addEventListener("input", () => {
  cvcReveal.textContent = cvc.value;
  const existingData = JSON.parse(localStorage.getItem("formdata")) || {};
  localStorage.setItem(
    "formdata",
    JSON.stringify({ ...existingData, cvc: cvc.value })
  );
});
month.addEventListener("input", () => {
  monthReveal.textContent = month.value;
  const existingData = JSON.parse(localStorage.getItem("formdata")) || {};
  localStorage.setItem(
    "formdata",
    JSON.stringify({ ...existingData, month: month.value })
  );
});

year.addEventListener("input", () => {
  yearReveal.textContent = year.value;
  const existingData = JSON.parse(localStorage.getItem("formdata")) || {};
  localStorage.setItem(
    "formdata",
    JSON.stringify({ ...existingData, year: year.value })
  );
});

const setErrors = (element, message) => {
  const parent = element.closest(".field");
  const error = parent.querySelector(".error");
  error.textContent = message;
  element.classList.add("error-border");
};
const removeErrors = (element) => {
  const parent = element.closest(".field");
  const error = parent.querySelector(".error");
  error.textContent = "";
  element.classList.remove("error-border");
};

const validdateErrors = () => {
  const fullNameValue = fullName.value.trim();
  const numberValue = numberInput.value.trim();
  const monthValue = month.value.trim();
  const yearValue = year.value.trim();
  const cvcValue = cvc.value.trim();

  let isValid = true;

  if (!fullNameValue) {
    setErrors(fullName, "Please input a name");
    isValid = false;
  } else {
    removeErrors(fullName);
  }

  if (!numberValue) {
    setErrors(numberInput, "Please input your number");
    isValid = false;
  } else if (numberValue.length < 16) {
    setErrors(numberInput, "Please ensure the number is up to 16");
    isValid = false;
  } else if (/[a-zA-Z]/.test(numberValue)) {
    setErrors(numberInput, "Wrong format, numbers only");
    isValid = false;
  } else {
    removeErrors(numberInput);
  }
  
  if (!yearValue) {
    setErrors(year, "Can't be blank");
    isValid = false;
  } else if (Number(yearValue) > lastTwoDigits + 10) {
    setErrors(year, "Invalid Year");
    isValid = false;
  } else if (/[a-zA-Z]/.test(yearValue)) {
    setErrors(year, "No letters!!");
    isValid = false;
  } else {
    removeErrors(year);
  }
  if (!monthValue) {
    setErrors(month, "Can't be blank");
    isValid = false;
  } else if (Number(monthValue) > 12) {
    setErrors(month, "Invalid month");
    isValid = false;
  } else if (/[a-zA-Z]/.test(monthValue)) {
    setErrors(month, "No letters!!");
    isValid = false;
  } else {
    removeErrors(month);
  }

  if (!cvcValue) {
    setErrors(cvc, "Can't be blank");
    isValid = false;
  } else if (/[a-zA-Z]/.test(cvcValue)) {
    setErrors(cvc, "No letters!!");
    isValid = false;
  } else {
    removeErrors(cvc);
  }

  if (isValid === true) {
    form.classList.add("hide");
    thanks.classList.add("show");
  }
};

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  validdateErrors();
});

continuee.addEventListener("click", () => {
  form.classList.remove("hide");
  thanks.classList.remove("show");
  fullName.value = "";
  numberInput.value = "";
  month.value = "";
  year.value = "";
  cvc.value = "";

  numberReveal.textContent = "0000 0000 0000 0000";
  nameReveal.textContent = "JANE APPLESEED";
  monthReveal.textContent = "00";
  yearReveal.textContent = "00";
  cvcReveal.textContent = "000";

  localStorage.removeItem("formdata");
});
