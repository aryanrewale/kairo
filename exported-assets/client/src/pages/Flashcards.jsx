import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { RotateCcw, Plus, BookOpen, Shuffle, Volume2, ChevronUp } from 'lucide-react'
import axios from 'axios'
import { useActivityTracker } from '../hooks/useActivityTracker'

const Flashcards = () => {
  const [flashcards, setFlashcards] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [loading, setLoading] = useState(true)
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

  // Load voices when component mounts
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices()
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices()
      }
    }
  }, [])

  useEffect(() => {
    const fetchFlashcards = async () => {
      setLoading(true)
      try {
        const response = await axios.get('/api/flashcards')
        const cards = response.data.flashcards.map(card => ({
          id: card._id || Math.random(),
          question: `${card.japanese} (${card.romaji})`,
          answer: `${card.english}${card.exampleSentence ? '\n\nExample: ' + card.exampleSentence.japanese + ' - ' + card.exampleSentence.english : ''}`,
          category: card.category
        }))
        setFlashcards(cards)
      } catch (error) {
        // Default flashcards
        setFlashcards([
          {
            id: 1,
            question: 'おはようございます',
            questionAudio: 'おはようございます',
            answer: 'Good morning (polite)\n\nRomaji: ohayou gozaimasu\nUsage: Used until 10 AM\nExample: おはようございます、田中さん。',
            answerAudio: 'Good morning',
            category: 'Greetings'
          },
          {
            id: 2,
            question: 'こんにちは',
            questionAudio: 'こんにちは',
            answer: 'Hello / Good afternoon\n\nRomaji: konnichiwa\nUsage: 10 AM - 6 PM\nExample: こんにちは、元気ですか？',
            answerAudio: 'Hello',
            category: 'Greetings'
          },
          {
            id: 3,
            question: 'ありがとうございます',
            questionAudio: 'ありがとうございます',
            answer: 'Thank you very much\n\nRomaji: arigatou gozaimasu\nUsage: Polite form\nExample: 手伝ってくれてありがとうございます。',
            answerAudio: 'Thank you very much',
            category: 'Greetings'
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchFlashcards()
  }, [])

  const handleCardClick = () => {
    setShowAnswer(!showAnswer)
  }

  const handleNext = async () => {
    const hasKanji = currentCard?.question?.match(/[\u4e00-\u9faf]/)
    await trackActivity('flashcard', {
      category: currentCard?.category || 'General',
      newKanji: hasKanji ? 1 : 0
    })
    
    setCurrentIndex((prev) => (prev + 1) % flashcards.length)
    setShowAnswer(false)
  }

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length)
    setShowAnswer(false)
  }

  const handleShuffle = () => {
    const shuffled = [...flashcards].sort(() => Math.random() - 0.5)
    setFlashcards(shuffled)
    setCurrentIndex(0)
    setShowAnswer(false)
  }

  const handleReset = () => {
    setCurrentIndex(0)
    setShowAnswer(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-purple-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (flashcards.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-purple-900 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BookOpen className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            No Flashcards Yet
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Create your first flashcard to start learning!
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center mx-auto">
            <Plus className="h-5 w-5 mr-2" />
            Create Flashcard
          </button>
        </div>
      </div>
    )
  }

  const currentCard = flashcards[currentIndex]

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
            Japanese Flashcards 🃏
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Master Japanese vocabulary through interactive learning • {currentIndex + 1} of {flashcards.length} cards
          </p>
        </div>

        {/* Controls */}
        <div className="mb-16">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20 dark:border-gray-700/50">
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <button
                onClick={handleShuffle}
                className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-4 border border-white/20 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-center"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                  <Shuffle className="h-6 w-6 text-white" />
                </div>
                <span className="font-medium text-gray-900 dark:text-white">Shuffle</span>
              </button>
              <button
                onClick={handleReset}
                className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-4 border border-white/20 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-center"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                  <RotateCcw className="h-6 w-6 text-white" />
                </div>
                <span className="font-medium text-gray-900 dark:text-white">Reset</span>
              </button>
            </div>
            
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3">
              {[...new Set(flashcards.map(card => card.category))].map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    const firstIndex = flashcards.findIndex(card => card.category === category)
                    setCurrentIndex(firstIndex)
                    setShowAnswer(false)
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    currentCard?.category === category
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                      : 'bg-white/70 dark:bg-gray-700/70 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/20'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Flashcard */}
        <div className="flex justify-center mb-16">
          <div
            onClick={handleCardClick}
            className={`relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl shadow-2xl p-12 w-full max-w-4xl min-h-[400px] cursor-pointer transition-all duration-500 hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105 border-2 overflow-hidden ${
              showAnswer 
                ? 'border-green-400 dark:border-green-500' 
                : 'border-blue-400 dark:border-blue-500'
            }`}
          >
            <div className="relative z-10 h-full flex flex-col justify-center">
              <div className="text-center">
                <div className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-bold mb-8 ${
                  showAnswer 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200'
                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200'
                }`}>
                  <div className={`text-3xl mr-3 ${showAnswer ? 'animate-bounce' : 'animate-pulse'}`}>
                    {showAnswer ? '💡' : '❓'}
                  </div>
                  {showAnswer ? '答え (Answer)' : '質問 (Question)'}
                </div>
                
                <div className="mb-8">
                  <div className="flex items-center justify-center mb-6">
                    <div className={`text-4xl md:text-5xl font-black leading-relaxed transition-colors duration-300 mr-6 ${
                      showAnswer 
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-gray-900 dark:text-white'
                    }`}>
                      {showAnswer ? currentCard.answer.split('\n')[0] : currentCard.question}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        const audioText = showAnswer 
                          ? (currentCard.answerAudio || currentCard.answer.split('\n')[0])
                          : (currentCard.questionAudio || currentCard.question)
                        speakText(audioText)
                      }}
                      className="p-4 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 rounded-full transition-colors group"
                      title="Listen to pronunciation"
                    >
                      <Volume2 className="w-8 h-8 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
                    </button>
                  </div>
                  {showAnswer && (
                    <div className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                      {currentCard.answer}
                    </div>
                  )}
                </div>
                
                <div className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-medium ${
                  showAnswer 
                    ? 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400'
                    : 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                }`}>
                  {showAnswer ? 'Click to see question' : 'Click to reveal answer'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20 dark:border-gray-700/50">
          <div className="flex justify-center items-center space-x-8">
            <button
              onClick={handlePrevious}
              disabled={flashcards.length <= 1}
              className="group bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 flex items-center shadow-lg hover:shadow-xl hover:scale-105"
            >
              <span className="text-xl mr-3 group-hover:-translate-x-1 transition-transform">←</span>
              Previous
            </button>
            
            <div className="flex items-center px-8 py-4 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl border border-blue-200 dark:border-blue-700">
              <span className="text-2xl font-black text-blue-700 dark:text-blue-300">
                {currentIndex + 1} / {flashcards.length}
              </span>
            </div>
            
            <button
              onClick={handleNext}
              disabled={flashcards.length <= 1}
              className="group bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 flex items-center shadow-lg hover:shadow-xl hover:scale-105"
            >
              Next
              <span className="text-xl ml-3 group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-8">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300" 
                style={{ width: `${((currentIndex + 1) / flashcards.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

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

export default Flashcards