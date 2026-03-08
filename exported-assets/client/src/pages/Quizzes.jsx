import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { BookOpen, Clock, Trophy, Play, ArrowLeft, CheckCircle, XCircle, RotateCcw, Volume2, ChevronUp } from 'lucide-react'
import { useActivityTracker } from '../hooks/useActivityTracker'

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [activeQuiz, setActiveQuiz] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [timeLeft, setTimeLeft] = useState(null)
  const [scrollY, setScrollY] = useState(0)
  const [scrollDirection, setScrollDirection] = useState('down')
  const [lastScrollY, setLastScrollY] = useState(0)
  const [showScrollTop, setShowScrollTop] = useState(false)

  const { user } = useAuth()
  const { trackActivity } = useActivityTracker()

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

  // Text-to-Speech function
  const speakText = (text, lang = 'ja-JP') => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = lang
      utterance.rate = 0.8
      utterance.pitch = 1
      utterance.volume = 0.8
      
      const voices = window.speechSynthesis.getVoices()
      const japaneseVoice = voices.find(voice => voice.lang.startsWith('ja'))
      if (japaneseVoice) {
        utterance.voice = japaneseVoice
      }
      
      window.speechSynthesis.speak(utterance)
    }
  }

  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices()
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices()
      }
    }
  }, [])

  // Quiz questions database
  const quizQuestions = {
    1: [ // Hiragana Basics
      { question: "What is the correct reading of 'あ'?", questionAudio: 'あ', options: ['a', 'i', 'u', 'e'], correct: 0, explanation: "あ is pronounced 'a' and is the first character in the hiragana syllabary." },
      { question: "Which hiragana represents the sound 'ka'?", questionAudio: 'か', options: ['が', 'か', 'さ', 'た'], correct: 1, explanation: "か represents 'ka'. が is 'ga' with a dakuten mark." },
      { question: "What sound does 'し' make?", questionAudio: 'し', options: ['si', 'shi', 'chi', 'ti'], correct: 1, explanation: "し is pronounced 'shi', not 'si'." },
      { question: "Which is the correct hiragana for 'tsu'?", questionAudio: 'つ', options: ['つ', 'ち', 'て', 'と'], correct: 0, explanation: "つ represents 'tsu' sound." },
      { question: "What is the reading of 'は'?", questionAudio: 'は', options: ['ha', 'ba', 'pa', 'fa'], correct: 0, explanation: "は is pronounced 'ha' when used alone." }
    ],
    2: [ // Katakana Challenge
      { question: "What is the correct reading of 'ア'?", questionAudio: 'ア', options: ['a', 'i', 'u', 'e'], correct: 0, explanation: "ア is the katakana for 'a' sound." },
      { question: "Which katakana represents 'ko'?", questionAudio: 'コ', options: ['コ', 'カ', 'ク', 'ケ'], correct: 0, explanation: "コ represents 'ko' in katakana." },
      { question: "How do you write 'coffee' in katakana?", questionAudio: 'コーヒー', options: ['コーヒー', 'カフェ', 'コフィ', 'コフェー'], correct: 0, explanation: "Coffee is written as コーヒー in katakana." },
      { question: "What does 'パン' mean?", questionAudio: 'パン', options: ['pan (cooking)', 'bread', 'panda', 'pants'], correct: 1, explanation: "パン means 'bread' in Japanese." },
      { question: "Which katakana is 'シ'?", questionAudio: 'シ', options: ['si', 'shi', 'chi', 'ti'], correct: 1, explanation: "シ represents 'shi' sound in katakana." }
    ],
    3: [ // Basic Kanji (N5 Level)
      { question: "What does '一' mean?", questionAudio: 'いち', options: ['one', 'two', 'three', 'four'], correct: 0, explanation: "一 means 'one' and is read as 'ichi'." },
      { question: "How do you read '人'?", questionAudio: 'ひと', options: ['jin', 'hito', 'nin', 'all of above'], correct: 3, explanation: "人 can be read as 'hito', 'jin', or 'nin' depending on context." },
      { question: "What does '日本' mean?", questionAudio: 'にほん', options: ['Japan', 'day book', 'sun origin', 'daily'], correct: 0, explanation: "日本 means 'Japan' and is read as 'Nihon' or 'Nippon'." },
      { question: "Which kanji means 'water'?", questionAudio: 'みず', options: ['水', '火', '木', '金'], correct: 0, explanation: "水 means 'water' and is read as 'mizu'." },
      { question: "What is the meaning of '学校'?", questionAudio: 'がっこう', options: ['school', 'student', 'study', 'teacher'], correct: 0, explanation: "学校 means 'school' and is read as 'gakkou'." }
    ]
  }

  const startQuiz = (quiz) => {
    setActiveQuiz(quiz)
    setCurrentQuestion(0)
    setSelectedAnswers({})
    setShowResults(false)
    setTimeLeft(quiz.timeLimit * 60)
  }

  const selectAnswer = (questionIndex, answerIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }))
  }

  const nextQuestion = () => {
    const questions = quizQuestions[activeQuiz.id] || []
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      finishQuiz()
    }
  }

  const finishQuiz = async () => {
    const score = calculateScore()
    
    await trackActivity('quiz', {
      category: activeQuiz.category,
      score: score.percentage,
      completed: true
    })
    
    setShowResults(true)
  }

  const calculateScore = () => {
    const questions = quizQuestions[activeQuiz.id] || []
    let correct = 0
    questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correct) {
        correct++
      }
    })
    return { correct, total: questions.length, percentage: Math.round((correct / questions.length) * 100) }
  }

  const resetQuiz = () => {
    setActiveQuiz(null)
    setCurrentQuestion(0)
    setSelectedAnswers({})
    setShowResults(false)
    setTimeLeft(null)
  }

  useEffect(() => {
    if (timeLeft > 0 && activeQuiz && !showResults) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      finishQuiz()
    }
  }, [timeLeft, activeQuiz, showResults])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  useEffect(() => {
    const fetchQuizzes = async () => {
      setLoading(true)
      setTimeout(() => {
        setQuizzes([
          {
            id: 1,
            title: 'Hiragana Basics',
            description: 'Master the fundamental Japanese hiragana characters',
            category: 'Hiragana',
            difficulty: 'Beginner',
            questions: 20,
            timeLimit: 15,
            points: 100,
            icon: 'あ'
          },
          {
            id: 2,
            title: 'Katakana Challenge',
            description: 'Test your katakana reading and writing skills',
            category: 'Katakana',
            difficulty: 'Beginner',
            questions: 20,
            timeLimit: 15,
            points: 100,
            icon: 'ア'
          },
          {
            id: 3,
            title: 'Basic Kanji (N5 Level)',
            description: 'Essential kanji characters for JLPT N5',
            category: 'Kanji',
            difficulty: 'Intermediate',
            questions: 25,
            timeLimit: 20,
            points: 150,
            icon: '漢'
          }
        ])
        setLoading(false)
      }, 1000)
    }

    fetchQuizzes()
  }, [])

  const categories = ['all', ...new Set(quizzes.map(q => q.category))]
  const filteredQuizzes = selectedCategory === 'all' ? quizzes : quizzes.filter(q => q.category === selectedCategory)

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'from-green-500 to-emerald-500'
      case 'intermediate': return 'from-yellow-500 to-orange-500'
      case 'advanced': return 'from-red-500 to-pink-500'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-purple-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-purple-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute top-10 left-10 text-8xl text-gray-800 dark:text-white transition-transform duration-300 ease-out"
          style={{
            transform: `translateY(${scrollY * 0.3}px) rotate(${scrollDirection === 'down' ? scrollY * 0.1 : -scrollY * 0.1}deg)`
          }}
        >
          漢
        </div>
        <div 
          className="absolute top-32 right-20 text-6xl text-blue-600 dark:text-blue-300 transition-transform duration-300 ease-out"
          style={{
            transform: `translateY(${scrollY * -0.2}px) rotate(${scrollDirection === 'down' ? -scrollY * 0.05 : scrollY * 0.05}deg)`
          }}
        >
          字
        </div>
        <div 
          className="absolute bottom-40 left-1/4 text-7xl text-purple-600 dark:text-purple-300 transition-transform duration-300 ease-out"
          style={{
            transform: `translateY(${scrollY * 0.4}px) rotate(${scrollDirection === 'down' ? scrollY * 0.08 : -scrollY * 0.08}deg)`
          }}
        >
          あ
        </div>
        <div 
          className="absolute bottom-20 right-1/3 text-5xl text-pink-600 dark:text-pink-300 transition-transform duration-300 ease-out"
          style={{
            transform: `translateY(${scrollY * -0.3}px) rotate(${scrollDirection === 'down' ? -scrollY * 0.06 : scrollY * 0.06}deg)`
          }}
        >
          カ
        </div>
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-9xl text-cyan-600 dark:text-cyan-300 transition-transform duration-300 ease-out"
          style={{
            transform: `translate(-50%, -50%) translateY(${scrollY * 0.2}px) rotate(${scrollDirection === 'down' ? scrollY * 0.05 : -scrollY * 0.05}deg)`
          }}
        >
          🎌
        </div>
        
        {/* Floating KAIRO Logo */}
        <div 
          className="absolute top-10 right-10 opacity-20 dark:opacity-30 transition-all duration-500 ease-out"
          style={{
            transform: `translateY(${scrollY * (scrollDirection === 'down' ? 0.3 : -0.3)}px) scale(${1 + scrollY * 0.0005}) rotate(${scrollDirection === 'down' ? scrollY * 0.08 : -scrollY * 0.08}deg)`
          }}
        >
          <div className="text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            KAIRØ
          </div>
        </div>
      </div>
      <div className="absolute inset-0">
        <div 
          className="floating-sakura sakura-1 transition-transform duration-300 ease-out"
          style={{
            transform: `translateY(${scrollY * 0.15}px) rotate(${scrollDirection === 'down' ? scrollY * 0.03 : -scrollY * 0.03}deg)`
          }}
        >
          🌸
        </div>
        <div 
          className="floating-sakura sakura-2 transition-transform duration-300 ease-out"
          style={{
            transform: `translateY(${scrollY * -0.1}px) rotate(${scrollDirection === 'down' ? -scrollY * 0.04 : scrollY * 0.04}deg)`
          }}
        >
          🌸
        </div>
        <div 
          className="floating-sakura sakura-3 transition-transform duration-300 ease-out"
          style={{
            transform: `translateY(${scrollY * 0.2}px) rotate(${scrollDirection === 'down' ? scrollY * 0.05 : -scrollY * 0.05}deg)`
          }}
        >
          🌸
        </div>
        <div 
          className="floating-sakura sakura-4 transition-transform duration-300 ease-out"
          style={{
            transform: `translateY(${scrollY * -0.18}px) rotate(${scrollDirection === 'down' ? -scrollY * 0.02 : scrollY * 0.02}deg)`
          }}
        >
          🌸
        </div>
      </div>
      <style>{`
        .floating-sakura {
          position: absolute;
          font-size: 2rem;
          animation: sakuraFloat 15s ease-in-out infinite;
        }
        .sakura-1 { top: 20%; left: 15%; animation-delay: 0s; }
        .sakura-2 { top: 60%; right: 20%; animation-delay: 3s; }
        .sakura-3 { bottom: 30%; left: 25%; animation-delay: 6s; }
        .sakura-4 { bottom: 70%; right: 15%; animation-delay: 9s; }
        @keyframes sakuraFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          25% { transform: translateY(-20px) rotate(90deg); opacity: 0.7; }
          50% { transform: translateY(-40px) rotate(180deg); opacity: 1; }
          75% { transform: translateY(-20px) rotate(270deg); opacity: 0.7; }
        }
      `}</style>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Japanese Quizzes 🧠
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Test your Japanese knowledge and track your learning progress
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-16">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20 dark:border-gray-700/50">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105'
                      : 'bg-white/70 dark:bg-gray-700/70 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/20 hover:scale-105'
                  }`}
                >
                  {category === 'all' ? 'All Categories' : category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Quizzes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredQuizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20 dark:border-gray-700/50 hover:shadow-3xl transition-all duration-300 hover:-translate-y-2 hover:scale-105"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-2xl font-bold">{quiz.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {quiz.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {quiz.description}
                </p>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getDifficultyColor(quiz.difficulty)} text-white`}>
                  {quiz.difficulty}
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Questions
                  </div>
                  <span className="font-medium">{quiz.questions}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    Time Limit
                  </div>
                  <span className="font-medium">{quiz.timeLimit} min</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center">
                    <Trophy className="h-4 w-4 mr-2" />
                    Points
                  </div>
                  <span className="font-medium">{quiz.points}</span>
                </div>
              </div>

              <button 
                onClick={() => startQuiz(quiz)}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105"
              >
                <Play className="h-5 w-5 mr-2" />
                Start Quiz
              </button>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredQuizzes.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              No quizzes found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {selectedCategory === 'all'
                ? 'No Japanese quizzes available at the moment.'
                : `No quizzes found in the ${selectedCategory} category.`
              }
            </p>
          </div>
        )}
      </div>

      {/* Quiz Interface */}
      {activeQuiz && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 dark:border-gray-700/50">
            <div className="p-8">
              {!showResults ? (
                <>
                  {/* Quiz Header */}
                  <div className="flex items-center justify-between mb-6">
                    <button onClick={resetQuiz} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                      <ArrowLeft className="h-6 w-6" />
                    </button>
                    <div className="text-center">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{activeQuiz.title}</h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Question {currentQuestion + 1} of {quizQuestions[activeQuiz.id]?.length || 0}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{timeLeft && formatTime(timeLeft)}</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-8">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentQuestion + 1) / (quizQuestions[activeQuiz.id]?.length || 1)) * 100}%` }}
                    ></div>
                  </div>

                  {/* Question */}
                  {quizQuestions[activeQuiz.id] && quizQuestions[activeQuiz.id][currentQuestion] && (
                    <div className="mb-8">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {quizQuestions[activeQuiz.id][currentQuestion].question}
                        </h3>
                        <button 
                          onClick={() => speakText(quizQuestions[activeQuiz.id][currentQuestion].questionAudio)}
                          className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                        >
                          <Volume2 className="h-5 w-5" />
                        </button>
                      </div>
                      
                      {/* Answer Options */}
                      <div className="grid grid-cols-1 gap-3">
                        {quizQuestions[activeQuiz.id][currentQuestion].options.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => selectAnswer(currentQuestion, index)}
                            className={`p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                              selectedAnswers[currentQuestion] === index
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                                : 'border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                            }`}
                          >
                            <span className="font-medium">{String.fromCharCode(65 + index)}. {option}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Next Button */}
                  <div className="flex justify-end">
                    <button
                      onClick={nextQuestion}
                      disabled={selectedAnswers[currentQuestion] === undefined}
                      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium rounded-xl transition-all duration-300 disabled:cursor-not-allowed"
                    >
                      {currentQuestion < (quizQuestions[activeQuiz.id]?.length || 1) - 1 ? 'Next Question' : 'Finish Quiz'}
                    </button>
                  </div>
                </>
              ) : (
                /* Quiz Results */
                <div className="text-center">
                  <div className="mb-6">
                    {(() => {
                      const score = calculateScore()
                      return score.percentage >= 80 ? (
                        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                      ) : score.percentage >= 60 ? (
                        <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                      ) : (
                        <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                      )
                    })()}
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Quiz Complete!</h2>
                    <p className="text-gray-600 dark:text-gray-400">Here are your results</p>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 mb-6">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{calculateScore().correct}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Correct</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{calculateScore().percentage}%</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Score</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">{activeQuiz.points}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Points</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={resetQuiz}
                      className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                      Back to Quizzes
                    </button>
                    <button
                      onClick={() => startQuiz(activeQuiz)}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium rounded-xl transition-all duration-300 flex items-center justify-center"
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Retry Quiz
                    </button>
                  </div>
                </div>
              )}
            </div>
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
    </div>
  )
}

export default Quizzes