# ClickShop — Full-Stack E-Commerce Platform

```
 ______ _ _      _        _                 
/  ____| (_)    | |      | |                
| |    | |_  ___| | _____| |__   ___  _ __  
| |    | | |/ __| |/ / __| '_ \ / _ \| '_ \ 
| |____| | | (__|   <\__ \ | | | (_) | |_) |
\______|_|_|\___|_|\_\___/_| |_|\___/| .__/ 
                                     | |    
                                     |_|    
```

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x%20%2F%206.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon%20Serverless-4169E1?logo=postgresql&logoColor=white)](https://neon.tech/)
[![Prisma](https://img.shields.io/badge/Prisma-6.x-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Stripe](https://img.shields.io/badge/Stripe-API%20%26%20Webhooks-635BFF?logo=stripe&logoColor=white)](https://stripe.com/)
[![License](https://img.shields.io/badge/License-ISC-green.svg)](LICENSE)

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Repository Structure](#-repository-structure)
- [Database Schema & Models](#-database-schema--models)
- [API Reference](#-api-reference)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [1. Clone Repository](#1-clone-repository)
  - [2. Backend Setup](#2-backend-setup)
  - [3. Frontend Setup](#3-frontend-setup)
  - [4. Stripe Webhook Tunneling](#4-stripe-webhook-tunneling-local-dev)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [Deployment](#-deployment)
- [Author & License](#-author--license)

---

## 🌟 Overview

**ClickShop** is an enterprise-ready, high-performance, full-stack e-commerce web platform. Architected with modern web technologies, it features a responsive **React 19** frontend powered by **Vite** and **Material UI**, coupled with a robust, type-safe **Express.js + TypeScript** backend communicating with a **PostgreSQL** database through **Prisma ORM**.

The platform provides end-to-end shopping experiences: rich category exploration, product catalog filtering, cart persistence, multi-address management, dynamic order tracking, automated database seeding GUI, and seamless payment flows integrating **Stripe Checkout** with cryptographic webhook event reconciliation.

---

## ✨ Key Features

### 🔐 Authentication & Identity
- **Dual Authentication Modes**: Traditional Email/Password authentication and one-tap **Google OAuth 2.0**.
- **Secure Token Architecture**: Signed JSON Web Tokens (JWT) with HTTP cookie / session support.
- **Role-Based Access Control (RBAC)**: Database-driven `Role`, `Permission`, `UserRole`, and `RolePermission` models for administrative permission checks.
- **Profile Management**: Profile viewing, address management, and session state persistence via Redux Persist.

### 🛍️ Product Catalog & Navigation
- **Taxonomy Hierarchy**: Multi-tier Categories and Subcategories with cascading relationships.
- **Rich Product Information**: Native PostgreSQL array support for multi-image galleries, dynamic JSON specifications, stock count, and price comparisons (Base Price vs. Sale Price).
- **Search & Filter Engine**: Categorized filtering, brand selection, pagination, and sorting.

### 🛒 Shopping Cart & Checkout
- **Persistent Cloud Cart**: Cart items stored in PostgreSQL, ensuring cart synchronization across devices.
- **Real-Time Inventory Safeguards**: Dynamic quantity adjustments and sold price verification against stock limits.
- **Address Book**: User shipping address management with type classification (`HOME`, `WORK`, `OTHER`) and primary address designation.

### 💳 Payments & Order Fulfillment
- **Stripe Checkout Integration**: Seamless hosted checkout redirection with unique session IDs.
- **Resilient Webhook Processing**: Dedicated raw-body `/api/payment/webhook` handler verifying cryptographic Stripe signatures (`stripe.webhooks.constructEvent`), reconciling payments asynchronously.
- **Multiple Payment Modes**: Support for both `ONLINE` (Stripe) and `COD` (Cash on Delivery).
- **Snapshot Order Items**: Captures frozen product snapshots at checkout time to preserve pricing and product state even if catalog items are later modified or removed.

### 🌱 Developer & Admin Tools
- **Web Seeding Portal**: Visual administrative interface at `/seed` to rapidly seed categories, subcategories, and complex products with image URLs and JSON specs.
- **Custom Backend Middlewares**:
  - `BotGuard`: Automated bot and scraper traffic detection.
  - `PayloadValidator` & `BodyTrimmer`: Request payload validation and string sanitization.
  - `Context`: Standardized request lifecycle and enriched response wrappers (`sendOk`, `sendError`).
  - `Maintenance`: Configurable maintenance mode toggle.
- **Structured Logging**: Built-in `LogManager` tracking diagnostics, HTTP requests, and deployment notes.

---

## 🛠️ Tech Stack

### Frontend (`client/`)
| Layer | Technologies |
| :--- | :--- |
| **Framework & Core** | [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/) |
| **UI & Component System** | [Material UI (MUI v7)](https://mui.com/), [Radix UI Primitives](https://www.radix-ui.com/), [Emotion](https://emotion.sh/) |
| **Styling** | Vanilla CSS, [Sass (SCSS)](https://sass-lang.com/), [Lucide React](https://lucide.dev/), [React Icons](https://react-icons.github.io/react-icons/) |
| **State Management** | [Redux Toolkit](https://redux-toolkit.js.org/), [Redux Persist](https://github.com/rt2zz/redux-persist), [Zustand](https://zustand-demo.pmnd.rs/) |
| **Data Fetching** | [TanStack React Query v5](https://tanstack.com/query/latest) |
| **Routing** | [React Router DOM v7](https://reactrouter.com/) |
| **Forms & Feedback** | [React Hook Form](https://react-hook-form.com/), [React Hot Toast](https://react-hot-toast.com/) |
| **OAuth & Media** | [@react-oauth/google](https://www.npmjs.com/package/@react-oauth/google), [Lottie Player](https://lottiefiles.com/) |

### Backend (`server/`)
| Layer | Technologies |
| :--- | :--- |
| **Runtime & Server** | [Node.js](https://nodejs.org/) (ESNext / TypeScript), [Express.js](https://expressjs.com/) |
| **Database & ORM** | [PostgreSQL (Neon Serverless)](https://neon.tech/), [Prisma ORM v6](https://www.prisma.io/) |
| **Authentication** | [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken), [google-auth-library](https://github.com/googleapis/google-auth-library-nodejs), [speakeasy](https://github.com/speakeasyjs/speakeasy) |
| **Payment Gateway** | [Stripe SDK](https://stripe.com/docs/api) |
| **Security & Middlewares** | CORS, Express Session, User-Agent Parser, Custom BotGuard, Payload Sanitizer |
| **Utilities & Bundling** | [esbuild](https://esbuild.github.io/), [ts-node-dev](https://github.com/wclr/ts-node-dev), [node-cron](https://github.com/node-cron/node-cron), [nodemailer](https://nodemailer.com/), [puppeteer](https://pptr.dev/) |

---

## 🏗️ System Architecture

```
                  +----------------------------------------------+
                  |               Client (React 19)             |
                  |     MUI Components + Redux Toolkit Store     |
                  +----------------------------------------------+
                                  |              ^
                        REST APIs |              | Reactive UI Updates
                                  v              |
+--------------------------------------------------------------------------------+
|                            Backend (Express.js)                                |
|                                                                                |
|  [Security Middlewares] -> BotGuard | AllowOrigin | Context | PayloadValidator  |
|                                                                                |
|  [API Routes]                                                                  |
|   ├── /api/auth          --> Auth Controller (JWT / Google OAuth)              |
|   ├── /api/category      --> Category Controller                               |
|   ├── /api/subcategory   --> Subcategory Controller                            |
|   ├── /api/product       --> Product Controller (Search & Brand Filter)        |
|   ├── /api/cart-item     --> Cart Controller (Live Inventory Validation)       |
|   ├── /api/address       --> User Address Controller                           |
|   ├── /api/order         --> Order Controller (Stripe Session Checkout)       |
|   └── /api/payment       --> Stripe Webhook Receiver (Raw Signature Verified)  |
|                                                                                |
|  [DAO & ORM Layer]       --> Prisma Client 6 (BaseDao Abstraction)             |
+--------------------------------------------------------------------------------+
                                  |              ^
                       SQL Queries|              | Result Sets
                                  v              |
                  +----------------------------------------------+
                  |          Neon PostgreSQL Database           |
                  |  Relational schema with cascade constraints  |
                  +----------------------------------------------+
```

---

## 📁 Repository Structure

```text
ClickShop/
├── client/                       # Frontend application (React 19 + TypeScript + Vite)
│   ├── public/                   # Static browser assets
│   ├── src/
│   │   ├── Components/           # Reusable UI components
│   │   │   ├── Appbar.tsx        # Responsive navigation and header
│   │   │   ├── Banners/          # Promotional hero carousels
│   │   │   ├── Categories/       # Category navigation cards
│   │   │   ├── Products/         # Product card and grid displays
│   │   │   └── FilterSidebar.tsx # Attribute filtering sidebar
│   │   ├── Routes/               # Top-level view routes
│   │   │   ├── Home.tsx          # Storefront landing page
│   │   │   ├── ProductsRoute.tsx # Search and browse catalog
│   │   │   ├── ProductDetails.tsx# Single item details and gallery
│   │   │   ├── Cart.tsx          # Dynamic shopping cart
│   │   │   ├── Payment.tsx       # Address selector and checkout
│   │   │   ├── PaymentSuccess.tsx# Stripe payment confirmation
│   │   │   ├── PaymentCancel.tsx # Stripe payment cancelled fallback
│   │   │   ├── Profile.tsx       # User account and order history
│   │   │   ├── Register.tsx      # Sign-up interface
│   │   │   ├── Login/            # Sign-in and Google OAuth interface
│   │   │   └── SeedingPage.tsx   # Visual database onboarding tool (/seed)
│   │   ├── store/                # Redux store & authentication slice
│   │   ├── helper/               # API client and utility helpers
│   │   ├── config/               # App site configuration & endpoints
│   │   ├── App.tsx               # Primary application route mapping
│   │   └── main.tsx              # DOM mount and Redux/Query providers
│   ├── .env.example              # Client environment variables blueprint
│   ├── package.json              # Client dependencies and npm scripts
│   └── vite.config.ts            # Vite configuration
│
├── server/                       # Backend application (Express + TypeScript + Prisma)
│   ├── prisma/
│   │   └── schema.prisma         # Prisma schema and data modeling
│   ├── src/
│   │   ├── app.ts                # Express application bootstrap & middleware stack
│   │   ├── index.ts              # Server entry point & database initialization
│   │   ├── config/               # Environment, database, and Stripe configs
│   │   ├── controllers/User/     # Route controllers
│   │   │   ├── Auth/             # Login, signup, Google OAuth
│   │   │   ├── Product/          # Product CRUD, listing, and brand aggregation
│   │   │   ├── Category/         # Category management
│   │   │   ├── Subcategory/      # Subcategory management
│   │   │   ├── CartIItem/        # Cart management & quantity operations
│   │   │   ├── Address/          # Shipping address book CRUD
│   │   │   ├── Order/            # Order creation & checkout processing
│   │   │   └── Payment/          # Stripe webhooks & verification
│   │   ├── middleware/           # BotGuard, Auth, Context, and Sanitizers
│   │   ├── models/               # BaseDao and domain data access layers
│   │   ├── routes/               # API route definitions
│   │   ├── services/             # Stripe, Mail, PDF generation, LogManager
│   │   └── utils/                # Sanitization, query helpers, formatters
│   ├── .env.example              # Server environment variables blueprint
│   ├── deploy.sh                 # Production deployment & PM2 restart script
│   ├── package.json              # Server dependencies and build scripts
│   └── tsconfig.json             # TypeScript compiler settings
│
└── README.md                     # Project documentation
```

---

## 🗄️ Database Schema & Models

The database is built on **PostgreSQL** via **Prisma ORM**. Key models include:

| Model | Description | Relations |
| :--- | :--- | :--- |
| **`User`** | Stores user identity, credentials (JSONB hash), contact info, and gender. | Has many `Address`, `CartItem`, `Order`, `UserRole`. |
| **`Role`** & **`Permission`** | Role-Based Access Control mapping administrative capabilities. | Linked through `RolePermission` and `UserRole`. |
| **`Address`** | User shipping addresses (`HOME`, `WORK`, `OTHER`) with a default flag. | Belongs to `User`, referenced by `Order`. |
| **`Category`** | High-level product categories (e.g., Electronics, Fashion). | Has many `Subcategory` and `Product`. |
| **`Subcategory`** | Specific categories nested under a parent category. | Belongs to `Category`, has many `Product`. |
| **`Product`** | Catalog items containing base price, sale price, stock, native `images: String[]`, and JSONB `specifications`. | Belongs to `Category` and `Subcategory`; referenced in `CartItem` and `OrderItem`. |
| **`CartItem`** | Items currently placed in a user's cloud cart with quantity and sold price. | Belongs to `User` and `Product`. |
| **`Order`** | Checkout orders tracking `OrderStatus`, `PaymentStatus`, and `PaymentMethod` (`ONLINE` / `COD`). | Belongs to `User` and `Address`; has many `OrderItem`. |
| **`OrderItem`** | Line item in an order; stores a frozen `productSnapshot` (JSONB) to preserve item details at order time. | Belongs to `Order`, optional reference to `Product`. |

---

## 🔌 API Reference

All backend routes are prefixed with `/api`.

### 🔐 Authentication
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/auth/signup` | Register a new user | No |
| `POST` | `/api/auth/login` | Email/password sign-in | No |
| `POST` | `/api/auth/google-login` | Sign-in via Google OAuth token | No |
| `GET` | `/api/user/get-profile` | Fetch authenticated user profile | **Yes (JWT)** |

### 🗂️ Categories & Subcategories
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `GET` | `/api/category/list` | Retrieve all categories | **Yes** |
| `POST` | `/api/category/create` | Create a new category | **Yes** |
| `GET` | `/api/subcategory/list` | Retrieve all subcategories | **Yes** |
| `GET` | `/api/subcategory/list-by-category` | Get subcategories by category ID | **Yes** |
| `POST` | `/api/subcategory/create` | Create a new subcategory | **Yes** |

### 📦 Products
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/product/list` | Filter, search, and paginate products | No |
| `GET` | `/api/product/details` | Fetch detailed single product info | No |
| `GET` | `/api/product/brand-list` | Get distinct brands in catalog | No |
| `POST` | `/api/product/create` | Add a new product to catalog | **Yes** |

### 🛒 Cart
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `GET` | `/api/cart-item/get-cart` | Fetch authenticated user's cart | **Yes** |
| `POST` | `/api/cart-item/create` | Add a product item to cart | **Yes** |
| `POST` | `/api/cart-item/set-quantity` | Update item quantity in cart | **Yes** |
| `DELETE` | `/api/cart-item/delete` | Remove item from cart | **Yes** |

### 📍 Addresses
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `GET` | `/api/address/list` | List saved user shipping addresses | **Yes** |
| `POST` | `/api/address/create` | Add a new address to address book | **Yes** |
| `PUT` | `/api/address/update` | Update existing address details | **Yes** |
| `DELETE` | `/api/address/delete` | Delete address from address book | **Yes** |

### 📦 Orders & Payments
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/order/create` | Create order & initiate Stripe session | **Yes** |
| `GET` | `/api/order/list` | List previous orders for user | **Yes** |
| `POST` | `/api/payment/webhook` | Stripe Webhook event receiver | No (Stripe Signature) |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your machine:
- **Node.js** `>= 18.x` (v20+ recommended)
- **npm** or **pnpm** / **yarn**
- **PostgreSQL** database instance (e.g. [Neon](https://neon.tech/), Supabase, or local PostgreSQL)
- **Stripe Account** (for test API keys and Webhook secret)
- **Google Cloud Console Credentials** (for Google OAuth 2.0 Client ID)

---

### 1. Clone Repository

```bash
git clone https://github.com/Darshannagle/ClickShop.git
cd ClickShop
```

---

### 2. Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Copy [.env.example](file:///d:/MERN%20Projects/ClickShop/server/.env.example) to `.env`:
   ```bash
   cp .env.example .env
   ```
   Update the database connection string and secret keys in `server/.env`.

4. Synchronize Prisma with the database:
   ```bash
   npx prisma db push
   # or
   npx prisma migrate dev
   ```

5. Start the backend development server:
   ```bash
   npm run dev
   ```
   The backend will be live at `http://localhost:5000`.

---

### 3. Frontend Setup

1. Open a new terminal and navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Copy [.env.example](file:///d:/MERN%20Projects/ClickShop/client/.env.example) to `.env.dev`:
   ```bash
   cp .env.example .env.dev
   ```
   Ensure `VITE_BASE_URL` points to your backend (`http://localhost:5000`).

4. Launch the frontend development server:
   ```bash
   npm run dev
   ```
   The client will be running at `http://localhost:5173` (or the port specified by Vite).

---

### 4. Stripe Webhook Tunneling (Local Dev)

To test Stripe Checkout completions locally:

1. Install the [Stripe CLI](https://stripe.com/docs/stripe-cli).
2. Login to your Stripe account:
   ```bash
   stripe login
   ```
3. Forward webhook events to the server:
   ```bash
   stripe listen --forward-to localhost:5000/api/payment/webhook
   ```
4. Copy the webhook signing secret displayed by the CLI (e.g., `whsec_...`) and set it as `STRIPE_WEBHOOK_SECRET` in `server/.env`.

---

## ⚙️ Environment Variables

### Server (`server/.env`)
| Variable | Description | Example / Default |
| :--- | :--- | :--- |
| `APP_MODE` | Runtime mode (`dev`, `stage`, `prod`) | `dev` |
| `APP_SERVER_PORT` | HTTP port for the Express backend | `5000` |
| `APP_BASE_URL` | Base URL of backend server | `http://localhost:5000` |
| `CLIENT_URL` | URL of the frontend client (for CORS) | `http://localhost:3000` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/dbname?sslmode=require` |
| `JWT_SECRET_KEY` | Secret key for signing authentication tokens | `your_secret_key` |
| `STRIPE_PUBLIC_KEY` | Stripe publishable key | `pk_test_...` |
| `STRIPE_SECRET_KEY` | Stripe secret key | `sk_test_...` |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret | `whsec_...` |
| `STRIPE_SUCCESS_URL` | Redirect slug on successful payment | `order-success` |
| `STRIPE_CANCEL_URL` | Redirect slug on cancelled checkout | `order-cancelled` |
| `EXPRESS_SESSION_SECRET`| Secret used to sign session cookies | `your_session_secret` |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID | `xxx.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret | `GOCSPX-xxx` |

### Client (`client/.env.dev`)
| Variable | Description | Default |
| :--- | :--- | :--- |
| `NODE_ENV` | Client environment flag | `dev` |
| `VITE_BASE_URL` | Backend server URL | `http://localhost:5000` |
| `VITE_STRIPE_SUCCESS_URL`| Route slug matching backend success URL | `order-success` |
| `VITE_STRIPE_CANCEL_URL` | Route slug matching backend cancel URL | `order-cancelled` |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth Client ID | `xxx.apps.googleusercontent.com` |

---

## 📜 Available Scripts

### Backend (`server/`)
- `npm run dev`: Starts development server with live reload via `ts-node-dev`.
- `npm run build`: Generates build version metadata and bundles TypeScript using `esbuild`.
- `npm start`: Runs the compiled production bundle (`dist/index.js`).
- `npm run live`: Bundles and starts the production server.
- `npm run sandbox:stripe`: Starts local Stripe webhook forwarding listener.
- `npm run deploy`: Executes `deploy.sh` script for zero-downtime updates with PM2.

### Frontend (`client/`)
- `npm run dev`: Starts the Vite development server with HMR.
- `npm run build`: Type-checks with `tsc` and compiles optimized production assets.
- `npm run preview`: Previews the production build locally.
- `npm run lint`: Runs ESLint over client source code.

---

## 🚀 Deployment

The server includes a pre-configured [deploy.sh](file:///d:/MERN%20Projects/ClickShop/server/deploy.sh) script designed for automated deployments on Linux VPS environments with [PM2](https://pm2.keymetrics.io/):

```bash
# Production server deployment
cd server
npm run deploy
```

For client deployment, run `npm run build` in the `client/` folder and host the resulting `dist/` directory on platforms like Vercel, Netlify, Cloudflare Pages, or an NGINX reverse proxy.

---

## 👨‍💻 Author & License

- **Author**: Darshan Nagle
- **License**: Licensed under the [ISC License](LICENSE).
