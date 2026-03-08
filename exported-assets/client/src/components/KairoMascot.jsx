import { useState, useEffect } from 'react'

const KairoMascot = ({ 
  mood = 'happy', 
  message = '', 
  showMessage = false, 
  size = 'md',
  animated = true,
  onClick = null 
}) => {
  const [isBlinking, setIsBlinking] = useState(false)
  const [showBubble, setShowBubble] = useState(showMessage)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    if (!animated) return
    const blinkInterval = setInterval(() => {
      setIsBlinking(true)
      setTimeout(() => setIsBlinking(false), 150)
    }, 3000 + Math.random() * 2000)
    return () => clearInterval(blinkInterval)
  }, [animated])

  useEffect(() => {
    setShowBubble(showMessage)
  }, [showMessage])

  const sizeMap = {
    sm: { width: 80, height: 100 },
    md: { width: 120, height: 150 }, 
    lg: { width: 160, height: 200 },
    xl: { width: 200, height: 250 }
  }

  const { width, height } = sizeMap[size]

  const getEyeState = () => {
    if (isBlinking) return 'closed'
    switch (mood) {
      case 'happy': return 'happy'
      case 'excited': return 'star'
      case 'proud': return 'proud'
      case 'encouraging': return 'determined'
      case 'thinking': return 'thinking'
      default: return 'happy'
    }
  }

  const getMouthState = () => {
    switch (mood) {
      case 'happy': return 'smile'
      case 'excited': return 'big-smile'
      case 'proud': return 'content'
      case 'encouraging': return 'determined'
      case 'thinking': return 'thinking'
      default: return 'smile'
    }
  }

  const getBodyColor = () => {
    switch (mood) {
      case 'happy': return '#FF6B9D'
      case 'excited': return '#FFD93D'
      case 'proud': return '#6BCF7F'
      case 'encouraging': return '#4DABF7'
      case 'thinking': return '#9775FA'
      default: return '#FF6B9D'
    }
  }

  const messages = {
    happy: ['頑張って！ (Ganbatte!)', 'Great job! 素晴らしい！'],
    excited: ['Amazing! すごい！', 'Fantastic! 最高！'],
    proud: ['Perfect! 完璧！', 'Excellent work! 優秀！'],
    encouraging: ['You can do it! できる！', 'Almost there! もう少し！'],
    thinking: ['Hmm... そうですね...', 'Let me think... 考えましょう...']
  }

  const getRandomMessage = () => {
    const moodMessages = messages[mood] || messages.happy
    return moodMessages[Math.floor(Math.random() * moodMessages.length)]
  }

  return (
    <div className="relative inline-block">
      {/* Speech Bubble */}
      {showBubble && (
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-10">
          <div className="bg-white dark:bg-gray-800 rounded-2xl px-4 py-2 shadow-lg border border-gray-200 dark:border-gray-600 max-w-xs">
            <p className="text-sm font-medium text-gray-900 dark:text-white text-center">
              {message || getRandomMessage()}
            </p>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
              <div className="w-4 h-4 bg-white dark:bg-gray-800 border-r border-b border-gray-200 dark:border-gray-600 transform rotate-45"></div>
            </div>
          </div>
        </div>
      )}

      {/* Kitsune Character */}
      <div 
        className={`relative cursor-pointer transition-all duration-300 hover:scale-110 ${animated ? 'animate-bounce' : ''}`}
        style={{ width: `${width}px`, height: `${height}px` }}
        onClick={() => {
          if (onClick) onClick()
          setShowBubble(!showBubble)
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <svg width={width} height={height} viewBox="0 0 200 250" className="drop-shadow-lg">
          {/* Body */}
          <ellipse cx="100" cy="180" rx="60" ry="50" fill={getBodyColor()} />
          
          {/* Head */}
          <circle cx="100" cy="100" r="70" fill={getBodyColor()} />
          
          {/* Ears */}
          <ellipse cx="70" cy="60" rx="15" ry="35" fill={getBodyColor()} transform="rotate(-30 70 60)" />
          <ellipse cx="130" cy="60" rx="15" ry="35" fill={getBodyColor()} transform="rotate(30 130 60)" />
          
          {/* Inner ears */}
          <ellipse cx="70" cy="60" rx="8" ry="20" fill="#FFB3D1" transform="rotate(-30 70 60)" />
          <ellipse cx="130" cy="60" rx="8" ry="20" fill="#FFB3D1" transform="rotate(30 130 60)" />
          
          {/* Eyes */}
          {getEyeState() === 'closed' ? (
            <>
              <path d="M 75 85 Q 85 90 95 85" stroke="#333" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M 105 85 Q 115 90 125 85" stroke="#333" strokeWidth="3" fill="none" strokeLinecap="round" />
            </>
          ) : getEyeState() === 'star' ? (
            <>
              <circle cx="85" cy="85" r="12" fill="white" />
              <text x="85" y="92" textAnchor="middle" fontSize="16">⭐</text>
              <circle cx="115" cy="85" r="12" fill="white" />
              <text x="115" y="92" textAnchor="middle" fontSize="16">⭐</text>
            </>
          ) : getEyeState() === 'thinking' ? (
            <>
              <circle cx="85" cy="85" r="12" fill="white" />
              <circle cx="82" cy="85" r="6" fill="#333" />
              <circle cx="115" cy="85" r="12" fill="white" />
              <circle cx="118" cy="85" r="6" fill="#333" />
            </>
          ) : (
            <>
              <circle cx="85" cy="85" r="12" fill="white" />
              <circle cx="85" cy="85" r="6" fill="#333" />
              <circle cx="87" cy="83" r="2" fill="white" />
              <circle cx="115" cy="85" r="12" fill="white" />
              <circle cx="115" cy="85" r="6" fill="#333" />
              <circle cx="117" cy="83" r="2" fill="white" />
            </>
          )}
          
          {/* Nose */}
          <ellipse cx="100" cy="95" rx="3" ry="2" fill="#333" />
          
          {/* Mouth */}
          {getMouthState() === 'big-smile' ? (
            <path d="M 85 110 Q 100 125 115 110" stroke="#333" strokeWidth="3" fill="none" strokeLinecap="round" />
          ) : getMouthState() === 'thinking' ? (
            <circle cx="100" cy="110" r="3" fill="#333" />
          ) : (
            <path d="M 90 110 Q 100 118 110 110" stroke="#333" strokeWidth="2" fill="none" strokeLinecap="round" />
          )}
          
          {/* Cheek blush */}
          <circle cx="60" cy="100" r="8" fill="#FFB3D1" opacity="0.6" />
          <circle cx="140" cy="100" r="8" fill="#FFB3D1" opacity="0.6" />
          
          {/* Arms */}
          <ellipse cx="50" cy="160" rx="12" ry="25" fill={getBodyColor()} transform="rotate(-20 50 160)" />
          <ellipse cx="150" cy="160" rx="12" ry="25" fill={getBodyColor()} transform="rotate(20 150 160)" />
          
          {/* Tail */}
          <ellipse cx="100" cy="220" rx="20" ry="15" fill={getBodyColor()} />
          
          {/* Floating particles when animated */}
          {animated && isHovering && (
            <>
              <text x="160" y="80" fontSize="20" className="animate-ping">✨</text>
              <text x="40" y="120" fontSize="16" className="animate-pulse">💫</text>
              <text x="130" y="200" fontSize="18" className="animate-bounce">⭐</text>
            </>
          )}
        </svg>
        
        {/* Character Name Tag */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            KAIRØ-chan
          </div>
        </div>
      </div>
    </div>
  )
}

export default KairoMascot