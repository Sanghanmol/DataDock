# 🔍✨ DataDock - API-Driven Mini Web App  

🚀 A modern **full-stack app** built with **MERN (MongoDB, Express, React, Node.js) + Vite + MUI**.  
Users can search GitHub repositories by keyword, store the results in a database, and view them on a paginated dashboard.

---

## ✅ Features  

- 🔎 **Search GitHub repositories** by keyword  
- 💾 **Store search results** in MongoDB  
- 🗂️ **Paginated dashboard** to browse stored results  
- ⚡ **API error handling** for smooth UX  
- 🎨 **Clean, responsive UI** using MUI components

---

## 🛠️ Technologies Used  

| Component        | Technology          | Purpose                                     |
|------------------|-------------------|---------------------------------------------|
| 🧠 Backend       | Node.js + Express  | API creation, GitHub fetch, database logic  |
| 💾 Database      | MongoDB           | Store search results and metadata           |
| 🖥️ Frontend      | React + Vite + MUI | UI, dashboard, search form                  |
| 🔗 HTTP Requests | Axios             | Communicate between frontend & backend     |
| 🔐 Auth (optional)| GitHub Token      | Increase API rate limit for GitHub requests|

---

## 🏗️ Architecture & Design Choices  

- **Decoupled Frontend & Backend**  
  - `frontend/` – React + Vite app for UI  
  - `backend/` – Node.js + Express REST API  
- **Database Storage** – MongoDB stores fetched GitHub repos  
- **Async Error Handling** – `asyncHandler` wraps all async routes  
- **Pagination** – Server-side pagination for dashboard  
- **Reusable Components** – `SearchForm`, `ResultsTable`, `Pager` , `DetailPage` 

---

## 🔍 How It Works – User Journey  

1. 🔑 **Enter a Keyword** – Use search form to query GitHub repositories  
2. 🌐 **Fetch Data** – Backend fetches results from GitHub API  
3. 💾 **Store Results** – Save results in MongoDB  
4. 🗂️ **View Dashboard** – Display stored results with pagination  
5. ⚡ **Handle Errors** – API errors shown gracefully to user  

---

## ⚙️ Setup Instructions  

### 🔹 1️⃣ Backend Setup  

1. Go to backend folder:
- cd backend

2. Install dependencies:
- npm install

3.Create .env file (example):
- PORT=5000
- MONGODB_URI
- CORS_ORIGIN=http://localhost:5173

4. Start development server:
- npm run dev

### 🔹 2️⃣ Frontend Setup

1. Go to frontend folder:
- cd frontend

2. Install dependencies:
- npm install

3. Start development server:
- npm run dev
- Access the app at: http://localhost:5173

---

🙏 Acknowledgment

Made with ❤️ using MERN, Vite, and MUI, demonstrating a full-stack mini app with API integration, database storage, and a clean dashboard.

---