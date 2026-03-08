import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react'

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  
  const { register, user } = useAuth()
  const navigate = useNavigate()
  const [scrollY, setScrollY] = useState(0)
  const [scrollDirection, setScrollDirection] = useState('down')
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollDirection(currentScrollY > lastScrollY ? 'down' : 'up')
      setScrollY(currentScrollY)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard')
    }
  }, [user, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required'
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters'
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores'
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const result = await register(formData.username, formData.email, formData.password)

      if (result.success) {
        // Registration successful - user is automatically logged in via AuthContext
        // Navigation will be handled by the useEffect that checks for user state
        setFormData({ username: '', email: '', password: '', confirmPassword: '' })
      } else {
        setErrors({ general: result.error })
      }
    } catch (error) {
      console.error('Registration error:', error)
      setErrors({ general: error.message || 'Registration failed. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignUp = () => {
    setLoading(true)
    
    // Check if Google script is loaded
    if (typeof window.google === 'undefined') {
      setErrors({ general: 'Google services are loading. Please wait and try again.' })
      setLoading(false)
      return
    }

    try {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || '1087477934305-9sl2vglqfcvhdplltvhcm3v7qf8ltdqk.apps.googleusercontent.com',
        callback: handleGoogleCallback,
        auto_select: false,
        cancel_on_tap_outside: true
      })
      
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          // Fallback to renderButton if prompt fails
          const buttonDiv = document.getElementById('google-signup-btn')
          if (buttonDiv) {
            window.google.accounts.id.renderButton(buttonDiv, {
              theme: 'outline',
              size: 'large',
              width: buttonDiv.offsetWidth
            })
          }
        }
        setLoading(false)
      })
    } catch (error) {
      console.error('Google initialization error:', error)
      setErrors({ general: 'Failed to initialize Google sign-in. Please try again.' })
      setLoading(false)
    }
  }

  const handleGoogleCallback = async (response) => {
    setLoading(true)
    try {
      if (!response.credential) {
        throw new Error('No credential received from Google')
      }
      
      const userInfo = JSON.parse(atob(response.credential.split('.')[1]))
      
      // Create username from Google name, fallback to email prefix
      const username = (userInfo.name || userInfo.email.split('@')[0]).replace(/\s+/g, '') + Math.floor(Math.random() * 1000)
      
      const result = await register(
        username,
        userInfo.email,
        'google-oauth-' + userInfo.sub
      )
      
      if (result.success) {
        navigate('/dashboard')
      } else {
        setErrors({ general: result.error || 'Registration failed. Please try again.' })
      }
    } catch (error) {
      console.error('Google callback error:', error)
      setErrors({ general: 'Google sign-up failed. Please try again.' })
    } finally {
      setLoading(false)
    }
  }



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-purple-900 relative overflow-hidden flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute top-10 left-10 text-8xl text-gray-800 dark:text-white transition-transform duration-300 ease-out"
          style={{
            transform: `translateY(${scrollY * 0.3}px) rotate(${scrollDirection === 'down' ? scrollY * 0.1 : -scrollY * 0.1}deg)`
          }}
        >
          漢
        </div>
        <div 
          className="absolute top-32 right-20 text-6xl text-blue-600 dark:text-blue-300 transition-transform duration-300 ease-out"
          style={{
            transform: `translateY(${scrollY * -0.2}px) rotate(${scrollDirection === 'down' ? -scrollY * 0.05 : scrollY * 0.05}deg)`
          }}
        >
          字
        </div>
        <div 
          className="absolute bottom-40 left-1/4 text-7xl text-purple-600 dark:text-purple-300 transition-transform duration-300 ease-out"
          style={{
            transform: `translateY(${scrollY * 0.4}px) rotate(${scrollDirection === 'down' ? scrollY * 0.08 : -scrollY * 0.08}deg)`
          }}
        >
          あ
        </div>
        <div 
          className="absolute bottom-20 right-1/3 text-5xl text-pink-600 dark:text-pink-300 transition-transform duration-300 ease-out"
          style={{
            transform: `translateY(${scrollY * -0.3}px) rotate(${scrollDirection === 'down' ? -scrollY * 0.06 : scrollY * 0.06}deg)`
          }}
        >
          カ
        </div>
        
        {/* Floating KAIRO Logo */}
        <div 
          className="absolute top-10 right-10 opacity-20 dark:opacity-30 transition-all duration-500 ease-out"
          style={{
            transform: `translateY(${scrollY * (scrollDirection === 'down' ? 0.3 : -0.3)}px) scale(${1 + scrollY * 0.0005}) rotate(${scrollDirection === 'down' ? scrollY * 0.08 : -scrollY * 0.08}deg)`
          }}
        >
          <div className="text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            KAIRØ
          </div>
        </div>
      </div>
      
      {/* Floating Sakura */}
      <div className="absolute inset-0">
        <div 
          className="floating-sakura sakura-1 transition-transform duration-300 ease-out"
          style={{
            transform: `translateY(${scrollY * 0.15}px) rotate(${scrollDirection === 'down' ? scrollY * 0.03 : -scrollY * 0.03}deg)`
          }}
        >
          🌸
        </div>
        <div 
          className="floating-sakura sakura-2 transition-transform duration-300 ease-out"
          style={{
            transform: `translateY(${scrollY * -0.1}px) rotate(${scrollDirection === 'down' ? -scrollY * 0.04 : scrollY * 0.04}deg)`
          }}
        >
          🌸
        </div>
        <div 
          className="floating-sakura sakura-3 transition-transform duration-300 ease-out"
          style={{
            transform: `translateY(${scrollY * 0.2}px) rotate(${scrollDirection === 'down' ? scrollY * 0.05 : -scrollY * 0.05}deg)`
          }}
        >
          🌸
        </div>
      </div>
      
      <style>{`
        .floating-sakura {
          position: absolute;
          font-size: 2rem;
          animation: sakuraFloat 15s ease-in-out infinite;
        }
        .sakura-1 { top: 20%; left: 15%; animation-delay: 0s; }
        .sakura-2 { bottom: 30%; right: 20%; animation-delay: 6s; }
        .sakura-3 { top: 60%; left: 70%; animation-delay: 12s; }
        @keyframes sakuraFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          25% { transform: translateY(-20px) rotate(90deg); opacity: 0.7; }
          50% { transform: translateY(-40px) rotate(180deg); opacity: 1; }
          75% { transform: translateY(-20px) rotate(270deg); opacity: 0.7; }
        }
      `}</style>
      <div className="relative z-10 max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center items-center space-x-2 mb-6">
            <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">
              KAIRØ
            </span>
            <span className="text-2xl">🎌</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Join KAIRØ Today!
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Start your Japanese learning journey
          </p>
        </div>
        
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm py-8 px-6 shadow-2xl rounded-2xl border border-white/20 dark:border-gray-700/50">
          <form className="space-y-6" onSubmit={handleSubmit}>
          {errors.general && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
              {errors.general}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Username
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="appearance-none relative block w-full px-10 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              {errors.username && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.username}</p>}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email address
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none relative block w-full px-10 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="appearance-none relative block w-full px-10 pr-10 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                  )}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password}</p>}
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Confirm Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  className="appearance-none relative block w-full px-10 pr-10 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.confirmPassword}</p>}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>
          
          {/* Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white/80 dark:bg-gray-800/80 text-gray-500 dark:text-gray-400">Or continue with</span>
              </div>
            </div>
          </div>
          
          {/* Google Sign Up Button */}
          <div className="mt-6">
            <div id="google-signup-btn" className="w-full mb-2"></div>
            <button
              type="button"
              onClick={handleGoogleSignUp}
              disabled={loading}
              className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {loading ? 'Signing up...' : 'Continue with Google'}
            </button>
          </div>
          </form>
          
          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
