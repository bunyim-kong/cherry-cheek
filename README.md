# Cherry Cheek

## About the Project
Cherry Cheek is an e-commerce website.


## Technologies Used
- React
- JavaScript
- CSS

## Project structure
``` text
cherry-cheek/
├── public/
│   ├── images/
│   │   ├── categories/       # Category images
│   │   └── products/         # Product images
│   └── student-data/         # Sample JSON data
├── src/
│   ├── assets/               # Images used in the app
│   ├── components/
│   │   └── admin/            # Reusable admin components
│   ├── context/              # Authentication and cart state
│   ├── data/                 # Product data module
│   ├── layouts/              # Customer and admin layouts
│   ├── pages/
│   │   ├── admin/            # Dashboard, products, categories, orders, customers
│   │   └── user/             # Shop, product, cart, checkout, account, and other pages
│   ├── service/              # Browser storage helpers
│   ├── styles/               # Global styles
│   ├── App.jsx               # Routes
│   └── main.jsx              # App entry point
├── Dockerfile
├── compose.yaml
├── package.json
└── vite.config.js
```
## Features

Cherry Cheek includes 15 feature groups: 10 for customers and 5 for admins.

### User Features

1. Browse products and categories
2. Search, filter, and sort products
3. View product details and related products
4. Register, sign in, and sign out
5. Add items to a cart and change quantities
6. Enter delivery details at checkout and choose card or QR payment
7. Use your location to help fill in a delivery address
8. View order history in your profile
9. Use the contact form
10. Read the About and Our Story pages


### Admin Features

1. View dashboard statistics and recent orders
2. Add, edit, delete, and search products
3. Add, edit, delete, and search categories
4. View and search orders
5. View and search customers


## Installation

1. Install Node.js and npm.

2. Create a React project using Vite:

   ```bash
   npm create vite@latest my-react-app
   ```

3. Open the project folder:

   ```bash
   cd my-react-app
   ```

4. Install dependencies:

   ```bash
   npm install
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open the local URL shown in the terminal:

   http://localhost:5173

## Team Members


| Name | Contribution |
|---|---|
| SOMNANG Dara | Admin side |
| Dalin | Register, Add to bag, and product detail |
| KONG Bunyim | User side |