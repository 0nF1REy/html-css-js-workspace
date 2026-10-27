const slides = document.querySelectorAll(".slide");
const dotsContainer = document.querySelector(".dots-container");
let currentSlide = 0;
let slideInterval;

// Criação dinâmica dos indicadores e associação aos eventos de troca de slide
const createDots = () => {
  slides.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      goToSlide(i);
    });
    dotsContainer.appendChild(dot);
  });
};

const updateDots = () => {
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentSlide);
  });
};

const goToSlide = (slideIndex) => {
  slides[currentSlide].removeAttribute("data-active");
  currentSlide = (slideIndex + slides.length) % slides.length;
  slides[currentSlide].setAttribute("data-active", "");
  updateDots();
};

const changeSlide = (direction) => {
  const offset = direction === "next" ? 1 : -1;
  goToSlide(currentSlide + offset);
};

const startSlideShow = () => {
  slideInterval = setInterval(() => {
    changeSlide("next");
  }, 5000);
};

const stopSlideShow = () => {
  clearInterval(slideInterval);
};

document.querySelectorAll("[data-change-slide-button]").forEach((button) => {
  button.addEventListener("click", () => {
    const direction = button.dataset.changeSlideButton;
    changeSlide(direction);
  });
});

document
  .querySelector(".slideshow-container")
  .addEventListener("mouseover", stopSlideShow);
document
  .querySelector(".slideshow-container")
  .addEventListener("mouseout", startSlideShow);

createDots();
startSlideShow();
