import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  profile: {
    avatar: { type: String, default: '' },
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    bio: { type: String, default: '' },
    level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
    studyGoal: { type: String, enum: ['casual', 'daily', 'intensive', 'exam'], default: 'daily' },
    preferredLearningStyle: { type: String, enum: ['visual', 'auditory', 'reading', 'mixed'], default: 'visual' },
    nativeLanguage: { type: String, default: 'English' },
    points: { type: Number, default: 0 },
    streak: { type: Number, default: 0 },
    lastActive: { type: Date, default: Date.now },
    joinedDate: { type: Date, default: Date.now },
    stage: { type: String, enum: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond'], default: 'Bronze' },
    stageLevel: { type: Number, default: 1, min: 1, max: 5 },
    totalXP: { type: Number, default: 0 },
    achievements: [{ id: String, name: String, description: String, icon: String, unlockedAt: { type: Date, default: Date.now } }]
  },
  progress: {
    totalFlashcards: { type: Number, default: 0 },
    totalQuizzes: { type: Number, default: 0 },
    completedQuizzes: { type: Number, default: 0 },
    studyStreak: { type: Number, default: 0 },
    japaneseLevel: { type: String, default: 'N5' },
    kanjiLearned: { type: Number, default: 0 },
    vocabularyCount: { type: Number, default: 0 },
    totalStudyTime: { type: Number, default: 0 },
    lastStudyDate: { type: Date, default: null },
    dailyGoal: { type: Number, default: 30 },
    weeklyQuizGoal: { type: Number, default: 5 },
    kanjiGoal: { type: Number, default: 100 }
  },
  activities: [{
    type: { type: String, enum: ['flashcard', 'quiz', 'study_session', 'chat'], required: true },
    category: { type: String, default: '' },
    score: { type: Number, default: 0 },
    timeSpent: { type: Number, default: 0 },
    date: { type: Date, default: Date.now }
  }],
  preferences: {
    language: { type: String, default: 'en' },
    notifications: { type: Boolean, default: true },
    theme: { type: String, enum: ['light', 'dark'], default: 'dark' }
  }
}, { timestamps: true })

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next()
  
  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    next(error)
  }
})

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

// Level system methods
userSchema.methods.calculateLevelInfo = function() {
  const xpThresholds = {
    Bronze: [0, 100, 250, 450, 700],
    Silver: [1000, 1400, 1900, 2500, 3200],
    Gold: [4000, 5000, 6200, 7600, 9200],
    Platinum: [11000, 13000, 15500, 18500, 22000],
    Diamond: [26000, 31000, 37000, 44000, 52000]
  }
  
  const totalXP = this.profile.totalXP || 0
  let currentStage = 'Bronze'
  let currentLevel = 1
  
  // Find current stage and level
  for (const [stage, thresholds] of Object.entries(xpThresholds)) {
    for (let i = 0; i < thresholds.length; i++) {
      if (totalXP >= thresholds[i]) {
        currentStage = stage
        currentLevel = i + 1
      }
    }
  }
  
  // Update user's stage and level
  this.profile.stage = currentStage
  this.profile.stageLevel = currentLevel
  
  // Calculate progress to next level
  const currentThresholds = xpThresholds[currentStage]
  const currentLevelXP = currentThresholds[currentLevel - 1] || 0
  const nextLevelXP = currentLevel < 5 ? currentThresholds[currentLevel] : 
    (currentStage === 'Diamond' ? currentThresholds[4] : xpThresholds[this.getNextStage()][0])
  
  const progress = Math.min(((totalXP - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100, 100)
  
  return {
    stage: currentStage,
    level: currentLevel,
    totalXP,
    currentLevelXP,
    nextLevelXP,
    progress: isNaN(progress) ? 0 : progress
  }
}

userSchema.methods.getNextStage = function() {
  const stages = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond']
  const currentIndex = stages.indexOf(this.profile.stage)
  return currentIndex < stages.length - 1 ? stages[currentIndex + 1] : 'Diamond'
}

// Remove password from JSON output
userSchema.methods.toJSON = function() {
  const userObject = this.toObject()
  delete userObject.password
  return userObject
}

export default mongoose.model('User', userSchema)