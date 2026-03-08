import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      checkAuth()
    } else {
      setLoading(false)
    }
  }, [])

  const checkAuth = async () => {
    try {
      const response = await axios.get('/api/users/me')
      const userData = response.data
      setUser({ 
        ...userData, 
        isPremium: true,
        avatar: userData.profile?.avatar || ''
      })
    } catch (error) {
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      console.log('Attempting login with:', { email })
      const response = await axios.post('/api/auth/login', { email, password })
      console.log('Login response:', response.data)
      const { token, user } = response.data
      localStorage.setItem('token', token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setUser({ ...user, isPremium: true })
      return { success: true }
    } catch (error) {
      console.error('Login error:', error)
      console.error('Error response:', error.response?.data)
      return { success: false, error: error.response?.data?.message || 'Login failed' }
    }
  }

  const register = async (username, email, password) => {
    try {
      console.log('Attempting registration with:', { username, email })
      const response = await axios.post('/api/auth/register', { username, email, password })
      console.log('Registration response:', response.data)
      const loginResponse = await axios.post('/api/auth/login', { email, password })
      console.log('Auto-login response:', loginResponse.data)
      const { token, user } = loginResponse.data
      localStorage.setItem('token', token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setUser({ ...user, isPremium: true })
      return { success: true, message: response.data.message }
    } catch (error) {
      console.error('Registration error:', error)
      console.error('Error response:', error.response?.data)
      return { success: false, error: error.response?.data?.message || 'Registration failed' }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization']
    setUser(null)
  }

  const updateUser = async (userData) => {
    setUser(prev => ({ ...prev, ...userData }))
    
    // If avatar is being updated, save it to backend
    if (userData.avatar) {
      try {
        const token = localStorage.getItem('token')
        if (token) {
          await axios.put('/api/users/avatar', { avatar: userData.avatar }, {
            headers: { 'Authorization': `Bearer ${token}` }
          })
        }
      } catch (error) {
        console.error('Failed to save avatar to backend:', error)
      }
    }
  }

  const value = useMemo(() => ({
    user,
    loading,
    login,
    register,
    logout,
    checkAuth,
    updateUser
  }), [user, loading])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}


