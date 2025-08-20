# Cosma Beauty Demo Backend

This is a small demo backend for **Cosma Beauty** that supports the core flow:

1. User searches for a **concern** → gets mapped **treatments** → sees **packages** → submits an **enquiry**.  
2. Clinics/Admin can list all enquiries.

---

## 🚀 Features
- **Search** a concern and fetch mapped treatments + packages.  
- **Create enquiry** for a package.  
- **Admin dashboard API** to list all enquiries.  
- Uses **SQLite** for persistence.  
- Lightweight **Express.js** backend with modular routes.  

---

## 📂 Project Structure

backend/
│── controllers/
│ ├── adminController.js
│ ├── enquiryController.js
│ └── searchController.js
│
│── routes/
│ ├── admin.js
│ ├── enquiries.js
│ └── search.js
│
│── db.js
│── server.js



---

## ⚙️ Installation & Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/avansingh085/Cosma-Beauty-Mini-Assignment.git
   cd backend


## Install dependencies:

2. npm install

##Run the server:

3. npm run dev

## Server will run at:

http://localhost:3000


## API Endpoints

Search Concern

## Endpoint: GET /search?concern=<name>

{
  "concern": { "id": 1, "name": "Acne" },
  "treatments": [
    { "id": 1, "name": "Laser Treatment" }
  ],
  "packages": [
    { "id": 3, "package_name": "Basic Acne Package", "clinic_name": "Cosma Clinic" }
  ]
}

## Create Enquiry

Endpoint: POST /enquiries

{
  "package_id": 1,
  "user_name": "John Doe",
  "user_email": "john@example.com",
  "message": "I am interested in this package."
}

## List Enquiries (Admin)

Endpoint: GET /admin/enquiries

[
  {
    "id": 1,
    "package_id": 2,
    "user_name": "Jane Smith",
    "user_email": "jane@example.com",
    "message": "Looking for consultation",
    "created_at": "2025-08-20 10:30:00",
    "package_name": "Premium Acne Treatment",
    "clinic_name": "Cosma Clinic"
  }
]
