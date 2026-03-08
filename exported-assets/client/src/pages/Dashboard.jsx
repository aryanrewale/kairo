import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { BookOpen, MessageCircle, Target, TrendingUp, Zap, ArrowRight, Trophy, Star, Calendar, Clock, ChevronUp, Play, Users, Brain, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react'
import LevelBadge from '../components/LevelBadge'
import Leaderboard from '../components/Leaderboard'
import { useActivityTracker } from '../hooks/useActivityTracker'

const Dashboard = () => {
  const { user } = useAuth()
  const { trackActivity } = useActivityTracker()
  const [scrollY, setScrollY] = useState(0)
  const [scrollDirection, setScrollDirection] = useState('down')
  const [lastScrollY, setLastScrollY] = useState(0)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(0)
  const [stats, setStats] = useState({
    totalFlashcards: 0,
    totalQuizzes: 0,
    completedQuizzes: 0,
    studyStreak: 7,
    japaneseLevel: 'N4',
    kanjiLearned: 156,
    vocabularyCount: 892,
    stage: 'Silver',
    stageLevel: 3,
    totalXP: 2450,
    levelInfo: { progress: 65 },
    achievements: [],
    weeklyActivities: 12,
    recentActivities: [
      { type: 'flashcard', category: 'Kanji', date: new Date(), score: 50 },
      { type: 'quiz', category: 'Grammar', date: new Date(), score: 75 },
      { type: 'chat', category: 'Conversation', date: new Date(), score: 30 }
    ]
  })

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

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return
      
      const response = await fetch('/api/progress/dashboard', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      
      if (response.ok) {
        const data = await response.json()
        setStats(prev => ({ ...prev, ...data }))
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
    }
  }

  useEffect(() => {
    fetchStats()
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchStats()
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <img 
              src={user?.profile?.avatar || user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face'} 
              alt="Profile" 
              className="w-20 h-20 rounded-full object-cover shadow-xl border-4 border-white/50 mr-4"
            />
            <div className="text-left">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Welcome back, {user?.username || 'Learner'}! 🎌
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mt-2">
                Continue your Japanese learning journey with KAIRØ
              </p>
            </div>
          </div>
        </div>

        {/* Level & Stats Section */}
        <div className="mb-16">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20 dark:border-gray-700/50">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              
              {/* Level Card */}
              <div className="lg:col-span-1 text-center">
                <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl p-6 mb-4">
                  <LevelBadge 
                    stage={stats.stage} 
                    level={stats.stageLevel} 
                    size="lg" 
                  />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-4">
                    {stats.stage} Level {stats.stageLevel}
                  </h3>
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mt-2">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    <span>{stats.totalXP?.toLocaleString()} XP</span>
                  </div>
                  {stats.levelInfo && (
                    <div className="mt-4">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500" 
                          style={{ width: `${stats.levelInfo.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {stats.levelInfo.progress}% to next level
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-6">
                {[
                  { label: 'Vocabulary', value: stats.vocabularyCount, emoji: '📚', color: 'from-blue-500 to-cyan-500' },
                  { label: 'Kanji Learned', value: stats.kanjiLearned, emoji: '漢', color: 'from-purple-500 to-pink-500' },
                  { label: 'Study Streak', value: `${stats.studyStreak} days`, emoji: '🔥', color: 'from-orange-500 to-red-500' },
                  { label: 'JLPT Level', value: stats.japaneseLevel, emoji: '🏆', color: 'from-green-500 to-emerald-500' },
                  { label: 'Weekly Goals', value: `${stats.weeklyActivities}/20`, emoji: '🎯', color: 'from-indigo-500 to-purple-500' },
                  { label: 'Total Quizzes', value: stats.completedQuizzes, emoji: '🧠', color: 'from-teal-500 to-cyan-500' }
                ].map((stat, index) => (
                  <div key={index} className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-white text-xl">{stat.emoji}</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Continue Learning</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { to: '/flashcards', title: 'Flashcards', description: 'Study vocabulary & kanji', emoji: '🃏', color: 'from-blue-500 to-cyan-500' },
              { to: '/quizzes', title: 'Quizzes', description: 'Test your knowledge', emoji: '🧠', color: 'from-green-500 to-emerald-500' },
              { to: '/chat', title: 'Live Chat', description: 'Practice conversations', emoji: '💬', color: 'from-purple-500 to-pink-500' },
              { to: '/profile', title: 'Profile', description: 'View your progress', emoji: '👤', color: 'from-orange-500 to-red-500' }
            ].map((item, index) => (
              <Link key={index} to={item.to} className="group">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl p-8 border border-white/20 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-white text-2xl">{item.emoji}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{item.description}</p>
                  <div className="flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                    <span className="text-sm font-medium mr-2">Start Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Recent Activity */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20 dark:border-gray-700/50">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <Clock className="w-6 h-6 mr-3 text-blue-500" />
              Recent Activity
            </h3>
            
            {!stats.recentActivities || stats.recentActivities.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎉</div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Ready to start learning?</h4>
                <p className="text-gray-600 dark:text-gray-300 mb-6">Complete activities to see your progress here!</p>
                <div className="flex flex-wrap justify-center gap-2">
                  <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">📚 Flashcards</span>
                  <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">🧠 Quizzes</span>
                  <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">💬 Chat</span>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {stats.recentActivities.slice(0, 5).map((activity, index) => {
                  const icons = { flashcard: '📚', quiz: '🧠', chat: '💬', study_session: '📖' }
                  const texts = {
                    flashcard: `Studied ${activity.category} flashcards`,
                    quiz: `Completed ${activity.category} quiz`,
                    chat: `Practiced in chat`,
                    study_session: `Study session`
                  }
                  
                  return (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50/80 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-600/50">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                          <span className="text-white">{icons[activity.type] || '✨'}</span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {texts[activity.type] || 'Learning activity'}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(activity.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm font-bold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">
                        +{activity.score} XP
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Study Goals */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20 dark:border-gray-700/50">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <Target className="w-6 h-6 mr-3 text-purple-500" />
              Study Goals
            </h3>
            <div className="space-y-6">
              {[
                { 
                  label: 'Study Streak', 
                  current: stats.studyStreak, 
                  total: 30, 
                  percentage: Math.min((stats.studyStreak / 30) * 100, 100),
                  color: 'from-orange-500 to-red-500',
                  emoji: '🔥'
                },
                { 
                  label: 'Weekly Activities', 
                  current: stats.weeklyActivities, 
                  total: 20, 
                  percentage: Math.min((stats.weeklyActivities / 20) * 100, 100),
                  color: 'from-blue-500 to-cyan-500',
                  emoji: '🎯'
                },
                { 
                  label: 'Kanji Progress', 
                  current: stats.kanjiLearned, 
                  total: 200, 
                  percentage: Math.min((stats.kanjiLearned / 200) * 100, 100),
                  color: 'from-purple-500 to-pink-500',
                  emoji: '漢'
                }
              ].map((goal, index) => (
                <div key={index} className="bg-gray-50/80 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl p-4 border border-white/20 dark:border-gray-600/50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <span className="text-xl mr-3">{goal.emoji}</span>
                      <span className="font-medium text-gray-900 dark:text-white">{goal.label}</span>
                    </div>
                    <span className="font-bold text-gray-900 dark:text-white">
                      {goal.current}/{goal.total}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
                    <div 
                      className={`bg-gradient-to-r ${goal.color} h-3 rounded-full transition-all duration-500`}
                      style={{ width: `${goal.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    {Math.round(goal.percentage)}% complete
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Friend Suggestions */}
        <div className="mt-16">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20 dark:border-gray-700/50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                <Users className="w-6 h-6 mr-3 text-blue-500" />
                Suggested for you
              </h3>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setCurrentSuggestionIndex(Math.max(0, currentSuggestionIndex - 5))}
                  disabled={currentSuggestionIndex === 0}
                  className="p-2 rounded-full bg-white/70 dark:bg-gray-700/70 hover:bg-white dark:hover:bg-gray-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
                <button 
                  onClick={() => setCurrentSuggestionIndex(currentSuggestionIndex + 5)}
                  className="p-2 rounded-full bg-white/70 dark:bg-gray-700/70 hover:bg-white dark:hover:bg-gray-600 transition-all"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { id: 1, name: 'Yuki Tanaka', role: 'Japanese Teacher', location: 'Tokyo, Japan', avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=80&h=80&fit=crop&crop=face', mutualFriends: 12, isVerified: true },
                { id: 2, name: 'Alex Chen', role: 'Student', location: 'San Francisco, USA', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face', mutualFriends: 8, isVerified: false },
                { id: 3, name: 'Sakura Yamamoto', role: 'Language Exchange', location: 'Osaka, Japan', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face', mutualFriends: 15, isVerified: true },
                { id: 4, name: 'Marco Silva', role: 'Student', location: 'São Paulo, Brazil', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face', mutualFriends: 5, isVerified: false },
                { id: 5, name: 'Emma Johnson', role: 'JLPT Tutor', location: 'London, UK', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face', mutualFriends: 20, isVerified: true },
                { id: 6, name: 'Hiroshi Sato', role: 'Native Speaker', location: 'Kyoto, Japan', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face', mutualFriends: 18, isVerified: true },
                { id: 7, name: 'Sophie Martin', role: 'Student', location: 'Paris, France', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face', mutualFriends: 7, isVerified: false },
                { id: 8, name: 'Kenji Nakamura', role: 'Anime Translator', location: 'Tokyo, Japan', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&h=80&fit=crop&crop=face', mutualFriends: 25, isVerified: true },
                { id: 9, name: 'Lisa Wang', role: 'Student', location: 'Toronto, Canada', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face', mutualFriends: 11, isVerified: false },
                { id: 10, name: 'Takeshi Yamada', role: 'Calligraphy Master', location: 'Nara, Japan', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face', mutualFriends: 30, isVerified: true },
                { id: 11, name: 'Maria Rodriguez', role: 'Student', location: 'Madrid, Spain', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop&crop=face', mutualFriends: 9, isVerified: false },
                { id: 12, name: 'David Kim', role: 'Business Japanese', location: 'Seoul, South Korea', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face', mutualFriends: 14, isVerified: true },
                { id: 13, name: 'Anna Petrov', role: 'Student', location: 'Moscow, Russia', avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=80&h=80&fit=crop&crop=face', mutualFriends: 6, isVerified: false },
                { id: 14, name: 'Ryu Taniguchi', role: 'Manga Artist', location: 'Shibuya, Japan', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face', mutualFriends: 22, isVerified: true },
                { id: 15, name: 'Jennifer Lee', role: 'Student', location: 'Sydney, Australia', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face', mutualFriends: 13, isVerified: false }
              ].slice(currentSuggestionIndex, currentSuggestionIndex + 5).map((person) => (
                <div key={person.id} className="bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm rounded-2xl p-4 border border-white/20 dark:border-gray-600/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center">
                  <div className="relative mb-3">
                    <img 
                      src={person.avatar} 
                      alt={person.name}
                      className="w-16 h-16 rounded-full object-cover mx-auto shadow-lg border-2 border-white/50"
                    />
                    {person.isVerified && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                  
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                    {person.name}
                  </h4>
                  
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                    {person.role}
                  </p>
                  
                  <p className="text-xs text-gray-500 dark:text-gray-500 mb-3">
                    📍 {person.location}
                  </p>
                  
                  {person.mutualFriends > 0 && (
                    <p className="text-xs text-blue-600 dark:text-blue-400 mb-3">
                      {person.mutualFriends} mutual friends
                    </p>
                  )}
                  
                  <div className="space-y-2">
                    <button className="w-full px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg text-xs font-medium hover:from-blue-600 hover:to-indigo-600 transition-all">
                      Add Friend
                    </button>
                    <button className="w-full px-3 py-1.5 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-medium hover:bg-gray-200 dark:hover:bg-gray-500 transition-all">
                      Message
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Connect with learners and teachers from around the world 🌍
              </p>
              <div className="flex justify-center space-x-4 text-xs">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
                  🇯🇵 Native Speakers
                </span>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full">
                  👨‍🏫 Certified Teachers
                </span>
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full">
                  🎓 Fellow Students
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Friends Section */}
        <div className="mt-16">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20 dark:border-gray-700/50">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <Users className="w-6 h-6 mr-3 text-blue-500" />
              Friends & Following
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: 'Yuki Tanaka', level: 'Gold Lv.5', xp: 4250, streak: 15, avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=60&h=60&fit=crop&crop=face', status: 'online' },
                { name: 'Alex Chen', level: 'Silver Lv.8', xp: 3180, streak: 12, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face', status: 'offline' },
                { name: 'Sakura Yamamoto', level: 'Platinum Lv.2', xp: 5670, streak: 22, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face', status: 'online' },
                { name: 'Emma Johnson', level: 'Gold Lv.3', xp: 3890, streak: 8, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop&crop=face', status: 'studying' },
                { name: 'Hiroshi Sato', level: 'Diamond Lv.1', xp: 6120, streak: 28, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face', status: 'online' },
                { name: 'Sophie Martin', level: 'Bronze Lv.9', xp: 2340, streak: 5, avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face', status: 'offline' },
                { name: 'Kenji Nakamura', level: 'Platinum Lv.4', xp: 7890, streak: 35, avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=60&h=60&fit=crop&crop=face', status: 'studying' },
                { name: 'Lisa Wang', level: 'Silver Lv.6', xp: 2980, streak: 9, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop&crop=face', status: 'online' }
              ].map((friend, index) => (
                <div key={index} className="bg-gray-50/80 dark:bg-gray-700/50 backdrop-blur-sm rounded-2xl p-4 border border-white/20 dark:border-gray-600/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="text-center">
                    <div className="relative mb-3">
                      <img src={friend.avatar} alt={friend.name} className="w-14 h-14 rounded-full object-cover mx-auto shadow-lg border-2 border-white/50" />
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                        friend.status === 'online' ? 'bg-green-500' : 
                        friend.status === 'studying' ? 'bg-blue-500' : 'bg-gray-400'
                      }`}></div>
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{friend.name}</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{friend.level}</p>
                    <div className="flex items-center justify-center space-x-3 text-xs">
                      <div className="flex items-center text-blue-600 dark:text-blue-400">
                        <span className="font-semibold">{friend.xp}</span>
                        <span className="ml-1">XP</span>
                      </div>
                      <div className="flex items-center text-orange-500">
                        <span>🔥</span>
                        <span className="ml-1 font-semibold">{friend.streak}</span>
                      </div>
                    </div>
                    <button className="w-full mt-3 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg text-xs font-medium hover:from-blue-600 hover:to-indigo-600 transition-all">
                      Message
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Communities Section */}
        <div className="mt-16">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20 dark:border-gray-700/50">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <Trophy className="w-6 h-6 mr-3 text-purple-500" />
              Your Communities
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Japanese Culture Enthusiasts', members: 1247, activity: 'Very Active', icon: '🏯', joined: true, description: 'Explore traditional and modern Japanese culture' },
                { name: 'JLPT Study Group', members: 892, activity: 'Active', icon: '📚', joined: true, description: 'Prepare for JLPT exams together' },
                { name: 'Anime & Manga Learners', members: 2156, activity: 'Very Active', icon: '🎌', joined: true, description: 'Learn Japanese through anime and manga' },
                { name: 'Business Japanese', members: 543, activity: 'Moderate', icon: '💼', joined: false, description: 'Professional Japanese for workplace' },
                { name: 'Kanji Masters', members: 678, activity: 'Active', icon: '漢', joined: false, description: 'Master kanji with fellow learners' },
                { name: 'Japanese Cooking', members: 1034, activity: 'Moderate', icon: '🍜', joined: false, description: 'Learn Japanese through cooking' }
              ].map((community, index) => (
                <div key={index} className="bg-gray-50/80 dark:bg-gray-700/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-600/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-xl shadow-lg">
                        {community.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{community.name}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{community.members.toLocaleString()} members</p>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      community.activity === 'Very Active' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                      community.activity === 'Active' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' :
                      'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                    }`}>
                      {community.activity}
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mb-4">{community.description}</p>
                  <button className={`w-full px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    community.joined 
                      ? 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'
                      : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg'
                  }`}>
                    {community.joined ? 'View Community' : 'Join Community'}
                  </button>
                </div>
              ))}
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

export default Dashboard