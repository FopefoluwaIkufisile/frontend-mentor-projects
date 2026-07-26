const submitBtn = document.querySelector(".submit");
const clear = document.querySelector(".clear");
const mortgageAmount = document.querySelector("#mortgage-amount");
const mortgageTerm = document.querySelector("#mortgage-term");
const interestRate = document.querySelector("#interest-rate");
const radioButtons = document.querySelectorAll('input[name="mortgage-type"]');

if (localStorage.getItem("Mortgage form data")) {
  const mortgageData = JSON.parse(localStorage.getItem("Mortgage form data"));
  mortgageAmount.value = mortgageData["mortgage amount"] || "";
  interestRate.value = mortgageData["Interest rate"] || "";
  mortgageTerm.value = mortgageData["mortgage Term"] || "";
  const selectRadio = Array.from(radioButtons).find(
    (btn) => btn.id === mortgageData.selectedRadio
  );
  if(selectRadio){
    selectRadio.checked = true
  }
}

function isValidNumber(input) {
  return input.value && !isNaN(input.value);
}

clear.addEventListener("click", () => {
  mortgageTerm.value = "";
  mortgageAmount.value = "";
  interestRate.value = "";

  radioButtons.forEach((radio) => {
    radio.checked = false;
  });
  localStorage.removeItem("Mortgage form data")
});

radioButtons.forEach((radio) => {
  radio.addEventListener("change", () => {
    const selectedRadio = document.querySelector(
      'input[name="mortgage-type"]:checked'
    );
    if (!selectedRadio) {
      const error = document.querySelector(".mortgage-type-div small.error");
      error.textContent = "This field is required";
      error.style.display = "block";
      isValid = false;
    }
  });
});

const showError = (input, message) => {
  const parent = input.closest(".form-section-div");
  const error = parent.querySelector("small");
  const errorDiv = parent.querySelector(".input-divs");
  const errorSymbol = errorDiv.querySelector(".symbol");
  error.textContent = message;
  error.style.display = "block";
  errorDiv.classList.add("error-div");
  errorSymbol.classList.add("error-symbol");
};

const clearSingleError = (input) => {
  const parent = input.closest(".form-section-div");
  const error = parent.querySelector("small");
  const errorDiv = parent.querySelector(".input-divs");
  const errorSymbol = errorDiv.querySelector(".symbol");

  if (error) error.textContent = "";
  if (error) error.style.display = "none";
  if (errorDiv) errorDiv.classList.remove("error-div");
  if (errorSymbol) errorSymbol.classList.remove("error-symbol");
};

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let isValid = true;

  clearSingleError(mortgageAmount);
  clearSingleError(mortgageTerm);
  clearSingleError(interestRate);

  if (!isValidNumber(mortgageAmount)) {
    showError(mortgageAmount, "This field is required and must be a number");
    isValid = false;
  }

  if (!isValidNumber(mortgageTerm)) {
    showError(mortgageTerm, "This field is required and must be a number");
    isValid = false;
  }

  if (!isValidNumber(interestRate)) {
    showError(interestRate, "This field is required and must be a number");
    isValid = false;
  }

  const selectedRadio = document.querySelector(
    'input[name="mortgage-type"]:checked'
  );
  if (!selectedRadio) {
    const error = document.querySelector(".mortgage-type-div small.error");
    error.textContent = "This field is required";
    error.style.display = "block";
    isValid = false;
  }

  [mortgageAmount, mortgageTerm, interestRate].forEach((input) => {
    input.addEventListener("input", () => {
      clearSingleError(input);
    });

    if (isValid) {
      const checkedRadio = Array.from(radioButtons).find(
        (btn) => btn.checked === true
      );
      const mortgageAmountValue = parseFloat(mortgageAmount.value);
      const interestRateValue = parseFloat(interestRate.value);
      const mortgageTermValue = parseInt(mortgageTerm.value);

      const monthlyInterestRate = interestRateValue / 100 / 12;

      const totalPayments = mortgageTermValue * 12;

      const monthlyPayment =
        (mortgageAmountValue *
          (monthlyInterestRate *
            Math.pow(1 + monthlyInterestRate, totalPayments))) /
        (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);

      const totalRepayment = monthlyPayment * totalPayments;

      localStorage.setItem(
        "Mortgage form data",
        JSON.stringify({
          "mortgage amount": mortgageAmountValue,
          "Interest rate": interestRateValue,
          "mortgage Term": mortgageTermValue,
          selectedRadio: checkedRadio.id,
        })
      );
      document.querySelector(".empty-result-div").style.display = "none";
      document.querySelector(".completed-results-div").style.display = "flex";
      document.querySelector(".result").classList.add("completed");
      const monthlyRepaymentText = document.querySelector(".big-amount");
      const totalRepaymentText = document.querySelector(
        ".total-to-repay-amount"
      );
      monthlyRepaymentText.textContent = `£${monthlyPayment
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
      totalRepaymentText.textContent = `£${totalRepayment
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
    }
  });
});

document
  .querySelectorAll(".repayment-radio-div, .interest-radio-div")
  .forEach(function (div) {
    div.addEventListener("click", function () {
      const radioInput = div.querySelector('input[type="radio"]');
      radioInput.checked = true;
    });
  });
