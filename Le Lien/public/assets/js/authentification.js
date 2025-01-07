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

const conditionCheckboxe = document.getElementById("condition-checkbox");
const conditionErreur = document.getElementById("erreur")
const form = document.getElementById('form-CreateAccount');
function validateCondition() {
    const isChecked = conditionCheckboxe.checked;
    if (!isChecked) {
        conditionErreur.classList.add("afficher")
        return false;
    }
    return true;
}

conditionCheckboxe.addEventListener('change', () => {
    if (conditionCheckboxe.checked) {
        conditionErreur.classList.remove("afficher")
    }
});

form.addEventListener('submit', (event) => {
    if (!form.checkValidity()) {
        return;
    }
    if (!validateCondition()) {
        event.preventDefault();
    }
});