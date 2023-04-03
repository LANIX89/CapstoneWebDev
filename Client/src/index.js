const hamburger = document.querySelector(".hamburger");
const mainNav = document.querySelector(".main-nav");


hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mainNav.classList.toggle("active");
})

document.addEventListener("DOMContentLoaded", () => {
    const tableHide = document.querySelector("#table");

    document.querySelector("#hideForm").addEventListener("click", e => {
        e.preventDefault();
        tableHide.classList.add("table-hidden");
    });

});