import express from 'express'
import { auth } from '../middleware/auth.js'

const router = express.Router()

// Sample quiz data
const sampleQuizzes = [
  {
    id: 1,
    title: "Basic Japanese Greetings",
    description: "Test your knowledge of common Japanese greetings",
    category: "phrases",
    difficulty: "beginner",
    jlptLevel: "N5",
    questions: [
      {
        id: 1,
        question: "How do you say 'Hello' in Japanese?",
        type: "multiple-choice",
        options: ["こんにちは", "さようなら", "ありがとう", "すみません"],
        correctAnswer: 0,
        explanation: "こんにちは (Konnichiwa) is the standard greeting for 'Hello' or 'Good afternoon' in Japanese."
      },
      {
        id: 2,
        question: "What is the polite way to say 'Thank you'?",
        type: "multiple-choice",
        options: ["ありがとう", "ありがとうございます", "どうも", "すみません"],
        correctAnswer: 1,
        explanation: "ありがとうございます is the most polite way to express gratitude in Japanese."
      }
    ],
    timeLimit: 300, // 5 minutes
    passingScore: 70
  },
  {
    id: 2,
    title: "Japanese Numbers 1-10",
    description: "Practice counting in Japanese",
    category: "numbers",
    difficulty: "beginner",
    jlptLevel: "N5",
    questions: [
      {
        id: 1,
        question: "What number is 'いち'?",
        type: "multiple-choice",
        options: ["1", "2", "3", "4"],
        correctAnswer: 0,
        explanation: "いち (ichi) means 'one' in Japanese."
      },
      {
        id: 2,
        question: "How do you say 'five' in Japanese?",
        type: "multiple-choice",
        options: ["よん", "ご", "ろく", "なな"],
        correctAnswer: 1,
        explanation: "ご (go) means 'five' in Japanese."
      }
    ],
    timeLimit: 240, // 4 minutes
    passingScore: 80
  }
]

// @route   GET /api/quizzes
// @desc    Get all quizzes with filtering options
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { category, difficulty, jlptLevel, page = 1, limit = 10 } = req.query

    let filteredQuizzes = [...sampleQuizzes]

    // Apply filters
    if (category) {
      filteredQuizzes = filteredQuizzes.filter(quiz => quiz.category === category)
    }
    if (difficulty) {
      filteredQuizzes = filteredQuizzes.filter(quiz => quiz.difficulty === difficulty)
    }
    if (jlptLevel) {
      filteredQuizzes = filteredQuizzes.filter(quiz => quiz.jlptLevel === jlptLevel)
    }

    // Simple pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + parseInt(limit)
    const paginatedQuizzes = filteredQuizzes.slice(startIndex, endIndex)

    res.json({
      quizzes: paginatedQuizzes,
      pagination: {
        total: filteredQuizzes.length,
        page: parseInt(page),
        pages: Math.ceil(filteredQuizzes.length / limit),
        hasNext: endIndex < filteredQuizzes.length,
        hasPrev: page > 1
      },
      filters: {
        categories: ['phrases', 'vocabulary', 'kanji', 'grammar', 'numbers', 'colors', 'family', 'food', 'travel'],
        difficulties: ['beginner', 'intermediate', 'advanced'],
        jlptLevels: ['N5', 'N4', 'N3', 'N2', 'N1']
      }
    })
  } catch (error) {
    console.error('Get quizzes error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// @route   GET /api/quizzes/:id
// @desc    Get specific quiz by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const quizId = parseInt(req.params.id)
    const quiz = sampleQuizzes.find(q => q.id === quizId)

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' })
    }

    res.json(quiz)
  } catch (error) {
    console.error('Get quiz error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// @route   POST /api/quizzes/:id/submit
// @desc    Submit quiz answers
// @access  Private
router.post('/:id/submit', auth, async (req, res) => {
  try {
    const quizId = parseInt(req.params.id)
    const { answers } = req.body

    const quiz = sampleQuizzes.find(q => q.id === quizId)
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' })
    }

    // Calculate score
    let correctAnswers = 0
    const results = quiz.questions.map((question, index) => {
      const isCorrect = answers[index] === question.correctAnswer
      if (isCorrect) correctAnswers++
      return {
        questionId: question.id,
        selectedAnswer: answers[index],
        correctAnswer: question.correctAnswer,
        isCorrect,
        explanation: question.explanation
      }
    })

    const score = Math.round((correctAnswers / quiz.questions.length) * 100)
    const passed = score >= quiz.passingScore

    res.json({
      quizId: quiz.id,
      title: quiz.title,
      score,
      passed,
      totalQuestions: quiz.questions.length,
      correctAnswers,
      results,
      timeSpent: req.body.timeSpent || null
    })
  } catch (error) {
    console.error('Submit quiz error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router
