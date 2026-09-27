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
