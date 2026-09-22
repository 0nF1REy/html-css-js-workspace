document.addEventListener("DOMContentLoaded", () => {
  const colorCode = document.getElementById("color-code");
  const generateBtn = document.getElementById("generate-btn");
  const copyBtn = document.getElementById("copy-btn");
  const colorFormat = document.getElementById("color-format");

  let currentColor = { r: 0, g: 0, b: 0 };

  function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    return { r, g, b };
  }

  function rgbToHex(r, g, b) {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }

  function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    let h;
    let s;
    const l = (max + min) / 2;

    if (max === min) {
      h = 0;
      s = 0;
    } else {
      const d = max - min;

      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;

        case g:
          h = (b - r) / d + 2;
          break;

        case b:
          h = (r - g) / d + 4;
          break;
      }

      h /= 6;
    }

    h = Math.round(h * 360);
    s = Math.round(s * 100);
    const lightness = Math.round(l * 100);

    return `hsl(${h}, ${s}%, ${lightness}%)`;
  }

  function updateColorDisplay() {
    let formattedColor;

    switch (colorFormat.value) {
      case "rgb":
        formattedColor = `rgb(${currentColor.r}, ${currentColor.g}, ${currentColor.b})`;
        break;

      case "hsl":
        formattedColor = rgbToHsl(
          currentColor.r,
          currentColor.g,
          currentColor.b,
        );
        break;

      default:
        formattedColor = rgbToHex(
          currentColor.r,
          currentColor.g,
          currentColor.b,
        );
    }

    colorCode.textContent = formattedColor;
  }

  function generateNewColor() {
    currentColor = getRandomColor();

    document.body.style.backgroundColor = `rgb(${currentColor.r}, ${currentColor.g}, ${currentColor.b})`;

    updateColorDisplay();
  }

  copyBtn.addEventListener("click", () => {
    const icon = copyBtn.querySelector("i");

    navigator.clipboard.writeText(colorCode.textContent).then(() => {
      icon.classList.remove("fa-copy");
      icon.classList.add("fa-check");

      copyBtn.setAttribute("aria-label", "Código copiado");

      setTimeout(() => {
        icon.classList.remove("fa-check");
        icon.classList.add("fa-copy");

        copyBtn.setAttribute("aria-label", "Copiar código da cor");
      }, 1500);
    });
  });

  generateBtn.addEventListener("click", () => {
    generateNewColor();
  });

  colorFormat.addEventListener("change", () => {
    updateColorDisplay();
  });

  generateNewColor();
});
