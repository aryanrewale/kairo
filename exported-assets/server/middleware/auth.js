import jwt from 'jsonwebtoken'
import User from '../models/User.js'

// Authentication middleware
export const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided, access denied' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret')
    const user = await User.findById(decoded.userId)
    
    if (!user) {
      return res.status(401).json({ message: 'Token is not valid' })
    }

    req.user = user
    next()
  } catch (error) {
    console.error('Auth middleware error:', error)
    res.status(401).json({ message: 'Token is not valid' })
  }
}

// Admin middleware
export const adminAuth = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Admin access required' })
    }
    next()
  } catch (error) {
    console.error('Admin middleware error:', error)
    res.status(403).json({ message: 'Admin access required' })
  }
}