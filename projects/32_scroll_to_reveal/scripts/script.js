for (let i = 1; i <= 60; i++) {
  let box = document.createElement("div");
  box.classList.add("box");
  document.querySelector(".container").appendChild(box);
}

let boxes = document.querySelectorAll(".box");

function scrollTrigger() {
  boxes.forEach((boxxx) => {
    if (boxxx.getBoundingClientRect().top < window.scrollY) {
      boxxx.classList.add("active");
    } else {
      boxxx.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", scrollTrigger);
