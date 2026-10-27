# 🌱 AgriTech - Smart Agriculture Platform

A full-stack web application designed to empower farmers and agricultural enthusiasts with modern digital tools, crop advisory, farm discovery, and an agricultural marketplace.

---

## 🚀 Features

- **🌾 Crop Information & Advisory:** Detailed insights, growth requirements, and farming recommendations for various crops.
- **🚜 Farm Listings & Bookings:** Explore agricultural farms and manage farm visit bookings seamlessly.
- **🛒 Agri-Marketplace:** Browse, list, and order agricultural products, seeds, and equipment.
- **👥 User Authentication:** Secure registration and login for users with role-based access.
- **🛠️ Admin Dashboard:** Comprehensive admin panel to view platform analytics, manage users, and monitor products.

---

## 💻 Tech Stack

### **Frontend**
- **Framework:** React + Vite
- **Routing:** React Router DOM
- **HTTP Client:** Axios
- **Styling:** CSS3 (Modern Responsive UI)

### **Backend**
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB Atlas (via Mongoose)
- **Authentication:** JWT (JSON Web Tokens) & bcryptjs

---

## 📂 Project Structure

```text
Agritech/
├── client/          # React Vite frontend
│   ├── src/
│   │   ├── components/  # Navbars and reusable UI
│   │   ├── pages/       # Admin & User views
│   │   └── lib/         # Axios API client setup
│   └── package.json
└── server/          # Node.js Express backend
    ├── controllers/ # Request handlers
    ├── models/      # Mongoose schemas (User, Farm, Crop, Product, Admin, Booking)
    ├── routes/      # Express API endpoints
    ├── middleware/  # JWT authentication middlewares
    └── index.js     # Server entry point
```

---

## ⚡ Getting Started

### 1. Prerequisites
- Node.js (v18+)
- MongoDB Atlas database URI

### 2. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file in `server/` with the following variables:
```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Run the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev
```

The application will be accessible at `http://localhost:5173` and connected to the backend on `http://localhost:8000`.

---

## 📄 License
This project is open-source and available under the [ISC License](LICENSE).
