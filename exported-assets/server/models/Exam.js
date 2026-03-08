import mongoose from 'mongoose'

const examSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['JLPT', 'MEXT', 'Kanji Kentei', 'Custom'],
    required: true
  },
  level: {
    type: String,
    enum: ['N5', 'N4', 'N3', 'N2', 'N1', 'Beginner', 'Intermediate', 'Advanced'],
    required: true
  },
  examDate: {
    type: Date,
    required: true
  },
  registrationDeadline: {
    type: Date,
    required: true
  },
  duration: {
    type: Number, // minutes
    required: true
  },
  totalQuestions: {
    type: Number,
    required: true
  },
  passingScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },

  venue: {
    type: String,
    required: true
  },
  officialWebsite: {
    type: String,
    required: true
  },
  registrationLink: {
    type: String
  },
  studyMaterials: [{
    title: String,
    type: {
      type: String,
      enum: ['textbook', 'practice_test', 'audio', 'video', 'past_papers']
    },
    url: String,
    description: String
  }],
  pastPapers: [{
    year: Number,
    session: String,
    downloadUrl: String,
    answerKey: String
  }],
  informationSource: {
    organization: String,
    lastUpdated: Date,
    sourceUrl: String
  },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming'
  },
  studyTips: [{
    category: {
      type: String,
      enum: ['Grammar', 'Vocabulary', 'Kanji', 'Reading', 'Listening', 'General'],
      required: true
    },
    tip: {
      type: String,
      required: true
    },
    priority: {
      type: String,
      enum: ['high', 'medium', 'low'],
      default: 'medium'
    }
  }],
  syllabus: [{
    topic: String,
    weight: Number // percentage
  }],
  enrolledStudents: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    enrolledAt: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['enrolled', 'appeared', 'passed', 'failed'],
      default: 'enrolled'
    }
  }],
  notices: [{
    title: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['info', 'warning', 'urgent', 'update'],
      default: 'info'
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    isActive: {
      type: Boolean,
      default: true
    }
  }],
  maxCapacity: {
    type: Number,
    default: 1000
  },
  year: {
    type: Number,
    required: true
  },
  session: {
    type: String,
    enum: ['July', 'December', 'Spring', 'Fall', 'Annual']
  }
}, {
  timestamps: true
})

// Index for efficient date-based queries
examSchema.index({ examDate: 1, status: 1 })
examSchema.index({ type: 1, level: 1 })

export default mongoose.model('Exam', examSchema)