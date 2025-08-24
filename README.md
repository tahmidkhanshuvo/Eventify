# 🎉 Eventify — Event Management Portal (MERN)

> Built by **Team If_It_Works_It_Works** for **AUST CSE Carnival 6.0 Hackathon**

Eventify is a full-stack event management portal designed for **university clubs**.  
It allows **Club Admins** to create/manage events and **Students** to browse, register, and download participation certificates.  

---

## 🚀 Features

### 🔑 Authentication
- Signup/Login with **role-based access** (Student / Admin)
- Secure password hashing (bcrypt) + JWT authentication

### 🎓 Student Role
- Browse upcoming events
- Register / Unregister from events
- Personal dashboard with registered events
- Download certificates (after events end)

### 🛠️ Admin Role
- Create / Edit / Delete events
- Manage attendees per event
- Admin dashboard with quick stats:
  - Total events
  - Upcoming events
  - Total attendees

### 💡 Other Features
- **Chatbot for FAQs** (rule-based, answers common questions)
- **Automatic Certificate Generator** (PDF with event & student details)
- Responsive UI with a modern dark theme

---

## 🏗️ Tech Stack

- **Frontend:** React (Vite), React Router, Context API
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Auth:** JWT + bcrypt
- **Other Tools:** pdfkit (certificates), CORS, Morgan

---

## 📸 Pages & UI

- **Homepage:** Upcoming events + FAQ Chatbot
- **Student Dashboard:** My Events list, quick actions
- **Admin Dashboard:** Event management + stats
- **Create/Edit Event:** Form with all fields
- **Event Detail Page:** Full event info, register/unregister, attendee list
- **Authentication Pages:** Login / Register with role selection

---

## ⚙️ Installation & Setup

Clone the repository:
```bash
git clone https://github.com/your-username/eventify.git
cd eventify
