document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form-hidden");
        createAccountForm.classList.remove("form-hidden");
    });

    document.querySelector("#linklogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form-hidden");
        createAccountForm.classList.add("form-hidden");
    });
});

const dropDownButton = document.querySelector(".navlink");
const dropdownMenu = document.querySelector(".dropdown-menu");
function dropFunction() {
    dropdownMenu.classList.toggle("active");
}

