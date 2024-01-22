"use strict";

const signIn = document.querySelector("#sign-in");
const accountBox = document.querySelector(".account-box");
const page = document.querySelector(".page");
const inputs = document.querySelectorAll(".input");
const passwordBox = document.querySelector(".password-box");
const email = document.querySelector(".email");
const password = document.querySelector(".password");
const logInBtn = document.querySelector(".log-in");
const emailError = document.querySelector(".email-error");
const passwordError = document.querySelector(".password-error");
const loadingOverlay = document.querySelector(".loading-overlay");
const loading = document.querySelector(".loading");

//Show and Hide Sign In Box
page.addEventListener("click", (e) => {
  let target = e.target;
  if (
    !accountBox.contains(target) &&
    accountBox.classList.contains("show-account")
  ) {
    accountBox.classList.remove("show-account");
  } else if (target === signIn) {
    accountBox.classList.add("show-account");
  } else return;
});

//Show and Hide Password Input
function showPassword(target) {
  let grandparent = target.parentElement.parentElement;
  //hide plain eye
  target.parentElement.classList.add("hide");
  console.log(target);
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
passwordBox.addEventListener("click", (e) => {
  e.preventDefault();
  let target = e.target;
  let eyeIcon = document.querySelector(".fa-eye");
  if (target === eyeIcon) {
    showPassword(target);
  } else return;
});

var formData = new FormData();

formData.append("email", "");
formData.append("password", "");

//Get current inputs value
email.addEventListener("change", () => {
  formData.email = email.value;
});
password.addEventListener("change", () => {
  formData.password = password.value;
});

// Handle Form Submission
async function handleLogIn(e) {
  e.preventDefault();
  let errorLog = {};

  // Validate Form
  //check if email-input is not empty
  if (email.value === "" || email.value.length < 9) {
    emailError.classList.remove("hide");
    errorLog.email = "true";
  }
  //password input is must be upto 6 and not empty
  if (password.value === "" || password.value.length < 6) {
    passwordError.classList.remove("hide");
    errorLog.password = "true";
  }
  try {
    //Submit data to JSON server
    if (Object.keys(errorLog).length === 0) {
      //Show Loading Status
      loading.classList.remove("hide");
      loadingOverlay.classList.remove("hide");
      //Post data into user object
      const response = await fetch("https://users-5kx9.onrender.com/users");
      const result = await response.json();
      await result.map((user) => {
        if (user.email === formData.email) {
          if (user.password === formData.password) {
            user.active = true;
            alert("Log in Successful");
            let currentUser = user.fullName.split(" ")[0];
            console.log(currentUser);
            window.location.href = "../home.html?username=" + currentUser;
          } else {
            passwordError.innerHTML = "Wrong Password";
            passwordError.classList.remove("hide");
          }
        } else if (formData.email !== "") {
          emailError.innerHTML = "Wrong Email, Please Register";
          emailError.classList.remove("hide");
        }
      });
    }
  } catch (error) {
  } finally {
    //Hide Loading Status
    loading.classList.add("hide");
    loadingOverlay.classList.add("hide");
    email.value = "";
    password.value = "";
  }
}

logInBtn.addEventListener("click", (e) => {
  handleLogIn(e);
});
