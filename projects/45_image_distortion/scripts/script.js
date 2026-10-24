const container = document.querySelector(".container");

const columns = 20;
const rows = 20;

for (let i = 0; i < columns * rows; i++) {
  const block = document.createElement("div");
  block.classList.add("block");

  const column = i % columns;
  const row = Math.floor(i / columns);

  block.style.backgroundPosition = `-${column * 5}vw -${row * 5}vw`;

  container.appendChild(block);
}

const blocks = document.querySelectorAll(".block");

const animation = anime.timeline({
  targets: blocks,
  easing: "easeInOutExpo",
  loop: true,
  delay: anime.stagger(10, { start: 50 }),
});

animation
  .add({
    scale: 0,
    translateX: () => anime.random(360, 2100),
    translateY: () => anime.random(360, -2100),
    rotate: () => anime.random(-360, 360),
    duration: () => anime.random(500, 3000),
  })
  .add({
    scale: 1,
    translateX: 0,
    translateY: 0,
    rotate: 0,
    duration: () => anime.random(500, 3000),
  });
