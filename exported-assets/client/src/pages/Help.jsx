import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { Search, MessageCircle, FileText, Video, Download, ExternalLink, HelpCircle, BookOpen, Users, Zap, X, Mail, Phone, Calendar, Clock, Edit3, Send, Trophy, Star, ChevronUp } from 'lucide-react'

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [floatingElements, setFloatingElements] = useState([])
  const [showContactModal, setShowContactModal] = useState(false)
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [showChatModal, setShowChatModal] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    { id: 1, text: "Hello! We will connect you to our team shortly. How can we help you today?", sender: "support", time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }
  ])
  const [newMessage, setNewMessage] = useState('')
  const [showPostModal, setShowPostModal] = useState(false)
  const [postTitle, setPostTitle] = useState('')
  const [postContent, setPostContent] = useState('')
  const [postCategory, setPostCategory] = useState('general')
  const [showQuestionModal, setShowQuestionModal] = useState(false)
  const [questionTitle, setQuestionTitle] = useState('')
  const [questionContent, setQuestionContent] = useState('')
  const [selectedGroup, setSelectedGroup] = useState('beginners')
  const [showCelebration, setShowCelebration] = useState(false)
  const [celebrationMessage, setCelebrationMessage] = useState('')
  const [celebrationType, setCelebrationType] = useState('')
  const [scrollY, setScrollY] = useState(0)
  const [scrollDirection, setScrollDirection] = useState('down')
  const [lastScrollY, setLastScrollY] = useState(0)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollDirection(currentScrollY > lastScrollY ? 'down' : 'up')
      setScrollY(currentScrollY)
      setLastScrollY(currentScrollY)
      setShowScrollTop(currentScrollY > 300)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const sendMessage = () => {
    if (newMessage.trim()) {
      const userMessage = {
        id: chatMessages.length + 1,
        text: newMessage,
        sender: 'user',
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      }
      setChatMessages([...chatMessages, userMessage])
      setNewMessage('')
      
      // Auto-reply after 2 seconds
      setTimeout(() => {
        const supportReply = {
          id: chatMessages.length + 2,
          text: "Thank you for your message! Our team is reviewing your request and will respond shortly.",
          sender: 'support',
          time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        }
        setChatMessages(prev => [...prev, supportReply])
      }, 2000)
    }
  }

  const { user } = useAuth()

  // Add ripple effect to buttons
  useEffect(() => {
    const buttons = document.querySelectorAll('.ripple-button')
    
    const addRippleEffect = (e) => {
      const button = e.currentTarget
      const overlay = document.createElement('div')
      overlay.className = 'absolute inset-0 bg-white/20 rounded-xl pulse-overlay pointer-events-none'
      button.appendChild(overlay)
      
      setTimeout(() => {
        overlay.remove()
      }, 600)
    }
    
    buttons.forEach(button => {
      button.addEventListener('click', addRippleEffect)
    })
    
    return () => {
      buttons.forEach(button => {
        button.removeEventListener('click', addRippleEffect)
      })
    }
  }, [])

  // Animated background elements
  useEffect(() => {
    const elements = []
    const characters = ['漢', '字', 'あ', 'カ', '🎌', '🌸']
    
    for (let i = 0; i < 15; i++) {
      elements.push({
        id: i,
        char: characters[Math.floor(Math.random() * characters.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 20,
        duration: 15 + Math.random() * 10
      })
    }
    setFloatingElements(elements)
  }, [])

  const helpCategories = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: <BookOpen className="h-6 w-6" />,
      description: 'Learn the basics of using KAIRØ platform',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'quizzes',
      title: 'Quizzes & Tests',
      icon: <HelpCircle className="h-6 w-6" />,
      description: 'Master Japanese through interactive assessments',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'flashcards',
      title: 'Flashcards',
      icon: <FileText className="h-6 w-6" />,
      description: 'Effective vocabulary and kanji learning',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'exams',
      title: 'JLPT & MEXT Prep',
      icon: <Video className="h-6 w-6" />,
      description: 'Certification exam preparation',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'account',
      title: 'Account & Billing',
      icon: <Users className="h-6 w-6" />,
      description: 'Manage your KAIRØ subscription',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      id: 'technical',
      title: 'Technical Support',
      icon: <Zap className="h-6 w-6" />,
      description: 'Platform troubleshooting and issues',
      color: 'from-yellow-500 to-orange-500'
    }
  ]

  const faqs = [
    {
      id: 1,
      question: 'How do I reset my KAIRØ password?',
      answer: 'Click "Forgot Password" on the login page. We\'ll send reset instructions to your registered email address.',
      category: 'account'
    },
    {
      id: 2,
      question: 'How can I track my Japanese learning progress?',
      answer: 'Your progress is available in the Dashboard under "My Progress". View detailed statistics, streak counters, and achievement badges.',
      category: 'quizzes'
    },
    {
      id: 3,
      question: 'Can I download my JLPT certificates?',
      answer: 'Yes! After passing practice exams, download certificates from the exam results page or your profile dashboard.',
      category: 'exams'
    },
    {
      id: 4,
      question: 'How do I create custom Japanese flashcards?',
      answer: 'Navigate to Flashcards and click "Create New Set". Add kanji, vocabulary, or grammar points with furigana and meanings.',
      category: 'flashcards'
    },
    {
      id: 5,
      question: 'What payment methods does KAIRØ accept?',
      answer: 'We accept major credit cards (Visa, MasterCard, Amex), PayPal, Apple Pay, Google Pay, and various regional payment methods.',
      category: 'account'
    },
    {
      id: 6,
      question: 'How do I contact KAIRØ support team?',
      answer: 'Use the chat widget, email support@kairo.com, or schedule a video call through your dashboard for personalized assistance.',
      category: 'technical'
    },
    {
      id: 7,
      question: 'Can I study offline with KAIRØ?',
      answer: 'Premium users can download flashcard sets and practice materials for offline study. Sync progress when you reconnect.',
      category: 'flashcards'
    },
    {
      id: 8,
      question: 'How accurate are the JLPT practice tests?',
      answer: 'Our JLPT practice tests are created by certified Japanese instructors and closely mirror the official exam format and difficulty.',
      category: 'exams'
    }
  ]

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = searchQuery === '' || 
                         faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingElements.map((element) => (
          <div
            key={element.id}
            className="absolute text-2xl opacity-10 dark:opacity-5 animate-float transition-transform duration-300 ease-out"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              animationDelay: `${element.delay}s`,
              animationDuration: `${element.duration}s`,
              transform: `translateY(${scrollY * (element.id % 2 === 0 ? 0.2 : -0.15)}px) rotate(${scrollDirection === 'down' ? scrollY * 0.05 : -scrollY * 0.05}deg)`
            }}
          >
            {element.char}
          </div>
        ))}
        
        {/* Floating KAIRO Logo */}
        <div 
          className="absolute top-10 right-10 opacity-10 dark:opacity-20 transition-all duration-500 ease-out"
          style={{
            transform: `translateY(${scrollY * (scrollDirection === 'down' ? 0.3 : -0.3)}px) scale(${1 + scrollY * 0.0005}) rotate(${scrollDirection === 'down' ? scrollY * 0.08 : -scrollY * 0.08}deg)`
          }}
        >
          <div className="text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            KAIRØ
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6">
            <HelpCircle className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            KAIRØ Help Center
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Find answers, get support, and master Japanese with confidence. Your journey to fluency starts here.
          </p>

          {/* Search */}
          <div className="max-w-2xl mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search: password reset, JLPT prep, flashcards, billing..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-white/20 dark:border-gray-700/50 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-lg"
            />
            
            {/* Search Dropdown */}
            {searchQuery && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-white/20 dark:border-gray-700/50 rounded-xl shadow-xl z-10 max-h-60 overflow-y-auto">
                <div className="p-2">
                  {filteredFaqs.length > 0 ? (
                    <>
                      <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        Search Results ({filteredFaqs.length})
                      </div>
                      {filteredFaqs.slice(0, 5).map((faq) => (
                        <div
                          key={faq.id}
                          className="px-3 py-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg cursor-pointer transition-colors"
                          onClick={() => {
                            setSearchQuery('')
                            // Scroll to FAQ section
                            document.querySelector('#faq-section')?.scrollIntoView({ behavior: 'smooth' })
                          }}
                        >
                          <div className="font-medium text-gray-900 dark:text-white text-sm">
                            {faq.question}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                            {faq.answer.substring(0, 100)}...
                          </div>
                        </div>
                      ))}
                      {filteredFaqs.length > 5 && (
                        <div className="px-3 py-2 text-xs text-blue-600 dark:text-blue-400 text-center">
                          +{filteredFaqs.length - 5} more results
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="px-3 py-4 text-center text-gray-500 dark:text-gray-400">
                      <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <div className="text-sm">No results found for "{searchQuery}"</div>
                      <div className="text-xs mt-1">Try different keywords</div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="group relative overflow-hidden bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-xl p-8 text-center border border-white/20 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <MessageCircle className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Live Chat Support
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Get instant help from our Japanese learning experts
            </p>
            <button 
              onClick={() => setShowChatModal(true)}
              className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl ripple-button"
            >
              Start Chat
            </button>
          </div>

          <div className="group relative overflow-hidden bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-xl p-8 text-center border border-white/20 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Community Help
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Ask questions and get help from other learners
            </p>
            <button 
              onClick={() => setShowQuestionModal(true)}
              className="relative overflow-hidden bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl ripple-button"
            >
              Ask Question
            </button>
          </div>

          <div className="group relative overflow-hidden bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-xl p-8 text-center border border-white/20 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <HelpCircle className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Can't Find Answer?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Post your problem and get community support
            </p>
            <button 
              onClick={() => setShowPostModal(true)}
              className="relative overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl ripple-button"
            >
              Post Problem
            </button>
          </div>
        </div>

        {/* Help Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Browse by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {helpCategories.map((category) => (
              <div
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`group cursor-pointer bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl p-6 border border-white/20 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 ${
                  selectedCategory === category.id ? 'ring-2 ring-blue-500 shadow-2xl' : ''
                }`}
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-white">{category.icon}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {category.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {category.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div id="faq-section" className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-blue-100">
              {filteredFaqs.length} {filteredFaqs.length === 1 ? 'result' : 'results'} found
              {selectedCategory !== 'all' && ` in ${helpCategories.find(c => c.id === selectedCategory)?.title}`}
            </p>
          </div>

          <div className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => (
                <div key={faq.id} className="p-8 hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors duration-200">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-start">
                    <HelpCircle className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed ml-8">
                    {faq.answer}
                  </p>
                </div>
              ))
            ) : (
              <div className="p-16 text-center">
                <Search className="h-16 w-16 text-gray-400 mx-auto mb-6" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  No results found
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Try adjusting your search terms or browse by category.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('all')
                  }}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-12 text-white text-center shadow-2xl">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">
              Still need help with your Japanese learning?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Our dedicated support team is here to help you succeed on your Japanese learning journey!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setShowContactModal(true)}
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                Contact Support
              </button>
              <button 
                onClick={() => setShowScheduleModal(true)}
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                Schedule a Call
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Live Chat Modal */}
      {showChatModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end justify-end p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-96 h-[500px] flex flex-col">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                <div>
                  <h3 className="text-white font-semibold">KAIRØ Support</h3>
                  <p className="text-blue-100 text-sm">Online now</p>
                </div>
              </div>
              <button 
                onClick={() => setShowChatModal(false)}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {chatMessages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl ${
                    message.sender === 'user' 
                      ? 'bg-blue-500 text-white rounded-br-md' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-md'
                  }`}>
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 opacity-70 ${
                      message.sender === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Chat Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
                <button
                  onClick={sendMessage}
                  className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-xl transition-colors"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Support Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Support</h3>
                <button 
                  onClick={() => setShowContactModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-4 rounded-xl">
                  <div className="flex items-center mb-3">
                    <Mail className="h-5 w-5 text-blue-600 mr-2" />
                    <h4 className="font-semibold text-gray-900 dark:text-white">Email Support</h4>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Get detailed help via email</p>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">support@kairo.com</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Response within 2-4 hours</p>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-xl">
                  <div className="flex items-center mb-3">
                    <MessageCircle className="h-5 w-5 text-green-600 mr-2" />
                    <h4 className="font-semibold text-gray-900 dark:text-white">Live Chat</h4>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Instant help from our team</p>
                  <button 
                    onClick={() => {
                      setShowContactModal(false)
                      setShowChatModal(true)
                    }}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                  >
                    Start Chat Now
                  </button>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Available 24/7</p>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-xl">
                  <div className="flex items-center mb-3">
                    <Phone className="h-5 w-5 text-purple-600 mr-2" />
                    <h4 className="font-semibold text-gray-900 dark:text-white">Phone Support</h4>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Speak directly with our experts</p>
                  <p className="text-purple-600 dark:text-purple-400 font-medium">+1 (555) 123-KAIRO</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Mon-Fri 9AM-6PM PST</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Schedule a Call Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Schedule a Call</h3>
                <button 
                  onClick={() => setShowScheduleModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-xl">
                  <div className="flex items-center mb-3">
                    <Video className="h-5 w-5 text-blue-600 mr-2" />
                    <h4 className="font-semibold text-gray-900 dark:text-white">Learning Consultation</h4>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Get personalized Japanese learning advice</p>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>30 minutes • Free</span>
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors w-full">
                    Book Consultation
                  </button>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 p-4 rounded-xl">
                  <div className="flex items-center mb-3">
                    <Users className="h-5 w-5 text-green-600 mr-2" />
                    <h4 className="font-semibold text-gray-900 dark:text-white">Technical Support</h4>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Resolve platform issues with screen sharing</p>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>15 minutes • Free</span>
                  </div>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors w-full">
                    Schedule Tech Call
                  </button>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-xl">
                  <div className="flex items-center mb-3">
                    <Calendar className="h-5 w-5 text-purple-600 mr-2" />
                    <h4 className="font-semibold text-gray-900 dark:text-white">Premium Tutoring</h4>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">One-on-one Japanese lessons with certified teachers</p>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>60 minutes • $29/session</span>
                  </div>
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors w-full">
                    Book Tutoring
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Ask Question Modal */}
      {showQuestionModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Users className="h-6 w-6 text-green-600 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Ask Community</h3>
                </div>
                <button 
                  onClick={() => {
                    setShowQuestionModal(false)
                    setQuestionTitle('')
                    setQuestionContent('')
                    setSelectedGroup('beginners')
                  }}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-xl mb-6">
                  <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">Community Groups</h4>
                  <p className="text-sm text-green-700 dark:text-green-400">
                    Ask questions to active learning groups. Members will respond publicly in the group chat.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Select Learning Group
                  </label>
                  <select
                    value={selectedGroup}
                    onChange={(e) => setSelectedGroup(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent dark:text-white"
                  >
                    <option value="beginners">🌱 Beginners Group (2.3k members)</option>
                    <option value="intermediate">📚 Intermediate Learners (1.8k members)</option>
                    <option value="advanced">🎯 Advanced Students (950 members)</option>
                    <option value="jlpt-prep">📝 JLPT Preparation (1.2k members)</option>
                    <option value="kanji-study">漢 Kanji Study Group (800 members)</option>
                    <option value="conversation">💬 Conversation Practice (1.5k members)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Question Title
                  </label>
                  <input
                    type="text"
                    value={questionTitle}
                    onChange={(e) => setQuestionTitle(e.target.value)}
                    placeholder="What do you want to ask the group?"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Question
                  </label>
                  <textarea
                    value={questionContent}
                    onChange={(e) => setQuestionContent(e.target.value)}
                    placeholder="Ask your question here. Be specific about what you're learning or struggling with..."
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                  />
                </div>

                <div className="text-right">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {questionContent.length}/500 characters
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    onClick={() => {
                      setShowQuestionModal(false)
                      setQuestionTitle('')
                      setQuestionContent('')
                      setSelectedGroup('beginners')
                    }}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (questionTitle.trim() && questionContent.trim()) {
                        setShowQuestionModal(false)
                        setQuestionTitle('')
                        setQuestionContent('')
                        setSelectedGroup('beginners')
                        setCelebrationMessage('🎉 Question Posted Successfully!')
                        setShowCelebration(true)
                      }
                    }}
                    disabled={!questionTitle.trim() || !questionContent.trim()}
                    className="flex-1 flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Ask Group
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Post Problem Modal */}
      {showPostModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Edit3 className="h-6 w-6 text-purple-600 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Post Your Problem</h3>
                </div>
                <button 
                  onClick={() => {
                    setShowPostModal(false)
                    setPostTitle('')
                    setPostContent('')
                    setPostCategory('general')
                  }}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={postCategory}
                    onChange={(e) => setPostCategory(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:text-white"
                  >
                    <option value="general">General Help</option>
                    <option value="account">Account & Login</option>
                    <option value="learning">Japanese Learning</option>
                    <option value="technical">Technical Issues</option>
                    <option value="billing">Billing & Subscription</option>
                    <option value="exams">JLPT & MEXT Exams</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Problem Title
                  </label>
                  <input
                    type="text"
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    placeholder="Briefly describe your problem..."
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Detailed Description
                  </label>
                  <textarea
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    placeholder="Explain your problem in detail. Include any error messages, steps you've tried, or screenshots if relevant..."
                    rows={8}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                  />
                </div>

                <div className="text-right">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {postContent.length}/1000 characters
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    onClick={() => {
                      setShowPostModal(false)
                      setPostTitle('')
                      setPostContent('')
                      setPostCategory('general')
                    }}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (postTitle.trim() && postContent.trim()) {
                        setShowPostModal(false)
                        setPostTitle('')
                        setPostContent('')
                        setPostCategory('general')
                        setCelebrationMessage('🌟 Problem Posted Successfully!')
                        setShowCelebration(true)
                      }
                    }}
                    disabled={!postTitle.trim() || !postContent.trim()}
                    className="flex-1 flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <Send className="h-5 w-5 mr-2" />
                    Create Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Celebration Modal */}
      {showCelebration && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setShowCelebration(false)}
        >
          {/* Background Animation */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-celebration-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              >
                {['🎉', '🎊', '⭐', '✨', '🎆', '💫'][Math.floor(Math.random() * 6)]}
              </div>
            ))}
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 text-center max-w-sm mx-auto animate-popup-scale">
            <div className="text-4xl mb-4 animate-bounce-slow">🎉</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 animate-slide-up">
              Congratulations!
            </h3>
            <p className="text-gray-600 dark:text-gray-300 animate-slide-up" style={{animationDelay: '0.2s'}}>
              {celebrationMessage}
            </p>
          </div>
        </div>
      )}

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-50 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center transform ${
          showScrollTop ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}
        style={{
          transitionDuration: showScrollTop ? '0.3s' : '0.2s',
          transitionTimingFunction: showScrollTop ? 'cubic-bezier(0.34, 1.56, 0.64, 1)' : 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }}
        aria-label="Scroll to top"
      >
        <ChevronUp className="h-6 w-6" />
      </button>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-20px) rotate(5deg); }
          50% { transform: translateY(-10px) rotate(-5deg); }
          75% { transform: translateY(-15px) rotate(3deg); }
        }
        .animate-float {
          animation: float linear infinite;
        }
        @keyframes confetti {
          0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .animate-confetti {
          animation: confetti linear infinite;
        }
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        @keyframes popup-scale {
          0% { transform: scale(0.8) translateY(20px); opacity: 0; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        .animate-popup-scale {
          animation: popup-scale 0.4s ease-out;
        }
        @keyframes slide-up {
          0% { transform: translateY(10px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        @keyframes celebration-float {
          0% { transform: translateY(0) rotate(0deg) scale(0.8); opacity: 0.7; }
          50% { transform: translateY(-20px) rotate(180deg) scale(1.2); opacity: 1; }
          100% { transform: translateY(0) rotate(360deg) scale(0.8); opacity: 0.7; }
        }
        .animate-celebration-float {
          animation: celebration-float ease-in-out infinite;
        }
        .ripple-button {
          position: relative;
          overflow: hidden;
        }
        .ripple-button::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }
        .ripple-button:active::before {
          width: 300px;
          height: 300px;
        }
        @keyframes pulse-overlay {
          0% { opacity: 0; transform: scale(0.8); }
          50% { opacity: 0.3; transform: scale(1.1); }
          100% { opacity: 0; transform: scale(1.2); }
        }
        .pulse-overlay {
          animation: pulse-overlay 0.6s ease-out;
        }
      `}</style>
    </div>
  )
}

export default Help
