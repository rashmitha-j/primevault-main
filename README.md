# Prime Vault: Full-Stack E-Commerce Web App

A full-stack fashion e-commerce platform with customer shopping, Cash on Delivery checkout, order tracking and an admin dashboard.

**Live demo:** https://rashmitha-primevault.vercel.app

> The backend runs on Render's free tier, so the first load after a quiet period can take up to about 50 seconds.

---

## Features

**Customer**

- Register, login and logout with JWT authentication
- Browse products by Men, Women, Top Wear and Bottom Wear
- Product search and filters
- Cart with size and color selection (guest cart and logged-in cart)
- Checkout with shipping details and Cash on Delivery
- My Orders page with payment and delivery status

**Admin**

- Role-based access (customer and admin)
- Dashboard with recent orders
- Manage products (add, edit, delete)
- Manage orders and update delivery status
- Manage users and resellers

---

## Tech Stack

| Layer    | Technology                                       |
| -------- | ------------------------------------------------ |
| Frontend | React, Redux Toolkit, React Router, Tailwind CSS |
| Backend  | Node.js, Express                                 |
| Database | MongoDB Atlas, Mongoose                          |
| Auth     | JSON Web Tokens (JWT), bcrypt password hashing   |
| Hosting  | Vercel (frontend), Render (backend)              |

---

## Screenshots

Add screenshots here (home page, product page, checkout, My Orders, admin dashboard):

```
![Home](./screenshots/home.png)
![Checkout](./screenshots/checkout.png)
![Admin Dashboard](./screenshots/admin.png)
```

---

## Project Structure

```
primevault-main/
├── backend/
│   ├── data/            # Sample product data
│   ├── middleware/      # Auth and admin middleware
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── seeder.js        # Seeds admin user and sample products
│   └── server.js
└── frontend/
    └── src/
        ├── components/
        ├── pages/
        └── redux/       # Redux Toolkit slices
```

---

## Getting Started

### Prerequisites

- Node.js 18 or later
- A MongoDB Atlas database (or local MongoDB)

### 1. Clone the repository

```bash
git clone https://github.com/rashmitha-j/primevault-main.git
cd primevault-main
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create `backend/.env`:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_strong_admin_password
```

Seed the database (creates the admin user and sample products):

```bash
node seeder.js
```

> Warning: the seeder deletes all existing products each time it runs.

Start the server:

```bash
npm start
```

### 3. Frontend setup

```bash
cd ../frontend
npm install
```

Create `frontend/.env` with the URL of your backend API (use the variable name your code reads):

```
VITE_BACKEND_URL=http://localhost:9000
```

Start the app:

```bash
npm run dev
```

---

## Environment Variables

| Variable           | Where            | Purpose                          |
| ------------------ | ---------------- | -------------------------------- |
| `MONGO_URI`        | Backend          | MongoDB connection string        |
| `JWT_SECRET`       | Backend          | Secret used to sign login tokens |
| `ADMIN_EMAIL`      | Backend (seeder) | Email of the admin account       |
| `ADMIN_PASSWORD`   | Backend (seeder) | Password of the admin account    |
| `VITE_BACKEND_URL` | Frontend         | Base URL of the backend API      |

Never commit `.env` files. They are listed in `.gitignore`.

---

## Deployment

- **Frontend:** Vercel, auto-deploys from the `main` branch
- **Backend:** Render web service; set `MONGO_URI` and `JWT_SECRET` under Environment
- **Database:** MongoDB Atlas (allow network access from Render)

---

## API Overview

| Method | Endpoint                | Description                | Access  |
| ------ | ----------------------- | -------------------------- | ------- |
| POST   | `/api/users/register`   | Register a new user        | Public  |
| POST   | `/api/users/login`      | Log in and receive a token | Public  |
| GET    | `/api/users/profile`    | Get the logged-in user     | Private |
| GET    | `/api/products`         | List products              | Public  |
| GET    | `/api/orders/my-orders` | Current user's orders      | Private |
| GET    | `/api/admin/products`   | Manage products            | Admin   |
| PUT    | `/api/admin/orders/:id` | Update order status        | Admin   |

Adjust the paths above to match your route files.

---

## What I Learned

- Building JWT authentication with role-based access control
- Managing global state with Redux Toolkit
- Deploying a split frontend and backend, and configuring environment variables in production
- Debugging production issues with browser DevTools and server logs

---

## Future Improvements

- Online payments (UPI, cards)
- Email notifications for orders
- Product reviews and wishlist
- Better error messages on the register page

---

## Author

**Rashmitha J**
GitHub: [rashmitha-j](https://github.com/rashmitha-j)
