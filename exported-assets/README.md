# KAIRØ - Full-Stack Japanese Learning Platform

A comprehensive Japanese language learning platform built with **React + Vite** (Frontend) and **Node.js + Express + MongoDB** (Backend).

## 🎌 Features

### Frontend (React + Vite)
- **Modern UI**: Clean, minimal design inspired by Pexels.com
- **Dark Mode**: Default dark theme with toggle functionality
- **Fully Responsive**: Works on desktop, tablet, and mobile
- **Authentication**: Login/Register with JWT tokens
- **Protected Routes**: Role-based access control
- **Multiple Pages**: Home, Dashboard, Flashcards, Quizzes, Exams, Chat, Profile, Admin

### Backend (Node.js + Express)
- **RESTful API**: Well-structured REST endpoints
- **MongoDB Integration**: User data, flashcards, and quizzes storage
- **JWT Authentication**: Secure token-based auth
- **Role-based Access**: User and admin permissions
- **Input Validation**: Express-validator for secure data handling
- **Password Hashing**: bcryptjs for secure password storage

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd kairo-fullstack
```

2. **Install dependencies for all parts**
```bash
npm run install-deps
```

3. **Set up environment variables**
```bash
cd server
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
```

4. **Start MongoDB**
```bash
# If using local MongoDB
mongod
```

5. **Run the development environment**
```bash
# From root directory - runs both frontend and backend
npm run dev
```

The app will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 📁 Project Structure

```
kairo-fullstack/
├── client/                 # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # React Context (Auth, Theme)
│   │   ├── pages/          # Page components
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # Entry point
│   ├── index.html
│   ├── tailwind.config.js  # TailwindCSS config
│   └── vite.config.js      # Vite config
├── server/                 # Node.js Backend
│   ├── middleware/         # Auth middleware
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── index.js            # Server entry point
│   └── .env.example        # Environment template
└── package.json            # Root package file
```

## 🔧 Technology Stack

### Frontend
- **React 18** - UI library
- **Vite** - Fast build tool
- **TailwindCSS** - Utility-first CSS framework
- **React Router Dom** - Client-side routing
- **Axios** - HTTP client
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Express Validator** - Input validation

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Users
- `GET /api/users/me` - Get current user profile
- `PUT /api/users/me` - Update user profile
- `PUT /api/users/preferences` - Update user preferences

### Flashcards
- `GET /api/flashcards` - Get flashcards with filters
- `GET /api/flashcards/random` - Get random flashcard
- `POST /api/flashcards` - Create flashcard (Admin)

### Quizzes
- `GET /api/quizzes` - Get quiz questions
- `POST /api/quizzes/submit` - Submit quiz answers

### Chat
- `GET /api/chat` - Get chat messages
- `POST /api/chat` - Send new message

### Admin
- `GET /api/admin/users` - List all users
- `DELETE /api/admin/users/:id` - Delete user

## 🎨 Key Features

### 🌙 Dark Mode
- Default dark theme
- Toggle button in navbar
- Persistent theme preference
- Beautiful dark/light color schemes

### 🔐 Authentication
- JWT-based authentication
- Protected routes
- Admin role management
- Secure password hashing

### 📱 Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Modern CSS Grid and Flexbox
- TailwindCSS utility classes

### 🎌 Japanese Learning Features
- **Flashcards**: Interactive vocabulary cards
- **Quizzes**: Multiple-choice questions
- **Exams**: JLPT and MEXT preparation
- **Chat**: Language exchange platform
- **Progress Tracking**: User statistics

## 🛠️ Development

### Scripts
```bash
# Install all dependencies
npm run install-deps

# Run both frontend and backend
npm run dev

# Run only backend
npm run server

# Run only frontend
npm run client

# Build frontend for production
npm run build
```

### Environment Variables
Create `server/.env` file:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/kairo
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
```

## 🎯 Default Demo Users

For testing purposes:
- **Email**: `demo@kairo.com`
- **Password**: `demo123`

## 📈 Future Enhancements

- Real-time chat with WebSocket
- Voice recognition for pronunciation
- Advanced spaced repetition algorithm
- Mobile app with React Native
- AI-powered conversation partner
- Progress analytics dashboard

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

**Built with ❤️ for Japanese learners worldwide**

🎌 **KAIRØ** - Your journey to Japanese fluency starts here!