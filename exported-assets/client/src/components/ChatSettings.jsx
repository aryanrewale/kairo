import { useState } from 'react'
import { Settings, X, BookOpen, Target, Brain } from 'lucide-react'

const ChatSettings = ({ isOpen, onClose, context, onUpdateContext }) => {
  const [localContext, setLocalContext] = useState(context)

  const handleSave = () => {
    onUpdateContext(localContext)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            Chat Settings
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Learning Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
              <Brain className="h-4 w-4 mr-2" />
              Learning Level
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['beginner', 'intermediate', 'advanced'].map((level) => (
                <button
                  key={level}
                  onClick={() => setLocalContext(prev => ({ ...prev, learningLevel: level }))}
                  className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                    localContext.learningLevel === level
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                  }`}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Focus Area */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
              <Target className="h-4 w-4 mr-2" />
              Focus Area
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: 'conversation', label: 'Conversation' },
                { value: 'grammar', label: 'Grammar' },
                { value: 'vocabulary', label: 'Vocabulary' },
                { value: 'kanji', label: 'Kanji' },
                { value: 'culture', label: 'Culture' }
              ].map((area) => (
                <button
                  key={area.value}
                  onClick={() => setLocalContext(prev => ({ ...prev, focusArea: area.value }))}
                  className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                    localContext.focusArea === area.value
                      ? 'bg-green-600 text-white border-green-600'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                  }`}
                >
                  {area.label}
                </button>
              ))}
            </div>
          </div>

          {/* Learning Goals */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
              <BookOpen className="h-4 w-4 mr-2" />
              Learning Goals
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: 'jlpt_n5', label: 'JLPT N5' },
                { value: 'jlpt_n4', label: 'JLPT N4' },
                { value: 'jlpt_n3', label: 'JLPT N3' },
                { value: 'business_japanese', label: 'Business' },
                { value: 'travel_japanese', label: 'Travel' },
                { value: 'anime_understanding', label: 'Anime' }
              ].map((goal) => (
                <button
                  key={goal.value}
                  onClick={() => {
                    const goals = localContext.learningGoals || []
                    const newGoals = goals.includes(goal.value)
                      ? goals.filter(g => g !== goal.value)
                      : [...goals, goal.value]
                    setLocalContext(prev => ({ ...prev, learningGoals: newGoals }))
                  }}
                  className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                    (localContext.learningGoals || []).includes(goal.value)
                      ? 'bg-purple-600 text-white border-purple-600'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                  }`}
                >
                  {goal.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatSettings