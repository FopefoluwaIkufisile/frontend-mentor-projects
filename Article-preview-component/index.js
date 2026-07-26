const shareBtn = document.querySelector(".share-btn")
const sharePopUp = document.querySelector(".share-box2")
const author = document.querySelector(".author-box");
const year = document.querySelector("#Year");

    shareBtn.addEventListener("click", ()=>{
        const viewportWidth = window.innerWidth;

        if (viewportWidth <= 700) {
            sharePopUp.classList.toggle('active-small');
            
            console.log(`Clicked on small screen`);
        } else {
            sharePopUp.classList.toggle('active');
            console.log(`Clicked on large screen`);
        }
      })
year.textContent = new Date().getFullYear();




