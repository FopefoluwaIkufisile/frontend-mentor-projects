const features = document.querySelector(".features-link");
const company = document.querySelector(".company-link");
const navFeatures = document.querySelector(".features-nav-link");
const navCompany = document.querySelector(".company-nav-link");
const featuresCloseBtn = document.querySelector(".features-close");
const companyCloseBtn = document.querySelector(".company-close");
const featuresOpenBtn = document.querySelector(".features-open");
const companyOpenBtn = document.querySelector(".company-open");
const navFeaturesCloseBtn = document.querySelector(".features-nav-close");
const navCompanyCloseBtn = document.querySelector(".company-nav-close");
const navFeaturesOpenBtn = document.querySelector(".features-nav-open");
const navCompanyOpenBtn = document.querySelector(".company-nav-open");
const featuresId= document.querySelector(".featuresid");
const companyId= document.querySelector(".companyid");
const navFeaturesId= document.querySelector(".nav-featuresid");
const navCompanyId= document.querySelector(".nav-companyid");
const menuBtn = document.querySelector("#menu-btn")
const openMenu = document.querySelector(".openmenu")
const closeMenu = document.querySelector(".closemenu")
const mobileNav = document.querySelector(".mobile-nav");
const overlay = document.querySelector('.overlay');

features.addEventListener("click", ()=>{
   featuresId.classList.toggle("features-content");
   featuresOpenBtn.classList.toggle("hidden")
   featuresCloseBtn.classList.toggle("hidden")

});

company.addEventListener("click", ()=>{
companyId.classList.toggle("company-content");
companyOpenBtn.classList.toggle("hidden")
companyCloseBtn.classList.toggle("hidden")
});

navFeatures.addEventListener("click", ()=>{
   navFeaturesId.classList.toggle("hides");
   navFeaturesOpenBtn.classList.toggle("hidden")
   navFeaturesCloseBtn.classList.toggle("hidden")

});

navCompany.addEventListener("click", ()=>{
navCompanyId.classList.toggle("hides");
navCompanyOpenBtn.classList.toggle("hidden")
navCompanyCloseBtn.classList.toggle("hidden")
});

menuBtn.addEventListener("click", ()=>{
    overlay.classList.toggle('active');
    openMenu.classList.toggle("hide")
    closeMenu.classList.toggle("hide")
    mobileNav.classList.toggle('show');
})