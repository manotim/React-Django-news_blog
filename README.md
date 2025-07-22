# 📰 React News App (Frontend)

This is a frontend React application for a simple **News Portal** where users can:
- View news articles
- Read full news details
- Like and comment on posts (authentication required)
- Register and log in using token-based authentication

This app is built using **React + Tailwind CSS**, and connects to a Django REST API backend.

---

## 🚀 Live Features

- 🔐 Authentication with JWT (login, register)
- 🗞 View news headlines, details, and breaking stories
- ❤️ Like posts (requires login)
- 💬 Comment on posts (requires login)
- 🎯 Responsive UI with Tailwind CSS

---

## 📦 Installation Guide

### 1. 🧾 Clone the Repository

Open your terminal and run:

```bash
git clone https://github.com/YOUR_USERNAME/react-news-app.git
cd react-news-app

2. 📁 Install Dependencies
Ensure you have Node.js and npm installed. Then run:

bash

npm install
This will install all required packages like:

react

react-router-dom

axios

tailwindcss

postcss

autoprefixer

3. ⚙️ Set Up Tailwind (if not already initialized)
If this isn’t done yet:

bash

npx tailwindcss init -p
Then update your tailwind.config.js:

js

content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],
And in src/index.css or src/main.css, add:

css

@tailwind base;
@tailwind components;
@tailwind utilities;
4. 🔧 Configure the Backend API URL
Edit the file: src/services/api.js

js

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api", // 🔁 change if your backend runs elsewhere
});

export default api;
Make sure your Django backend has the following endpoints:

POST /auth/register/ – for new users

POST /auth/token/ – to login and receive JWT

GET /news/ – list of news

GET /news/:slug/ – details

POST /news/:slug/comments/

POST /news/:slug/like/

5. ✅ Run the Application
bash

npm run dev
You should see something like:

arduino

VITE v5.0.0  ready in 300ms

  ➜  Local:   http://localhost:5173/
Click the link in the terminal or visit http://localhost:5173 in your browser.

📁 Project Structure
css

src/
├── components/
│   └── Home.jsx
│   └── NewsDetail.jsx
│   └── Login.jsx
│   └── Register.jsx
├── services/
│   └── api.js
├── App.jsx
├── main.jsx
└── index.css
👤 Authentication
This app uses JWT tokens for login:

Token is stored in localStorage

Used for Authorization: Bearer <token> on protected routes (like comment or like)

🛠️ Scripts
Command	Action
npm install	Install dependencies
npm run dev	Run dev server on localhost:5173
npm run build	Build for production