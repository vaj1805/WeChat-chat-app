# WeChat Chat App

A real-time chat application built with the MERN stack—MongoDB, Express, React, Node.js—and Socket.IO for fast, scalable messaging.

Live Demo: [wechat-chat-app.onrender.com](https://wechat-chat-app.onrender.com)

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Prerequisites](#prerequisites)  
- [Getting Started](#getting-started)  
  - [Clone the Repo](#clone-the-repo)  
  - [Environment Variables](#environment-variables)  
  - [Install & Run (Development)](#install--run-development)  
  - [Build & Run (Production)](#build--run-production)  
- [Folder Structure](#folder-structure)  
- [API Endpoints](#api-endpoints)  
- [Contributing](#contributing)  
- [License](#license)  

---

## Features

- 🚀 **Real-Time Messaging** via Socket.IO  
- 🔒 **JWT-Based Authentication** (signup, login, protected routes)  
- 👥 **Online Presence** (track who’s online/offline)  
- 🗄️ **MongoDB Atlas**-backed storage for users & messages  
- 💨 **High Throughput** (designed to handle thousands of messages/sec)  
- 🎨 **Modern UI** with Tailwind CSS & daisyUI  

---

## Tech Stack

| Layer        | Technology                              |
| ------------ | ---------------------------------------- |
| **Frontend** | React, React Router, Zustand, Socket.IO Client, axios, Tailwind CSS, daisyUI |
| **Backend**  | Node.js, Express, Socket.IO Server, Mongoose (MongoDB) |
| **Auth**     | JSON Web Tokens (JWT)                   |
| **DB**       | MongoDB Atlas (Cloud)                   |

---

## Prerequisites

- **Node.js** ≥ v16  
- **npm** ≥ v8  
- **MongoDB Atlas** account (or local MongoDB instance)  

---

## Getting Started

### Clone the Repo

```bash
git clone https://github.com/vaj1805/WeChat-chat-app.git
cd WeChat-chat-app

Environment Variables
Create a .env file in both the backend/ and frontend/ folders.

backend/.env
ini
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
frontend/.env
ini
Copy
Edit
REACT_APP_API_URL=http://localhost:5000
Tip: If you deploy backend and frontend separately (e.g. Render, Vercel), update REACT_APP_API_URL to your deployed backend URL.

Install & Run (Development)
bash
Copy
Edit
# Backend
cd backend
npm install
npm run dev         # starts Express + Socket.IO server (e.g. with nodemon)

# In a separate terminal: Frontend
cd ../frontend
npm install
npm start           # starts React development server
Open your browser at http://localhost:3000 and you’re live!

Build & Run (Production)
From the project root:

bash
Copy
Edit
npm run build       # installs both backend & frontend, builds frontend
npm start           # launches the backend (which serves the built frontend)
Your production build will be served from Express on the port you set in backend/.env.

Folder Structure
bash
Copy
Edit
WeChat-chat-app/
│
├── backend/                # Express + Socket.IO server
│   ├── controllers/        # Route handlers
│   ├── models/             # Mongoose schemas (User, Message)
│   ├── routes/             # API & auth routes
│   ├── middleware/         # Auth, error handling
│   ├── utils/              # Helper functions (e.g. JWT)
│   ├── server.js           # Entry point
│   └── .env                # Environment variables
│
├── frontend/               # React client
│   ├── src/
│   │   ├── components/     # Shared UI components
│   │   ├── context/        # Zustand stores
│   │   ├── pages/          # Login, Signup, Chat pages
│   │   ├── services/       # axios & socket.io-client setup
│   │   ├── App.jsx         # Routes & layout
│   │   └── index.css       # Tailwind + daisyUI imports
│   └── .env                # REACT_APP_API_URL, etc.
│
├── package.json            # Root scripts for build & start
├── README.md               # (this file)
└── .gitignore

