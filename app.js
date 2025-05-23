document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:8000/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    const data = await response.json();

    if (response.ok) {
      document.getElementById("loginSection").style.display = "none";
      document.getElementById("nav").style.display = "block";
      document.getElementById("main").style.display = "flex";
    } else {
      alert(data.error || "Login failed");
    }
  } catch (err) {
    console.error(err);
  }
});
let isLogin = true;

function toggleLoginSignup(e) {
  e.preventDefault();
  const btn = document.getElementById("loginbutton");
  const toggleText = document.getElementById("toggletext");

  if (isLogin) {
    btn.textContent = "Signup";
    toggleText.innerHTML = `Already have an account? <a href="#" id="toggleLink">Login</a>`;
  } else {
    btn.textContent = "Login";
    toggleText.innerHTML = `Don't have an account? <a href="#" id="toggleLink">Sign up</a>`;
  }

  isLogin = !isLogin;

  document
    .getElementById("toggleLink")
    .addEventListener("click", toggleLoginSignup);
}

// Initial binding
document
  .getElementById("toggleLink")
  .addEventListener("click", toggleLoginSignup);

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
