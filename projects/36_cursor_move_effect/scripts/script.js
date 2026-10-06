document.addEventListener("mousemove", function (e) {
  let body = document.querySelector("body");
  let bubbles = document.createElement("span");
  body.appendChild(bubbles);
  setTimeout(function () {
    bubbles.remove();
  }, 1500);
});
