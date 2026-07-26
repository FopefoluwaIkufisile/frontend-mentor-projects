const claim = document.querySelector("#free");
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const email = document.getElementById("email");
const password = document.getElementById("password");
const fnameError = document.querySelector(".fname-error");
const lnameError = document.querySelector(".lname-error");
const emailError = document.querySelector(".email-error");
const passwordError = document.querySelector(".password-error");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);

    if (password.length < minLength) {
        return { valid: false, message: `Password must be at least ${minLength} characters long.` };
    }
    if (!hasUpperCase) {
        return { valid: false, message: "Password must contain at least one uppercase letter." };
    }
    if (!hasLowerCase) {
        return { valid: false, message: "Password must contain at least one lowercase letter." };
    }
    if (!hasDigit) {
        return { valid: false, message: "Password must contain at least one digit." };
    }
    if (!hasSpecialChar) {
        return { valid: false, message: "Password must contain at least one special character." };
    }

    return { valid: true }; 
}



function validateInput(input, errorElement, isEmail = false) {
    if (!input.value) {
        input.classList.add("with-icon");
        errorElement.style.display = "block";
        return false; 
    } 
    else if(isEmail && !emailRegex.test(input.value)){
        input.classList.add("with-icon");
        errorElement.style.display = "block";
        return false; 
    }
    else {
        input.classList.remove("with-icon");
        errorElement.style.display = "none";
        return true; 
    }
}

claim.addEventListener("click", (e) => {
    e.preventDefault();

    const isFnameValid = validateInput(fname, fnameError);
    const isLnameValid = validateInput(lname, lnameError);
    const isEmailValid = validateInput(email, emailError, true);
    const isPasswordValid = validateInput(password, passwordError);

    const passwordValue = password.value;
    const passwordValidationResult = validatePassword(passwordValue);
    
    if (!passwordValidationResult.valid) {
        password.classList.add("with-icon");
        passwordError.textContent = passwordValidationResult.message;
        passwordError.style.display = "block";
        return; 
    } else {
        password.classList.remove("with-icon");
        passwordError.style.display = "none";
    }


    if (isFnameValid && isLnameValid && isEmailValid && isPasswordValid) {
        claim.value = `Hi ${fname.value}!!`;
    }
});
