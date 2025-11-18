# 🚗 RentWheels — Car Rental Web Application

RentWheels is a modern **car rental platform** built using **Next.js**, **React**, **TypeScript**, and **Spring Boot**.  
It provides a smooth, end-to-end car booking experience — from browsing available cars to secure checkout and receipt download.

---

## ✨ Features

### 🧭 User Features
- 🔍 **Browse Cars:** View cars with filters like brand, type, price range, etc.  
- 📅 **Easy Booking:** Select pickup and return dates directly from the car details page.  
- 💰 **Dynamic Pricing:** Real-time cost calculation with taxes and insurance.  
- 💳 **Secure Checkout:** Pay via credit/debit card, UPI, net banking, or pay at pickup.  
- 📄 **Booking Confirmation:** Instant confirmation and receipt download after payment.  
- 🧍 **Profile & License Upload:** Manage personal details and upload driving license.

### 🧑‍💼 Admin Dashboard

RentWheels includes a full-featured **Admin Dashboard** that allows administrators to efficiently manage the business side of the platform.

#### 🔧 Admin Capabilities:
- 🚗 **Manage Cars:** Add, edit, or remove car listings and their specifications.  
- 💰 **Dynamic Pricing Controls:** Adjust daily rates, taxes, and insurance settings.  
- 📊 **Booking Overview:** View all bookings with customer details and durations.  
- 👥 **User Management:** View registered users, contact details, and documents.  
- 📦 **Inventory Status:** Check which cars are booked or available in real-time.  
- 🧾 **Reports & Insights:** Generate booking reports and view revenue analytics.  
- 🔐 **Admin Authentication:** Protected access using secure login for administrators.

#### 🖥️ Dashboard Highlights:
- Built with **React + TailwindCSS** for an elegant, responsive interface.  
- Fetches live data via **Spring Boot REST APIs**.  
- Real-time updates using state hooks and server-side rendering.  
- Separate routes under `/admin` for easy maintenance and security.


### 🧩 Admin Features
- 🚘 Manage car listings (add, edit, delete).  
- 📊 View all user bookings.  
- ⚙️ Update pricing, taxes, and insurance rates dynamically.

---

## 🏗️ Tech Stack

### Frontend
- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Lucide Icons** & **shadcn/ui** for modern UI components

### Backend
- **Spring Boot 3**
- **Java 17**
- **Hibernate / JPA**
- **MySQL** (Relational Database)
- **RESTful API** for data exchange with frontend

### Tools
- **Postman** — API testing  
- **Docker (optional)** — backend containerization  
- **Git & GitHub** — version control and collaboration  

## ⚙️ Installation & Setup

### 🧩 Prerequisites
Ensure the following are installed before setup:
- Node.js **v18+**
- npm or yarn
- Java **17+**
- MySQL server running locally or remotely

---

### 🚀 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```
Now visit 👉 http://localhost:3000

### 🧱 Backend Setup

Navigate to backend directory:
```bash
cd backend
```
Configure database credentials in src/main/resources/application.properties:
```bash
spring.datasource.url=jdbc:mysql://localhost:3306/car_rental
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update
```

Run the Spring Boot server:
```bash
mvn spring-boot:run
```

The backend will start on http://localhost:8080

### 🌐 API Endpoints
```bash
Endpoint	Method	Description
/api/cars	GET	Retrieve all available cars
/api/cars/{id}	GET	Fetch details of a specific car
/api/bookings	POST	Create a new booking
/api/users	GET	Fetch all users
/api/users/{id}/dl	POST	Upload a user’s driving license
```

### 🧮 Booking Flow

- Go to the Catalog (/catalog)

- Select a car and choose pickup and return dates

- Click Done → Book Now

- Fill out your details and confirm payment

- On success, view the confirmation page and download receipt

	
## 🧠 Design Highlights

💡 Modular React components with Tailwind for responsiveness

⚙️ Real-time data updates via REST APIs

🔐 Secure data flow between frontend and backend

🧮 Automatic calculation of pricing, taxes, and insurance

🧱 MVC architecture with layered backend design

## 🧾 License

This project is licensed under the MIT License.
You are free to use, modify, and distribute it with attribution.

## 💡 Future Enhancements

🔐 Implement user authentication (JWT)

💳 Integrate payment gateways (Stripe / Razorpay)

📱 Create a mobile-friendly progressive web app (PWA)

☁️ Deploy full stack on Vercel (frontend) & Render / AWS (backend)


## This project is still under development.# Car-Rental
