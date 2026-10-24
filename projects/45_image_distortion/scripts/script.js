let container = document.querySelector(".container");

for (var i = 0; i < 400; i++) {
  let block = document.createElement("div");
  block.classList.add("block");
  container.appendChild(block);
}

let block = document.querySelectorAll(".block");

let animation = anime.timeline({
  targets: block,
  easing: "easeInOutExpo",
  loop: true,
});

animation.add({
  scale: 0,
  translateX: function () {
    return anime.random(-360, 360);
  },
  translateY: function () {
    return anime.random(-360, 360);
  },
});
