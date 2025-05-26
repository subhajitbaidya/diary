# Dear Diary – A Safe Space for Your Emotions

---

## 💬 About the Project

As we grow deeper into the immersive digital world, we all face a struggle with unsaid emotions. That’s what inspired the creation of **Dear Diary** — a simple web based diary where users can safely **vent their thoughts and feelings** without judgment. If everything can become digital, why not this too?

---

## 🎯 Vision & Purpose

- 🌱 **Human-Centric Motivation:**
  I'm passionate about building something that genuinely helps people. This app is my step toward **making tech more human**.

- 💖 **A Safe Space:**
  Dear Diary is designed to be a **comfort zone**, a digital shoulder to lean on, where users can express themselves without fear.

- 🔐 **Privacy & Consent First:**
  I’m committed to **handling user data responsibly**, ensuring nothing is stored without the user's **explicit consent**.

---

## 🛠️ Project Highlights

- 🧪 **Development Version**
  This repo will track the **entire journey** — from idea to implementation.

- 🧱 **Built on Small, Practical Ideas**
  We’ll start with **basic core features**, ensuring simplicity, and then expand organically.

- 🛁 **Microservices Architecture in Future**
  The app will evolve to a **Microservice-based system**, including:

  - 📌 Basic API Gateway
  - 📌 Separate Service Modules (Auth, Diary, Logging, etc.)
  - 📌 Scalable and maintainable codebase

- 💻 **Frontend Migration Planned**
  The current UI will eventually be upgraded to frameworks like **React** for a smoother user experience.

---

## 📚 What You’ll Learn From This Repo

If you're new to web development, this repository will give you insight into:

- ✅ RESTful API creation
- ✅ Microservices fundamentals
- ✅ API Gateway integration
- ✅ Safe handling of user data
- ✅ Docker & environment configuration (in future phases)

---

## 🔄 Ongoing Documentation

📖 I’ll **document my entire journey**, decisions, and learnings step by step — so anyone following along can learn **not just how, but why**.

---

## 🔗 What's Next?

- 📌 Continue building core features
- 📌 Break features into microservices
- 📌 Share deployed URLs and versioned APIs
- 📌 Add user-friendly frontend interface
- 📌 Community feedback and collaboration

---

## 🙌 You're Welcome Here

If you're someone who's learning or just curious — **feel free to explore this repo**. I genuinely hope it helps you understand how to turn small ideas into working, meaningful software.

---

## 🪒 Feature Breakdown

- Login/Sign up User
- Diary page for user to write articles
- Display quotes from an external API.
- Chat box for interacting with an ML model

---

## ⚙️ Tech Stack

- Node.js + Express
- Docker + Docker Compose
- API Gateway pattern
- Inter-service HTTP communication (Axios)
- Environment Variables (`dotenv`)
- Logging with `winston`

---

## 🚀 How to Run

> Prerequisite: Node Js and Code Editor of your choice
> If using VS code, install extensions like live server, prettier code formatter

```bash
git clone https://github.com/subhajitbaidya/diary.git
# Run Front End locally in your browser
cd diary
"Open with Live Server"
# Run server in dev environment
cd diary
cd server
npm init -y
npm install
npm run dev

```

---

## 🪒 Learnings

- For interacting with data from front end to back end, we need to configure CORS.
- I am following an SPA approach for this app. Therefore, the components are dynamically rendered.
- Display quotes from an external API.
- Chat box for interacting with an ML model

---

## 🪒 Things to Learn

✅ What Is SPA?
A Single Page Application dynamically updates the content of a single HTML page without refreshing or navigating to different files.

- Loads index.html once.
- Uses JavaScript to show/hide different "pages" (sections).
- Communicates with the backend via fetch or XMLHttpRequest.

✅ Benefits of This Approach:

- No page reloads.
- Simpler navigation experience.
- Great for small to medium projects.

🧠 Things to implement:

- Adding localStorage or sessionStorage to persist login.
- Dynamically injecting HTML with JavaScript (instead of hiding/showing).
- Using history.pushState() for URL changes without reload.

---

✅ 2. JWT Authentication Flow of Login/Sign up

- Generate tokens in backend
- Verify the token
- Return the token in cookies or headers

Sign up/Login Handler:

- Check if user exists
- If not, create and store in MongoDB
- Generate JWT and send it in cookie
- Implement middleware to protect routes

✅ 4. First-Time User Flow

- On sign up: check if email exists in DB.
- If not: create user, set JWT, redirect/render main app.

---

## 🧠 Challenges I faced while developing

Problem: I was doing this `<span id="toggletext">Don't have an account? <a href="#" id="toggleLink">Sign up</a> </span>` and modifying it with Javascript which was not preserving the link from the anchor tag. The solution is to bind the event listener in a function.

🔁 Why we Need to Rebind the Event Listener?

toggleText.innerHTML = `Already have an account? <a href="#" id="toggleLink">Login</a>`;

Replacing the entire content of the #toggletext element, including the `<a>` tag inside it. This means:

- The original `<a id="toggleLink">` is destroyed and replaced with a new one.
- JavaScript event listeners are not preserved when elements are recreated like this.
- So even though the new HTML looks the same visually, it’s a completely new DOM element without any event attached.

🔧 Rebinding Is Needed Because:

- JavaScript does not automatically attach event listeners to newly created elements. That’s why after modifying .innerHTML, you need to do this again:

`document.getElementById("toggleLink").addEventListener("click", toggleLoginSignup);`

# Microservice migration plan
https://microservices.io/refactoring/index.html

- We will follow a monolith strangle approach

