# Google OAuth Setup Guide

## 🔧 Setup Instructions

### 1. **Create Google Cloud Project**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the **Google+ API** and **Google Identity Services**

### 2. **Configure OAuth Consent Screen**
1. Go to **APIs & Services** > **OAuth consent screen**
2. Choose **External** user type
3. Fill in required fields:
   - App name: `KAIRO - Japanese Learning Platform`
   - User support email: Your email
   - Developer contact: Your email
4. Add scopes: `email`, `profile`, `openid`
5. Add test users (your email addresses)

### 3. **Create OAuth 2.0 Credentials**
1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **OAuth 2.0 Client ID**
3. Choose **Web application**
4. Add authorized origins:
   - `http://localhost:3000` (development)
   - `https://yourdomain.com` (production)
5. Copy the **Client ID**

### 4. **Update Environment Variables**
1. Open `client/.env` file
2. Replace the Google Client ID:
```env
VITE_GOOGLE_CLIENT_ID=your-actual-client-id-here.apps.googleusercontent.com
```

### 5. **Test the Integration**
1. Start your development server: `npm run dev`
2. Go to Register or Login page
3. Click "Sign up with Google" or "Sign in with Google"
4. Google popup should appear for authentication

## 🚀 How It Works

### **Registration Flow:**
1. User clicks "Sign up with Google"
2. Google popup opens for authentication
3. User selects Google account and grants permissions
4. Google returns user info (name, email, profile picture)
5. System creates new KAIRO account with Google data
6. User is automatically logged in and redirected to Dashboard

### **Login Flow:**
1. User clicks "Sign in with Google"
2. Google popup opens for authentication
3. System attempts to login with Google email
4. If account exists: Login successful → Dashboard
5. If no account: Shows message to sign up first

## 🔒 Security Features

- **JWT Token Validation**: Google returns signed JWT tokens
- **Email Verification**: Google accounts are pre-verified
- **Secure Authentication**: No passwords stored for Google users
- **Profile Pictures**: Automatically imports Google profile photos

## 📝 Notes

- Google OAuth works in both development and production
- Users can mix regular email/password with Google authentication
- Google profile pictures are automatically set as user avatars
- The system generates unique usernames for Google users