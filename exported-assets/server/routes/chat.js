import express from 'express'
import { auth } from '../middleware/auth.js'
import ChatMessage from '../models/ChatMessage.js'
import { v4 as uuidv4 } from 'uuid'

const router = express.Router()

// @route   GET /api/chat/sessions
// @desc    Get user chat sessions
// @access  Private
router.get('/sessions', auth, async (req, res) => {
  try {
    const sessions = await ChatMessage.find(
      { userId: req.user.userId },
      { sessionId: 1, 'context.lastActivity': 1, 'messages.0': 1 }
    )
    .sort({ 'context.lastActivity': -1 })
    .limit(10)

    res.json({ sessions })
  } catch (error) {
    console.error('Get chat sessions error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// @route   GET /api/chat/messages/:sessionId
// @desc    Get chat messages for a session
// @access  Private
router.get('/messages/:sessionId', auth, async (req, res) => {
  try {
    const { sessionId } = req.params
    const chatSession = await ChatMessage.findOne({
      userId: req.user.userId,
      sessionId
    })

    if (!chatSession) {
      return res.status(404).json({ message: 'Chat session not found' })
    }

    res.json({ messages: chatSession.messages, context: chatSession.context })
  } catch (error) {
    console.error('Get chat messages error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// @route   POST /api/chat/message
// @desc    Send a chat message and get AI response with suggestions
// @access  Private
router.post('/message', auth, async (req, res) => {
  try {
    const { message, sessionId, context = {} } = req.body

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
          learningLevel: context.learningLevel || 'beginner',
          focusArea: context.focusArea || 'conversation',
          learningGoals: context.learningGoals || [],
          weakAreas: context.weakAreas || []
        }
      })
    }

    // Add user message with analysis
    const messageAnalysis = analyzeUserMessage(message.trim(), chatSession.context)
    const userMessage = {
      role: 'user',
      content: message.trim(),
      timestamp: new Date(),
      metadata: {
        analysis: messageAnalysis,
        japaneseDetected: /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(message)
      }
    }
    chatSession.messages.push(userMessage)

    // Generate enhanced AI response with suggestions
    const aiResponseData = await generateEnhancedAIResponse(
      message.trim(),
      chatSession.messages,
      chatSession.context
    )

    // Add AI response
    const assistantMessage = {
      role: 'assistant',
      content: aiResponseData.response,
      timestamp: new Date(),
      metadata: {
        suggestions: aiResponseData.suggestions,
        learningTips: aiResponseData.learningTips,
        nextTopics: aiResponseData.nextTopics
      }
    }
    chatSession.messages.push(assistantMessage)

    // Update learning context based on conversation
    updateLearningContext(chatSession.context, messageAnalysis, aiResponseData)
    chatSession.context.lastActivity = new Date()
    
    await chatSession.save()

    res.json({
      sessionId: currentSessionId,
      userMessage,
      assistantMessage,
      context: chatSession.context,
      suggestions: aiResponseData.suggestions,
      learningInsights: aiResponseData.learningInsights
    })
  } catch (error) {
    console.error('Send chat message error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// @route   POST /api/chat/new-session
// @desc    Start a new chat session
// @access  Private
router.post('/new-session', auth, async (req, res) => {
  try {
    const { context = {} } = req.body
    const sessionId = uuidv4()

    const chatSession = new ChatMessage({
      userId: req.user.userId,
      sessionId,
      messages: [{
        role: 'assistant',
        content: getWelcomeMessage(context.learningLevel || 'beginner'),
        timestamp: new Date()
      }],
      context: {
        learningLevel: context.learningLevel || 'beginner',
        focusArea: context.focusArea || 'conversation'
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

// @route   DELETE /api/chat/session/:sessionId
// @desc    Delete a chat session
// @access  Private
router.delete('/session/:sessionId', auth, async (req, res) => {
  try {
    await ChatMessage.deleteOne({
      userId: req.user.userId,
      sessionId: req.params.sessionId
    })
    res.json({ message: 'Chat session deleted successfully' })
  } catch (error) {
    console.error('Delete chat session error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// @route   GET /api/chat/suggestions
// @desc    Get contextual suggestions for conversation
// @access  Private
router.get('/suggestions', auth, async (req, res) => {
  try {
    const { sessionId, context } = req.query
    
    let chatContext = {
      learningLevel: 'beginner',
      focusArea: 'conversation'
    }
    
    // Parse context if provided
    if (context) {
      try {
        const parsedContext = JSON.parse(context)
        chatContext = {
          learningLevel: parsedContext.learningLevel || 'beginner',
          focusArea: parsedContext.focusArea || 'conversation'
        }
      } catch (e) {
        console.log('Error parsing context:', e)
      }
    }
    
    // Override with session context if available
    if (sessionId) {
      const chatSession = await ChatMessage.findOne({
        userId: req.user.userId,
        sessionId
      })
      if (chatSession) {
        chatContext = chatSession.context
      }
    }
    
    const suggestions = generateContextualSuggestions(chatContext)
    res.json({ suggestions })
  } catch (error) {
    console.error('Get suggestions error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Enhanced AI response generator with suggestions and learning insights
async function generateEnhancedAIResponse(userMessage, messageHistory, context) {
  const message = userMessage.toLowerCase()
  const { learningLevel, focusArea } = context
  
  // Analyze message intent and complexity
  const intent = analyzeIntent(message)
  const complexity = analyzeComplexity(message)
  
  let response, suggestions, learningTips, nextTopics, learningInsights
  
  switch (intent) {
    case 'greeting':
      response = generateGreetingResponse(learningLevel)
      suggestions = getGreetingSuggestions(learningLevel)
      learningTips = getGreetingTips(learningLevel)
      break
    case 'grammar_question':
      response = generateGrammarResponse(message, learningLevel)
      suggestions = getGrammarSuggestions(message, learningLevel)
      learningTips = getGrammarTips(message, learningLevel)
      break
    case 'vocabulary_request':
      response = generateVocabularyResponse(message, learningLevel)
      suggestions = getVocabularySuggestions(learningLevel)
      learningTips = getVocabularyTips(learningLevel)
      break
    case 'translation_request':
      response = generateTranslationResponse(message, learningLevel)
      suggestions = getTranslationSuggestions(learningLevel)
      learningTips = getTranslationTips()
      break
    case 'cultural_question':
      response = generateCulturalResponse(message, learningLevel)
      suggestions = getCulturalSuggestions(learningLevel)
      learningTips = getCulturalTips()
      break
    case 'practice_request':
      response = generatePracticeResponse(focusArea, learningLevel)
      suggestions = getPracticeSuggestions(focusArea, learningLevel)
      learningTips = getPracticeTips(focusArea)
      break
    case 'correction_request':
      response = generateCorrectionResponse(message, learningLevel)
      suggestions = getCorrectionSuggestions(learningLevel)
      learningTips = getCorrectionTips()
      break
    default:
      const contextualData = generateContextualResponse(message, messageHistory, context)
      response = contextualData.response
      suggestions = contextualData.suggestions
      learningTips = contextualData.learningTips
  }
  
  // Generate next topics based on current conversation
  nextTopics = generateNextTopics(intent, learningLevel, focusArea)
  
  // Generate learning insights
  learningInsights = generateLearningInsights(messageHistory, context, complexity)
  
  return {
    response,
    suggestions: suggestions || [],
    learningTips: learningTips || [],
    nextTopics: nextTopics || [],
    learningInsights: learningInsights || {}
  }
}

function analyzeIntent(message) {
  if (/hello|hi|konnichiwa|ohayo|konbanwa/i.test(message)) return 'greeting'
  if (/grammar|bunpou|particle|verb|adjective/i.test(message)) return 'grammar_question'
  if (/vocabulary|word|tango|meaning/i.test(message)) return 'vocabulary_request'
  if (/(translate|what does|mean|imi)/i.test(message)) return 'translation_request'
  if (/culture|custom|tradition|manner/i.test(message)) return 'cultural_question'
  if (/practice|renshuu|exercise|drill/i.test(message)) return 'practice_request'
  if (/correct|fix|wrong|mistake/i.test(message)) return 'correction_request'
  return 'general'
}

function generateGreetingResponse(level) {
  const responses = {
    beginner: "こんにちは！(Konnichiwa!) Hello! I'm your Japanese learning assistant. Let's start with some basic conversation practice. What would you like to learn today?",
    intermediate: "こんにちは！元気ですか？(Konnichiwa! Genki desu ka?) I'm here to help you improve your Japanese. Would you like to practice conversation, grammar, or vocabulary today?",
    advanced: "こんにちは！今日は何を勉強したいですか？(Konnichiwa! Kyou wa nani wo benkyou shitai desu ka?) What aspect of Japanese would you like to focus on in our conversation today?"
  }
  return responses[level] || responses.beginner
}

function generateGrammarResponse(message, level) {
  if (/particle/i.test(message)) {
    return "Japanese particles are essential! Here are the main ones:\n\n• は (wa) - topic marker\n• が (ga) - subject marker\n• を (wo) - object marker\n• に (ni) - direction/time\n• で (de) - location of action\n• と (to) - and/with\n\nWhich particle would you like to practice?"
  }
  return "Grammar is the foundation of Japanese! What specific grammar point are you curious about? I can explain particles, verb conjugations, sentence structure, or any other grammar topic."
}

function generateVocabularyResponse(message, level) {
  const vocabSets = {
    beginner: "Let's learn basic vocabulary! Here are essential words:\n\n• 水 (mizu) - water\n• 食べ物 (tabemono) - food\n• 家 (ie) - house\n• 学校 (gakkou) - school\n• 友達 (tomodachi) - friend\n\nTry using these in sentences!",
    intermediate: "Great! Let's expand your vocabulary:\n\n• 経験 (keiken) - experience\n• 機会 (kikai) - opportunity\n• 環境 (kankyou) - environment\n• 文化 (bunka) - culture\n• 社会 (shakai) - society\n\nCan you make sentences with these?",
    advanced: "Excellent! Here are some advanced terms:\n\n• 洞察力 (dousatsuryoku) - insight\n• 独創性 (dokusousei) - originality\n• 効率性 (kouritssei) - efficiency\n• 持続可能 (jizoku kanou) - sustainable\n\nThese are useful for academic and business contexts."
  }
  return vocabSets[level] || vocabSets.beginner
}

function generateTranslationResponse(message, level) {
  return "I'd be happy to help with translation! Please provide the Japanese text you'd like translated, or the English text you'd like to translate to Japanese. I'll also explain the grammar and cultural context."
}

function generateCulturalResponse(message, level) {
  return "Japanese culture is fascinating! 🎌 I can explain customs like:\n\n• Bowing (お辞儀 - ojigi)\n• Gift-giving (お中元/お歳暮)\n• Business card exchange (名刺交換)\n• Seasonal greetings (季節の挨拶)\n• Table manners (食事のマナー)\n\nWhat cultural aspect interests you most?"
}

function generatePracticeResponse(focusArea, level) {
  const practices = {
    conversation: "Let's practice conversation! I'll give you scenarios to respond to. Try this: You're meeting a Japanese friend for coffee. How would you greet them and ask how they're doing?",
    vocabulary: "Vocabulary practice time! I'll give you words to use in sentences. Try using these words: 美しい (utsukushii - beautiful), 楽しい (tanoshii - fun), 難しい (muzukashii - difficult)",
    grammar: "Grammar practice! Let's work on sentence patterns. Try making sentences using the pattern: [Subject] は [Object] を [Verb]ます。",
    kanji: "Kanji practice! Let's learn stroke order and meanings. Today's kanji: 愛 (ai - love), 平和 (heiwa - peace), 自由 (jiyuu - freedom)"
  }
  return practices[focusArea] || practices.conversation
}

function generateCorrectionResponse(message, level) {
  return "I'd be happy to help correct your Japanese! Please share the sentence or phrase you'd like me to check, and I'll provide corrections with explanations."
}

function generateContextualResponse(message, messageHistory, context) {
  const recentMessages = messageHistory.slice(-3)
  const hasJapanese = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(message)
  
  let response, suggestions, learningTips
  
  if (hasJapanese) {
    response = "素晴らしい！(Subarashii!) Great job using Japanese! I can see you're practicing. Would you like me to check your grammar or help you expand on what you wrote?"
    suggestions = [
      "Please check my grammar",
      "Help me expand this sentence",
      "Teach me similar expressions",
      "What's the more natural way to say this?"
    ]
    learningTips = [
      "Using Japanese in conversation is the best way to improve!",
      "Don't worry about mistakes - they help you learn"
    ]
  } else {
    response = "That's an interesting question! Let me help you with that. Based on our conversation, I think you might benefit from practicing more conversation patterns. Would you like to try some role-play scenarios?"
    suggestions = [
      "Let's practice role-play",
      "Teach me conversation patterns",
      "Help with daily Japanese phrases",
      "Practice formal vs casual speech"
    ]
    learningTips = [
      "Regular conversation practice builds confidence",
      "Try to use new words in different contexts"
    ]
  }
  
  return { response, suggestions, learningTips }
}

// New helper functions for enhanced AI responses
function analyzeUserMessage(message, context) {
  const hasJapanese = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(message)
  const hasHiragana = /[\u3040-\u309F]/.test(message)
  const hasKatakana = /[\u30A0-\u30FF]/.test(message)
  const hasKanji = /[\u4E00-\u9FAF]/.test(message)
  const wordCount = message.split(/\s+/).length
  
  return {
    hasJapanese,
    hasHiragana,
    hasKatakana,
    hasKanji,
    wordCount,
    complexity: wordCount > 10 ? 'high' : wordCount > 5 ? 'medium' : 'low',
    intent: analyzeIntent(message)
  }
}

function analyzeComplexity(message) {
  const wordCount = message.split(/\s+/).length
  const hasComplexGrammar = /because|although|however|therefore|moreover/.test(message.toLowerCase())
  const hasJapanese = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(message)
  
  if (hasComplexGrammar || wordCount > 15) return 'advanced'
  if (hasJapanese || wordCount > 8) return 'intermediate'
  return 'beginner'
}

function updateLearningContext(context, messageAnalysis, aiResponseData) {
  // Update learning progress based on conversation
  if (messageAnalysis.hasJapanese) {
    context.japaneseUsageCount = (context.japaneseUsageCount || 0) + 1
  }
  
  if (messageAnalysis.hasKanji) {
    context.kanjiUsageCount = (context.kanjiUsageCount || 0) + 1
  }
  
  // Track focus areas
  if (!context.topicHistory) context.topicHistory = []
  context.topicHistory.push({
    intent: messageAnalysis.intent,
    timestamp: new Date(),
    complexity: messageAnalysis.complexity
  })
  
  // Keep only last 10 topics
  if (context.topicHistory.length > 10) {
    context.topicHistory = context.topicHistory.slice(-10)
  }
}

function generateContextualSuggestions(context) {
  const { learningLevel, focusArea } = context
  
  const baseSuggestions = {
    beginner: [
      "こんにちは！元気ですか？",
      "私の名前は...です。",
      "日本語を勉強しています。",
      "Help me with basic grammar",
      "Teach me daily vocabulary"
    ],
    intermediate: [
      "今日はいい天気ですね。",
      "週末は何をしましたか？",
      "日本の文化について教えてください。",
      "Help me with particle usage",
      "Practice keigo (polite language)"
    ],
    advanced: [
      "最近のニュースについてどう思いますか？",
      "日本の経済状況について話しましょう。",
      "ビジネス日本語を練習したいです。",
      "Help with advanced grammar patterns",
      "Practice academic Japanese"
    ]
  }
  
  return baseSuggestions[learningLevel] || baseSuggestions.beginner
}

function getGreetingSuggestions(level) {
  const suggestions = {
    beginner: ["How are you?", "What's your name?", "Nice to meet you", "Where are you from?"],
    intermediate: ["How was your day?", "What did you do today?", "Tell me about yourself", "What are your hobbies?"],
    advanced: ["What's your opinion on...", "Let's discuss current events", "Share your experiences", "What are your goals?"]
  }
  return suggestions[level] || suggestions.beginner
}

function getGreetingTips(level) {
  return [
    "In Japanese, greetings change based on time of day",
    "Bowing is an important part of Japanese greetings",
    "Use です/ます form for polite conversation"
  ]
}

function getGrammarSuggestions(message, level) {
  if (/particle/.test(message)) {
    return ["Practice は vs が", "Learn を usage", "Understand に and で", "Master と particle"]
  }
  return ["Ask about verb conjugation", "Learn adjective forms", "Practice sentence structure", "Understand tense usage"]
}

function getGrammarTips(message, level) {
  return [
    "Japanese grammar follows SOV (Subject-Object-Verb) order",
    "Particles are crucial for understanding relationships between words",
    "Practice with simple sentences first, then build complexity"
  ]
}

function getVocabularySuggestions(level) {
  const suggestions = {
    beginner: ["Learn family words", "Practice numbers", "Study colors", "Learn food vocabulary"],
    intermediate: ["Business vocabulary", "Travel phrases", "Emotion words", "Time expressions"],
    advanced: ["Academic terms", "Technical vocabulary", "Idiomatic expressions", "Literary language"]
  }
  return suggestions[level] || suggestions.beginner
}

function getVocabularyTips(level) {
  return [
    "Use spaced repetition for better retention",
    "Learn words in context, not isolation",
    "Practice using new words in sentences immediately"
  ]
}

function getTranslationSuggestions(level) {
  return ["Translate this to Japanese", "What does this mean?", "Help with nuanced meanings", "Explain cultural context"]
}

function getTranslationTips() {
  return [
    "Don't translate word-for-word; focus on meaning",
    "Consider cultural context in translations",
    "Some concepts don't have direct translations"
  ]
}

function getCulturalSuggestions(level) {
  return ["Japanese business etiquette", "Traditional festivals", "Modern Japanese society", "Food culture and manners"]
}

function getCulturalTips() {
  return [
    "Understanding culture helps with language learning",
    "Context is very important in Japanese communication",
    "Observe non-verbal communication cues"
  ]
}

function getPracticeSuggestions(focusArea, level) {
  const suggestions = {
    conversation: ["Role-play scenarios", "Daily conversation practice", "Phone conversation", "Meeting new people"],
    vocabulary: ["Word association games", "Synonym practice", "Context usage", "Word families"],
    grammar: ["Sentence building", "Error correction", "Pattern practice", "Complex structures"],
    kanji: ["Stroke order practice", "Radical recognition", "Compound words", "Reading practice"]
  }
  return suggestions[focusArea] || suggestions.conversation
}

function getPracticeTips(focusArea) {
  const tips = {
    conversation: ["Practice regularly, even if just 5 minutes daily", "Don't be afraid to make mistakes"],
    vocabulary: ["Use new words multiple times in different contexts", "Create personal connections to words"],
    grammar: ["Start with basic patterns and build complexity", "Understand the logic behind grammar rules"],
    kanji: ["Learn radicals first to understand character structure", "Practice writing by hand for better retention"]
  }
  return tips[focusArea] || tips.conversation
}

function getCorrectionSuggestions(level) {
  return ["Check my Japanese sentence", "Is this grammar correct?", "How can I say this better?", "What's the natural way?"]
}

function getCorrectionTips() {
  return [
    "Mistakes are learning opportunities",
    "Focus on one correction at a time",
    "Practice the corrected form multiple times"
  ]
}

function generateNextTopics(intent, level, focusArea) {
  const topicMap = {
    greeting: ['conversation_practice', 'cultural_etiquette', 'formal_language'],
    grammar_question: ['advanced_grammar', 'sentence_patterns', 'error_correction'],
    vocabulary_request: ['themed_vocabulary', 'kanji_study', 'compound_words'],
    translation_request: ['nuanced_meanings', 'cultural_context', 'idiomatic_expressions'],
    cultural_question: ['modern_culture', 'traditional_customs', 'social_norms'],
    practice_request: ['role_play', 'conversation_scenarios', 'skill_assessment']
  }
  
  return topicMap[intent] || ['general_practice', 'review_session', 'new_topic']
}

function generateLearningInsights(messageHistory, context, complexity) {
  const recentMessages = messageHistory.slice(-5)
  const userMessages = recentMessages.filter(m => m.role === 'user')
  const japaneseUsage = userMessages.filter(m => 
    /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(m.content)
  ).length
  
  return {
    japaneseUsageRate: userMessages.length > 0 ? japaneseUsage / userMessages.length : 0,
    conversationLength: messageHistory.length,
    currentComplexity: complexity,
    suggestedNextLevel: complexity === 'beginner' ? 'intermediate' : complexity === 'intermediate' ? 'advanced' : 'advanced',
    strongAreas: context.topicHistory ? 
      [...new Set(context.topicHistory.slice(-5).map(t => t.intent))] : [],
    improvementAreas: complexity === 'beginner' ? ['grammar_basics', 'vocabulary_building'] : 
                     complexity === 'intermediate' ? ['complex_grammar', 'natural_expressions'] : 
                     ['advanced_nuances', 'cultural_fluency']
  }
}

function getWelcomeMessage(level) {
  const welcomes = {
    beginner: "🎌 こんにちは！Welcome to your Japanese learning journey! I'm here to help you with vocabulary, basic grammar, and simple conversations. Let's start with something fun - what interests you most about Japanese?",
    intermediate: "🎌 こんにちは！Ready to take your Japanese to the next level? I can help you with complex grammar, nuanced vocabulary, and natural conversation flow. What would you like to practice today?",
    advanced: "🎌 こんにちは！Let's refine your Japanese skills together. I can assist with advanced grammar patterns, business Japanese, cultural nuances, and native-like expressions. 今日は何について話しましょうか？"
  }
  return welcomes[level] || welcomes.beginner
}

export default router
