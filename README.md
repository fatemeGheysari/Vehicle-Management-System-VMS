# 🚗 Vehicle Management System (VMS)

A full-stack application to manage vehicles, owners, maintenance records, invoices, and categories — built with Node.js, MongoDB, and React.

---

## 📦 Features

- Add / Edit / Delete Vehicles  
- Categorize vehicles (e.g., car, motorcycle, truck)  
- Manage Owners / Customers  
- Record maintenance and service history  
- **Invoice Management (Bills)** with service items and total price calculation  
- Login / Authentication with JWT  
- Store and retrieve data via MongoDB  
- Protected frontend routes  
- Clean and responsive UI with TailwindCSS  
- **Unit & Integration Tests** for backend using Jest and Supertest  
- **In-memory test database** with `mongodb-memory-server`  
- **CI pipeline with GitHub Actions**  

---

## 🛠 Tech Stack

- **Frontend**: React + Vite + TailwindCSS + React Hook Form  
- **Backend**: Node.js + Express + MongoDB + Mongoose  
- **Auth**: JWT  
- **Data Storage**: MongoDB Atlas / local MongoDB  
- **Testing**: Jest, Supertest, mongodb-memory-server  
- **CI/CD**: GitHub Actions  
- **Other Tools**: Axios, React Router, dotenv, nodemon, Postman, Git  

---

## 📁 Folder Structure

```bash
VMS/
│
├── frontend/             # React frontend
│   └── src/pages         # Login, Vehicles, Maintenance, Invoices
│   └── src/components    # UI components (Form, Modal, Table)
│
├── backend/              # Express backend
│   └── models            # Mongoose schemas
│   └── controllers       # Logic for each route
│   └── routes            # REST API endpoints
│   └── tests             # Backend test cases (Jest + Supertest)
│
├── .github/workflows     # CI config (GitHub Actions)
├── seed.js               # (Optional) Initial data for DB
└── .gitignore
```

---

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
cd frontend
npm install
npm run dev
```

### 4. Create `.env` file in `/backend`

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

## ✅ Running Tests

🧪 Backend tests (Jest + Supertest + mongodb-memory-server)

```bash
cd backend
npm test
```

> All test suites run against a fast in-memory MongoDB instance (no real data affected).

---

## 🔁 CI (Continuous Integration)

GitHub Actions runs lint and test jobs automatically on every push or pull request to `main`.  
Check `.github/workflows/ci.yml` for details.

---

## 💡 Author

**Fatemeh Gheysari**  
[GitHub Profile](https://github.com/fatemeGheysari)  
[LinkedIn Profile](https://linkedin.com/in/fatemeh-gheysari)

---

## ✅ To Do / In Progress

- [x] Implement Invoice (Bill) CRUD  
- [x] Total price calculation from services  
- [x] Filter invoices by customer/vehicle  
- [x] Protect routes with JWT middleware  
- [x] Add Delete & Edit functionality to invoices  
- [x] Backend test coverage  
- [x] CI with GitHub Actions  
- [ ] Optional: Print invoice as PDF  
- [ ] Optional: Pagination & search  
