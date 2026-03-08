import { Trophy, Star, Crown, Diamond, Award } from 'lucide-react'

const LevelBadge = ({ stage, level, size = 'md', showProgress = false, progressPercent = 0 }) => {
  const stageConfig = {
    Bronze: { 
      icon: Award, 
      colors: 'from-amber-600 to-orange-700', 
      bg: 'bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30',
      text: 'text-amber-700 dark:text-amber-300',
      border: 'border-amber-300 dark:border-amber-600'
    },
    Silver: { 
      icon: Star, 
      colors: 'from-gray-400 to-gray-600', 
      bg: 'bg-gradient-to-br from-gray-100 to-slate-100 dark:from-gray-800/30 dark:to-slate-800/30',
      text: 'text-gray-600 dark:text-gray-300',
      border: 'border-gray-300 dark:border-gray-600'
    },
    Gold: { 
      icon: Trophy, 
      colors: 'from-yellow-400 to-yellow-600', 
      bg: 'bg-gradient-to-br from-yellow-100 to-amber-100 dark:from-yellow-900/30 dark:to-amber-900/30',
      text: 'text-yellow-700 dark:text-yellow-300',
      border: 'border-yellow-300 dark:border-yellow-600'
    },
    Platinum: { 
      icon: Crown, 
      colors: 'from-indigo-400 to-purple-600', 
      bg: 'bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30',
      text: 'text-indigo-700 dark:text-indigo-300',
      border: 'border-indigo-300 dark:border-indigo-600'
    },
    Diamond: { 
      icon: Diamond, 
      colors: 'from-cyan-400 to-blue-600', 
      bg: 'bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30',
      text: 'text-cyan-700 dark:text-cyan-300',
      border: 'border-cyan-300 dark:border-cyan-600'
    }
  }

  const sizeConfig = {
    sm: { container: 'w-12 h-12', icon: 'w-6 h-6', text: 'text-xs' },
    md: { container: 'w-16 h-16', icon: 'w-8 h-8', text: 'text-sm' },
    lg: { container: 'w-20 h-20', icon: 'w-10 h-10', text: 'text-base' },
    xl: { container: 'w-24 h-24', icon: 'w-12 h-12', text: 'text-lg' }
  }

  const config = stageConfig[stage] || stageConfig.Bronze
  const sizes = sizeConfig[size]
  const Icon = config.icon

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className={`relative ${sizes.container} ${config.bg} ${config.border} border-2 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group`}>
        <Icon className={`${sizes.icon} ${config.text} group-hover:scale-110 transition-transform duration-300`} />
        
        {/* Level number */}
        <div className={`absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r ${config.colors} rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md`}>
          {level}
        </div>
        
        {/* Progress ring */}
        {showProgress && (
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-gray-200 dark:text-gray-700"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray={`${progressPercent * 2.83} 283`}
              className={config.text}
              strokeLinecap="round"
            />
          </svg>
        )}
      </div>
      
      <div className="text-center">
        <div className={`font-bold ${sizes.text} ${config.text}`}>{stage}</div>
        <div className="text-xs text-gray-500 dark:text-gray-400">Level {level}</div>
      </div>
    </div>
  )
}

export default LevelBadge