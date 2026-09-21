// https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg
// https://via.placeholder.com/150x200?text=No+Image

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
    if (!response.ok) throw new Error("Failed to fetch data");
    const data = await response.json();
    booksData = data.docs;
    currentPage = 1;
    displayBooks();
    displayPagination();
  } catch (error) {
    resultsContainer.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}
