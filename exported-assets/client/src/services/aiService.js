// KAIRO AI - Smart Local Assistant

class AIService {
  constructor() {
    this.conversationHistory = []
    this.knowledgeBase = this.initializeKnowledge()
  }

  async getChatResponse(message) {
    this.conversationHistory.push({ role: 'user', content: message })
    
    // Get smart local response
    const response = this.getSmartResponse(message)
    
    this.conversationHistory.push({ role: 'assistant', content: response })
    return response
  }

  initializeKnowledge() {
    return {
      greetings: {
        patterns: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'],
        responses: [
          "Hello! I'm KAIRO AI, your educational companion. What would you like to learn today?",
          "Hi there! Ready to explore some new knowledge together?",
          "Hey! I'm here to help you learn. What subject interests you?",
          "Greetings! Let's make learning fun today. What can I help you with?"
        ]
      },
      japanese: {
        patterns: ['japanese', 'hiragana', 'katakana', 'kanji', 'nihongo'],
        responses: {
          hiragana: "Hiragana (ひらがな) is the basic Japanese writing system! Start with the vowels: あ (a), い (i), う (u), え (e), お (o). Each character represents a sound. Would you like to practice writing them?",
          katakana: "Katakana (カタカナ) is used for foreign words! The basic vowels are: ア (a), イ (i), ウ (u), エ (e), オ (o). For example: コーヒー (koohii) means coffee!",
          kanji: "Kanji (漢字) are Chinese characters used in Japanese. Start with simple ones: 人 (person), 日 (day/sun), 本 (book). Each kanji has meaning and pronunciation!",
          general: "Japanese has three writing systems: Hiragana (basic sounds), Katakana (foreign words), and Kanji (meaning characters). Which one interests you most?"
        }
      },
      math: {
        patterns: ['math', 'mathematics', 'calculate', 'solve', 'equation', 'algebra', 'geometry'],
        responses: {
          general: "Math is the language of logic! I can help with arithmetic, algebra, geometry, and more. What specific problem are you working on?",
          algebra: "Algebra is about finding unknown values! For example: if 2x + 3 = 7, then 2x = 4, so x = 2. What algebra concept do you need help with?",
          geometry: "Geometry deals with shapes and space! Triangles, circles, angles - it's all about understanding spatial relationships. What geometry topic interests you?"
        }
      },
      science: {
        patterns: ['science', 'physics', 'chemistry', 'biology', 'photosynthesis', 'gravity', 'atom'],
        responses: {
          physics: "Physics explains how the universe works! From gravity to electricity, it's all about forces and energy. What physics concept can I explain?",
          chemistry: "Chemistry is about atoms and molecules! Everything is made of elements that combine in fascinating ways. What chemical concept interests you?",
          biology: "Biology studies life itself! From tiny cells to complex ecosystems, life is amazing. What biological process would you like to understand?",
          photosynthesis: "Photosynthesis is how plants make food from sunlight! The equation is: 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂. Plants literally eat sunlight!",
          gravity: "Gravity is the force that keeps us grounded! On Earth, it accelerates objects at 9.8 m/s². Fun fact: you'd weigh less on the Moon!"
        }
      },
      programming: {
        patterns: ['programming', 'code', 'python', 'javascript', 'html', 'css', 'coding'],
        responses: {
          python: "Python is perfect for beginners! It's readable and powerful. Example: print('Hello World') - that's your first program! What Python concept interests you?",
          javascript: "JavaScript makes websites interactive! Example: alert('Hello!') shows a popup. It runs in browsers and servers. What JS topic do you want to explore?",
          general: "Programming is like learning a new language to talk to computers! Each language has its strengths. Which programming language interests you?"
        }
      }
    }
  }

  getSmartResponse(message) {
    const msg = message.toLowerCase().trim()
    
    // Handle math calculations first
    if (this.isMathCalculation(msg)) {
      return this.solveMath(msg)
    }
    
    // Check for specific topics
    for (const [topic, data] of Object.entries(this.knowledgeBase)) {
      if (data.patterns.some(pattern => msg.includes(pattern))) {
        return this.getTopicResponse(topic, msg, data)
      }
    }
    
    // Handle question patterns
    if (msg.startsWith('what is')) {
      return this.handleWhatIs(msg)
    }
    
    if (msg.startsWith('how to') || msg.startsWith('how do')) {
      return this.handleHowTo(msg)
    }
    
    if (msg.startsWith('why')) {
      return this.handleWhy(msg)
    }
    
    // Handle learning requests
    if (msg.includes('learn') || msg.includes('study') || msg.includes('teach')) {
      return this.handleLearning(msg)
    }
    
    // Default conversational response
    return this.getConversationalResponse(message)
  }
  
  isMathCalculation(msg) {
    return /\d+\s*[+\-*/^]\s*\d+/.test(msg)
  }
  
  solveMath(msg) {
    try {
      const calculation = msg.match(/\d+\s*[+\-*/]\s*\d+/)[0]
      const result = eval(calculation.replace(/\s/g, ''))
      return `${calculation} = ${result}\n\nMath tip: Always double-check your calculations! Need help with more complex math problems?`
    } catch (e) {
      return "I can help you solve math problems! Try writing it like: 5 + 3 or 12 * 4. What calculation do you need help with?"
    }
  }
  
  getTopicResponse(topic, msg, data) {
    if (topic === 'greetings') {
      return data.responses[Math.floor(Math.random() * data.responses.length)]
    }
    
    if (topic === 'japanese') {
      if (msg.includes('hiragana')) return data.responses.hiragana
      if (msg.includes('katakana')) return data.responses.katakana
      if (msg.includes('kanji')) return data.responses.kanji
      return data.responses.general
    }
    
    if (topic === 'math') {
      if (msg.includes('algebra')) return data.responses.algebra
      if (msg.includes('geometry')) return data.responses.geometry
      return data.responses.general
    }
    
    if (topic === 'science') {
      if (msg.includes('physics')) return data.responses.physics
      if (msg.includes('chemistry')) return data.responses.chemistry
      if (msg.includes('biology')) return data.responses.biology
      if (msg.includes('photosynthesis')) return data.responses.photosynthesis
      if (msg.includes('gravity')) return data.responses.gravity
      return "Science is fascinating! Whether it's physics, chemistry, or biology, I can help explain concepts clearly. What scientific topic interests you?"
    }
    
    if (topic === 'programming') {
      if (msg.includes('python')) return data.responses.python
      if (msg.includes('javascript')) return data.responses.javascript
      return data.responses.general
    }
    
    return "I'm here to help you learn! What specific aspect would you like to explore?"
  }
  
  handleWhatIs(msg) {
    const topic = msg.replace('what is', '').trim()
    const responses = {
      'ai': "AI (Artificial Intelligence) is technology that can learn and make decisions like humans! I'm an example of educational AI designed to help you learn.",
      'photosynthesis': "Photosynthesis is how plants convert sunlight into energy! They use CO₂, water, and sunlight to make glucose and oxygen.",
      'gravity': "Gravity is the force that attracts objects toward each other. On Earth, it pulls everything toward the center at 9.8 m/s²!",
      'programming': "Programming is writing instructions for computers using special languages like Python, JavaScript, or HTML!"
    }
    
    return responses[topic] || `Great question about ${topic}! I'd love to explain it. Could you be more specific about what aspect you'd like to understand?`
  }
  
  handleHowTo(msg) {
    const task = msg.replace(/how (to|do)/, '').trim()
    return `Learning how to ${task} is a great goal! I can break it down into simple steps. What's your current experience level with this topic?`
  }
  
  handleWhy(msg) {
    return "That's an excellent 'why' question! Understanding the reasoning behind concepts is key to deep learning. What specific concept would you like me to explain the reasoning for?"
  }
  
  handleLearning(msg) {
    return "I love helping people learn! Whether it's Japanese, math, science, or programming, I can adapt to your learning style. What subject would you like to focus on today?"
  }
  
  getConversationalResponse(message) {
    const responses = [
      `Interesting question about "${message}"! I specialize in educational topics. Could you tell me more about what you'd like to learn?`,
      `I'd be happy to help you understand that better! What specific aspect of "${message}" would you like me to explain?`,
      `That's a thoughtful question! As your educational AI, I can help break down complex topics. What would you like to explore about "${message}"?`,
      `Great topic to discuss! I can provide explanations, examples, and practice problems. What specific help do you need with "${message}"?`
    ]
    
    return responses[Math.floor(Math.random() * responses.length)]
  }




}

export default new AIService()