import { ArrowLeft, ChevronUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const AboutUs = () => {
  const currentYear = new Date().getFullYear()
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-purple-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10 dark:opacity-10">
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
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-300 dark:to-purple-300 bg-clip-text text-transparent">
            About KAIRØ
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Founded: {currentYear - 2} | Headquarters: Tokyo, Japan
          </p>
        </div>

        {/* Content */}
        <div className="bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 prose prose-lg dark:prose-invert max-w-none border border-gray-200 dark:border-white/20">
          
          <h2 className="text-cyan-600 dark:text-cyan-300">🎌 About KAIRØ</h2>
          <p className="text-gray-700 dark:text-gray-200">
            KAIRØ is your comprehensive Japanese language learning companion, combining traditional methods 
            with cutting-edge AI technology for an engaging, personalized experience.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="bg-blue-100 dark:bg-blue-500/20 p-4 rounded-lg">
              <h4 className="text-blue-700 dark:text-blue-300 font-semibold">🎯 Our Mission</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Making Japanese accessible to everyone, everywhere</p>
            </div>
            <div className="bg-purple-100 dark:bg-purple-500/20 p-4 rounded-lg">
              <h4 className="text-purple-700 dark:text-purple-300 font-semibold">💡 Our Vision</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Revolutionizing language learning through innovation</p>
            </div>
          </div>

          <h2 className="text-cyan-600 dark:text-cyan-300">📊 Our Platform</h2>
          <div className="bg-gray-100 dark:bg-gray-800/50 p-6 rounded-lg">
            <h3 className="text-yellow-600 dark:text-yellow-300">Learning Features</h3>
            <p className="text-gray-700 dark:text-gray-300">Interactive flashcards, adaptive quizzes, JLPT preparation, live chat</p>
            
            <h3 className="text-yellow-600 dark:text-yellow-300 mt-4">AI Technology</h3>
            <p className="text-gray-700 dark:text-gray-300">Personalized learning paths, progress tracking, smart recommendations</p>
          </div>

          <h2 className="text-cyan-600 dark:text-cyan-300">🎆 What Makes Us Special</h2>
          <div className="space-y-4">
            <div className="bg-green-100 dark:bg-green-500/20 p-4 rounded-lg border-l-4 border-green-500 dark:border-green-400">
              <h4 className="text-green-700 dark:text-green-300 font-semibold">AI-Powered Learning</h4>
              <p className="text-gray-600 dark:text-gray-300">Advanced algorithms adapt to your learning style and pace</p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-500/20 p-4 rounded-lg border-l-4 border-blue-500 dark:border-blue-400">
              <h4 className="text-blue-700 dark:text-blue-300 font-semibold">Global Community</h4>
              <p className="text-gray-600 dark:text-gray-300">Connect with learners and native speakers worldwide</p>
            </div>
          </div>

          <h2 className="text-cyan-600 dark:text-cyan-300">🔒 Security & Trust</h2>
          <div className="bg-red-100 dark:bg-red-500/20 p-6 rounded-lg">
            <ul className="text-gray-700 dark:text-gray-300 space-y-2">
              <li>✅ 50,000+ active learners worldwide</li>
              <li>✅ 1M+ lessons completed successfully</li>
              <li>✅ Available in 150+ countries</li>
              <li>✅ 95% user satisfaction rate</li>
            </ul>
          </div>

          <h2 className="text-cyan-600 dark:text-cyan-300">🏆 Our Achievements</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="bg-purple-100 dark:bg-purple-500/20 p-3 rounded text-center">
              <div className="text-purple-700 dark:text-purple-300 font-semibold">EdTech Award</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">2024 Winner</div>
            </div>
            <div className="bg-blue-100 dark:bg-blue-500/20 p-3 rounded text-center">
              <div className="text-blue-700 dark:text-blue-300 font-semibold">Top App</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">App Store</div>
            </div>
            <div className="bg-green-100 dark:bg-green-500/20 p-3 rounded text-center">
              <div className="text-green-700 dark:text-green-300 font-semibold">5-Star Rating</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">User Reviews</div>
            </div>
          </div>

          <h2 className="text-cyan-600 dark:text-cyan-300">👥 Our Team</h2>
          <div className="bg-gray-100 dark:bg-gray-800/50 p-6 rounded-lg">
            <h3 className="text-yellow-600 dark:text-yellow-300">Leadership</h3>
            <p className="text-gray-700 dark:text-gray-300">Hiroshi Tanaka (CEO), Sarah Chen (CTO), Yuki Sato (Head of Education)</p>
            
            <h3 className="text-yellow-600 dark:text-yellow-300 mt-4">Global Team</h3>
            <p className="text-gray-700 dark:text-gray-300">50+ educators, developers, and linguists across Tokyo, San Francisco, London</p>
          </div>

          <h2 className="text-cyan-600 dark:text-cyan-300">📞 Contact Us</h2>
          <div className="bg-gray-100 dark:bg-gray-800/50 p-4 rounded-lg">
            <p className="text-gray-700 dark:text-gray-300">Questions about KAIRØ? Reach out to us:</p>
            <div className="mt-2 space-y-1 text-sm">
              <div>📧 <span className="text-blue-600 dark:text-blue-300">hello@kairo.com</span></div>
              <div>📱 <span className="text-green-600 dark:text-green-300">+1 (555) 123-KAIRO</span></div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-500/20 dark:to-purple-500/20 rounded-lg border border-cyan-500 dark:border-cyan-400/30">
            <p className="text-sm text-cyan-700 dark:text-cyan-200">
              <strong>🎌 Join the KAIRØ Family:</strong> We're more than just a learning platform – we're a community 
              passionate about Japanese language and culture. Start your journey today!
            </p>
          </div>
        </div>
        
        {/* Copyright Footer */}
        <div className="mt-12 text-center border-t border-gray-300 dark:border-white/20 pt-8">
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            © {currentYear} KAIRØ. All rights reserved.
          </p>
        </div>
      </div>
      
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-50 w-12 h-12 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center transform ${
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

export default AboutUs