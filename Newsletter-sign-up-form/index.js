const subscribe = document.querySelector(".subscribe");
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const emailInput = document.querySelector("#email");
const wrongMessage = document.querySelector(".validemail");
const removeCont = document.querySelector(".removecont")
const successBox = document.querySelector(".success-box")
const userEmail = document.querySelector(".user-email")
const dismissButton = document.querySelector(".dismiss-button")


subscribe.addEventListener("click", (e)=>{
    e.preventDefault();
    console.log(`clicked`);
    const emailValue = emailInput.value.trim();

    if (!emailRegex.test(emailInput.value)){
        wrongMessage.textContent = "Valid email required";
        wrongMessage.style.color = "red";
        wrongMessage.style.fontSize = "10px";
        wrongMessage.style.fontWeight = "bold";
        emailInput.style.color = "red";
        emailInput.style.backgroundColor = "pink";
        emailInput.style.borderColor = "red";
        console.log(emailValue);
      }
      else{
         removeCont.style.display = "none";
         successBox.style.display ="block";
         userEmail.textContent = emailValue;
  }
    
})
dismissButton.addEventListener("click", (e) => {

    e.preventDefault();
    removeCont.style.display = "flex";
    successBox.style.display ="none";


})