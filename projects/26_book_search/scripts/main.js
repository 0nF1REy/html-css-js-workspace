const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const resultsContainer = document.getElementById("results");

let currentPage = 1;
let booksPerPage = 25;
let booksData = [];

async function fetchBooks(query) {
  const apiUrl = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Não foi possível obter os dados");
    const data = await response.json();
    booksData = data.docs;
    currentPage = 1;
    displayBooks();
    displayPagination();
  } catch (error) {
    resultsContainer.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}

function displayBooks() {
  resultsContainer.innerHTML = "";
  const start = (currentPage - 1) * booksPerPage;
  const end = start + booksPerPage;
  const booksToShow = booksData.slice(start, end);

  if (booksToShow.length === 0) {
    resultsContainer.innerHTML = "<p>Nenhum livro encontrado</p>";
    return;
  }

  booksToShow.forEach((book) => {
    const bookCover = book.cover_i
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
      : "https://via.placeholder.com/150x200?text=No+Image";
    const bookElement = document.createElement("div");
    bookElement.className = "book-card";
    bookElement.innerHTML = `
    <img src = "${bookCover}" alt="Capa do Livro">
    <h3>${book.title}</h3>
    <p>${book.author_name ? book.author_name.join(", ") : "Autor Desconhecido"}</p>
    `;
    resultsContainer.appendChild(bookElement);
  });
}

function displayPagination() {
  const totalPages = Math.ceil(booksData.length / booksPerPage);
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";

  const prevButton = document.createElement("button");
  prevButton.textContent = "Anterior";
  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      displayBooks();
      displayPagination();
    }
  });
  paginationContainer.appendChild(prevButton);

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.textContent = i;
    pageButton.disabled = i === currentPage;
    pageButton.addEventListener("click", () => {
      currentPage = i;
      displayBooks();
      displayPagination;
    });
    paginationContainer.appendChild(pageButton);
  }

  const nextButton = document.createElement("button");
  nextButton.textContent = "Próximo";
  nextButton.disabled = currentPage === totalPages;
  nextButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      displayBooks();
      displayPagination();
    }
  });
  paginationContainer.appendChild(nextButton);
}

searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (!query) {
    resultsContainer.innerHTML = "<p>Digite o que deseja buscar.</p>";
    return;
  }
  fetchBooks(query);
});
