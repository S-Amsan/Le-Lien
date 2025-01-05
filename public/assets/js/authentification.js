const loginContainer = document.getElementById("container-login");
const registerContainer = document.getElementById("container-CreateAccount");
const createAccountButton = document.getElementById("button-createAccount");
const backButton = document.getElementById("button-back");

createAccountButton.addEventListener("click", () => {

    loginContainer.style.display = "none";
    createAccountButton.style.display = "none";


    registerContainer.style.display = "flex";
    backButton.style.display = "flex";
});

backButton.addEventListener("click", () =>{
    registerContainer.style.display = "none";
    backButton.style.display = "none";

    loginContainer.style.display ="flex";
    createAccountButton.style.display = "flex";
})
