const hamburger = document.querySelector(".hamburger");
const mainNav = document.querySelector(".main-nav");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mainNav.classList.toggle("active");
})