const imageContainerEl = document.querySelector(".image-container");

const loaderEl = document.querySelector(".gallery-loader");

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

  imageEl.addEventListener("error", () => {
    imageEl.remove();
    addNewImages(1);
  });

  return imageEl;
}

function getColumns() {
  return [...imageContainerEl.children];
}

function getShortestColumn() {
  return getColumns().reduce((shortestColumn, column) => {
    return column.offsetHeight < shortestColumn.offsetHeight
      ? column
      : shortestColumn;
  });
}

function createColumns() {
  const columnCount = window.matchMedia("(max-width: 380px)").matches
    ? 1
    : window.matchMedia("(max-width: 600px)").matches
      ? 2
      : window.matchMedia("(max-width: 900px)").matches
        ? 3
        : 4;

  const fragment = document.createDocumentFragment();

  for (let index = 0; index < columnCount; index++) {
    const columnEl = document.createElement("div");

    columnEl.className = "gallery-column";

    fragment.appendChild(columnEl);
  }

  imageContainerEl.appendChild(fragment);
}

function addNewImages(count = imageCount) {
  for (let index = 0; index < count; index++) {
    const imageEl = createImage();

    const shortestColumn = getShortestColumn();

    shortestColumn.appendChild(imageEl);
  }
}

const observer = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      addNewImages();
    }
  },
  {
    rootMargin: "800px",
  },
);

createColumns();
observer.observe(loaderEl);
addNewImages();
