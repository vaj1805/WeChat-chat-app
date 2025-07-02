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
