import express from 'express'
import { auth } from '../middleware/auth.js'
import User from '../models/User.js'

const router = express.Router()

// Middleware to check if user is admin
const requireAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Admin access required' })
  }
  next()
}

// @route   GET /api/admin/stats
// @desc    Get admin dashboard statistics
// @access  Private (Admin only)
router.get('/stats', auth, requireAdmin, async (req, res) => {
  try {
    // Get total users count
    const totalUsers = await User.countDocuments()

    // Get recent users (last 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    const recentUsers = await User.countDocuments({
      createdAt: { $gte: thirtyDaysAgo }
    })

    // Get active users (users who logged in within last 7 days)
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    const activeUsers = await User.countDocuments({
      'profile.lastActive': { $gte: sevenDaysAgo }
    })

    // Sample statistics for demo
    const stats = {
      totalUsers,
      recentUsers,
      activeUsers,
      totalFlashcards: 150, // This would come from Flashcard model
      totalQuizzes: 25,     // This would come from Quiz model
      systemHealth: {
        status: 'healthy',
        uptime: '99.9%',
        lastBackup: new Date(Date.now() - 24 * 60 * 60 * 1000) // 24 hours ago
      }
    }

    res.json(stats)
  } catch (error) {
    console.error('Get admin stats error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// @route   GET /api/admin/users
// @desc    Get all users with pagination and filtering
// @access  Private (Admin only)
router.get('/users', auth, requireAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 20, search, status } = req.query

    let query = {}

    // Apply search filter
    if (search) {
      query.$or = [
        { username: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ]
    }

    // Apply status filter
    if (status === 'active') {
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      query['profile.lastActive'] = { $gte: sevenDaysAgo }
    } else if (status === 'inactive') {
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      query['profile.lastActive'] = { $lt: sevenDaysAgo }
    }

    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)

    const total = await User.countDocuments(query)

    res.json({
      users,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    })
  } catch (error) {
    console.error('Get admin users error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// @route   PUT /api/admin/users/:id/status
// @desc    Update user status (activate/deactivate)
// @access  Private (Admin only)
router.put('/users/:id/status', auth, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params
    const { isActive } = req.body

    const user = await User.findByIdAndUpdate(
      id,
      { 'profile.isActive': isActive },
      { new: true }
    ).select('-password')

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json({
      message: `User ${isActive ? 'activated' : 'deactivated'} successfully`,
      user
    })
  } catch (error) {
    console.error('Update user status error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// @route   PUT /api/admin/users/:id/role
// @desc    Update user role (admin/user)
// @access  Private (Admin only)
router.put('/users/:id/role', auth, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params
    const { isAdmin } = req.body

    // Prevent admin from removing their own admin role
    if (id === req.user.id && !isAdmin) {
      return res.status(400).json({ message: 'Cannot remove admin role from yourself' })
    }

    const user = await User.findByIdAndUpdate(
      id,
      { isAdmin },
      { new: true }
    ).select('-password')

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json({
      message: `User role updated to ${isAdmin ? 'admin' : 'user'} successfully`,
      user
    })
  } catch (error) {
    console.error('Update user role error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// @route   DELETE /api/admin/users/:id
// @desc    Delete user account
// @access  Private (Admin only)
router.delete('/users/:id', auth, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params

    // Prevent admin from deleting their own account
    if (id === req.user.id) {
      return res.status(400).json({ message: 'Cannot delete your own account' })
    }

    const user = await User.findByIdAndDelete(id)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json({ message: 'User deleted successfully' })
  } catch (error) {
    console.error('Delete user error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// @route   GET /api/admin/system
// @desc    Get system information
// @access  Private (Admin only)
router.get('/system', auth, requireAdmin, async (req, res) => {
  try {
    const systemInfo = {
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      platform: process.platform,
      nodeVersion: process.version,
      features: {
        flashcards: true,
        quizzes: true,
        chat: true,
        admin: true,
        authentication: true
      }
    }

    res.json(systemInfo)
  } catch (error) {
    console.error('Get system info error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router
