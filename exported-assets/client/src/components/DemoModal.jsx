import { useState } from 'react'
import { X, Play, BookOpen, MessageCircle, Target, Brain } from 'lucide-react'

const DemoModal = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0)

  const demoSteps = [
    {
      title: "Interactive Flashcards",
      icon: <BookOpen className="w-8 h-8" />,
      description: "Learn Japanese vocabulary with spaced repetition",
      demo: (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <div className="text-center">
            <div className="text-6xl mb-4">桜</div>
            <div className="text-xl font-bold mb-2">さくら (sakura)</div>
            <div className="text-gray-600 dark:text-gray-300">Cherry Blossom</div>
            <div className="flex justify-center space-x-4 mt-6">
              <button className="px-4 py-2 bg-green-500 text-white rounded">Easy</button>
              <button className="px-4 py-2 bg-yellow-500 text-white rounded">Good</button>
              <button className="px-4 py-2 bg-red-500 text-white rounded">Hard</button>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "AI Chat Assistant",
      icon: <MessageCircle className="w-8 h-8" />,
      description: "Practice conversations with our AI tutor",
      demo: (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <div className="space-y-4">
            <div className="flex justify-end">
              <div className="bg-blue-500 text-white px-4 py-2 rounded-lg max-w-xs">
                こんにちは！元気ですか？
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg max-w-xs">
                Hello! I'm fine, thank you! 😊 That means "Hello! How are you?" in Japanese. Great job!
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Smart Quizzes",
      icon: <Brain className="w-8 h-8" />,
      description: "Test your knowledge with adaptive quizzes",
      demo: (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <div className="text-center">
            <h3 className="text-lg font-bold mb-4">What does "ありがとう" mean?</h3>
            <div className="space-y-2">
              <button className="w-full p-3 text-left bg-gray-100 dark:bg-gray-700 rounded hover:bg-blue-100">A) Hello</button>
              <button className="w-full p-3 text-left bg-green-100 dark:bg-green-900 rounded">B) Thank you ✓</button>
              <button className="w-full p-3 text-left bg-gray-100 dark:bg-gray-700 rounded hover:bg-blue-100">C) Goodbye</button>
              <button className="w-full p-3 text-left bg-gray-100 dark:bg-gray-700 rounded hover:bg-blue-100">D) Excuse me</button>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Progress Tracking",
      icon: <Target className="w-8 h-8" />,
      description: "Monitor your learning journey with detailed analytics",
      demo: (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Vocabulary Learned</span>
              <span className="font-bold">247/500</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{width: '49%'}}></div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-500">15</div>
                <div className="text-sm text-gray-600">Day Streak</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-500">N4</div>
                <div className="text-sm text-gray-600">Current Level</div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">KAIRO Platform Demo</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex justify-center mb-6">
            <div className="flex space-x-2">
              {demoSteps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === currentStep ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
          
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4 text-blue-500">
              {demoSteps[currentStep].icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {demoSteps[currentStep].title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {demoSteps[currentStep].description}
            </p>
          </div>
          
          <div className="mb-8">
            {demoSteps[currentStep].demo}
          </div>
          
          <div className="flex justify-between">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentStep(Math.min(demoSteps.length - 1, currentStep + 1))}
              disabled={currentStep === demoSteps.length - 1}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
          
          {currentStep === demoSteps.length - 1 && (
            <div className="text-center mt-6">
              <button
                onClick={onClose}
                className="px-8 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600"
              >
                Start Learning Now!
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DemoModal