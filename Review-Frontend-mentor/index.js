let rating;

document.querySelectorAll(".number").
forEach((number)=> {
    number.addEventListener("click", (e)=>{
        rating = e.target.id
        console.log(rating)
        document.querySelector(".rating").textContent = rating ? rating : "none"
    })
})
document.querySelector(".submit").addEventListener("click", ()=>{
    if (!rating){
        console.log("no rating")
        document.querySelector("small").style.display = "block"
    }
    else{
    const container = document.querySelector(".container")
    const thankyou = document.querySelector(".container-thank-you")
    container.style.display = "none"
    thankyou.style.display = "flex"
    }
})
