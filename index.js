const shuffleBtn = document.querySelector(".shuffle-btn");
const idNumber = document.querySelector(".id-number");
const advice = document.querySelector(".advice");

shuffleBtn.addEventListener("click", async () => {
  idNumber.textContent = "Loading...";
  advice.textContent = "Fetching advice...";
  
  try {
    const result = await fetch("https://api.adviceslip.com/advice");
    const data = await result.json();
    const { slip } = data;

    idNumber.textContent = `${slip.id}`;
    advice.textContent = `"${slip.advice}"`;
  } catch (error) {
    idNumber.textContent = "Error";
    advice.textContent = "Failed to fetch advice.";
    console.error("Error fetching advice:", error);
  }
});
