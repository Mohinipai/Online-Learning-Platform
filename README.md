# EduNova – Online Learning Platform

EduNova is a premium, full-stack online learning platform designed to provide an immersive and high-performance educational experience. Built with **React** on the frontend and **Spring Boot** on the backend, it features a modern, dark-themed aesthetic with a focus on visual excellence and user engagement.

![EduNova Banner](https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6)

## 🚀 Key Features

### 🎓 For Students
- **Interactive Course Catalog**: Browse courses across multiple categories (Development, AI, Design, etc.) with advanced filtering and search.
- **Immersive Lesson Player**: High-performance video player with progress tracking and seamless navigation between lessons.
- **Personalized Dashboard**: Track your learning progress, view recent activity, and manage certifications.
- **Premium Design**: Modern UI with glassmorphism effects, smooth animations (Framer Motion), and a full-width responsive layout.

### 🛡️ For Admins
- **Executive Analytics**: Real-time stats on platform revenue, active students, and course enrollments.
- **Course Management**: Complete CRUD operations for courses and lessons (Backend ready).
- **Student Insights**: Monitor recent enrollments and platform growth.

## 🛠️ Technology Stack

### Frontend
- **React 18** (Vite)
- **Tailwind CSS** (v4)
- **Framer Motion** (Animations)
- **Lucide React** (Icons)
- **Recharts** (Analytics Visualization)
- **Axios** (API Communication with Demo Mode fallback)

### Backend
- **Java 17 / Spring Boot 3**
- **Spring Security & JWT** (Authentication)
- **Spring Data JPA & Hibernate**
- **MySQL** (Relational Database)
- **Maven** (Build Tool)
- **Swagger/OpenAPI** (Documentation)

## 💻 Getting Started

### Prerequisites
- **Node.js** (v18+)
- **JDK 17 or higher**
- **Maven**
- **MySQL**

### Setup Frontend
1. Navigate to the project root:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000)

### Setup Backend
1. Navigate to the `backend` directory.
2. Update `src/main/resources/application.yml` with your database credentials.
3. Run the application via your IDE (IntelliJ/Eclipse) or using Maven:
   ```bash
   mvn spring-boot:run
   ```

## 🌟 Demo Mode
If the backend is not running, the platform automatically enters **Demo Mode**. This allows you to explore the entire UI, including:
- Browsing all categories and courses.
- Testing the login and registration flows.
- Exploring the student and admin dashboards with mock data.
- Viewing the course player with demo content.

## 📄 License
This project is licensed under the MIT License.
