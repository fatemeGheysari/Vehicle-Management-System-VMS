# 🚗 Vehicle Management System (VMS)

A full-stack web application for managing vehicles, service history, and spare parts inventory — ideal for garages, rental agencies, or fleet managers. This project showcases my skills in full-stack development, object-oriented programming, and RESTful API design.

---

## 📦 Features

- 🔐 User registration, login & secure JWT authentication
- 🚘 Add, edit, delete, and search vehicles
- 🧰 Track service records for each vehicle
- 🔩 Manage spare parts inventory with availability status
- 📊 Dashboard with real-time summaries and visual indicators
- 👤 Role-based access control (Admin / User)
- 🧠 Clean and modern UI using React

---

## 🛠️ Tech Stack

| Frontend         | Backend         | Database | Tools                 |
|------------------|------------------|----------|------------------------|
| React, Axios     | Node.js, Express | MongoDB  | Postman, Git, JWT, dotenv |

---

## 📁 Project Structure

```
vms-project/
├── client/      # React Frontend (components, pages, services)
├── server/      # Express Backend (routes, controllers, models)
├── .env         # Environment variables
└── README.md
```

The codebase follows a modular and feature-first structure for scalability and maintainability.

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- npm
- MongoDB (local or MongoDB Atlas)

### Installation

```bash
git clone https://github.com/yourusername/vms-project.git
cd vms-project
```

#### 1. Install dependencies:

```bash
cd client
npm install

cd ../server
npm install
```

#### 2. Set up environment variables:

Create a `.env` file inside the `server/` folder with the following content:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

#### 3. Start the application:

```bash
npm run start
```

This command runs both client and server concurrently.

---

## 📸 Screenshots

> Coming soon — UI dashboard, vehicle listings, and service history views.

---

## 🧠 Core Concepts

- Object-Oriented Programming with Inheritance (Vehicles, SpareParts, Services)
- MongoDB Data Modeling & Schema Design
- Full RESTful API Structure
- Authentication & Authorization (JWT)
- React Hooks & State Management
- Separation of Concerns (Frontend/Backend)

---

## 📌 Project Status

✅ MVP (Minimum Viable Product) features implemented.  
🚧 Currently building additional modules (Admin Panel, Analytics, Notifications).

---

## 👤 Author

**Anahita [Your Last Name]**  
🌍 Full Stack Developer  
📫 [LinkedIn](https://www.linkedin.com/in/yourusername)

---

## 🤝 Contributions

This is a solo project, but collaboration ideas or code reviews are always welcome! Feel free to open an issue or submit a pull request.

---

## 📝 License

Licensed under the [MIT License](LICENSE).
