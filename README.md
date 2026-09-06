<h1 align="center">💠 ResumeForge</h1>

<p align="center">
  <b>An AI-powered interview preparation platform built on the MERN stack.</b><br>
  ResumeForge analyzes your current skills against job requirements and generates structured, actionable insights to help you land your target role.
</p>

<br/>

## 🌐 Live Deployment
Check out the live application here: **[https://resumeforge-6d65.onrender.com](https://resumeforge-6d65.onrender.com/)**

> **⚠️ Note:** This project is deployed using Render's free tier. The server spins down after periods of inactivity, so it may take **30 to 60 seconds** for the initial load. Please be patient!

<br/>

## 📸 Preview
<img src="https://github.com/user-attachments/assets/06e2f37d-a23d-45a6-b3d0-7d0fc744b66b" alt="ResumeForge Preview" width="100%">

<br/>
<br/>

## ✨ Key Features
- **🤖 AI-Powered Profiling:** Get highly accurate reports by comparing your Resume and Self-Description against a target Job Description.
- **📊 Structured AI Reports:** Generate a Match Score (0-100), identify Skill Gaps, review tailored Interview Questions, and follow a Day-wise Preparation Plan.
- **🎨 Modern UI & Animations:** A fully responsive, modern design built with **Tailwind CSS v4** and fluid micro-interactions using **Framer Motion**.
- **🔐 Secure Authentication:** Features OTP-based email verification via EmailJS and dual-token security (Access/Refresh).

## 🛡️ Security
- **Hashing:** Passwords are securely hashed with `bcrypt`.
- **Access Tokens:** Sent securely through the `Authorization` header.
- **Refresh Tokens:** Stored safely in HTTP-only cookies to prevent cross-site scripting (XSS).
- **Session Control:** Sessions can be revoked per device when (*User Logout from current device*) and can be revoked across all devices when (*User Logout from all Devices*).

## ⚙️ Tech Stack
- **Frontend:** ⚛️ React 19, ⚡ Vite, 🛣️ React Router, 🌬️ Tailwind CSS v4, 🎬 Motion, 🌐 Axios
- **Backend:** 🟢 Node.js, 🚂 Express.js, 🍃 MongoDB (Mongoose)
- **AI & Tools:** 🧠 Google Gemini AI, 🛡️ Zod (Schema Validation), 📧 EmailJS, 📄 `pdf-parse`

## 🏗️ Architecture & Structure
- **Frontend Architecture:** Clean feature-based design divided into **UI**, **Hooks**, **State**, and **API** layers.
- **Backend Architecture:** Built on a feature-based architecture where each feature has its own dedicated route, model, controller, middleware, and services files.

### Project Structure
```
ResumeForge/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── src/
│       ├── app.js
│       ├── Configuration/
│       │    ├── DB.config/
│       │    └── Env.config/
│       └── feature/
│           ├── AiFeature/
│           └── AuthFeature/
└── frontend/
    ├── package.json
    └── src/
        ├── App.jsx
        ├── routes/
        ├── features/
        │   ├── auth/
        │   └── GemmiAi/
        └── LandingPage/
```
## 🚀 Getting Started

### 1. Prerequisites
- Node.js v22 or newer
- MongoDB Atlas Connection URL
- Google Gemini API Key
- EmailJS Credentials (Service ID, Template ID, Keys)
- Jwt secret key 

### 2. Installation
```bash
git clone <repository-url>
cd ResumeForge

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd frontend
npm install
```

### 3. Environment Variables
Create `.env` files in both directories:

**`backend/.env`**
```env
PORT= (if you dont Provide any it run on 8000) 
MONGODB_CONN_STR=your_mongodb_atlas_connection_url
JWT_SECRET=your_jwt_secret_key 
GEMINI_AI_API_KEY=your_gemini_api_key
EMAILJS_SERVICE_ID=your_service_id
EMAILJS_TEMPLATE_ID=your_template_id
EMAILJS_PUBLIC_KEY=your_public_key
EMAILJS_PRIVATE_KEY=your_private_key
LOCAL_CLIENT_URL=http://localhost:5173 (Add Your Frontend Url)
```

**`frontend/.env`**
```env
VITE_SERVER_URL=http://localhost:8000/api (Add Your Backend Url with /api in the end of url )
```

### 4. Running the App
Start the backend and frontend servers in separate terminals:
```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
cd frontend
npm run dev
```

---

## 📡 API Reference

### 🔑 Authentication
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register a new user |
| `PATCH` | `/api/auth/verify-email` | Verify email with OTP |
| `POST` | `/api/auth/resendOtp` | Resend OTP |
| `POST` | `/api/auth/login` | Log in |
| `POST` | `/api/auth/logout` | Log out from current device |
| `POST` | `/api/auth/logout-alldevices` | Log out from all devices |
| `POST` | `/api/auth/refreshtoken` | Refresh the access token |
| `GET` | `/api/auth/getme` | Get authenticated user |

### 🧠 AI Reports
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/aiservice/create-report` | Generate an AI interview report |
| `GET` | `/api/aiservice/getallreport` | Get all user reports |
| `GET` | `/api/aiservice/getreport/:id` | Get report by ID |
| `DELETE` | `/api/aiservice/getallreport` | Delete a report |

### 💬 Feedback
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/contactus` | Submit user feedback |

---

<p align="center">
  <i>"Success is where preparation and opportunity meet."</i><br>
  <b>— Forge your path, bridge the skill gap, and land your dream role with ResumeForge.</b>
</p>
