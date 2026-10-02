const imageContainerEl = document.querySelector(".image-container");
const btnEl = document.querySelector(".btn");

const imageCount = 8;

const imageSizes = [
  [500, 500],
  [600, 450],
  [600, 500],
  [700, 500],
  [600, 400],
  [500, 600],
];

function getRandomSize() {
  const randomIndex = Math.floor(Math.random() * imageSizes.length);
  return imageSizes[randomIndex];
}

function createImage() {
  const [width, height] = getRandomSize();
  const randomId = Math.floor(Math.random() * 2000);

  const imageEl = document.createElement("img");

  imageEl.src = `https://picsum.photos/${width}/${height}?random=${randomId}`;
  imageEl.alt = "Imagem aleatória";
  imageEl.width = width;
  imageEl.height = height;
  imageEl.loading = "lazy";

  return imageEl;
}

function addNewImages() {
  const fragment = document.createDocumentFragment();

  for (let index = 0; index < imageCount; index++) {
    fragment.appendChild(createImage());
  }

  imageContainerEl.appendChild(fragment);
}

btnEl.addEventListener("click", addNewImages);
