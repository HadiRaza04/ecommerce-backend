# Ecommerce Backend

## Tech Stack
- React (Vite)
- Node.js
- Express
- MongoDB


## Installation

```
git clone https://github.com/HadiRaza04/ecommerce-backend
```
Change Directory
```
cd ecommerce-backend
```
Install Packages
```
npm install
```
Run the project
```
npm run dev
```

## ⚙️ Configuration & Environment Variables

To run this project locally, you need to create a `.env` file in the root directory. This file stores sensitive information like database credentials and API keys.

### 🛠️ Setup Instructions
1. Create a file named `.env` in the root folder.
2. Copy the template below and paste it into your `.env` file.
3. Replace the placeholder values with your actual credentials.

### 📝 `.env` Template
```env
# Server Configuration
PORT=5000

# Database
# Use your MongoDB Atlas connection string or local URI
mongoDB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/dbname

# Security
SALT_ROUNDS=10
JWT_Secret=your_super_secret_random_string
JWT_EXPIRES_IN=7d

# Google OAuth (Optional for Social Login)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Stripe Payment Integration
STRIPE_SECRET_KEY=sk_test_your_key
```

## 🚀 API Endpoints Documentation

### 🔐 Authentication & User
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/signup` | Public | Register a new account |
| `POST` | `/login` | Public | User login / Get token |
| `POST` | `/google` | Public | Google OAuth Authentication |
| `POST` | `/checkout` | User/Admin | Process order checkout |
| `POST` | `/addFavourite` | User/Admin | Quick add to favorites |

### 📦 Products Management
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/products` | User/Admin | Get all available products |
| `GET` | `/products/:id` | User/Admin | Get specific product details |
| `POST` | `/products/addProduct` | Admin | Create product (Max 5 images) |
| `PUT` | `/products/updateProduct/:id` | Admin | Update product details/images |
| `DELETE` | `/products/deleteProduct/:id` | Admin | Delete a product |

### 📑 Order Management
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/orders` | User/Admin | List all orders |
| `GET` | `/orders/:id` | User/Admin | Get single order details |
| `PUT` | `/orders/editstatus` | User/Admin | Update order fulfillment status |

### ❤️ Favorites
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/favourite` | User | View your wishlist |
| `POST` | `/favourite/:productId` | User | Toggle (Add/Remove) favorite |

### 🛒 Shopping Cart
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/cart` | User | View current cart items |
| `POST` | `/cart/add` | User | Add item to cart |
| `POST` | `/cart/increase` | User | Increase item quantity |
| `POST` | `/cart/decrease` | User | Decrease item quantity |
| `POST` | `/cart/:productId` | User | Toggle item in cart |
| `DELETE` | `/cart/:productId` | User | Remove specific item |

### 💳 Wallet & Balance
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/wallet` | User | Check personal balance |
| `POST` | `/wallet` | Admin | Add funds to a user wallet |
| `GET` | `/wallet/allwallets` | Admin | View all system wallets |
| `POST` | `/wallet/decrease` | User | Deduct funds from wallet |

---

> **Note:** Most endpoints require an `Authorization` header with a valid `Bearer <token>`. Routes marked as **Admin** require a token with administrative privileges.
