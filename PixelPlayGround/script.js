const slide = document.querySelector(".slide");
const images = document.querySelectorAll(".slide .image");
const leftArrow = document.querySelector(".arrow.left");
const rightArrow = document.querySelector(".arrow:not(.left)");

let index = 0;
const total = images.length;

function updateSlide() {
    slide.style.transform = `translateX(-${index * 100}%)`;
}

rightArrow.addEventListener("click", () => {
    index++;
    if (index >= total) index = 0;
    updateSlide();
});

leftArrow.addEventListener("click", () => {
    index--;
    if (index < 0) index = total - 1;
    updateSlide();
});
