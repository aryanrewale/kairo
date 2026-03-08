import { useState, useEffect } from 'react'
import { X, Trophy } from 'lucide-react'

const AchievementNotification = ({ achievement, onClose }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (achievement) {
      setIsVisible(true)
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(onClose, 300) // Wait for animation to complete
      }, 4000)
      
      return () => clearTimeout(timer)
    }
  }, [achievement, onClose])

  if (!achievement) return null

  return (
    <div className={`fixed top-4 right-4 z-50 transform transition-all duration-300 ${
      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`}>
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-6 rounded-2xl shadow-2xl max-w-sm border-2 border-yellow-300">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className="text-3xl animate-bounce">
              {achievement.icon || '🏆'}
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Achievement Unlocked!</h3>
              <p className="font-semibold">{achievement.name}</p>
              <p className="text-sm opacity-90">{achievement.description}</p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsVisible(false)
              setTimeout(onClose, 300)
            }}
            className="text-white hover:text-yellow-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default AchievementNotification