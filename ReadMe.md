
---

## 📂 Backend README.md

```markdown
# CarInfo Backend (Express + MongoDB)

This repository contains the **backend API** for CarInfo. It powers the frontend and dashboard with data for cars, categories, banners, counters, and contact details.

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/nazifakhan/carLandingPageBackend

2. Install dependencies
bash
npm install

3. Environment Variables
Create a .env file in the backend root with:
MONGO_URI=create ur cluster n paste it here 
PORT=5000

⚠️ Note: The frontend .env file contains VITE_ADMIN_USER and VITE_ADMIN_PASS.
The backend .env file contains database and server configuration.

4. Run the server
bash
npm start
The backend will run at:

API base → http://localhost:5000/api

📂 API Routes
/api/counters → Manage counters (cars sold, happy customers, etc.)

/api/reachus → Manage contact info (phone & WhatsApp)

/api/cars → Cars CRUD

/api/categories → Categories CRUD

/api/banners → Banners CRUD

/api/info → Information pages

/api/contact → Contact form submissions
