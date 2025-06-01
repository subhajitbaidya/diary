let isLogin = true;

function toggleLoginSignup(e) {
  e.preventDefault();
  const btn = document.getElementById("loginbutton");
  const toggleText = document.getElementById("toggletext");

  // Add null checks
  if (!btn || !toggleText) {
    console.error("Required elements not found");
    return;
  }

  if (isLogin) {
    btn.textContent = "Signup";
    toggleText.innerHTML = `Already have an account? <a href="#" id="toggleLink">Login</a>`;
  } else {
    btn.textContent = "Login";
    toggleText.innerHTML = `Don't have an account? <a href="#" id="toggleLink">Sign up</a>`;
  }

  isLogin = !isLogin;

  // Re-bind the event listener after DOM update
  const newToggleLink = document.getElementById("toggleLink");
  if (newToggleLink) {
    newToggleLink.addEventListener("click", toggleLoginSignup);
  }
}

// Initial binding with error handling
function initializeToggleLink() {
  const toggleLink = document.getElementById("toggleLink");
  if (toggleLink) {
    toggleLink.addEventListener("click", toggleLoginSignup);
  } else {
    console.warn("Toggle link not found during initialization");
  }
}

// Form submission handler
async function handleLoginForm(e) {
  e.preventDefault();

  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  if (!emailInput || !passwordInput) {
    alert("Form elements not found");
    return;
  }

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  // Basic validation
  if (!email || !password) {
    alert("Please fill in all fields");
    return;
  }

  try {
    let response;
    if (isLogin === true) {
      response = await fetch("http://localhost:8000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
    } else {
      response = await fetch("http://localhost:8000/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
    }

    const data = await response.json();

    if (response.ok) {
      showLoggedInUi(data.email);
      // Clear form after successful login/signup
      emailInput.value = "";
      passwordInput.value = "";
    } else {
      alert(data.error || (isLogin ? "Login failed" : "Signup failed"));
    }
  } catch (err) {
    console.error(err);
    alert("An error occurred! Please try again");
  }
}

function showLoggedInUi(email) {
  const loginSection = document.getElementById("loginSection");
  const nav = document.getElementById("nav");
  const main = document.getElementById("main");

  if (loginSection) loginSection.style.display = "none";
  if (nav) nav.style.display = "block";
  if (main) main.style.display = "flex";
}

// MINIMAL SESSION PERSISTENCE - Just check session on page load
// async function CheckSession() {
//   try {
//     const res = await fetch("http://localhost:8000/session/auth", {
//       method: "GET",
//       credentials: "include",
//     });

//     if (res.ok) {
//       const data = await res.json();
//       if (data && data.user && data.user.email) {
//         showLoggedInUi(data.user.email);
//         return true;
//       }
//     }
//     // If session check fails, do nothing (show login form by default)
//     return false;
//   } catch (error) {
//     console.error("Session check failed", error);
//     return false;
//   }
// }

async function CheckSession() {
  try {
    console.log("Making session check request...");

    const res = await fetch("http://localhost:8000/session/auth", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));

    if (res.ok) {
      const data = await res.json();
      console.log("Session data:", data);

      if (data && data.user && data.user.email) {
        showLoggedInUi(data.user.email);
        return true;
      }
    } else {
      const errorData = await res.json();
      console.log("Session check error:", errorData);
    }

    return false;
  } catch (error) {
    console.error("Session check failed", error);
    return false;
  }
}

const api_url = "http://localhost:8000/api/quotes";

async function getquotes(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching quotes:", error);
    throw error;
  }
}

async function displayQuote() {
  try {
    const quotes = await getquotes(api_url);

    if (!quotes || quotes.length === 0) {
      console.warn("No quotes available");
      return;
    }

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomTextElement = document.getElementById("quote");
    const randomAuthorElement = document.getElementById("author");

    if (randomTextElement && quotes[randomIndex] && quotes[randomIndex].q) {
      randomTextElement.textContent = quotes[randomIndex].q;
    }

    if (randomAuthorElement && quotes[randomIndex] && quotes[randomIndex].a) {
      randomAuthorElement.textContent = "Author: " + quotes[randomIndex].a;
    }
  } catch (error) {
    console.error("Error displaying quote:", error);
    // Show fallback quote
    const randomTextElement = document.getElementById("quote");
    const randomAuthorElement = document.getElementById("author");

    if (randomTextElement) {
      randomTextElement.textContent = "Unable to load quote at this time.";
    }
    if (randomAuthorElement) {
      randomAuthorElement.textContent = "";
    }
  }
}

async function storeMessage() {
  const messageInput = document.getElementById("userMessage");

  if (!messageInput) {
    alert("Message input not found");
    return;
  }

  const message = messageInput.value.trim();

  if (!message) {
    alert("Please enter a message before saving");
    return;
  }

  const confirmation = confirm("Want to save this article?");
  if (confirmation) {
    try {
      const response = await fetch("http://localhost:8000/api/diary/text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ text: message }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Message saved successfully!");
        messageInput.value = ""; // Clear input after successful save
      } else {
        alert(data.error || "Failed to save message.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while saving the message.");
    }
  }
}

// Initialize everything when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  // Check session FIRST before showing anything
  CheckSession();

  displayQuote();

  // Bind form submission
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", handleLoginForm);
  }

  // Initialize toggle link
  initializeToggleLink();
});
