const imageContainerEl = document.querySelector(".image-container");
const btnEl = document.querySelector(".btn");

const imageCount = 8;

const imageSizes = [
  [500, 500],
  [600, 450],
  [450, 600],
  [600, 500],
  [700, 500],
  [600, 400],
  [500, 600],
  [600, 450],
];

const usedImageIds = new Set();

function getRandomSize() {
  const randomIndex = Math.floor(Math.random() * imageSizes.length);

  return imageSizes[randomIndex];
}

function getRandomImageId() {
  let randomId;

  do {
    randomId = Math.floor(Math.random() * 1000);
  } while (usedImageIds.has(randomId));

  usedImageIds.add(randomId);

  return randomId;
}

function createImage() {
  const [width, height] = getRandomSize();
  const imageId = getRandomImageId();

  const imageEl = document.createElement("img");

  imageEl.src = `https://picsum.photos/id/${imageId}/${width}/${height}`;
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

addNewImages();
