<img width="1255" height="630" alt="image" src="https://github.com/user-attachments/assets/8e924192-f338-472a-8dfb-94445781a553" />


![alt text](image.png)

# 🏡 Housing Society Management System

![React](https://img.shields.io/badge/React-18.2.0-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-18.0.0-green.svg)
![Express](https://img.shields.io/badge/Express-4.18.0-lightgrey.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0.0-green.svg)

A comprehensive housing society management system that allows users to browse properties, create listings, and communicate with property owners. Administrators have special privileges to manage properties and user requests.

## ✨ Features

## 🔐 Authentication System

### 📌 Login & Signup Features

- **Secure User Registration** with email/password
- **JWT Authentication** for protected routes
- **Form Validation** for all auth inputs
- **Protected Routes**:
  - Property creation
  - Profile page
  - Contact functionality
- **Role-Based Access**:
  - Regular users: Browse/create properties
  - Admin: Access to admin dashboard

### Where It's Used in the System:

1. **Initial Access**:

   - Required before creating properties
   - Needed to contact other users

2. **Profile Management**:

   - View your listed properties
   - Track sold status requests

3. **Admin Controls**:
   - Separate admin login

---

### 🏘️ Property Management

- **Browse Properties** by city (Islamabad, Lahore, Karachi)
- **Filter Properties** by price range (min/max)
- **Create Properties** Create your own properties
- **View Your and other Properties** in a dedicated section
- **Create Properties Limitation** I add create property limitation for optimize performace.

### 🔄 Property Status

- **Sold Property Tagging** (owner request → admin approval)
- **Visual Indicators** for sold properties

### 💬 Communication

- **Contact Property Owners** via email
- **Smart Restrictions**:
  - Only other users can contact owners
  - Owners cannot message themselves

### 👤 User Features

- **Personalized Profile Page**
- **Property Dashboard** (your listings)

### 👑 Admin Privileges

- **Admin Dashboard** (protected route)
- **View All Properties**
- **Delete Properties**
- **Manage User Details**
- **Delete User Details**
- **Approve/Reject Sold Status Requests**
- **Monitor System Activity**

## 🛠️ Technologies Used

### Frontend
- ![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white)
- ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white)
- ![Tailwind CSS](https://img.shields.io/badge/-Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)
- ![SASS](https://img.shields.io/badge/-SASS-CC6699?logo=sass&logoColor=white)
- ![Framer Motion](https://img.shields.io/badge/-Framer_Motion-0055FF?logo=framer&logoColor=white)
- ![Redux Toolkit](https://img.shields.io/badge/-Redux_Toolkit-764ABC?logo=redux&logoColor=white)

### Backend

- ![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white)
- ![Express](https://img.shields.io/badge/-Express-000000?logo=express&logoColor=white)
- ![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?logo=mongodb&logoColor=white)

## 🚀 Installation

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Set up environment variables**

   - Create `.env` files in both `frontend` and `backend` directories
   - Add required configuration (database URL, email service, etc.)

3. **Run the application**

   ```bash
   # Start both frontend and backend
   npm run dev
   ```

## 🤝 Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.
