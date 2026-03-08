import mongoose from 'mongoose'

const flashcardSchema = new mongoose.Schema({
  japanese: {
    type: String,
    required: true,
    trim: true
  },
  hiragana: {
    type: String,
    trim: true
  },
  romaji: {
    type: String,
    required: true,
    trim: true
  },
  english: {
    type: String,
    required: true,
    trim: true
  },
  exampleSentence: {
    japanese: {
      type: String,
      default: ''
    },
    english: {
      type: String,
      default: ''
    }
  },
  category: {
    type: String,
    enum: ['vocabulary', 'kanji', 'grammar', 'phrases', 'numbers', 'colors', 'family', 'food', 'travel'],
    default: 'vocabulary'
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  jlptLevel: {
    type: String,
    enum: ['N5', 'N4', 'N3', 'N2', 'N1'],
    default: 'N5'
  },
  tags: [{
    type: String,
    trim: true
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

// Indexes for better performance
flashcardSchema.index({ category: 1, difficulty: 1 })
flashcardSchema.index({ jlptLevel: 1 })
flashcardSchema.index({ isActive: 1 })

export default mongoose.model('Flashcard', flashcardSchema)