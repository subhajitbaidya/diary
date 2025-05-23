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
async function storeMessage() {
  const message = document.getElementById("userMessage").value;

  const confirmation = confirm("Want to save this article?");
  if (confirmation) {
    try {
      const response = await fetch("http://localhost:8000/api/diary/text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: message }),
      });

      if (response.ok) {
        alert("Message saved successfully!");
      } else {
        alert("Failed to save message.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while saving the message.");
    }
  } else {
    return null;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  displayQuote();
});
