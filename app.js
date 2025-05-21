const api_url = "http://localhost:8000/api/quotes";

async function getquotes(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function displayQuote() {
  const quotes = await getquotes(api_url);
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomTextElement = document.getElementById("quote");
  randomTextElement.textContent = quotes[randomIndex].q;
  const randomAuthorElement = document.getElementById("author");
  randomAuthorElement.textContent = "Author: " + quotes[randomIndex].a;
}

document.addEventListener("DOMContentLoaded", () => {
  displayQuote();
});
