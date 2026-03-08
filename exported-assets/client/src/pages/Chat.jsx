import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../context/AuthContext'
import { Send, MessageCircle, Lightbulb, ChevronUp, Paperclip, FileText, Image, Mic, MoreHorizontal, Video } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import aiService from '../services/aiService'

const Chat = () => {
  const [aiMessages, setAiMessages] = useState([])
  const [friendsMessages, setFriendsMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [sessionId, setSessionId] = useState(null)
  const [suggestions, setSuggestions] = useState([])
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [showAttachMenu, setShowAttachMenu] = useState(false)
  const [studyModePopup, setStudyModePopup] = useState(null)
  const [chatMode, setChatMode] = useState('friends') // 'friends' or 'ai'
  const [showAINotice, setShowAINotice] = useState(false)
  const [selectedHelpType, setSelectedHelpType] = useState(null) // 'live', 'community', 'problem', 'leaderboard', 'online'
  const messagesEndRef = useRef(null)

  // Mock leaderboard data
  const leaderboardMembers = [
    { id: 1, name: 'Sakura_Chan', level: 'Advanced', xp: 2850, streak: 45, avatar: '🌸', status: 'online' },
    { id: 2, name: 'TokyoDreamer', level: 'Intermediate', xp: 1920, streak: 23, avatar: '🗼', status: 'online' },
    { id: 3, name: 'KanjiMaster', level: 'Expert', xp: 3200, streak: 67, avatar: '📚', status: 'away' },
    { id: 4, name: 'HiraganaHero', level: 'Beginner', xp: 850, streak: 12, avatar: '✨', status: 'online' },
    { id: 5, name: 'NihongoNinja', level: 'Advanced', xp: 2650, streak: 34, avatar: '🥷', status: 'offline' },
    { id: 6, name: 'AnimeStudent', level: 'Intermediate', xp: 1450, streak: 18, avatar: '🎌', status: 'online' }
  ]

  // Mock online users data
  const onlineUsers = [
    { id: 7, name: 'StudyBuddy22', level: 'Beginner', joinedAgo: '2 min ago', avatar: '🌟', isFriend: false },
    { id: 8, name: 'JapanLover99', level: 'Intermediate', joinedAgo: '5 min ago', avatar: '🎋', isFriend: false },
    { id: 9, name: 'KawaiiLearner', level: 'Advanced', joinedAgo: '8 min ago', avatar: '🦋', isFriend: true },
    { id: 10, name: 'SushiSensei', level: 'Expert', joinedAgo: '12 min ago', avatar: '🍣', isFriend: false },
    { id: 11, name: 'MangaReader', level: 'Intermediate', joinedAgo: '15 min ago', avatar: '📖', isFriend: false },
    { id: 12, name: 'TokyoVibes', level: 'Beginner', joinedAgo: '18 min ago', avatar: '🏮', isFriend: true },
    { id: 13, name: 'ZenMaster', level: 'Advanced', joinedAgo: '22 min ago', avatar: '🧘', isFriend: false },
    { id: 14, name: 'RamenFan', level: 'Intermediate', joinedAgo: '25 min ago', avatar: '🍜', isFriend: false }
  ]

  const { user } = useAuth()
  const navigate = useNavigate()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }
    const handleClickOutside = (e) => {
      if (!e.target.closest('.relative')) {
        setShowAttachMenu(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    document.addEventListener('click', handleClickOutside)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [aiMessages, friendsMessages])

  useEffect(() => {
    initializeChat()
  }, [])

  const initializeChat = async () => {
    setAiMessages([])
    setFriendsMessages([])
    loadSuggestions()
  }

  const loadSuggestions = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      
      const response = await fetch('/api/chat/suggestions', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      
      if (response.ok) {
        const data = await response.json()
        setSuggestions(data.suggestions || [])
      }
    } catch (error) {
      console.error('Error loading suggestions:', error)
      setSuggestions([
        "こんにちは！元気ですか？ (Hello! How are you?)",
        "日本語を勉強しています (I'm studying Japanese)",
        "文法を教えてください (Please teach me grammar)",
        "単語を練習したいです (I want to practice vocabulary)",
        "会話の練習をしましょう (Let's practice conversation)"
      ])
    }
  }

  const handleSendMessage = async (e, messageText = null) => {
    e?.preventDefault()
    const messageToSend = messageText || inputMessage
    if (!messageToSend.trim() || loading) return

    const userMessage = {
      id: Date.now(),
      text: messageToSend,
      sender: 'user',
      timestamp: new Date().toISOString()
    }

    // Add message to appropriate chat
    if (chatMode === 'ai') {
      setAiMessages(prev => [...prev, userMessage])
      setLoading(true)
      
      try {
        const aiResponse = await getAIResponse(messageToSend)
        
        const botMessage = {
          id: Date.now() + 1,
          text: aiResponse,
          sender: 'assistant',
          timestamp: new Date().toISOString()
        }
        setAiMessages(prev => [...prev, botMessage])
      } catch (error) {
        const response = getSimpleResponse(messageToSend)
        const botMessage = {
          id: Date.now() + 1,
          text: response,
          sender: 'assistant',
          timestamp: new Date().toISOString()
        }
        setAiMessages(prev => [...prev, botMessage])
      }
    } else {
      setFriendsMessages(prev => [...prev, userMessage])
    }
    
    setInputMessage('')
    
    setLoading(false)
  }

  const getAIResponse = async (message) => {
    return await aiService.getChatResponse(message)
  }
  
  const getDirectAnswer = (message) => {
    const msg = message.toLowerCase()
    
    // Check if question is study-related
    const studyKeywords = ['learn', 'study', 'homework', 'assignment', 'exam', 'test', 'quiz', 'math', 'science', 'history', 'geography', 'literature', 'physics', 'chemistry', 'biology', 'programming', 'code', 'language', 'grammar', 'vocabulary', 'japanese', 'english', 'education', 'school', 'university', 'college', 'research', 'book', 'reading', 'writing', 'calculate', 'solve', 'explain', 'define', 'formula', 'theory', 'concept', 'hiragana', 'katakana', 'kanji']
    
    const isStudyRelated = studyKeywords.some(keyword => msg.includes(keyword))
    
    // Non-study topics to redirect
    const nonStudyTopics = ['love', 'relationship', 'dating', 'personal life', 'politics', 'religion', 'gossip', 'entertainment', 'movies', 'games', 'sports', 'weather', 'food', 'shopping', 'money', 'job', 'work', 'career', 'friend', 'social', 'travel', 'culture']
    const isNonStudy = nonStudyTopics.some(topic => msg.includes(topic)) && !isStudyRelated
    
    if (isNonStudy) {
      return "I'm focused on helping with educational topics! 📚 Let's talk about something related to learning:\n\n🎌 Japanese language\n🔢 Mathematics\n🔬 Science\n💻 Programming\n📖 History & Literature\n\nWhat would you like to study today?"
    }
    
    // Educational greetings
    if (msg.includes('tell me about yourself') || msg.includes('who are you') || msg.includes('what are you')) {
      return "I'm KAIRO AI, your educational assistant! 🎌 I specialize in Japanese learning, math, science, programming, and academic subjects. What would you like to study?"
    }
    
    if (msg.includes('hello') || msg.includes('hi ') || msg.includes('hey')) {
      return "Hello! Welcome to KAIRO learning platform! 📚 I'm here to help you study. What educational topic can I assist you with today?"
    }
    
    // Math education
    if (msg.includes('2+2') || msg.includes('2 + 2')) return '2 + 2 = 4 📚'
    if (msg.includes('5*5') || msg.includes('5 * 5')) return '5 × 5 = 25 📚'
    if (msg.includes('10-3') || msg.includes('10 - 3')) return '10 - 3 = 7 📚'
    if (msg.includes('100/4') || msg.includes('100 / 4')) return '100 ÷ 4 = 25 📚'
    if (msg.includes('math') || msg.includes('calculate') || msg.includes('solve')) {
      return 'I can help with math problems! 🔢 Share your calculation and I\'ll solve it step by step. What math topic are you studying?'
    }
    
    // Programming education
    if (msg.includes('hello world') && msg.includes('python')) {
      return 'In Python: print("Hello, World!") 💻\n\nThis is your first step in Python programming! Want to learn more Python basics?'
    }
    if (msg.includes('hello world') && msg.includes('javascript')) {
      return 'In JavaScript: console.log("Hello, World!") 💻\n\nGreat start with JavaScript! Ready for the next programming concept?'
    }
    if (msg.includes('programming') || msg.includes('code') || msg.includes('python') || msg.includes('javascript')) {
      return 'Programming is an excellent skill to learn! 💻 I can help with Python, JavaScript, HTML, CSS, and programming concepts. What programming topic interests you?'
    }
    
    // Science education
    if (msg.includes('speed of light')) return 'The speed of light is 299,792,458 m/s 🔬\n\nThis is a fundamental constant in physics! Want to learn more about light or physics?'
    if (msg.includes('water formula') || msg.includes('h2o')) return 'Water\'s formula is H₂O 🧪\n\nTwo hydrogen atoms + one oxygen atom = water! Ready for more chemistry?'
    if (msg.includes('gravity')) return 'Gravity accelerates objects at 9.8 m/s² on Earth 🌍\n\nThis is why things fall down! Want to explore more physics concepts?'
    if (msg.includes('science') || msg.includes('physics') || msg.includes('chemistry') || msg.includes('biology')) {
      return 'Science is fascinating! 🔬 I can help with physics, chemistry, biology, and earth science. What scientific concept would you like to explore?'
    }
    
    // History education
    if (msg.includes('world war 2') || msg.includes('ww2')) return 'World War 2 (1939-1945): Axis vs Allies 📚\n\nA major historical event that shaped our modern world. Want to learn more about this period?'
    if (msg.includes('history') || msg.includes('historical') || msg.includes('ancient')) {
      return 'History helps us understand our world! 📖 I can help with world history, ancient civilizations, wars, and historical figures. What historical topic interests you?'
    }
    
    // Japanese learning (main focus)
    if (msg.includes('japanese') || msg.includes('日本語') || msg.includes('hiragana') || msg.includes('katakana') || msg.includes('kanji')) {
      return "Great! Japanese is our specialty! 🎌\n\nI can help with hiragana, katakana, kanji, grammar, vocabulary, and conversation practice. What aspect of Japanese would you like to study?"
    }
    
    // Educational topics only
    if (msg.includes('what is ai') || msg.includes('artificial intelligence')) {
      return "AI is computer technology that can learn and solve problems! 🤖\n\nIt's used in education, science, and many fields. Want to learn about computer science or technology?"
    }
    
    // Educational redirect for non-study questions
    if (!isStudyRelated) {
      return "I'm here to help with your studies! 📚 I can assist with:\n\n🎌 Japanese language\n🔢 Mathematics\n🔬 Science\n💻 Programming\n📖 History & Literature\n\nWhat would you like to learn today?"
    }
    
    // Default educational response
    return "I'm ready to help you learn! I specialize in Japanese language, math, science, programming, and academic subjects. What specific topic would you like to study?"
  }

  const getSimpleResponse = (message) => {
    const msg = message.toLowerCase()
    const responses = {
      greetings: [
        "こんにちは！元気です。日本語の勉強はどうですか？ (Hello! I'm fine. How is your Japanese study going?)",
        "おはようございます！今日は何を学びたいですか？ (Good morning! What would you like to learn today?)",
        "いらっしゃいませ！日本語の勉強をがんばってくださいね！ (Welcome! Please do your best with Japanese study!)"
      ],
      grammar: [
        "文法は日本語の基礎ですね！例えば、私は学生です。(Grammar is the foundation of Japanese! For example: I am a student.)",
        "助詞は難しいですが、練習すればできます。は、を、にから始めましょう。 (Particles are difficult, but you can master them with practice. Let's start with wa, wo, ni.)",
        "日本語の語順はSOVです。主語+目的語+動詞ですね。 (Japanese word order is SOV. Subject + Object + Verb.)"
      ],
      vocabulary: [
        "単語を学びましょう！今日の単語: 本(ほん)=book, 水(みず)=water, 学校(がっこう)=school (Let's learn vocabulary! Today's words: book, water, school)",
        "日常生活の単語: 食べる(たべる)=eat, 飲む(のむ)=drink, 寝る(ねる)=sleep (Daily life vocabulary: eat, drink, sleep)",
        "家族の単語: お父さん=father, お母さん=mother, 兄弟=siblings (Family vocabulary: father, mother, siblings)"
      ],
      culture: [
        "日本の文化は美しいですね！お茶、着物、武道などがあります。 (Japanese culture is beautiful! There's tea ceremony, kimono, martial arts, etc.)",
        "日本人は礼儀正しいです。お辞儀やお礼が大切です。 (Japanese people are polite. Bowing and courtesy are important.)",
        "日本の季節は美しいです。春の桜、秋の紅葉が有名です。 (Japan's seasons are beautiful. Spring cherry blossoms and autumn leaves are famous.)"
      ]
    }
    
    // Intelligent response selection
    if (msg.includes('こんにちは') || msg.includes('hello') || msg.includes('hi') || msg.includes('おはよう')) {
      return responses.greetings[Math.floor(Math.random() * responses.greetings.length)]
    }
    
    if (msg.includes('grammar') || msg.includes('文法') || msg.includes('particle') || msg.includes('助詞')) {
      return responses.grammar[Math.floor(Math.random() * responses.grammar.length)]
    }
    
    if (msg.includes('vocabulary') || msg.includes('単語') || msg.includes('word') || msg.includes('単語')) {
      return responses.vocabulary[Math.floor(Math.random() * responses.vocabulary.length)]
    }
    
    if (msg.includes('culture') || msg.includes('文化') || msg.includes('japan') || msg.includes('日本')) {
      return responses.culture[Math.floor(Math.random() * responses.culture.length)]
    }
    
    if (msg.includes('how') || msg.includes('どう') || msg.includes('what') || msg.includes('何')) {
      return "いい質問ですね！日本語では「どう」や「何」を使って質問します。 (Good question! In Japanese, we use 'dou' and 'nani' to ask questions.)"
    }
    
    if (msg.includes('thank') || msg.includes('ありがとう')) {
      return "どういたしまして！日本語の勉強をがんばってくださいね！ (You're welcome! Please keep studying Japanese!)"
    }
    
    // Advanced AI-like responses for any question
    if (msg.includes('why') || msg.includes('なぜ') || msg.includes('どうして')) {
      return "いい質問ですね！日本語では理由を説明する時に「から」や「ので」を使います。例: 雨が降っているから、家にいます。 (Good question! In Japanese, we use 'kara' or 'node' to explain reasons. Example: Because it's raining, I'm staying home.)"
    }
    
    if (msg.includes('when') || msg.includes('いつ') || msg.includes('time')) {
      return "時間についてですね！日本語の時間表現: 今(いま)=now, 明日(あした)=tomorrow, 昨日(きのう)=yesterday (About time! Japanese time expressions: now, tomorrow, yesterday)"
    }
    
    if (msg.includes('where') || msg.includes('どこ') || msg.includes('place')) {
      return "場所についてですね！日本語では「どこ」で場所を聞きます。例: 学校はどこですか？ (About places! In Japanese, we use 'doko' to ask about locations. Example: Where is the school?)"
    }
    
    if (msg.includes('food') || msg.includes('食べ物') || msg.includes('eat') || msg.includes('食べる')) {
      return "日本料理は美味しいです！寿司(すし)=sushi, ラーメン=ramen, 天ぷら(てんぷら)=tempura, お弁当(おべんとう)=bento (Japanese food is delicious! sushi, ramen, tempura, bento)"
    }
    
    if (msg.includes('weather') || msg.includes('天気') || msg.includes('rain') || msg.includes('雨')) {
      return "天気の話ですね！晴れ(はれ)=sunny, 雨(あめ)=rain, 雪(ゆき)=snow, 曇り(くもり)=cloudy (About weather! sunny, rain, snow, cloudy)"
    }
    
    if (msg.includes('love') || msg.includes('愛') || msg.includes('like') || msg.includes('好き')) {
      return "愛や好きについてですね！日本語では「好きです」(I like), 「大好きです」(I love), 「愛しています」(I love you) (About love and liking! In Japanese: I like, I love, I love you)"
    }
    
    if (msg.includes('family') || msg.includes('家族') || msg.includes('mother') || msg.includes('father')) {
      return "家族は大切ですね！お父さん(おとうさん)=father, お母さん(おかあさん)=mother, 兄弟(きょうだい)=siblings (Family is important! father, mother, siblings)"
    }
    
    if (msg.includes('school') || msg.includes('学校') || msg.includes('study') || msg.includes('勉強')) {
      return "学校や勉強についてですね！学校(がっこう)=school, 先生(せんせい)=teacher, 学生(がくせい)=student, 勉強(べんきょう)=study (About school and study! school, teacher, student, study)"
    }
    
    if (msg.includes('work') || msg.includes('仕事') || msg.includes('job') || msg.includes('company')) {
      return "仕事についてですね！仕事(しごと)=work/job, 会社(かいしゃ)=company, 会社員(かいしゃいん)=office worker (About work! work/job, company, office worker)"
    }
    
    if (msg.includes('money') || msg.includes('お金') || msg.includes('expensive') || msg.includes('高い')) {
      return "お金についてですね！お金(おかね)=money, 高い(たかい)=expensive, 安い(やすい)=cheap, 円(えん)=yen (About money! money, expensive, cheap, yen)"
    }
    
    // Default intelligent response for any other question
    const smartResponses = [
      "とても面白い質問ですね！日本語ではこのように言います... (That's a very interesting question! In Japanese, we say it like this...)",
      "いいポイントです！日本語学習者にとって大切なことですね。 (Good point! That's important for Japanese learners.)",
      "そのトピックについて話しましょう！日本語では... (Let's talk about that topic! In Japanese...)",
      "素晴らしい質問です！日本の文化や言語に関連していますね。 (Wonderful question! It relates to Japanese culture and language.)"
    ]
    
    return smartResponses[Math.floor(Math.random() * smartResponses.length)]
  }

  const detectStudyMode = (message) => {
    const msg = message.toLowerCase()
    
    // Japanese learning detection
    if (msg.includes('japanese') || msg.includes('hiragana') || msg.includes('katakana') || msg.includes('kanji')) {
      setTimeout(() => {
        setStudyModePopup({
          type: 'japanese',
          title: '🎌 Japanese Study Mode Detected',
          message: 'I noticed you\'re learning Japanese! Would you like me to switch to Japanese study mode for better practice?',
          actions: ['Enable Japanese Mode', 'Continue Normal Chat']
        })
      }, 2000)
    }
    // Math/homework detection
    else if (msg.includes('math') || msg.includes('homework') || msg.includes('calculate') || msg.includes('solve') || /\d+[+\-*/]\d+/.test(msg)) {
      setTimeout(() => {
        setStudyModePopup({
          type: 'math',
          title: '🔢 Math Study Mode Detected',
          message: 'I see you\'re working on math! Should I activate step-by-step problem solving mode?',
          actions: ['Enable Math Mode', 'Keep Current Mode']
        })
      }, 1500)
    }
    // Programming detection
    else if (msg.includes('code') || msg.includes('programming') || msg.includes('python') || msg.includes('javascript') || msg.includes('html')) {
      setTimeout(() => {
        setStudyModePopup({
          type: 'programming',
          title: '💻 Programming Mode Detected',
          message: 'Coding session detected! Want me to enable code review and debugging assistance?',
          actions: ['Enable Code Mode', 'Continue Chat']
        })
      }, 2000)
    }
    // Science detection
    else if (msg.includes('science') || msg.includes('physics') || msg.includes('chemistry') || msg.includes('biology')) {
      setTimeout(() => {
        setStudyModePopup({
          type: 'science',
          title: '🔬 Science Study Mode Detected',
          message: 'Science topic detected! Should I switch to detailed explanation mode with examples?',
          actions: ['Enable Science Mode', 'Normal Chat']
        })
      }, 1800)
    }
    // Exam preparation detection
    else if (msg.includes('exam') || msg.includes('test') || msg.includes('quiz') || msg.includes('study for')) {
      setTimeout(() => {
        setStudyModePopup({
          type: 'exam',
          title: '📚 Exam Prep Mode Detected',
          message: 'Preparing for an exam? I can help with practice questions and study strategies!',
          actions: ['Start Exam Prep', 'Continue Chatting']
        })
      }, 1500)
    }
  }

  const handleStudyModeAction = (action, type) => {
    if (action.includes('Enable') || action.includes('Start')) {
      const modeMessages = {
        japanese: '🎌 Japanese Study Mode activated! I\'ll now focus on vocabulary, grammar, and conversation practice. がんばって！',
        math: '🔢 Math Mode enabled! I\'ll provide step-by-step solutions and explain each concept clearly.',
        programming: '💻 Programming Mode activated! Ready for code reviews, debugging, and coding best practices.',
        science: '🔬 Science Mode enabled! I\'ll provide detailed explanations with real-world examples.',
        exam: '📚 Exam Prep Mode started! Let\'s create a study plan and practice with sample questions.'
      }
      
      const botMessage = {
        id: Date.now(),
        text: modeMessages[type],
        sender: 'assistant',
        timestamp: new Date().toISOString()
      }
      setMessages(prev => [...prev, botMessage])
    }
    setStudyModePopup(null)
  }

  const handleSuggestionClick = (suggestion) => {
    handleSendMessage(null, suggestion)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-6xl opacity-10 animate-float text-purple-300">漢</div>
        <div className="absolute top-40 right-20 text-4xl opacity-10 animate-float-delayed text-pink-300">字</div>
        <div className="absolute bottom-40 left-20 text-5xl opacity-10 animate-float text-indigo-300">あ</div>
        <div className="absolute bottom-20 right-10 text-6xl opacity-10 animate-float-delayed text-purple-300">カ</div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl opacity-5 animate-pulse text-gradient">KAIRO</div>
        
        {/* Floating Sakura Petals */}
        <div className="absolute top-10 left-1/4 text-pink-300 opacity-20 animate-float text-2xl">🌸</div>
        <div className="absolute top-32 right-1/3 text-pink-300 opacity-20 animate-float-delayed text-xl">🌸</div>
        <div className="absolute bottom-20 left-1/3 text-pink-300 opacity-20 animate-float text-2xl">🌸</div>
        <div className="absolute top-2/3 right-1/4 text-pink-300 opacity-20 animate-float-delayed text-xl">🌸</div>
      </div>

      <div className="relative z-10 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-3xl shadow-2xl h-[calc(100vh-8rem)] flex flex-col border border-white/20">
            
            {/* Header with Chat Mode Toggle */}
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    chatMode === 'ai' 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                      : 'bg-gradient-to-r from-green-500 to-emerald-500'
                  }`}>
                    <MessageCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {chatMode === 'ai' ? 'KAIRO AI Assistant' : 'Friends Chat'}
                    </h1>
                    <p className="text-xs text-green-500 flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                      Online
                    </p>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                  <MoreHorizontal className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
              
              {/* Chat Mode Toggle */}
              <div className="flex bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
                <button
                  onClick={() => {
                    setChatMode('friends')
                    setSelectedHelpType(null)
                  }}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    chatMode === 'friends'
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  👥 Friends Chat
                </button>
                <button
                  onClick={() => {
                    setChatMode('ai')
                    setSelectedHelpType(null)
                    setShowAINotice(true)
                  }}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    chatMode === 'ai'
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  🤖 AI Chat
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
              {(chatMode === 'ai' ? aiMessages : friendsMessages).length === 0 ? (
                <div className="text-center text-gray-500 dark:text-gray-400 mt-20">
                  {chatMode === 'ai' ? (
                    <div>
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MessageCircle className="h-8 w-8 text-white" />
                      </div>
                      <p className="text-xl font-medium mb-2">KAIRO AI</p>
                      <p className="text-sm text-gray-400">How can I help you today?</p>
                    </div>
                  ) : (
                    <div>
                      {selectedHelpType ? (
                        <div>
                          <button 
                            onClick={() => setSelectedHelpType(null)}
                            className="mb-4 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 flex items-center"
                          >
                            ← Back to Friends Chat
                          </button>
                          
                          {selectedHelpType === 'live' && (
                            <div>
                              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MessageCircle className="h-8 w-8 text-white" />
                              </div>
                              <p className="text-xl font-medium mb-2">Live Chat Support</p>
                              <p className="text-sm text-gray-400 mb-6">Get instant help from Japanese learning experts</p>
                              <button 
                                onClick={() => navigate('/help')}
                                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 transition-all"
                              >
                                Start Live Chat
                              </button>
                            </div>
                          )}
                          
                          {selectedHelpType === 'community' && (
                            <div>
                              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MessageCircle className="h-8 w-8 text-white" />
                              </div>
                              <p className="text-xl font-medium mb-2">Community Help</p>
                              <p className="text-sm text-gray-400 mb-6">Ask questions and get help from other learners</p>
                              <button 
                                onClick={() => navigate('/help')}
                                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-medium hover:from-green-600 hover:to-emerald-600 transition-all"
                              >
                                Ask Community
                              </button>
                            </div>
                          )}
                          
                          {selectedHelpType === 'problem' && (
                            <div>
                              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MessageCircle className="h-8 w-8 text-white" />
                              </div>
                              <p className="text-xl font-medium mb-2">Can't Find Answer?</p>
                              <p className="text-sm text-gray-400 mb-6">Post your problem and get community support</p>
                              <button 
                                onClick={() => navigate('/help')}
                                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-medium hover:from-orange-600 hover:to-red-600 transition-all"
                              >
                                Post Problem
                              </button>
                            </div>
                          )}
                          
                          {selectedHelpType === 'leaderboard' && (
                            <div>
                              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">🏆</span>
                              </div>
                              <p className="text-xl font-medium mb-2">Community Friends</p>
                              <p className="text-sm text-gray-400 mb-6">Chat with top learners in our community</p>
                              
                              <div className="space-y-2 max-h-64 overflow-y-auto">
                                {leaderboardMembers.map((member) => (
                                  <div key={member.id} className="flex items-center justify-between p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 transition-all cursor-pointer">
                                    <div className="flex items-center space-x-3">
                                      <div className="relative">
                                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-lg">
                                          {member.avatar}
                                        </div>
                                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${
                                          member.status === 'online' ? 'bg-green-500' : 
                                          member.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                                        }`}></div>
                                      </div>
                                      <div>
                                        <p className="font-semibold text-gray-900 dark:text-white text-sm">{member.name}</p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">{member.level} • {member.xp} XP</p>
                                      </div>
                                    </div>
                                    <button className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-xs font-medium hover:from-purple-600 hover:to-pink-600 transition-all">
                                      Chat
                                    </button>
                                  </div>
                                ))}
                              </div>
                              
                              <button 
                                onClick={() => navigate('/leaderboard')}
                                className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all"
                              >
                                View Full Leaderboard
                              </button>
                            </div>
                          )}
                          
                          {selectedHelpType === 'online' && (
                            <div>
                              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">🌐</span>
                              </div>
                              <p className="text-xl font-medium mb-2">Online Users</p>
                              <p className="text-sm text-gray-400 mb-6">Connect with learners who are online now</p>
                              
                              <div className="space-y-2 max-h-64 overflow-y-auto">
                                {onlineUsers.map((user) => (
                                  <div key={user.id} className="flex items-center justify-between p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 transition-all">
                                    <div className="flex items-center space-x-3">
                                      <div className="relative">
                                        <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-lg">
                                          {user.avatar}
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                                      </div>
                                      <div>
                                        <p className="font-semibold text-gray-900 dark:text-white text-sm">{user.name}</p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">{user.level} • Online {user.joinedAgo}</p>
                                      </div>
                                    </div>
                                    <div className="flex space-x-2">
                                      {user.isFriend ? (
                                        <button className="px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full text-xs font-medium hover:from-emerald-600 hover:to-teal-600 transition-all">
                                          Chat
                                        </button>
                                      ) : (
                                        <>
                                          <button className="px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full text-xs font-medium hover:from-blue-600 hover:to-indigo-600 transition-all">
                                            Add Friend
                                          </button>
                                          <button className="px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full text-xs font-medium hover:from-emerald-600 hover:to-teal-600 transition-all">
                                            Chat
                                          </button>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                              
                              <div className="mt-4 text-center">
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {onlineUsers.filter(u => !u.isFriend).length} new users available to connect
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div>
                          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <MessageCircle className="h-8 w-8 text-white" />
                          </div>
                          <p className="text-xl font-medium mb-2">Friends Chat</p>
                          <p className="text-sm text-gray-400 mb-6">Connect with fellow Japanese learners</p>
                          
                          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mx-8 mb-6">
                            <p className="text-sm text-blue-800 dark:text-blue-200">
                              👥 Chat with other KAIRO learners, share study tips, and practice Japanese together!
                            </p>
                          </div>
                          
                          {/* Help Options */}
                          <div className="space-y-3 mx-8">
                            <button 
                              onClick={() => setSelectedHelpType('live')}
                              className="w-full p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 transition-all text-left"
                            >
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                                  <MessageCircle className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Live Chat Support</h3>
                                  <p className="text-xs text-gray-600 dark:text-gray-400">Get instant help from experts</p>
                                </div>
                              </div>
                            </button>
                            
                            <button 
                              onClick={() => setSelectedHelpType('community')}
                              className="w-full p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 transition-all text-left"
                            >
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                                  <MessageCircle className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Community Help</h3>
                                  <p className="text-xs text-gray-600 dark:text-gray-400">Ask questions to other learners</p>
                                </div>
                              </div>
                            </button>
                            
                            <button 
                              onClick={() => setSelectedHelpType('problem')}
                              className="w-full p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 transition-all text-left"
                            >
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                                  <MessageCircle className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Can't Find Answer?</h3>
                                  <p className="text-xs text-gray-600 dark:text-gray-400">Post your problem for support</p>
                                </div>
                              </div>
                            </button>
                            
                            <button 
                              onClick={() => setSelectedHelpType('leaderboard')}
                              className="w-full p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 transition-all text-left"
                            >
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                                  <span className="text-lg">🏆</span>
                                </div>
                                <div>
                                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Community Friends</h3>
                                  <p className="text-xs text-gray-600 dark:text-gray-400">Chat with top learners</p>
                                </div>
                              </div>
                            </button>
                            
                            <button 
                              onClick={() => setSelectedHelpType('online')}
                              className="w-full p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 transition-all text-left"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                                    <span className="text-lg">🌐</span>
                                  </div>
                                  <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Online Users</h3>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">Find new friends to chat with</p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                  <span className="text-xs text-green-600 dark:text-green-400 font-medium">{onlineUsers.length}</span>
                                </div>
                              </div>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                (chatMode === 'ai' ? aiMessages : friendsMessages).map((message) => (
                  <div key={message.id} className="space-y-2">
                    <div className={`flex items-start space-x-3 ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      {/* Avatar */}
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      }`}>
                        {message.sender === 'user' ? (
                          <span className="text-sm font-medium">{user?.username?.charAt(0)?.toUpperCase() || 'U'}</span>
                        ) : (
                          <MessageCircle className="h-4 w-4" />
                        )}
                      </div>
                      
                      {/* Message Bubble */}
                      <div className={`max-w-xs lg:max-w-md ${
                        message.sender === 'user' ? 'ml-auto' : 'mr-auto'
                      }`}>
                        <div className={`px-4 py-3 rounded-2xl ${
                          message.sender === 'user'
                            ? 'bg-blue-600 text-white rounded-tr-md'
                            : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-tl-md'
                        }`}>
                          <p className="text-sm whitespace-pre-line leading-relaxed">{message.text}</p>
                        </div>
                        <p className={`text-xs mt-1 px-1 ${
                          message.sender === 'user'
                            ? 'text-right text-gray-500 dark:text-gray-400'
                            : 'text-left text-gray-500 dark:text-gray-400'
                        }`}>
                          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                    
                    {/* Quick Suggestions */}
                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="flex justify-start">
                        <div className="max-w-xs lg:max-w-md">
                          <div className="flex flex-wrap gap-2">
                            {message.suggestions.slice(0, 3).map((suggestion, index) => (
                              <button
                                key={index}
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="px-4 py-2 bg-purple-100/80 dark:bg-purple-900/30 backdrop-blur-sm text-purple-800 dark:text-purple-200 rounded-full text-xs hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-all duration-300 shadow-lg"
                              >
                                {suggestion}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
              
              {loading && chatMode === 'ai' && (
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center">
                    <MessageCircle className="h-4 w-4" />
                  </div>
                  <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-3 rounded-2xl rounded-tl-md border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-sm text-gray-500">KAIRO is typing...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>



            {/* Input */}
            <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
              <div className="flex items-end space-x-3">
                {/* Attachment Options */}
                <div className="relative">
                  <input type="file" id="photo-upload" accept="image/*" capture="environment" className="hidden" onChange={(e) => { const file = e.target.files[0]; if (file) { handleSendMessage(null, `📸 Uploaded photo: ${file.name}`); setShowAttachMenu(false) } }} />
                  <input type="file" id="video-upload" accept="video/*" capture="camcorder" className="hidden" onChange={(e) => { const file = e.target.files[0]; if (file) { handleSendMessage(null, `🎥 Uploaded video: ${file.name}`); setShowAttachMenu(false) } }} />
                  <input type="file" id="document-upload" accept=".pdf,.doc,.docx,.txt" className="hidden" onChange={(e) => { const file = e.target.files[0]; if (file) { handleSendMessage(null, `📄 Uploaded document: ${file.name}`); setShowAttachMenu(false) } }} />
                  <input type="file" id="file-upload" className="hidden" onChange={(e) => { const file = e.target.files[0]; if (file) { handleSendMessage(null, `📎 Attached file: ${file.name}`); setShowAttachMenu(false) } }} />
                  
                  <button 
                    onClick={() => setShowAttachMenu(!showAttachMenu)}
                    className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                    title="Attach File"
                  >
                    <Paperclip className="h-5 w-5" />
                  </button>
                  
                  {showAttachMenu && (
                    <div className="absolute bottom-12 left-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2 min-w-[120px] z-50">
                      <button onClick={() => { document.getElementById('photo-upload').click(); setShowAttachMenu(false) }} className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2">
                        <Image className="h-4 w-4" />
                        <span>Photos</span>
                      </button>
                      <button onClick={() => { document.getElementById('video-upload').click(); setShowAttachMenu(false) }} className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2">
                        <Video className="h-4 w-4" />
                        <span>Videos</span>
                      </button>
                      <button onClick={() => { document.getElementById('document-upload').click(); setShowAttachMenu(false) }} className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2">
                        <FileText className="h-4 w-4" />
                        <span>Docs</span>
                      </button>
                      <button onClick={() => { document.getElementById('file-upload').click(); setShowAttachMenu(false) }} className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2">
                        <Paperclip className="h-4 w-4" />
                        <span>Files</span>
                      </button>
                    </div>
                  )}
                </div>
                
                {/* Message Input */}
                <div className="flex-1 relative">
                  <form onSubmit={handleSendMessage} className="flex items-end space-x-2">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder={chatMode === 'ai' ? 'Message KAIRO AI...' : 'Message friends...'}
                        className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white resize-none transition-all duration-200"
                        disabled={loading}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
                            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
                            const recognition = new SpeechRecognition()
                            recognition.lang = 'en-US'
                            recognition.onresult = (event) => {
                              const transcript = event.results[0][0].transcript
                              setInputMessage(transcript)
                            }
                            recognition.start()
                          } else {
                            handleSendMessage(null, '🎤 Voice message recorded')
                          }
                        }}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        title="Voice Message"
                      >
                        <Mic className="h-4 w-4" />
                      </button>
                    </div>
                    <button
                      type="submit"
                      disabled={loading || !inputMessage.trim()}
                      className={`p-3 rounded-full transition-all duration-200 ${
                        inputMessage.trim() && !loading
                          ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                          : 'bg-gray-200 dark:bg-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </form>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* AI Notice Popup */}
      {showAINotice && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                🤖 AI Chat - Demo Mode
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                This is a working demo model of our AI assistant. The full advanced AI features will be available soon!
              </p>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 mb-4">
                <p className="text-xs text-yellow-800 dark:text-yellow-200">
                  • Current: Basic educational responses<br/>
                  • Coming: Advanced ChatGPT integration<br/>
                  • Coming: Voice chat & image recognition
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowAINotice(false)}
              className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              Got it, Let's Chat!
            </button>
          </div>
        </div>
      )}

      {/* Study Mode Popup */}
      {studyModePopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 transform animate-pulse">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {studyModePopup.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {studyModePopup.message}
              </p>
            </div>
            <div className="flex flex-col space-y-2">
              {studyModePopup.actions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleStudyModeAction(action, studyModePopup.type)}
                  className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                    index === 0
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {action}
                </button>
              ))}
            </div>
            <button
              onClick={() => setStudyModePopup(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 z-50 hover:scale-110 animate-bounce"
        >
          <ChevronUp className="h-6 w-6" />
        </button>
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-3deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default Chat