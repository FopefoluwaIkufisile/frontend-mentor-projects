const notifyBtn = document.querySelector(".notify")
const email = document.querySelector(".email")
const small = document.querySelector("small")

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function handleVerify(){
    if(!emailRegex.test(email.value)){
        small.classList.add("small")
        email.classList.add(".input-error")
      }
      else{
         small.classList.remove("small")
         email.classList.remove(".input-error")
         notifyBtn.value= "Notified!!"
      }
}

notifyBtn.addEventListener("click", handleVerify)