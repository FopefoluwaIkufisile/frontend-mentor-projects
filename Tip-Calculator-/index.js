// Set up event listeners for radio buttons
const allOptions = document.querySelectorAll(".option");
const resetBtn = document.querySelector(".reset");
const amountValue = document.querySelector(".am-value");
const totalValue = document.querySelector(".t-value");

function calculateSplit(bill, tipPercent, numberOfPeople) {
  const billPerPerson = bill / numberOfPeople;
  const tipPerPerson = billPerPerson * (tipPercent / 100);
  const totalPerPerson = billPerPerson + tipPerPerson;

  return {
    tipPerPerson: tipPerPerson.toFixed(2),
    totalPerPerson: totalPerPerson.toFixed(2),
  };
}

const validateResult = () => {
  const bill = parseFloat(document.querySelector("#bill").value);
  const tip = document.querySelector('input[type="radio"]:checked');
  let tipPercent = tip ? parseFloat(tip.value) : 0;
  const numberOfPeople = parseInt(document.querySelector("#people").value);
  const customTip = document.querySelector("#custom-tip");
  if (customTip.value) {
    tip ? (tip.checked = false) : null;
    const customTipValue = parseFloat(customTip.value);
    if (customTipValue > 0) {
      tipPercent = customTipValue;
    }
  }

  if (bill && tipPercent && numberOfPeople) {
    const result = calculateSplit(bill, tipPercent, numberOfPeople);
    amountValue.innerHTML = `${result.tipPerPerson}`;
    totalValue.innerHTML = `${result.totalPerPerson}`;
    localStorage.setItem(
      "bill",
      JSON.stringify({
        bill: bill,
        tipPercent: tipPercent,
        numberOfPeople: numberOfPeople,
      })
    );
  } else {
    amountValue.innerHTML = "0.00";
    totalValue.innerHTML = "0.00";
  }
};

if (localStorage.getItem("bill")) {
  const billData = JSON.parse(localStorage.getItem("bill"));
  console.log(billData);
  document.querySelector("#bill").value = billData.bill;
  document.querySelector("#people").value = billData.numberOfPeople;
  const tip = document.querySelector(`input[value="${billData.tipPercent}"]`);
  if (tip) {
    tip.checked = true;
  } else {
    document.querySelector("#custom-tip").value = billData.tipPercent;
  }
  validateResult();
}

allOptions.forEach((option) => {
  const radioInput = option.querySelector('input[type="radio"]');

  option.addEventListener("click", () => {
    if (!radioInput.checked) {
      radioInput.checked = true;
    }
  });
});

const billInput = document.querySelector("#bill");
const peopleInput = document.querySelector("#people");
const checkedRadio = document.querySelector('input[type="radio"]:checked');
const customTip = document.querySelector("#custom-tip");
customTip.addEventListener("input", validateResult);
billInput.addEventListener("input", validateResult);
peopleInput.addEventListener("input", validateResult);
if (checkedRadio) {
  checkedRadio.addEventListener("input", validateResult);
}
resetBtn.addEventListener("click", () => {
  billInput.value = "";
  peopleInput.value = "";
  customTip.value = "";
  amountValue.innerHTML = "0.00";
  totalValue.innerHTML = "0.00";
  allOptions.forEach((option) => {
    const radioInput = option.querySelector('input[type="radio"]');
    radioInput.checked = false;
  });
  localStorage.removeItem("bill");
});
