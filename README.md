# PrimeVault

PrimeVault is a full-stack e-commerce web application for browsing and purchasing apparel (t-shirts and clothing collections for men and women), with a dedicated admin panel for managing products, orders, and resellers.

## Features

- Browse men's and women's clothing collections
- Add items to cart and complete checkout
- User authentication (sign up / login)
- Order tracking and history
- Reseller and subscriber management
- Admin dashboard to manage products, orders, and resellers

## Tech Stack

**Frontend**

- React (Vite)
- Redux Toolkit for state management
- Tailwind CSS for styling

**Backend**

- Node.js + Express
- MongoDB (Mongoose models for Users, Products, Orders, Cart, Checkout, Resellers, Subscribers)
- JWT-based authentication middleware

**Deployment**

- Vercel

## Project Structure

primevault-main/
├── backend/
│ ├── config/ # Database configuration
│ ├── data/ # Seed/sample data
│ ├── middleware/ # Auth middleware
│ ├── models/ # Mongoose models (User, Product, Order, Cart, etc.)
│ └── ...
├── frontend/
│ ├── src/
│ │ ├── public/assets/ # Product images, brand assets
│ │ ├── redux/slices/ # Redux slices (auth, cart, checkout, orders, products, admin)
│ │ └── ...
│ ├── tailwind.config.js
│ └── vite.config.js
└── package.json

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB instance (local or cloud, e.g. MongoDB Atlas)

### Installation

1. Clone the repository

```bash
   git clone <your-repo-url>
   cd primevault-main
```

2. Install dependencies for both frontend and backend

```bash
   cd backend
   npm install

   cd ../frontend
   npm install
```

3. Set up environment variables
   Create a `.env` file in both `backend/` and `frontend/` with the required variables (e.g. database connection string, JWT secret).

4. Run the backend

```bash
   cd backend
   npm start
```

5. Run the frontend

```bash
   cd frontend
   npm run dev
```
