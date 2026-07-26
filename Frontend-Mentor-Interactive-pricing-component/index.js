const toggleButton = document.querySelector(".toggle");
const toggleCircle = document.querySelector(".toggle-circle");
const sliders = document.querySelectorAll(".slider-inner"); // updated to support multiple sliders
const type = document.querySelectorAll(".type");
const pageNo = document.querySelectorAll(".page-no");
const priceNo = document.querySelectorAll(".price-no");

let billing = "monthly";

const values = [
  { value: 0, pViews: "0", monthly: "0", yearly: "0" },
  { value: 1, pViews: "10K", monthly: "8", yearly: "6" },
  { value: 2, pViews: "50K", monthly: "12", yearly: "9" },
  { value: 3, pViews: "100K", monthly: "16", yearly: "12" },
  { value: 4, pViews: "200K", monthly: "20", yearly: "15" },
  { value: 5, pViews: "500K", monthly: "24", yearly: "18" },
  { value: 6, pViews: "1M", monthly: "36", yearly: "27" },
];

const setValue = (value) => {
  pageNo.forEach((el) => (el.innerHTML = values[value].pViews));
  priceNo.forEach((el) => (el.innerHTML = `${values[value][billing]}`));
  type.forEach((el) => (el.innerHTML = billing === "yearly" ? "year" : "month"));
  sliders.forEach((slider) => (slider.value = value));
};

toggleButton.addEventListener("click", () => {
  toggleCircle.classList.toggle("active");
  toggleButton.classList.toggle("activecyan");
  billing = toggleCircle.classList.contains("active") ? "yearly" : "monthly";
  setValue(sliders[0].value);
});

sliders.forEach((slider) => {
  slider.addEventListener("input", () => {
    slider.style.background = `linear-gradient(to right, hsl(174, 77%, 80%) ${slider.value * 16.66}%, hsl(224, 65%, 95%) ${slider.value * 16.66}%)`;
    setValue(slider.value);
  });
});

setValue(sliders[0].value);
