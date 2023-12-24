"use strict";

const inputs = document.querySelectorAll(".input");
const passwordBox = document.querySelector(".password-box");
const registerBox = document.querySelector(".register-box");
const registerBtn = document.querySelector(".register-btn");
const name = document.querySelector(".name");
const email = document.querySelector(".email");
const password = document.querySelector(".password");
const cPassword = document.querySelector(".c-password");
const nameError = document.querySelector(".name-error");
const emailError = document.querySelector(".email-error");
const passwordError = document.querySelector(".password-error");
const cPasswordError = document.querySelector(".cpassword-error");
const overlay = document.querySelector(".overlay");
const warning = document.querySelector(".warning");
function showPassword(target) {
  let grandparent = target.parentElement.parentElement;
  //hide plain eye
  target.parentElement.classList.add("hide");

  //show slash-eye
  grandparent.querySelector(".eye-slash").classList.remove("hide");
  //show password input for 3secs
  grandparent.querySelector("input").setAttribute("type", "text");
  setTimeout(() => {
    //hide password after 3secs
    grandparent.querySelector("input").setAttribute("type", "password");
    //show plain eye after 3secs
    target.parentElement.classList.remove("hide");
    //hide slash-eye after 3secs
    grandparent.querySelector(".eye-slash").classList.add("hide");
  }, 2000);
}

//Password Box Event Delegation
registerBox.addEventListener("click", (e) => {
  e.preventDefault();
  let target = e.target;
  if (target.classList.contains("fa-eye")) {
    showPassword(target);
  } else return;
});

var formData = new FormData();

formData.append("fullName", "");
formData.append("email", "");
formData.append("password", "");
formData.append("cpassword", "");

//Get current inputs value
name.addEventListener("change", () => {
  formData.fullName = name.value;
});
email.addEventListener("change", () => {
  formData.email = email.value;
});
password.addEventListener("change", () => {
  formData.password = password.value;
});
cPassword.addEventListener("change", () => {
  formData.cPassword = cPassword.value;
});

// Handle Form Submission
async function handleSubmit(e) {
  e.preventDefault();
  let errorLog = {};
  // Validate Form
  if (name.value === "") {
    nameError.classList.remove("hide");
    errorLog.name = "true";
  }
  if (email.value === "" || email.value.length < 9) {
    emailError.classList.remove("hide");
    errorLog.email = "true";
  }
  if (password.value === "" || password.value.length < 6) {
    passwordError.classList.remove("hide");
    errorLog.password = "true";
  }
  if (cPassword.value === "" || password.value !== cPassword.value) {
    cPasswordError.classList.remove("hide");
    errorLog.cPassword = "true";
  }
  //Submit data to JSON server
  if (Object.keys(errorLog).length === 0) {
    //Post data into user object
    const response = await fetch("https://users-5kx9.onrender.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const result = await response.json();
    alert("Registraion Successful");

    //Clear Input field
    name.value = "";
    email.value = "";
    password.value = "";
    cPassword.value = "";
    window.location.href = "../index.html";
  }
}

registerBtn.addEventListener("click", (e) => {
  handleSubmit(e);
});

overlay.addEventListener("click", () => {
  warning.classList.add("hide");
});
