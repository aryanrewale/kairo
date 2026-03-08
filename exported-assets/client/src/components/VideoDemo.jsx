import { useState, useEffect } from 'react'
import { X, Play, Pause, RotateCcw, Volume2 } from 'lucide-react'

const VideoDemo = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentScene, setCurrentScene] = useState(0)

  const scenes = [
    {
      title: "KAIRO Platform",
      duration: 4000,
      content: (
        <div className="relative h-full overflow-hidden bg-black">
          {/* Cinematic Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-black">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent_50%)]" />
          </div>
          
          {/* Animated Grid */}
          <div className="absolute inset-0 opacity-20">
            <div className="grid-pattern" />
          </div>
          
          {/* Main Content */}
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="text-center">
              {/* Logo Animation */}
              <div className="mb-8 relative">
                <div className="text-9xl mb-4 animate-logo-glow">🎌</div>
                <div className="absolute inset-0 animate-pulse">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full blur-3xl opacity-30" />
                </div>
              </div>
              
              {/* Title */}
              <h1 className="text-7xl font-black mb-4 bg-gradient-to-r from-white via-cyan-200 to-purple-300 bg-clip-text text-transparent animate-title-reveal">
                KAIRO
              </h1>
              
              {/* Subtitle */}
              <div className="relative">
                <p className="text-2xl text-gray-300 font-light tracking-wide animate-subtitle-fade">
                  Master Japanese the Modern Way
                </p>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-600 animate-line-expand" />
              </div>
            </div>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="floating-orb orb-1" />
            <div className="floating-orb orb-2" />
            <div className="floating-orb orb-3" />
          </div>
        </div>
      )
    },
    {
      title: "Interactive Flashcards",
      duration: 5000,
      content: (
        <div className="relative h-full overflow-hidden bg-gradient-to-br from-emerald-900 via-teal-900 to-black">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="neural-network" />
          </div>
          
          <div className="relative z-10 h-full flex items-center justify-center">
            {/* Modern Flashcard */}
            <div className="flashcard-container">
              <div className="modern-flashcard">
                <div className="card-glow" />
                <div className="card-content">
                  <div className="text-8xl mb-6 animate-kanji-glow">桜</div>
                  <div className="text-xl text-gray-300 mb-4">What does this mean?</div>
                  <div className="answer-reveal">
                    <div className="text-3xl font-bold text-emerald-400 mb-2">さくら</div>
                    <div className="text-lg text-gray-400">Cherry Blossom</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Kanji */}
            <div className="kanji-particles">
              <span className="kanji-particle">漢</span>
              <span className="kanji-particle">字</span>
              <span className="kanji-particle">あ</span>
              <span className="kanji-particle">カ</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "AI Chat Assistant",
      duration: 6000,
      content: (
        <div className="relative h-full overflow-hidden bg-gradient-to-br from-violet-900 via-purple-900 to-black">
          {/* Holographic Background */}
          <div className="absolute inset-0">
            <div className="hologram-grid" />
          </div>
          
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="chat-interface">
              {/* Chat Header */}
              <div className="chat-header">
                <div className="ai-avatar">
                  <div className="avatar-glow" />
                  🤖
                </div>
                <div className="ai-status">
                  <div className="text-lg font-semibold text-white">KAIRO AI</div>
                  <div className="text-sm text-green-400 flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                    Online
                  </div>
                </div>
              </div>
              
              {/* Messages */}
              <div className="messages-container">
                <div className="message user-message">
                  <div className="message-content">
                    こんにちは！元気ですか？
                  </div>
                </div>
                
                <div className="message ai-message">
                  <div className="message-content">
                    Hello! I'm fine, thank you! 😊<br/>
                    <span className="text-purple-300">That means "Hello! How are you?" in Japanese.</span>
                  </div>
                </div>
                

              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Progress Analytics",
      duration: 5000,
      content: (
        <div className="relative h-full overflow-hidden bg-gradient-to-br from-orange-900 via-red-900 to-black">
          {/* Data Visualization Background */}
          <div className="absolute inset-0">
            <div className="data-streams" />
          </div>
          
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="analytics-dashboard">
              {/* Stats Cards */}
              <div className="stats-container">
                <div className="stat-card modern">
                  <div className="stat-icon">📚</div>
                  <div className="stat-value animate-counter">247</div>
                  <div className="stat-label">Words Mastered</div>
                  <div className="stat-trend">+12 today</div>
                </div>
                
                <div className="stat-card modern">
                  <div className="stat-icon">🔥</div>
                  <div className="stat-value animate-counter">15</div>
                  <div className="stat-label">Day Streak</div>
                  <div className="stat-trend">Personal best!</div>
                </div>
              </div>
              
              {/* Progress Visualization */}
              <div className="progress-visualization">
                <div className="progress-title">JLPT N4 Progress</div>
                <div className="circular-progress">
                  <svg className="progress-ring" width="120" height="120">
                    <circle className="progress-ring-bg" cx="60" cy="60" r="50" />
                    <circle className="progress-ring-fill" cx="60" cy="60" r="50" />
                  </svg>
                  <div className="progress-percentage">75%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ]

  useEffect(() => {
    let timer
    if (isPlaying && currentScene < scenes.length) {
      timer = setTimeout(() => {
        if (currentScene < scenes.length - 1) {
          setCurrentScene(prev => prev + 1)
        } else {
          setIsPlaying(false)
          setCurrentScene(0)
        }
      }, scenes[currentScene]?.duration || 3000)
    }
    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [isPlaying, currentScene])

  useEffect(() => {
    if (isOpen && !isPlaying) {
      setCurrentScene(0)
    }
  }, [isOpen])

  const handlePlay = () => {
    setIsPlaying(true)
  }

  const handlePause = () => {
    setIsPlaying(false)
  }

  const handleRestart = () => {
    setCurrentScene(0)
    setIsPlaying(true)
  }

  const handleSceneClick = (index) => {
    setCurrentScene(index)
    setIsPlaying(true)
  }

  if (!isOpen) return null

  return (
    <>
      <style>{`
        /* Modern Cinematic Animations */
        .animate-logo-glow {
          animation: logoGlow 3s ease-in-out infinite;
        }
        
        .animate-title-reveal {
          animation: titleReveal 2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .animate-subtitle-fade {
          animation: subtitleFade 2s ease-out 0.5s both;
        }
        
        .animate-line-expand {
          animation: lineExpand 1.5s ease-out 1s both;
        }
        
        .animate-kanji-glow {
          animation: kanjiGlow 4s ease-in-out infinite;
        }
        
        .animate-counter {
          animation: counterUp 2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        /* Keyframes */
        @keyframes logoGlow {
          0%, 100% { filter: drop-shadow(0 0 20px rgba(147, 51, 234, 0.5)); transform: scale(1); }
          50% { filter: drop-shadow(0 0 40px rgba(147, 51, 234, 0.8)); transform: scale(1.05); }
        }
        
        @keyframes titleReveal {
          0% { opacity: 0; transform: translateY(50px) scale(0.8); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        @keyframes subtitleFade {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes lineExpand {
          0% { width: 0; }
          100% { width: 96px; }
        }
        
        @keyframes kanjiGlow {
          0%, 100% { text-shadow: 0 0 20px rgba(16, 185, 129, 0.5); }
          50% { text-shadow: 0 0 40px rgba(16, 185, 129, 0.8), 0 0 60px rgba(16, 185, 129, 0.3); }
        }
        
        @keyframes counterUp {
          0% { opacity: 0; transform: translateY(30px) scale(0.5); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        /* Background Effects */
        .grid-pattern {
          background-image: 
            linear-gradient(rgba(120, 119, 198, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(120, 119, 198, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: gridMove 20s linear infinite;
        }
        
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        .floating-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(1px);
          animation: orbFloat 8s ease-in-out infinite;
        }
        
        .orb-1 {
          width: 100px;
          height: 100px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.3), transparent);
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }
        
        .orb-2 {
          width: 150px;
          height: 150px;
          background: radial-gradient(circle, rgba(147, 51, 234, 0.2), transparent);
          top: 60%;
          right: 15%;
          animation-delay: 2s;
        }
        
        .orb-3 {
          width: 80px;
          height: 80px;
          background: radial-gradient(circle, rgba(16, 185, 129, 0.3), transparent);
          bottom: 20%;
          left: 20%;
          animation-delay: 4s;
        }
        
        @keyframes orbFloat {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-30px) translateX(20px); }
          66% { transform: translateY(20px) translateX(-15px); }
        }
        
        /* Modern Flashcard */
        .flashcard-container {
          perspective: 1000px;
        }
        
        .modern-flashcard {
          position: relative;
          width: 320px;
          height: 400px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          animation: cardFloat 6s ease-in-out infinite;
        }
        
        .card-glow {
          position: absolute;
          inset: -2px;
          background: linear-gradient(45deg, #10b981, #3b82f6, #8b5cf6);
          border-radius: 22px;
          z-index: -1;
          animation: glowRotate 3s linear infinite;
        }
        
        .card-content {
          padding: 40px;
          text-align: center;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          color: white;
        }
        
        .answer-reveal {
          margin-top: 20px;
          animation: answerReveal 2s ease-out 2s both;
        }
        
        @keyframes cardFloat {
          0%, 100% { transform: translateY(0px) rotateX(0deg); }
          50% { transform: translateY(-20px) rotateX(5deg); }
        }
        
        @keyframes glowRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes answerReveal {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        /* Kanji Particles */
        .kanji-particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        
        .kanji-particle {
          position: absolute;
          font-size: 2rem;
          color: rgba(16, 185, 129, 0.3);
          animation: particleFloat 10s ease-in-out infinite;
        }
        
        .kanji-particle:nth-child(1) { top: 15%; left: 15%; animation-delay: 0s; }
        .kanji-particle:nth-child(2) { top: 25%; right: 20%; animation-delay: 2.5s; }
        .kanji-particle:nth-child(3) { bottom: 35%; left: 25%; animation-delay: 5s; }
        .kanji-particle:nth-child(4) { bottom: 20%; right: 15%; animation-delay: 7.5s; }
        
        @keyframes particleFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-40px) rotate(180deg); opacity: 0.7; }
        }
        
        /* Modern Chat Interface */
        .chat-interface {
          width: 400px;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          overflow: hidden;
        }
        
        .chat-header {
          padding: 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          gap: 15px;
        }
        
        .ai-avatar {
          position: relative;
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
        }
        
        .avatar-glow {
          position: absolute;
          inset: -3px;
          background: linear-gradient(45deg, #667eea, #764ba2);
          border-radius: 50%;
          z-index: -1;
          animation: avatarPulse 2s ease-in-out infinite;
        }
        
        @keyframes avatarPulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        
        .messages-container {
          padding: 20px;
          max-height: 300px;
        }
        
        .message {
          margin-bottom: 15px;
          animation: messageSlide 0.5s ease-out;
        }
        
        .message-content {
          padding: 12px 18px;
          border-radius: 18px;
          max-width: 280px;
          word-wrap: break-word;
        }
        
        .user-message .message-content {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          margin-left: auto;
        }
        
        .ai-message .message-content {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .typing-animation {
          animation: fadeIn 1s ease-out 3s both;
        }
        
        .typing-bubble {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 18px;
          padding: 12px 18px;
          width: fit-content;
        }
        
        .typing-dots {
          display: flex;
          gap: 4px;
        }
        
        .typing-dots span {
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 50%;
          animation: typingBounce 1.4s ease-in-out infinite;
        }
        
        .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
        .typing-dots span:nth-child(3) { animation-delay: 0.4s; }
        
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-10px); }
        }
        
        @keyframes messageSlide {
          0% { opacity: 0; transform: translateX(-20px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        
        /* Analytics Dashboard */
        .analytics-dashboard {
          text-align: center;
          color: white;
        }
        
        .stats-container {
          display: flex;
          gap: 30px;
          justify-content: center;
          margin-bottom: 40px;
        }
        
        .stat-card.modern {
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 30px;
          min-width: 180px;
          animation: cardHover 6s ease-in-out infinite;
        }
        
        .stat-icon {
          font-size: 2rem;
          margin-bottom: 15px;
        }
        
        .stat-value {
          font-size: 3rem;
          font-weight: bold;
          margin-bottom: 8px;
          background: linear-gradient(135deg, #ff6b6b, #ffa500);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .stat-label {
          font-size: 1rem;
          opacity: 0.8;
          margin-bottom: 5px;
        }
        
        .stat-trend {
          font-size: 0.8rem;
          color: #10b981;
        }
        
        @keyframes cardHover {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .progress-visualization {
          margin-top: 20px;
        }
        
        .progress-title {
          font-size: 1.2rem;
          margin-bottom: 20px;
          font-weight: 600;
        }
        
        .circular-progress {
          position: relative;
          display: inline-block;
        }
        
        .progress-ring {
          transform: rotate(-90deg);
        }
        
        .progress-ring-bg {
          fill: none;
          stroke: rgba(255, 255, 255, 0.1);
          stroke-width: 8;
        }
        
        .progress-ring-fill {
          fill: none;
          stroke: url(#progressGradient);
          stroke-width: 8;
          stroke-linecap: round;
          stroke-dasharray: 314;
          stroke-dashoffset: 78.5;
          animation: progressRing 3s ease-out;
        }
        
        .progress-percentage {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 1.5rem;
          font-weight: bold;
        }
        
        @keyframes progressRing {
          0% { stroke-dashoffset: 314; }
          100% { stroke-dashoffset: 78.5; }
        }
        
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>
      
      <div className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10">
          {/* Auto-start overlay */}
          {!isPlaying && currentScene === 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handlePlay()
                }}
                className="group p-6 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-110 z-30"
              >
                <Play className="w-12 h-12 text-white group-hover:text-cyan-400 transition-colors" />
              </button>
            </div>
          )}
          
          {/* Video Content */}
          <div className="w-full h-full">
            {scenes[currentScene]?.content}
          </div>
          
          {/* Modern Video Controls */}
          <div className="absolute bottom-0 left-0 right-0 z-30">
            <div className="bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6">
              <div className="flex items-center justify-between text-white mb-4">
                <div className="flex items-center space-x-6">
                  {!isPlaying ? (
                    <button 
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        handlePlay()
                      }}
                      className="group p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-110 z-40"
                    >
                      <Play className="w-6 h-6 group-hover:text-cyan-400 transition-colors" />
                    </button>
                  ) : (
                    <button 
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        handlePause()
                      }}
                      className="group p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-110 z-40"
                    >
                      <Pause className="w-6 h-6 group-hover:text-cyan-400 transition-colors" />
                    </button>
                  )}
                  <button 
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      handleRestart()
                    }}
                    className="group p-2 hover:bg-white/10 rounded-lg transition-all duration-300 z-40"
                  >
                    <RotateCcw className="w-5 h-5 group-hover:text-cyan-400 transition-colors" />
                  </button>
                  <div className="flex items-center space-x-2">
                    <Volume2 className="w-4 h-4 text-white/60" />
                    <span className="text-sm font-medium">{scenes[currentScene].title}</span>
                  </div>
                </div>
                
                <button 
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    onClose()
                  }}
                  className="group p-2 hover:bg-red-500/20 rounded-lg transition-all duration-300 z-40"
                >
                  <X className="w-6 h-6 group-hover:text-red-400 transition-colors" />
                </button>
              </div>
              
              {/* Enhanced Progress Bar */}
              <div className="relative">
                <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden backdrop-blur-sm">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full transition-all duration-500 ease-out relative"
                    style={{ width: `${((currentScene + 1) / scenes.length) * 100}%` }}
                  >
                    <div className="absolute right-0 top-0 w-4 h-full bg-white/50 rounded-full animate-pulse" />
                  </div>
                </div>
                <div className="flex justify-between mt-2 text-xs text-white/60">
                  <span>Scene {currentScene + 1} of {scenes.length}</span>
                  <span>{Math.round(((currentScene + 1) / scenes.length) * 100)}%</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Modern Scene Indicators */}
          <div className="absolute top-6 right-6 flex flex-col space-y-3 z-30">
            {scenes.map((scene, index) => (
              <div
                key={index}
                className={`group relative transition-all duration-300 cursor-pointer z-40 ${
                  index === currentScene ? 'scale-110' : 'hover:scale-105'
                }`}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleSceneClick(index)
                }}
              >
                <div
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentScene 
                      ? 'bg-gradient-to-r from-cyan-400 to-purple-500 shadow-lg shadow-cyan-400/50' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
                {index === currentScene && (
                  <div className="absolute -right-16 top-1/2 transform -translate-y-1/2 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-lg text-xs text-white whitespace-nowrap border border-white/20">
                    {scene.title}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* SVG Gradient Definition */}
          <svg width="0" height="0">
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </>
  )
}

export default VideoDemo