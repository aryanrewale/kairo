import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { Moon, Sun, LogOut, Menu, X, Star, MoreHorizontal, User, Bell, Users, UserPlus } from 'lucide-react'
import { useState, useEffect } from 'react'

const Navbar = () => {
  const { user, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [userLevel, setUserLevel] = useState({ stage: 'Bronze', stageLevel: 1 })

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      type: 'friend_request',
      title: 'Friend Request',
      message: 'KanjiMaster wants to be your friend',
      time: '2 min ago',
      icon: '👥',
      unread: true
    },
    {
      id: 2,
      type: 'community',
      title: 'Community Update',
      message: 'New discussion in Japanese Grammar group',
      time: '15 min ago',
      icon: '💬',
      unread: true
    },
    {
      id: 3,
      type: 'exam',
      title: 'Exam Reminder',
      message: 'JLPT N3 practice exam starts in 2 days',
      time: '1 hour ago',
      icon: '📝',
      unread: true
    },
    {
      id: 4,
      type: 'achievement',
      title: 'Achievement Unlocked',
      message: 'You completed 50 flashcards!',
      time: '3 hours ago',
      icon: '🏆',
      unread: false
    },
    {
      id: 5,
      type: 'friend_request',
      title: 'Friend Request',
      message: 'TokyoDreamer sent you a friend request',
      time: '1 day ago',
      icon: '👥',
      unread: false
    }
  ]

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsMenuOpen(false)
    setIsUserMenuOpen(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const closeUserMenu = () => {
    setIsUserMenuOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Don't close if clicking on the menu or notification buttons
      if (event.target.closest('[data-menu-button]') || event.target.closest('[data-notification-button]')) {
        return
      }
      
      if (isUserMenuOpen && !event.target.closest('.user-menu-popup')) {
        setIsUserMenuOpen(false)
      }
      if (isNotificationOpen && !event.target.closest('.notification-dropdown')) {
        setIsNotificationOpen(false)
      }
    }

    if (isUserMenuOpen || isNotificationOpen) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isUserMenuOpen, isNotificationOpen])

  // Add blur effect to main content when menu is open
  useEffect(() => {
    const mainContent = document.querySelector('main')
    if (mainContent) {
      if (isUserMenuOpen) {
        mainContent.style.filter = 'blur(4px)'
        mainContent.style.transition = 'filter 0.3s ease'
      } else {
        mainContent.style.filter = 'none'
      }
    }
  }, [isUserMenuOpen])

  const toggleNotifications = () => {
    setIsNotificationOpen(!isNotificationOpen)
  }

  const closeNotifications = () => {
    setIsNotificationOpen(false)
  }

  const isActive = (path) => location.pathname === path

  useEffect(() => {
    if (user) {
      fetchUserLevel()
    }
  }, [user])

  const fetchUserLevel = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/progress/dashboard', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (response.ok) {
        const data = await response.json()
        setUserLevel({ stage: data.stage, stageLevel: data.stageLevel })
      }
    } catch (error) {
      console.error('Error fetching user level:', error)
    }
  }

  const getStageColor = (stage) => {
    const colors = {
      Bronze: 'from-orange-600 to-yellow-600',
      Silver: 'from-gray-400 to-gray-600', 
      Gold: 'from-yellow-400 to-yellow-600',
      Platinum: 'from-blue-400 to-purple-600',
      Diamond: 'from-cyan-400 to-blue-600'
    }
    return colors[stage] || 'from-gray-400 to-gray-600'
  }

  return (
    <>
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">KAIRØ</span>
            <span className="text-xl">🎌</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            {user && (
              <div className="relative">
                <button
                  onClick={toggleNotifications}
                  data-notification-button
                  className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-300"
                  aria-label="Notifications"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
                    {notifications.filter(n => n.unread).length}
                  </span>
                </button>

                {/* Notifications Dropdown */}
                {isNotificationOpen && (
                  <div className="notification-dropdown absolute right-0 top-12 w-80 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 dark:border-gray-700/50 z-50">
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h3>
                        <button 
                          onClick={closeNotifications}
                          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          ✕
                        </button>
                      </div>
                      
                      <div className="space-y-3 max-h-96 overflow-y-auto">
                        {notifications.map((notification) => (
                          <div 
                            key={notification.id} 
                            className={`p-3 rounded-xl border transition-all duration-200 hover:shadow-md cursor-pointer ${
                              notification.unread 
                                ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' 
                                : 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600'
                            }`}
                          >
                            <div className="flex items-start space-x-3">
                              <div className="flex-shrink-0">
                                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-lg">
                                  {notification.icon}
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                    {notification.title}
                                  </p>
                                  {notification.unread && (
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                                  {notification.time}
                                </p>
                                
                                {/* Action buttons for friend requests */}
                                {notification.type === 'friend_request' && notification.unread && (
                                  <div className="flex space-x-2 mt-3">
                                    <button className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full text-xs font-medium hover:from-green-600 hover:to-emerald-600 transition-all">
                                      Accept
                                    </button>
                                    <button className="px-3 py-1 bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-full text-xs font-medium hover:from-gray-500 hover:to-gray-600 transition-all">
                                      Decline
                                    </button>
                                  </div>
                                )}
                                
                                {/* Action button for exam reminders */}
                                {notification.type === 'exam' && (
                                  <div className="mt-3">
                                    <button className="px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full text-xs font-medium hover:from-blue-600 hover:to-indigo-600 transition-all">
                                      View Exam
                                    </button>
                                  </div>
                                )}
                                
                                {/* Action button for community updates */}
                                {notification.type === 'community' && (
                                  <div className="mt-3">
                                    <button className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-xs font-medium hover:from-purple-600 hover:to-pink-600 transition-all">
                                      Join Discussion
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-600">
                        <button className="w-full text-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium">
                          View All Notifications
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            <button
              onClick={toggleTheme}
              className="relative w-14 h-7 bg-gradient-to-r from-orange-400 to-pink-500 dark:from-gray-600 dark:to-gray-700 rounded-full p-1 transition-all duration-300 hover:shadow-lg hover:scale-105 focus:outline-none"
              aria-label="Toggle theme"
            >
              <div className={`absolute inset-1 w-5 h-5 bg-white rounded-full shadow-md transform transition-all duration-300 flex items-center justify-center ${isDark ? 'translate-x-7' : 'translate-x-0'}`}>
                {isDark ? (
                  <Moon className="h-3 w-3 text-gray-700" />
                ) : (
                  <Sun className="h-3 w-3 text-yellow-500" />
                )}
              </div>
            </button>
            {user ? (
              <>
                <button
                  onClick={toggleUserMenu}
                  data-menu-button
                  className="flex items-center space-x-2 px-3 py-1.5 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 rounded-full transition-all duration-300 shadow-md hover:shadow-lg border border-white/30 relative"
                >
                  <div className="relative">
                    <img 
                      src={user?.profile?.avatar || user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'} 
                      alt="Profile" 
                      className={`w-6 h-6 rounded-full object-cover ${user?.isPremium ? 'ring-2 ring-yellow-400' : ''}`}
                    />
                    {user?.isPremium && (
                      <div className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold shadow-lg">
                        ⭐
                      </div>
                    )}
                  </div>
                  <MoreHorizontal className="h-3 w-3 text-gray-600 dark:text-gray-400" />
                </button>
              
                {/* User Menu Popup */}
                {isUserMenuOpen && (
                  <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center p-4" onClick={closeUserMenu}>
                    <div 
                      className="user-menu-popup w-full max-w-sm bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 dark:border-gray-700/50 mx-auto my-auto max-h-[90vh] overflow-y-auto"
                      style={{
                        animation: 'popUp 0.6s ease-out forwards'
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                    <div className="p-4">
                      {/* User Info Header */}
                      <div className="text-center mb-6">
                        <div className="relative inline-block mb-3">
                          <img 
                            src={user?.profile?.avatar || user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face'} 
                            alt="Profile" 
                            className={`w-16 h-16 rounded-full object-cover shadow-xl border-3 ${user?.isPremium ? 'border-yellow-400' : 'border-white/50'}`}
                          />
                          {user?.isPremium && (
                            <div className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-sm rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg">
                              ⭐
                            </div>
                          )}
                        </div>
                        <div className="flex items-center justify-center space-x-2 mb-2">
                          <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{user?.username}</h3>
                          {user?.isPremium && (
                            <span className="text-yellow-500 text-sm font-bold px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                              PRO
                            </span>
                          )}
                        </div>
                        <div className={`inline-flex items-center space-x-1 px-4 py-2 bg-gradient-to-r ${getStageColor(userLevel.stage)} rounded-full shadow-lg`}>
                          <Star className="h-4 w-4 text-white" />
                          <span className="text-sm font-bold text-white">{userLevel.stage} Lv.{userLevel.stageLevel}</span>
                        </div>
                      </div>
                      
                      {/* Navigation Links */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <Link to="/dashboard" onClick={closeUserMenu} className="group bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-xl p-3 border border-white/20 hover:shadow-xl transition-all duration-300 text-center hover:scale-105">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                            <span className="text-white text-sm">📊</span>
                          </div>
                          <span className="text-xs font-medium text-gray-900 dark:text-white">Dashboard</span>
                        </Link>
                        <Link to="/flashcards" onClick={closeUserMenu} className="group bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-xl p-3 border border-white/20 hover:shadow-xl transition-all duration-300 text-center hover:scale-105">
                          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                            <span className="text-white text-sm">🃏</span>
                          </div>
                          <span className="text-xs font-medium text-gray-900 dark:text-white">Flashcards</span>
                        </Link>
                        <Link to="/quizzes" onClick={closeUserMenu} className="group bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-xl p-3 border border-white/20 hover:shadow-xl transition-all duration-300 text-center hover:scale-105">
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                            <span className="text-white text-sm">🧠</span>
                          </div>
                          <span className="text-xs font-medium text-gray-900 dark:text-white">Quizzes</span>
                        </Link>
                        <Link to="/learning" onClick={closeUserMenu} className="group bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-xl p-3 border border-white/20 hover:shadow-xl transition-all duration-300 text-center hover:scale-105">
                          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                            <span className="text-white text-sm">📚</span>
                          </div>
                          <span className="text-xs font-medium text-gray-900 dark:text-white">Learning</span>
                        </Link>
                        <Link to="/exams" onClick={closeUserMenu} className="group bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-xl p-3 border border-white/20 hover:shadow-xl transition-all duration-300 text-center hover:scale-105">
                          <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                            <span className="text-white text-sm">📝</span>
                          </div>
                          <span className="text-xs font-medium text-gray-900 dark:text-white">Exams</span>
                        </Link>
                        <Link to="/chat" onClick={closeUserMenu} className="group bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-xl p-3 border border-white/20 hover:shadow-xl transition-all duration-300 text-center hover:scale-105">
                          <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                            <span className="text-white text-sm">💬</span>
                          </div>
                          <span className="text-xs font-medium text-gray-900 dark:text-white">Chat</span>
                        </Link>
                        <Link to="/profile" onClick={closeUserMenu} className="group bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-xl p-3 border border-white/20 hover:shadow-xl transition-all duration-300 text-center hover:scale-105">
                          <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                            <span className="text-white text-sm">👤</span>
                          </div>
                          <span className="text-xs font-medium text-gray-900 dark:text-white">Profile</span>
                        </Link>
                      </div>
                      
                      {/* Friends Section */}
                      <div className="mb-4">
                        <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 px-2">Friends</h4>
                        <div className="grid grid-cols-2 gap-2">
                          <button onClick={closeUserMenu} className="group bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-xl p-3 border border-white/20 hover:shadow-xl transition-all duration-300 text-center hover:scale-105">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                              <span className="text-white text-sm">👥</span>
                            </div>
                            <span className="text-xs font-medium text-gray-900 dark:text-white">Following</span>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">248</div>
                          </button>
                          <button onClick={closeUserMenu} className="group bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-xl p-3 border border-white/20 hover:shadow-xl transition-all duration-300 text-center hover:scale-105">
                            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                              <span className="text-white text-sm">👤</span>
                            </div>
                            <span className="text-xs font-medium text-gray-900 dark:text-white">Followers</span>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">1.2k</div>
                          </button>
                        </div>
                      </div>
                      
                      {/* Logout Button */}
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl text-sm font-medium hover:scale-105"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <Link to="/services" className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 transition-colors">Services</Link>
                <Link to="/help" className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 transition-colors">Help</Link>
                <Link to="/login" className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 border border-gray-300 dark:border-gray-600 rounded-full transition-colors">Login</Link>
                <Link to="/register" className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-full transition-all duration-300 hover:shadow-md">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {user ? (
              <>
                <Link to="/dashboard" onClick={closeMenu} className="block px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300">Dashboard</Link>
                <Link to="/flashcards" onClick={closeMenu} className="block px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300">Flashcards</Link>
                <Link to="/quizzes" onClick={closeMenu} className="block px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300">Quizzes</Link>
                <Link to="/exams" onClick={closeMenu} className="block px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300">Exams</Link>
                <Link to="/chat" onClick={closeMenu} className="block px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300">Chat</Link>
                <Link to="/profile" onClick={closeMenu} className="block px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300">Profile</Link>
                <Link to="/learning" onClick={closeMenu} className="block px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300">Learning</Link>
              </>
            ) : (
              <>
                <Link to="/services" onClick={closeMenu} className="block px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300">Services</Link>
                <Link to="/help" onClick={closeMenu} className="block px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300">Help</Link>
              </>
            )}
          </div>
        </div>
      )}
      

    </nav>
    
    <style jsx global>{`
      @keyframes popUp {
        0% {
          opacity: 0;
          transform: scale(0.8);
        }
        70% {
          opacity: 0.9;
          transform: scale(1.05);
        }
        100% {
          opacity: 1;
          transform: scale(1);
        }
      }
    `}</style>
    </>
  )
}

export default Navbar