import express from 'express'
import { auth } from '../middleware/auth.js'
import User from '../models/User.js'

const router = express.Router()

// @route   GET /api/users/me
// @desc    Get current user profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const user = await req.user.populate({
      path: 'profile',
      select: '-password'
    })
    
    res.json(user)
  } catch (error) {
    console.error('Get profile error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// @route   PUT /api/users/me
// @desc    Update current user profile
// @access  Private
router.put('/me', auth, async (req, res) => {
  try {
    const { username, bio, level } = req.body
    
    // Validate level if provided
    if (level && !['Beginner', 'Intermediate', 'Advanced'].includes(level)) {
      return res.status(400).json({ message: 'Invalid level' })
    }
    
    // Check if username is already taken by another user
    if (username && username !== req.user.username) {
      const existingUser = await User.findOne({ username })
      if (existingUser) {
        return res.status(400).json({ message: 'Username is already taken' })
      }
      req.user.username = username
    }
    
    // Update profile fields
    if (bio !== undefined) req.user.profile.bio = bio
    if (level !== undefined) req.user.profile.level = level
    
    await req.user.save()
    
    res.json({
      message: 'Profile updated successfully',
      user: req.user
    })
  } catch (error) {
    console.error('Update profile error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// @route   PUT /api/users/avatar
// @desc    Update user avatar
// @access  Private
router.put('/avatar', auth, async (req, res) => {
  try {
    const { avatar } = req.body
    
    if (!avatar) {
      return res.status(400).json({ message: 'Avatar data is required' })
    }
    
    // Update avatar
    req.user.profile.avatar = avatar
    await req.user.save()
    
    res.json({
      message: 'Avatar updated successfully',
      avatar: req.user.profile.avatar
    })
  } catch (error) {
    console.error('Update avatar error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// @route   PUT /api/users/profile
// @desc    Update complete user profile
// @access  Private
router.put('/profile', auth, async (req, res) => {
  try {
    const { 
      username, 
      firstName, 
      lastName, 
      bio, 
      japaneseLevel, 
      studyGoal, 
      preferredLearningStyle, 
      nativeLanguage,
      avatar 
    } = req.body
    
    // Check if username is already taken by another user
    if (username && username !== req.user.username) {
      const existingUser = await User.findOne({ username })
      if (existingUser) {
        return res.status(400).json({ message: 'Username is already taken' })
      }
      req.user.username = username
    }
    
    // Update profile fields
    if (firstName !== undefined) req.user.profile.firstName = firstName
    if (lastName !== undefined) req.user.profile.lastName = lastName
    if (bio !== undefined) req.user.profile.bio = bio
    if (japaneseLevel !== undefined) req.user.progress.japaneseLevel = japaneseLevel
    if (studyGoal !== undefined) req.user.profile.studyGoal = studyGoal
    if (preferredLearningStyle !== undefined) req.user.profile.preferredLearningStyle = preferredLearningStyle
    if (nativeLanguage !== undefined) req.user.profile.nativeLanguage = nativeLanguage
    if (avatar !== undefined) req.user.profile.avatar = avatar
    
    await req.user.save()
    
    res.json({
      message: 'Profile updated successfully',
      user: req.user
    })
  } catch (error) {
    console.error('Update profile error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// @route   PUT /api/users/preferences
// @desc    Update user preferences
// @access  Private
router.put('/preferences', auth, async (req, res) => {
  try {
    const { theme, notifications, language } = req.body
    
    // Validate theme
    if (theme && !['light', 'dark'].includes(theme)) {
      return res.status(400).json({ message: 'Invalid theme' })
    }
    
    // Update preferences
    if (theme !== undefined) req.user.preferences.theme = theme
    if (notifications !== undefined) req.user.preferences.notifications = notifications
    if (language !== undefined) req.user.preferences.language = language
    
    await req.user.save()
    
    res.json({
      message: 'Preferences updated successfully',
      preferences: req.user.preferences
    })
  } catch (error) {
    console.error('Update preferences error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router