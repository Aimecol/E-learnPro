const carousel = document.querySelector(".testimonials-carousel");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");

let isDragging = false;
let startX;
let scrollLeft;

// Dragging Functionality
carousel.addEventListener("mousedown", (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  startX = e.pageX - carousel.offsetLeft;
  scrollLeft = carousel.scrollLeft;
});

carousel.addEventListener("mouseleave", () => {
  isDragging = false;
  carousel.classList.remove("dragging");
});

carousel.addEventListener("mouseup", () => {
  isDragging = false;
  carousel.classList.remove("dragging");
});

carousel.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - carousel.offsetLeft;
  const walk = (x - startX) * 2; // Dragging sensitivity
  carousel.scrollLeft = scrollLeft - walk;
});

// Navigation Arrows
const scrollAmount = 300;

leftArrow.addEventListener("click", () => {
  carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });
});

rightArrow.addEventListener("click", () => {
  carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
});

// Optional: Disable arrows when at the ends
const updateArrows = () => {
  leftArrow.disabled = carousel.scrollLeft <= 0;
  rightArrow.disabled =
    carousel.scrollLeft + carousel.offsetWidth >= carousel.scrollWidth;
};

carousel.addEventListener("scroll", updateArrows);
updateArrows();
