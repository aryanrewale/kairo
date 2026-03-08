import express from 'express'
import { auth } from '../middleware/auth.js'
import Flashcard from '../models/Flashcard.js'

const router = express.Router()

// Sample flashcard data
const sampleFlashcards = [
  {
    japanese: "こんにちは",
    hiragana: "こんにちは",
    romaji: "konnichiwa",
    english: "Hello/Good afternoon",
    exampleSentence: {
      japanese: "こんにちは、田中さん。",
      english: "Hello, Mr. Tanaka."
    },
    category: "phrases",
    difficulty: "beginner",
    jlptLevel: "N5"
  },
  {
    japanese: "ありがとう",
    hiragana: "ありがとう",
    romaji: "arigatou",
    english: "Thank you",
    exampleSentence: {
      japanese: "ありがとうございます。",
      english: "Thank you very much."
    },
    category: "phrases",
    difficulty: "beginner",
    jlptLevel: "N5"
  },
  {
    japanese: "学校",
    hiragana: "がっこう",
    romaji: "gakkou",
    english: "School",
    exampleSentence: {
      japanese: "学校に行きます。",
      english: "I go to school."
    },
    category: "vocabulary",
    difficulty: "beginner",
    jlptLevel: "N5"
  },
  {
    japanese: "食べる",
    hiragana: "たべる",
    romaji: "taberu",
    english: "To eat",
    exampleSentence: {
      japanese: "りんごを食べます。",
      english: "I eat an apple."
    },
    category: "vocabulary",
    difficulty: "beginner",
    jlptLevel: "N5"
  },
  {
    japanese: "飲む",
    hiragana: "のむ",
    romaji: "nomu",
    english: "To drink",
    exampleSentence: {
      japanese: "水を飲みます。",
      english: "I drink water."
    },
    category: "vocabulary",
    difficulty: "beginner",
    jlptLevel: "N5"
  }
]

// @route   GET /api/flashcards
// @desc    Get flashcards with filtering options
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { category, difficulty, jlptLevel, page = 1, limit = 20 } = req.query
    
    // For demo purposes, return sample data
    let filteredCards = [...sampleFlashcards]
    
    // Apply filters
    if (category) {
      filteredCards = filteredCards.filter(card => card.category === category)
    }
    if (difficulty) {
      filteredCards = filteredCards.filter(card => card.difficulty === difficulty)
    }
    if (jlptLevel) {
      filteredCards = filteredCards.filter(card => card.jlptLevel === jlptLevel)
    }
    
    // Simple pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + parseInt(limit)
    const paginatedCards = filteredCards.slice(startIndex, endIndex)
    
    res.json({
      flashcards: paginatedCards,
      pagination: {
        total: filteredCards.length,
        page: parseInt(page),
        pages: Math.ceil(filteredCards.length / limit),
        hasNext: endIndex < filteredCards.length,
        hasPrev: page > 1
      },
      filters: {
        categories: ['vocabulary', 'kanji', 'grammar', 'phrases', 'numbers', 'colors', 'family', 'food', 'travel'],
        difficulties: ['beginner', 'intermediate', 'advanced'],
        jlptLevels: ['N5', 'N4', 'N3', 'N2', 'N1']
      }
    })
  } catch (error) {
    console.error('Get flashcards error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// @route   GET /api/flashcards/random
// @desc    Get random flashcard for study
// @access  Private
router.get('/random', auth, async (req, res) => {
  try {
    const { difficulty = 'beginner', jlptLevel = 'N5' } = req.query
    
    // Filter by difficulty and JLPT level
    let filteredCards = sampleFlashcards.filter(card => 
      card.difficulty === difficulty && card.jlptLevel === jlptLevel
    )
    
    // If no cards match, use all sample cards
    if (filteredCards.length === 0) {
      filteredCards = sampleFlashcards
    }
    
    // Get random card
    const randomIndex = Math.floor(Math.random() * filteredCards.length)
    const randomCard = filteredCards[randomIndex]
    
    res.json(randomCard)
  } catch (error) {
    console.error('Get random flashcard error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// @route   POST /api/flashcards
// @desc    Create new flashcard (Admin only - placeholder)
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    // For now, just return success message
    res.json({ message: 'Flashcard creation endpoint - Admin functionality coming soon!' })
  } catch (error) {
    console.error('Create flashcard error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router