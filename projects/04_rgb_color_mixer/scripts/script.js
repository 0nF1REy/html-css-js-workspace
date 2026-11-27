const channels = {
  red: document.querySelector("#red"),
  green: document.querySelector("#green"),
  blue: document.querySelector("#blue"),
};

const outputs = {
  red: document.querySelector("#red-value"),
  green: document.querySelector("#green-value"),
  blue: document.querySelector("#blue-value"),
};

const preview = document.querySelector("#color-preview");
const hexOutput = document.querySelector("#hex-value");
const rgbOutput = document.querySelector("#rgb-value");
const resetButton = document.querySelector("#reset-color");
const copyButton = document.querySelector("#copy-color");
const copyStatus = document.querySelector("#copy-status");

const initialValues = {
  red: 128,
  green: 128,
  blue: 128,
};

const getColor = () => ({
  red: Number(channels.red.value),
  green: Number(channels.green.value),
  blue: Number(channels.blue.value),
});

const toHex = (value) => value.toString(16).padStart(2, "0").toUpperCase();

const updateColor = () => {
  const color = getColor();
  const { red, green, blue } = color;

  const hex = `#${toHex(red)}${toHex(green)}${toHex(blue)}`;
  const rgb = `rgb(${red}, ${green}, ${blue})`;

  Object.entries(color).forEach(([channel, value]) => {
    outputs[channel].value = value;
  });

  preview.style.backgroundColor = rgb;
  preview.setAttribute("aria-label", `Prévia da cor ${hex}, ${rgb}`);
  hexOutput.value = hex;
  rgbOutput.textContent = rgb;
  copyStatus.textContent = "";
};

Object.values(channels).forEach((input) => {
  input.addEventListener("input", updateColor);
});

resetButton.addEventListener("click", () => {
  Object.entries(initialValues).forEach(([channel, value]) => {
    channels[channel].value = value;
  });

  updateColor();
});

copyButton.addEventListener("click", async () => {
  const hex = hexOutput.value;

  try {
    await navigator.clipboard.writeText(hex);
    copyStatus.textContent = `${hex} copiado para a área de transferência.`;
  } catch {
    copyStatus.textContent =
      "Não foi possível copiar automaticamente. Selecione e copie o código HEX.";
  }
});

updateColor();
