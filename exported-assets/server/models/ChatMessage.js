import mongoose from 'mongoose'

const chatMessageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sessionId: {
    type: String,
    required: true
  },
  messages: [{
    role: {
      type: String,
      enum: ['user', 'assistant', 'system'],
      required: true
    },
    content: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    metadata: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      default: {}
    }
  }],
  context: {
    learningLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner'
    },
    focusArea: {
      type: String,
      enum: ['vocabulary', 'grammar', 'conversation', 'kanji', 'culture'],
      default: 'conversation'
    },
    learningGoals: [{
      type: String,
      enum: ['jlpt_n5', 'jlpt_n4', 'jlpt_n3', 'jlpt_n2', 'jlpt_n1', 'business_japanese', 'travel_japanese', 'anime_understanding', 'academic_japanese']
    }],
    weakAreas: [{
      type: String,
      enum: ['particles', 'verb_conjugation', 'kanji_reading', 'listening', 'speaking', 'formal_language', 'casual_language']
    }],
    japaneseUsageCount: {
      type: Number,
      default: 0
    },
    kanjiUsageCount: {
      type: Number,
      default: 0
    },
    topicHistory: [{
      intent: String,
      timestamp: Date,
      complexity: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced']
      }
    }],
    lastActivity: {
      type: Date,
      default: Date.now
    },
    sessionStats: {
      totalMessages: {
        type: Number,
        default: 0
      },
      japaneseMessages: {
        type: Number,
        default: 0
      },
      averageComplexity: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        default: 'beginner'
      }
    }
  }
}, {
  timestamps: true
})

chatMessageSchema.index({ userId: 1, sessionId: 1 })
chatMessageSchema.index({ 'context.lastActivity': -1 })

export default mongoose.model('ChatMessage', chatMessageSchema)