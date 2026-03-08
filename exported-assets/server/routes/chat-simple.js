import express from 'express'
import { auth } from '../middleware/auth.js'
import ChatMessage from '../models/ChatMessage.js'
import User from '../models/User.js'
import { v4 as uuidv4 } from 'uuid'

const router = express.Router()

// OpenAI will be initialized only if needed
let openai = null

// Simple message endpoint with basic AI responses
router.post('/message', auth, async (req, res) => {
  try {
    const { message, sessionId } = req.body

    if (!message || message.trim() === '') {
      return res.status(400).json({ message: 'Message cannot be empty' })
    }

    const currentSessionId = sessionId || uuidv4()
    
    // Find or create chat session
    let chatSession = await ChatMessage.findOne({
      userId: req.user.userId,
      sessionId: currentSessionId
    })

    if (!chatSession) {
      chatSession = new ChatMessage({
        userId: req.user.userId,
        sessionId: currentSessionId,
        messages: [],
        context: {
          learningLevel: 'beginner',
          focusArea: 'conversation'
        }
      })
    }

    // Add user message
    const userMessage = {
      role: 'user',
      content: message.trim(),
      timestamp: new Date()
    }
    chatSession.messages.push(userMessage)

    // Generate AI response
    const aiResponse = await generateAIResponse(message.trim(), chatSession.messages)
    
    const assistantMessage = {
      role: 'assistant',
      content: aiResponse.text,
      timestamp: new Date(),
      metadata: {
        suggestions: aiResponse.suggestions || [],
        learningTips: aiResponse.tips || []
      }
    }
    chatSession.messages.push(assistantMessage)

    chatSession.context.lastActivity = new Date()
    await chatSession.save()

    // Track chat activity
    try {
      const user = await User.findById(req.user.userId)
      if (user) {
        const today = new Date()
        const lastStudy = user.progress.lastStudyDate
        
        // Update streak
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
        
        // Add activity
        user.activities.push({
          type: 'chat',
          category: 'Conversation Practice',
          score: 5,
          timeSpent: 0,
          date: today
        })
        
        // Add XP
        user.profile.totalXP += 5
        user.profile.points += 5
        
        // Update level info
        user.calculateLevelInfo()
        
        await user.save()
      }
    } catch (error) {
      console.error('Chat tracking error:', error)
    }

    res.json({
      sessionId: currentSessionId,
      userMessage,
      assistantMessage,
      suggestions: aiResponse.suggestions || []
    })
  } catch (error) {
    console.error('Send chat message error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// New session endpoint
router.post('/new-session', auth, async (req, res) => {
  try {
    const sessionId = uuidv4()
    const welcomeMessage = "🎌 こんにちは！Welcome to your Japanese learning journey! I'm here to help you with vocabulary, basic grammar, and simple conversations. What would you like to learn today?"

    const chatSession = new ChatMessage({
      userId: req.user.userId,
      sessionId,
      messages: [{
        role: 'assistant',
        content: welcomeMessage,
        timestamp: new Date()
      }],
      context: {
        learningLevel: 'beginner',
        focusArea: 'conversation'
      }
    })

    await chatSession.save()

    res.json({
      sessionId,
      messages: chatSession.messages,
      context: chatSession.context
    })
  } catch (error) {
    console.error('New chat session error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Simple suggestions endpoint
router.get('/suggestions', auth, async (req, res) => {
  try {
    const suggestions = [
      "こんにちは！元気ですか？ (Hello! How are you?)",
      "日本語を勉強しています (I'm studying Japanese)",
      "文法を教えてください (Please teach me grammar)",
      "単語を練習したいです (I want to practice vocabulary)",
      "会話の練習をしましょう (Let's practice conversation)"
    ]
    
    res.json({ suggestions })
  } catch (error) {
    console.error('Get suggestions error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// AI response generator
async function generateAIResponse(message, conversationHistory = []) {
  return generateSimpleResponse(message)
}

// Simple AI response generator (fallback)
function generateSimpleResponse(message) {
  const msg = message.toLowerCase()
  
  if (msg.includes('こんにちは') || msg.includes('hello') || msg.includes('hi')) {
    return {
      text: "こんにちは！元気です。日本語の勉強はどうですか？ (Hello! I'm fine. How is your Japanese study going?)",
      suggestions: ["元気です！(I'm fine!)", "もっと挨拶を教えて (Teach me more greetings)", "時間の挨拶は？(Time-based greetings?)"],
      tips: ["In Japanese, greetings change based on time of day"]
    }
  }
  
  if (msg.includes('grammar') || msg.includes('文法')) {
    return {
      text: "Japanese grammar can be tricky! Let's start with basic sentence structure: Subject + Object + Verb. For example: 私は寿司を食べます。(I eat sushi.) What specific grammar point would you like to learn?",
      suggestions: ["助詞について (About particles)", "動詞の活用 (Verb conjugation)", "文の構造 (Sentence structure)", "形容詞 (Adjectives)"],
      tips: ["Japanese follows SOV (Subject-Object-Verb) order"]
    }
  }
  
  if (msg.includes('vocabulary') || msg.includes('単語')) {
    return {
      text: "Great! Here are some useful daily vocabulary words:\n• 水 (mizu) - water\n• 本 (hon) - book\n• 学校 (gakkou) - school\n• 食べる (taberu) - to eat\n• 行く (iku) - to go\n\nWould you like to practice using these in sentences?",
      suggestions: ["文で練習 (Practice sentences)", "もっと単語 (More vocabulary)", "食べ物の単語 (Food words)", "家族の単語 (Family words)"],
      tips: ["Learn words in context, not isolation"]
    }
  }
  
  if (msg.includes('日本語') || msg.includes('japanese')) {
    return {
      text: "日本語の勉強、がんばってください！(Keep up with your Japanese studies!) What aspect would you like to focus on today? Hiragana, Katakana, Kanji, or conversation practice?",
      suggestions: ["ひらがな練習 (Hiragana practice)", "カタカナ練習 (Katakana practice)", "漢字勉強 (Kanji study)", "会話練習 (Conversation)"],
      tips: ["Regular practice is key to learning Japanese"]
    }
  }
  
  // Default response
  return {
    text: "ありがとうございます！(Thank you!) I'm here to help with your Japanese learning. You can ask me about:\n• Grammar explanations\n• Vocabulary practice\n• Conversation practice\n• Cultural tips\n\nWhat would you like to learn about?",
    suggestions: ["文法のヘルプ (Grammar help)", "単語練習 (Vocabulary)", "会話について (About conversation)", "文化について (About culture)"],
    tips: ["Don't be afraid to make mistakes - they help you learn!"]
  }
}

// Generate contextual suggestions based on user input
function generateContextualSuggestions(message) {
  const msg = message.toLowerCase()
  
  if (msg.includes('hello') || msg.includes('こんにちは')) {
    return ["元気です (I'm fine)", "日本語を勉強中 (Studying Japanese)", "今日は暑いです (It's hot today)"]
  }
  
  if (msg.includes('grammar') || msg.includes('文法')) {
    return ["助詞を教えて (Teach particles)", "動詞の活用 (Verb conjugation)", "敬語について (About keigo)"]
  }
  
  return ["もっと教えて (Teach me more)", "例文をください (Give me examples)", "練習したい (I want to practice)"]
}

export default router