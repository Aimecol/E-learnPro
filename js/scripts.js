document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });

  const carousel = document.querySelector(".carousel");
  const testimonials = document.querySelectorAll(".testimonial");
  let scrollAmount = 0;

  setInterval(() => {
    scrollAmount += 300;
    if (scrollAmount >= carousel.scrollWidth - carousel.clientWidth) {
      scrollAmount = 0;
    }
    carousel.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  }, 3000);

  testimonials.forEach((testimonial) => {
    testimonial.addEventListener("mouseover", () => {
      testimonial.style.transform = "scale(1.05)";
    });
    testimonial.addEventListener("mouseout", () => {
      testimonial.style.transform = "scale(1)";
    });
  });
});
