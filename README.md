# 🛍️ Next.js E-Commerce Platform
**Live Demo:** 🔗 [https://nextjs-ecommerce-iota-pearl.vercel.app](https://nextjs-ecommerce-iota-pearl.vercel.app)
---

## 📖 Project Overview
This project is a **modern E-Commerce web application** built using **Next.js 14**, **MongoDB Atlas**, and deployed on **Vercel**.  
It demonstrates a full-stack architecture where the frontend, backend, and database work seamlessly inside a single Next.js framework.

The application supports:
- Product listing and search  
- Dynamic product detail pages  
- Inventory management dashboard  
- Real-time MongoDB connectivity  
- Server-Side Rendering (SSR) and Incremental Static Regeneration (ISR)

---

## 🚀 Features Implemented
- **Dynamic Product Catalog** – displays products from MongoDB in a responsive grid.  
- **Search Bar** – client-side product filtering.  
- **Individual Product Pages** – dynamic routing using `/products/[slug]`.  
- **Inventory Dashboard** – shows total products, low-stock count, and average price.  
- **Real-Time Admin Updates** – instantly reflects MongoDB edits.  
- **60 s Revalidation** – uses ISR caching for performance.  

---

## 🧠 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | Next.js 14, React, Tailwind CSS |
| **Backend** | Node.js (Next.js App Router API Routes) |
| **Database** | MongoDB Atlas |
| **ODM** | Mongoose |
| **Deployment** | Vercel |
| **Version Control** | Git & GitHub |

---

## ⚙️ Local Development Setup

###  1 Clone the Repository
```bash
git clone https://github.com/<your-username>/nextjs-ecommerce.git
cd nextjs-ecommerce
```
### 2 Install Dependencies
```bash
npm install
```
### 3 Configure Environment Variables
```bash
MONGODB_URI=your_mongodb_atlas_connection_string
ADMIN_USER=your_username
ADMIN_PASS=your_pass
NEXT_PUBLIC_BASE_URL=http://localhost:3000

```
### 4 Seed the Database
```bash
node seed.js
```
### 5 Run the Development Server
```bash
npm run dev
```

