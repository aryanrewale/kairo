import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, MessageCircle, Target, Brain, Users, Zap, Shield, Globe, Play, ArrowRight, Star, ChevronUp } from 'lucide-react'
import VideoDemo from '../components/VideoDemo'

const Home = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false)
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
  
  // Add custom CSS for animations
  const customStyles = `
    @keyframes fade-in {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
      animation: fade-in 0.6s ease-out;
    }
  `
  const features = [
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Interactive Flashcards",
      description: "Master Japanese vocabulary with our smart spaced repetition system. Learn kanji, hiragana, katakana, and vocabulary effectively.",
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "Adaptive Quizzes",
      description: "Test your knowledge with personalized quizzes that adapt to your learning progress and focus on areas that need improvement.",
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "JLPT & MEXT Exams",
      description: "Prepare for official Japanese proficiency tests with authentic practice materials and mock examinations.",
    },
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: "Language Exchange Chat",
      description: "Practice conversations with native Japanese speakers and fellow learners in a supportive community environment.",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Global Community",
      description: "Connect with learners worldwide, share experiences, and support each other's Japanese learning journey.",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "AI-Powered Learning",
      description: "Experience personalized learning paths powered by artificial intelligence that adapts to your unique learning style.",
    },
  ]

  const stats = [
    { number: "50K+", label: "Active Learners" },
    { number: "1M+", label: "Flashcards Created" },
    { number: "100K+", label: "Chat Messages Daily" },
    { number: "95%", label: "Success Rate" },
  ]

  return (
    <>
      <style>{customStyles}</style>
      <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section - Pexels Style */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with scroll-based animation */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div 
            className="absolute top-20 left-10 text-9xl text-primary-600 transition-transform duration-300 ease-out"
            style={{
              transform: `translateY(${scrollY * 0.3}px) rotate(${scrollDirection === 'down' ? scrollY * 0.1 : -scrollY * 0.1}deg)`
            }}
          >
            漢
          </div>
          <div 
            className="absolute top-40 right-20 text-7xl text-blue-500 transition-transform duration-300 ease-out"
            style={{
              transform: `translateY(${scrollY * -0.2}px) rotate(${scrollDirection === 'down' ? -scrollY * 0.05 : scrollY * 0.05}deg)`
            }}
          >
            字
          </div>
          <div 
            className="absolute bottom-32 left-1/4 text-8xl text-purple-500 transition-transform duration-300 ease-out"
            style={{
              transform: `translateY(${scrollY * 0.4}px) rotate(${scrollDirection === 'down' ? scrollY * 0.08 : -scrollY * 0.08}deg)`
            }}
          >
            あ
          </div>
          <div 
            className="absolute bottom-20 right-1/3 text-6xl text-green-500 transition-transform duration-300 ease-out"
            style={{
              transform: `translateY(${scrollY * -0.3}px) rotate(${scrollDirection === 'down' ? -scrollY * 0.06 : scrollY * 0.06}deg)`
            }}
          >
            カ
          </div>
        </div>
        
        {/* Floating KAIRO Logo */}
        <div 
          className="absolute top-10 right-10 opacity-10 dark:opacity-20 transition-all duration-500 ease-out"
          style={{
            transform: `translateY(${scrollY * (scrollDirection === 'down' ? 0.5 : -0.5)}px) scale(${1 + scrollY * 0.001}) rotate(${scrollDirection === 'down' ? scrollY * 0.1 : -scrollY * 0.1}deg)`
          }}
        >
          <div className="text-6xl font-black bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">
            KAIRØ
          </div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full text-primary-800 dark:text-primary-200 text-sm font-medium mb-6 animate-fade-in">
              <Star className="w-4 h-4 mr-2" />
              Trusted by 50,000+ learners worldwide
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 dark:text-white mb-8 leading-tight">
            Master
            <span className="block bg-gradient-to-r from-primary-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Japanese
            </span>
            <span className="block text-4xl md:text-5xl lg:text-6xl font-light text-gray-600 dark:text-gray-300">
              the modern way
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Interactive flashcards, AI-powered quizzes, and real conversations. 
            <span className="font-semibold text-gray-900 dark:text-white">Everything you need</span> to become fluent.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link
              to="/register"
              className="relative overflow-hidden group px-10 py-4 bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 text-white rounded-2xl font-semibold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 flex items-center"
            >
              <span className="absolute inset-0 bg-white opacity-0 group-active:opacity-20 transition-opacity duration-200 rounded-2xl"></span>
              <span className="relative z-10 flex items-center">
                Start Learning Free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <button
              onClick={() => setIsVideoOpen(true)}
              className="relative overflow-hidden group px-10 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-primary-600 hover:text-white rounded-2xl font-semibold text-lg transition-all duration-300 flex items-center hover:shadow-lg"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-primary-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></span>
              <span className="relative z-10 flex items-center">
                <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </span>
            </button>
          </div>
          
          {/* Interactive Japanese Characters */}
          <div className="flex justify-center space-x-4 md:space-x-8">
            {['あ', 'い', 'う', 'え', 'お'].map((char, index) => (
              <div
                key={char}
                className="group cursor-pointer"
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <div className="text-4xl md:text-6xl text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-all duration-300 hover:scale-125 animate-bounce">
                  {char}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Stats Section - Glassmorphism Style */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="group text-center p-6 rounded-2xl hover:bg-white/50 dark:hover:bg-gray-700/50 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <div className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform">
                    {stat.number}
                  </div>
                  <div className="text-gray-700 dark:text-gray-200 font-semibold">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Glassmorphism Grid Style */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20 dark:border-gray-700/50 max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
                Everything You Need
              </h2>
              <p className="text-xl text-gray-700 dark:text-gray-200 leading-relaxed">
                Discover powerful tools designed to accelerate your Japanese learning journey
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative p-8 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100/50 dark:border-gray-700/50 hover:border-primary-200 dark:hover:border-primary-800 hover:-translate-y-2 overflow-hidden cursor-pointer"
              >
                {/* Enhanced gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-blue-100 dark:from-primary-900/30 dark:to-blue-900/30 rounded-2xl flex items-center justify-center text-primary-600 dark:text-primary-400 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md group-hover:shadow-lg">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                    {feature.description}
                  </p>
                </div>
                
                {/* Click ripple effect */}
                <div className="absolute inset-0 opacity-0 group-active:opacity-30 bg-gradient-to-r from-primary-400 to-blue-400 transition-opacity duration-200 rounded-3xl"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose KAIRØ Section - Pexels Split Layout */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-8">
                Why Choose
                <span className="block bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">
                  KAIRØ?
                </span>
              </h2>
              <div className="space-y-8">
                {[
                  {
                    icon: <Shield className="h-7 w-7" />,
                    title: "Trusted by Thousands",
                    desc: "Join over 50,000 learners who have successfully improved their Japanese with KAIRØ."
                  },
                  {
                    icon: <Globe className="h-7 w-7" />,
                    title: "Learn Anywhere, Anytime", 
                    desc: "Access your learning materials on any device with our responsive web platform."
                  },
                  {
                    icon: <Users className="h-7 w-7" />,
                    title: "Community Support",
                    desc: "Connect with fellow learners and native speakers for practice and motivation."
                  }
                ].map((item, index) => (
                  <div key={index} className="group flex items-start space-x-6 p-6 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300">
                    <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-primary-100 to-blue-100 dark:from-primary-900/30 dark:to-blue-900/30 rounded-xl flex items-center justify-center text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Interactive Visual */}
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative group">
                <div 
                  className="w-80 h-80 bg-gradient-to-br from-primary-500 via-blue-500 to-purple-500 rounded-3xl p-1 group-hover:scale-105 transition-all duration-500"
                  style={{
                    transform: `translateY(${scrollY * (scrollDirection === 'down' ? 0.1 : -0.1)}px) rotate(${scrollDirection === 'down' ? scrollY * 0.02 : -scrollY * 0.02}deg)`
                  }}
                >
                  <div className="w-full h-full bg-white dark:bg-gray-900 rounded-3xl flex flex-col items-center justify-center text-center p-8">
                    <div 
                      className="text-7xl mb-6 transition-transform duration-300"
                      style={{
                        transform: `rotate(${scrollDirection === 'down' ? scrollY * 0.05 : -scrollY * 0.05}deg)`
                      }}
                    >
                      🎌
                    </div>
                    <h3 className="text-3xl font-black bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent mb-4">
                      KAIRØ
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 font-medium">
                      Your Japanese Learning Journey
                    </p>
                  </div>
                </div>
                {/* Floating elements with scroll animation */}
                <div 
                  className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-2xl transition-transform duration-300"
                  style={{
                    transform: `translateY(${scrollY * (scrollDirection === 'down' ? -0.3 : 0.3)}px) rotate(${scrollDirection === 'down' ? scrollY * 0.1 : -scrollY * 0.1}deg)`
                  }}
                >
                  ⭐
                </div>
                <div 
                  className="absolute -bottom-4 -left-4 w-10 h-10 bg-green-400 rounded-full flex items-center justify-center text-xl transition-transform duration-300"
                  style={{
                    transform: `translateY(${scrollY * (scrollDirection === 'down' ? 0.4 : -0.4)}px) rotate(${scrollDirection === 'down' ? -scrollY * 0.08 : scrollY * 0.08}deg)`
                  }}
                >
                  ✨
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Pexels Style */}
      <section className="py-24 bg-gradient-to-br from-primary-600 via-blue-600 to-purple-600 relative overflow-hidden">
        {/* Animated Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute top-10 left-10 text-6xl text-white transition-transform duration-300 ease-out"
            style={{
              transform: `translateY(${scrollY * 0.2}px) rotate(${scrollDirection === 'down' ? scrollY * 0.05 : -scrollY * 0.05}deg)`
            }}
          >
            漢
          </div>
          <div 
            className="absolute top-20 right-20 text-5xl text-white transition-transform duration-300 ease-out"
            style={{
              transform: `translateY(${scrollY * -0.15}px) rotate(${scrollDirection === 'down' ? -scrollY * 0.03 : scrollY * 0.03}deg)`
            }}
          >
            字
          </div>
          <div 
            className="absolute bottom-20 left-1/4 text-7xl text-white transition-transform duration-300 ease-out"
            style={{
              transform: `translateY(${scrollY * 0.25}px) rotate(${scrollDirection === 'down' ? scrollY * 0.04 : -scrollY * 0.04}deg)`
            }}
          >
            あ
          </div>
          <div 
            className="absolute bottom-10 right-1/3 text-4xl text-white transition-transform duration-300 ease-out"
            style={{
              transform: `translateY(${scrollY * -0.2}px) rotate(${scrollDirection === 'down' ? -scrollY * 0.06 : scrollY * 0.06}deg)`
            }}
          >
            カ
          </div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8">
            Ready to Start Your
            <span className="block">Japanese Journey?</span>
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of learners who are already mastering Japanese with our interactive platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/register"
              className="relative overflow-hidden group px-12 py-5 bg-white text-primary-600 rounded-2xl font-bold text-xl transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 flex items-center justify-center"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-primary-100 to-blue-100 opacity-0 group-active:opacity-50 transition-opacity duration-200 rounded-2xl"></span>
              <span className="relative z-10 flex items-center">
                Get Started Today - Free!
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link
              to="/login"
              className="relative overflow-hidden group px-12 py-5 border-2 border-white text-white hover:bg-white hover:text-primary-600 rounded-2xl font-bold text-xl transition-all duration-300"
            >
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></span>
              <span className="relative z-10 group-hover:text-primary-600 transition-colors duration-300">Sign In</span>
            </Link>
          </div>
        </div>
      </section>
      </div>
      
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-50 w-12 h-12 bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center transform ${
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
      
      <VideoDemo isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
    </>
  )
}

export default Home