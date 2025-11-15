📚 Library Management System
MERN Full Stack Project — React (Vite) + Express.js + MongoDB

A modern full-stack Library Management System with complete CRUD features, searching, filtering, sorting, and dark/light mode.
This project is built and maintained in the repository:
👉 https://github.com/emran692/library-management

🚀 Features
⭐ Frontend (React + Vite)

Add new books

Edit/update existing books

Delete books

Search (title, author, ISBN)

Filter by category

Sort by title, author, year

Dark/Light mode toggle (saved in browser)

Responsive UI

Axios for API communication

⭐ Backend (Express + MongoDB)

RESTful CRUD API

MongoDB Atlas cloud database

Search + filters + sorting

Unique category generation

Mongoose models

CORS enabled

Environment variables support (.env)

🗂 Project Structure
library-management/
│
├── backend/
│   ├── models/
│   │   └── Book.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── src/
│   ├── components/
│   │   └── Library.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
│
├── index.html
├── vite.config.js
└── package.json

🛠️ Tech Stack
Frontend

React (Vite)

JavaScript ES6+

Axios

CSS

Backend

Node.js

Express.js

MongoDB Atlas

Mongoose

CORS

dotenv

🔧 Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/emran692/library-management.git
cd library-management

2️⃣ Backend Setup
cd backend
npm install


Create .env inside backend:

MONGO_URI=your_mongodb_connection_url
PORT=5000


Run backend:

node server.js


You should see:

MongoDB Connected
Server running on port 5000

3️⃣ Frontend Setup
cd ..
npm install
npm run dev


Visit:

👉 http://localhost:5173/

🔌 API Endpoints
Get all books
GET /api/books

Add book
POST /api/books


Example:

{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "category": "Programming",
  "year": 2008
}

Update book
PUT /api/books/:id

Delete book
DELETE /api/books/:id

Get categories
GET /api/categories

🎨 UI Features

Add/Edit/Delete Books

Search by Title/Author/ISBN

Category filter

Sorting options

Clean responsive layout

Dark/Light mode toggle

Smooth user experience

🛡 Environment Variables (backend/.env)
MONGO_URI=your_atlas_url_here
PORT=5000


❗ Do NOT push .env to GitHub

📦 Recommended GitHub Topics
mern
react
vite
express
mongodb
mongoose
rest-api
library-management
fullstack
javascript
