import express from 'express'
import User from '../models/User.js'
import { auth } from '../middleware/auth.js'

const router = express.Router()

// Update progress after activity
router.post('/activity', auth, async (req, res) => {
  try {
    const { type, category, score, timeSpent, completed, newVocabulary, newKanji } = req.body

    const user = await User.findById(req.user.userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const today = new Date()
    
    // Update progress counters
    if (type === 'flashcard') {
      user.progress.totalFlashcards += 1
      user.progress.vocabularyCount += 1
      if (newKanji) user.progress.kanjiLearned += 1
    } else if (type === 'quiz') {
      user.progress.totalQuizzes += 1
      if (completed) user.progress.completedQuizzes += 1
      if (newVocabulary) user.progress.vocabularyCount += newVocabulary
      if (newKanji) user.progress.kanjiLearned += newKanji
    }

    // Update streak
    const lastStudy = user.progress.lastStudyDate
    if (!lastStudy || lastStudy.toDateString() !== today.toDateString()) {
      const yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - 1)
      
      if (lastStudy && lastStudy.toDateString() === yesterday.toDateString()) {
        user.progress.studyStreak += 1
      } else {
        user.progress.studyStreak = 1
      }
      user.progress.lastStudyDate = today
    }

    // Add activity record
    const xp = type === 'flashcard' ? 5 : type === 'quiz' ? (score || 10) : 5
    user.activities.push({
      type,
      category: category || 'General',
      score: xp,
      timeSpent: timeSpent || 0,
      date: today
    })
    
    // Update XP and points
    user.profile.totalXP += xp
    user.profile.points += xp
    
    // Calculate and update level info
    const levelInfo = user.calculateLevelInfo()

    await user.save()

    res.json({
      message: 'Progress updated successfully',
      progress: user.progress,
      xp: xp
    })
  } catch (error) {
    console.error('Progress update error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get dashboard stats
router.get('/dashboard', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const today = new Date()
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    
    const weeklyActivities = user.activities.filter(activity => 
      new Date(activity.date) >= weekAgo
    )

    const stats = {
      totalFlashcards: user.progress.totalFlashcards,
      totalQuizzes: user.progress.totalQuizzes,
      completedQuizzes: user.progress.completedQuizzes,
      studyStreak: user.progress.studyStreak,
      japaneseLevel: user.progress.japaneseLevel,
      kanjiLearned: user.progress.kanjiLearned,
      vocabularyCount: user.progress.vocabularyCount,
      totalStudyTime: user.progress.totalStudyTime,
      weeklyActivities: weeklyActivities.length,
      points: user.profile.points,
      level: user.profile.level,
      joinedDays: Math.floor((today - user.profile.joinedDate) / (1000 * 60 * 60 * 24)),
      stage: user.profile.stage,
      stageLevel: user.profile.stageLevel,
      totalXP: user.profile.totalXP,
      levelInfo: user.calculateLevelInfo(),
      achievements: user.profile.achievements,
      recentActivities: user.activities.slice(-10).reverse()
    }

    res.json(stats)
  } catch (error) {
    console.error('Dashboard stats error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get leaderboard
router.get('/leaderboard', auth, async (req, res) => {
  try {
    const users = await User.find({})
      .select('username profile.stage profile.stageLevel profile.totalXP profile.points progress.studyStreak progress.completedQuizzes')
      .sort({ 'profile.totalXP': -1, 'profile.points': -1 })
      .limit(50)

    const leaderboard = users.map(user => ({
      _id: user._id,
      username: user.username,
      stage: user.profile.stage,
      stageLevel: user.profile.stageLevel,
      totalXP: user.profile.totalXP,
      points: user.profile.points,
      studyStreak: user.progress.studyStreak,
      completedQuizzes: user.progress.completedQuizzes
    }))

    res.json(leaderboard)
  } catch (error) {
    console.error('Leaderboard error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router