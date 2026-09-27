function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function allowDrop(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();

  const dropBox = event.currentTarget;

  if (dropBox.children.length > 0) {
    return;
  }

  const data = event.dataTransfer.getData("text");
  const piece = document.getElementById(data);

  dropBox.appendChild(piece);

  checkPuzzle();
}

function checkPuzzle() {
  const dropBoxes = document.querySelectorAll(".dropBox");
  const board = document.querySelector(".board");

  let correct = true;

  dropBoxes.forEach((dropBox, index) => {
    const piece = dropBox.firstElementChild;

    if (!piece || piece.id !== `block${index + 1}`) {
      correct = false;
    }
  });

  if (correct) {
    board.classList.add("completed");
    alert("Parabéns! Você completou o quebra-cabeça!");
  }
}

onload = function () {
  let parent = document.getElementById("drag");
  let frag = document.createDocumentFragment();

  while (parent.children.length) {
    frag.appendChild(
      parent.children[Math.floor(Math.random() * parent.children.length)],
    );
  }

  parent.appendChild(frag);
};
