Waa Inn Family Restaurant Web Application

Waa Inn is a modern, full-stack web application built to manage a family restaurant business. It offers online food ordering, secure payments, automated invoice generation, and a feature-rich admin dashboard with real-time data and reporting.

 Key Features

 Online food ordering system
 Online payments integration with Stripe
 Invoice generation with PDFKit and email delivery via Nodemailer
 Admin dashboard with real-time summary cards and analytics
-  Food, orders, user, and review management
-  Sales, food performance and order reporting
-  Mobile-responsive frontend built with React 


Tech Stack

| Layer       | Tools & Technologies                                |
|-------------|-----------------------------------------------------|
| Frontend    | React, Basic CSS, Axios                             |
| Backend     | Node.js, Express.js                                 |
| Database    | MongoDB Atlas                                       |
| Authentication | JWT (JSON Web Tokens)                            |
| Payment     | Stripe (Online card payments)                       |
| Email       | Nodemailer(SendInvoice ,order confirmation email)   |
| PDF Creation| PDFKit (Invoice and report generation)              |
      
 
 Project Structure
 
Waa Inn/
│
├── frondend/           # React frontend
|
├── backend/            # Node.js backend API
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── config/
│   ├── utils/
│   └── invoices/
|
├── admin/              # Admin panel (React or template)
|
├── .env                # Environment variables (excluded)
|
├── README.md


 Getting Started

 1. Clone the Repository

     git clone https://github.com/Apsara770/waa-inn-restaurant.git


 2. Install Dependencies

# Install frontend dependencies
cd frondend
npm install

# Install admin dependencies
cd admin
npm install

# Install backend dependencies
cd backend
npm install


 3. Environment Configuration

Create a `.env` file in `backend/` folder:

 add to env
 
PORT=5000
MONGO_URI=your_mongodb_connection_string
STRIPE_SECRET_KEY=your_stripe_secret_key
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password


 4. Run the App Locally


# Run backend server
cd backend
npm run server

# In a separate terminal, run frontend
cd frondend
npm run dev
(port no:5173)

# In a separate terminal, Run admin
cd admin
npm run dev
(port no:5174)

 Admin Dashboard Features

- Real-time summary: total users, orders, payments
- Interactive tables for recent orders and reviews
- Downloadable reports: Sales, Food Performance, User Activity
- Invoice management with PDF and email

 Invoice System

- Automatically generates invoices with PDFKit
- Sends invoices to customer emails using Nodemailer
- Stores invoice history for admin view



 Author

  Sandamini Weerasekara  
  sandaminiweerasekara9@gmail.com  
  [GitHub](https://github.com/Apsara770)


