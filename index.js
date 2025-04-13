const submitBtn = document.querySelector(".submit");
const field = document.querySelectorAll(".field");
const day = document.querySelector("#day");
const month = document.querySelector("#month");
const year = document.querySelector("#year");
const dayResult = document.querySelector(".day-value");
const monthResult = document.querySelector(".month-value");
const yearResult = document.querySelector(".year-value");
const allErrors = document.querySelectorAll("small");
const error = document.querySelector(".error");
// console.log(field)
const date = new Date();
const dateChecker = () => {
  let valid = true;

  // Reset all errors
  allErrors.forEach((err) => (err.textContent = ""));

  // Required + basic number check
  [day, month, year].forEach((input) => {
    const parent = input.closest(".field");
    const label = parent.querySelector("label");
    const error = parent.querySelector("small");

    if (!input.value.trim()) {
      error.textContent = "This field is required";
      error.style.display = "block";
      label.style.color = "var(--red-400)";
      input.classList.add("error-border");
      valid = false;
    } else if (isNaN(input.value) || Number(input.value) <= 0) {
      error.textContent = "Please enter a valid number";
      error.style.display = "block";
      label.style.color = "var(--red-400)";
      input.classList.add("error-border");
      valid = false;
    } else {
      error.style.display = "none";
      input.classList.remove("error-border");
      label.style.color = "var(--grey-500)";
    }
  });

  if (valid) {
    const d = Number(day.value);
    const m = Number(month.value);
    const y = Number(year.value);
    const currentYear = date.getFullYear();

    if (d > 31) {
      allErrors[0].textContent = "Must be a valid day";
      valid = false;
    }

    if (m > 12) {
      allErrors[1].textContent = "Must be a valid month";
      valid = false;
    }

    if (y > currentYear) {
      allErrors[2].textContent = "Must be in the past";
      valid = false;
    }

    if (["4", "6", "9", "11"].includes(month.value) && d > 30) {
      allErrors[0].textContent = "Please input a valid date";
      valid = false;
    }
    if (m === 2) {
      const isLeap = (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
      if (d > (isLeap ? 29 : 28)) {
        allErrors[0].textContent = "Invalid day for February";
        valid = false;
      }
    }
    const birthDate = new Date(`${y}-${m}-${d}`);

    console.log(new Date())
  
    let ageYears = date.getFullYear() - birthDate.getFullYear();
    let ageMonths = date.getMonth() - birthDate.getMonth();
    let ageDays = date.getDate() - birthDate.getDate();
  
    if (ageDays < 0) {
      ageMonths--;
      const prevMonth = new Date(date.getFullYear(), date.getMonth(), 0);
      ageDays += prevMonth.getDate();
    }
  
    if (ageMonths < 0) {
      ageYears--;
      ageMonths += 12;
    }
  
    // Show result
    dayResult.textContent = ageDays;
    monthResult.textContent = ageMonths;
    yearResult.textContent = ageYears;
  }

  return valid;
};

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  dateChecker();
});
