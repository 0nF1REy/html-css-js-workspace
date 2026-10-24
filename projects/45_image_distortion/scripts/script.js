
const { createTimeline, stagger, utils } = anime;

const container = document.querySelector(".container");

const columns = 20;
const rows = 20;

for (let i = 0; i < columns * rows; i++) {
  const block = document.createElement("div");
  block.classList.add("block");

  const column = i % columns;
  const row = Math.floor(i / columns);

  block.style.backgroundPosition =
    `-${column * 5}vw -${row * 5}vw`;

  container.appendChild(block);
}

const blocks = document.querySelectorAll(".block");

const animation = createTimeline({
  defaults: {
    ease: "inOutExpo",
  },
  loop: true,
  delay: stagger(10, { start: 50 }),
});

animation
  .add(blocks, {
    scale: 0,
    translateX: () => utils.random(360, 2100),
    translateY: () => utils.random(-2100, 360),
    rotate: () => utils.random(-360, 360),
    duration: () => utils.random(500, 3000),
  })
  .add(blocks, {
    scale: 1,
    translateX: 0,
    translateY: 0,
    rotate: 0,
    duration: () => utils.random(500, 3000),
  });
