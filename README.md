# Cherry Cheeks

### A modern beauty storefront and administration dashboard

A responsive React application for discovering beauty products, managing a shopping cart, placing demo orders, and maintaining a storefront catalog.

[Getting Started](#getting-started) · [Features](#features) · [Project Structure](#project-structure) · [Docker](#run-with-docker)

## About the Project

Cherry Cheeks is a front-end e-commerce experience focused on skincare and beauty products. It combines a polished customer storefront with a dedicated admin area for viewing store activity and managing catalog data.

The project uses local JSON fixtures for its catalog and account data, while authentication, cart contents, and placed orders are stored in the browser with `localStorage`. No external API or database is required.

## Features

### Customer Storefront

- Responsive landing page with featured categories and product collections
- Product search, category filters, and price or stock sorting
- Product detail pages with stock-aware cart controls
- Customer registration and demo sign-in
- Persistent shopping cart with quantity management
- Checkout flow and customer order history
- About, story, and contact pages

### Admin Dashboard

- Revenue, paid-order, item-sales, and low-stock summaries
- Recent orders, complete order list, and customer directory
- Searchable product and category tables
- Product and category create, edit, and delete interactions
- Responsive navigation and reusable admin UI components

> [!NOTE]
> Product and category changes in the admin area are demonstration-only and reset when the page is refreshed. Cart, session, and newly placed order data persist in the current browser.

## Built With

- [React 19](https://react.dev/)
- [Vite 8](https://vite.dev/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/)
- CSS organized by page and component
- Docker and Docker Compose

## Getting Started

### Prerequisites

Install the following tools before running the project:

- [Node.js](https://nodejs.org/) 24 or later (recommended)
- npm (included with Node.js)

### Installation

1. Clone the repository and enter the project directory.

   ```bash
   git clone <repository-url>
   cd cherry-cheek
   ```

2. Install the dependencies.

   ```bash
   npm ci
   ```

3. Start the development server.

   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Demo Accounts

Use any password containing at least six characters. Authentication is simulated locally for demonstration purposes.

| Role | Email | Example password |
| --- | --- | --- |
| Administrator | `avery@example.com` | `cherry123` |
| Customer | `nora@example.com` | `cherry123` |

The administrator account redirects to `/admin/dashboard`. Customer accounts return to the storefront.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create an optimized production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Check the source code with ESLint |

## Run with Docker

Build and start the development container with Docker Compose:

```bash
docker compose up --build
```

The application will be available at [http://localhost:5173](http://localhost:5173). Source files are mounted into the container, so local changes are reflected by the development server.

To stop the container, press `Ctrl+C`, then run:

```bash
docker compose down
```

## Project Structure

```text
cherry-cheek/
├── public/
│   ├── images/             # Product and category images
│   └── student-data/       # Static JSON fixtures
├── src/
│   ├── assets/             # Bundled page imagery
│   ├── components/         # Shared storefront components
│   │   └── admin/          # Reusable admin components
│   ├── context/            # Authentication and cart state
│   ├── data/               # Local application data
│   ├── layouts/            # Customer and admin layouts
│   ├── pages/
│   │   ├── admin/          # Dashboard and management pages
│   │   └── user/           # Storefront and account pages
│   ├── service/            # Browser storage helpers
│   ├── styles/             # Global styles
│   ├── App.jsx             # Application routes
│   └── main.jsx            # React entry point and providers
├── compose.yaml
├── Dockerfile
├── package.json
└── vite.config.js
```

## Application Data

The seed catalog and admin reporting data live in `public/student-data/`:

- `products.json` and `categories.json` provide the storefront catalog.
- `accounts.json` provides demo user roles and account status.
- `invoices.json` powers order and dashboard reporting.
- `carts.json`, `suppliers.json`, and `stock-receipts.json` provide additional sample commerce data for future features.

Browser-managed state uses the `cc_user`, `cc_cart`, and `cc_orders` local storage keys. Clear the site's browser storage to reset this state.

## Production Build

Create and preview a production build locally:

```bash
npm run build
npm run preview
```

The generated static assets are written to `dist/`. When deploying, configure the web server to fall back to `index.html` so client-side routes work when opened directly.

## Contributing

1. Create a feature branch from the main development branch.
2. Make focused changes and follow the existing component conventions.
3. Run `npm run lint` and `npm run build` before submitting your changes.
4. Open a pull request with a clear description and screenshots for visual updates.

## License

No license has been specified for this project. All rights are reserved by the project owner.
