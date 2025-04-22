const quotes = [
  "Believe in yourself!",
  "Stay positive, work hard, make it happen.",
  "Every moment is a fresh beginning.",
  "Success is not final; failure is not fatal.",
  "Dream big and dare to fail.",
];

const randomIndex = Math.floor(Math.random() * quotes.length);
const randomTextElement = document.getElementById("quote");

randomTextElement.textContent = quotes[randomIndex];
function sendMessage() {
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");

  if (input.value.trim() !== "") {
    const message = document.createElement("p");
    message.textContent = input.value;
    chatBox.appendChild(message);
    input.value = "";

    // Auto-scroll to bottom
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const dateElement = document.getElementById("current-date");

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  dateElement.textContent = formattedDate;
});
