# 🚗 Vehicle Management System (VMS)

A full-stack application to manage vehicles, owners, maintenance records, and categories — built with Node.js, MongoDB, and React.

## 📦 Features

- Add / Edit / Delete Vehicles
- Categorize vehicles (e.g., car, motorcycle, truck)
- Manage Owners / Customers
- Record maintenance and service history
- Login / Authentication with JWT
- Store and retrieve data via MongoDB
- Protected frontend routes
- Clean and responsive UI with TailwindCSS

## 🛠 Tech Stack

- **Frontend**: React + Vite + TailwindCSS
- **Backend**: Node.js + Express + MongoDB + Mongoose
- **Auth**: JWT
- **Data Storage**: MongoDB Atlas / local MongoDB
- **Other Tools**: Axios, React Router, dotenv, nodemon, Postman, Git

## 📁 Folder Structure

```
VMS/
│
├── frontend/             # React frontend
│   └── src/pages         # Login, Vehicles, Maintenance
│   └── src/components    # Modal components, lists
│
├── backend/              # Express backend
│   └── src/models        # Mongoose schemas
│   └── src/controllers   # Logic for each route
│   └── src/routes        # REST API endpoints
│
├── seed.js               # (Optional) Initial data for DB
└── .gitignore
```

## ▶️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/fatemeGheysari/vms-project.git
cd vms-project
```

### 2. Setup backend

```bash
cd backend
npm install
npm run dev
```

### 3. Setup frontend

```bash
cd ../frontend
npm install
npm run dev
```

### 4. Create `.env` file in `/backend`:

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

## 💡 Author

Fatemeh Gheysari  
[GitHub Profile](https://github.com/fatemeGheysari)

## To Do List
- **bill issue**: user can add service and see the total price 