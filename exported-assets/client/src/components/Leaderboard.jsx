import { useState, useEffect } from 'react'
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react'
import LevelBadge from './LevelBadge'

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [timeframe, setTimeframe] = useState('all')

  useEffect(() => {
    fetchLeaderboard()
  }, [timeframe])

  const fetchLeaderboard = async () => {
    try {
      setError(null)
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/progress/leaderboard?timeframe=${timeframe}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      
      if (response.ok) {
        const data = await response.json()
        setLeaderboard(data)
      } else {
        setError('Failed to load leaderboard')
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error)
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return <Trophy className="w-6 h-6 text-yellow-500" />
      case 2: return <Medal className="w-6 h-6 text-gray-400" />
      case 3: return <Award className="w-6 h-6 text-amber-600" />
      default: return <div className="w-6 h-6 flex items-center justify-center text-gray-500 font-bold">#{rank}</div>
    }
  }

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-2xl flex items-center justify-center mr-4">
            <TrendingUp className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Leaderboard</h3>
        </div>
        
        <select 
          value={timeframe} 
          onChange={(e) => setTimeframe(e.target.value)}
          className="px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="all">All Time</option>
          <option value="month">This Month</option>
          <option value="week">This Week</option>
        </select>
      </div>

      <div className="space-y-4">
        {error ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">⚠️</div>
            <p className="text-gray-600 dark:text-gray-300">{error}</p>
          </div>
        ) : leaderboard.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">🏆</div>
            <p className="text-gray-600 dark:text-gray-300">No rankings available yet</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700">
            {/* Table Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-4">
              <div className="grid grid-cols-12 gap-4 items-center font-semibold text-sm">
                <div className="col-span-1 text-center">Rank</div>
                <div className="col-span-4">Player</div>
                <div className="col-span-2 text-center">Level</div>
                <div className="col-span-2 text-center">XP</div>
                <div className="col-span-2 text-center">Streak</div>
                <div className="col-span-1 text-center">Quizzes</div>
              </div>
            </div>
            
            {/* Table Body */}
            <div className="bg-white dark:bg-gray-800">
              {leaderboard.map((user, index) => (
                <div key={user._id} className={`grid grid-cols-12 gap-4 items-center px-6 py-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 ${index < 3 ? 'bg-gradient-to-r from-yellow-50/50 to-orange-50/50 dark:from-yellow-900/10 dark:to-orange-900/10' : ''}`}>
                  
                  {/* Rank */}
                  <div className="col-span-1 flex justify-center">
                    {getRankIcon(index + 1)}
                  </div>

                  {/* Player Info */}
                  <div className="col-span-4 flex items-center space-x-3">
                    <div className="relative">
                      <img 
                        src={user.avatar?.startsWith('human-') ? 
                          (() => {
                            const avatarId = user.avatar.replace('human-', '')
                            const avatarMap = {
                              'male1': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
                              'female1': 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=40&h=40&fit=crop&crop=face',
                              'male2': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
                              'female2': 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
                              'male3': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
                              'female3': 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face',
                              'male4': 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face',
                              'female4': 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=40&h=40&fit=crop&crop=face',
                              'male5': 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=40&h=40&fit=crop&crop=face',
                              'female5': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face'
                            }
                            return avatarMap[avatarId] || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
                          })() : 
                          (user.avatar || `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face`)
                        } 
                        alt={user.username} 
                        className={`w-10 h-10 rounded-full object-cover shadow-md border-2 ${user.isPremium ? 'border-yellow-400' : 'border-gray-200 dark:border-gray-600'}`}
                      />
                      {user.isPremium && (
                        <div className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold shadow-lg">
                          ⭐
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">{user.username}</div>
                      {user.isPremium && (
                        <div className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">PRO</div>
                      )}
                    </div>
                  </div>

                  {/* Level */}
                  <div className="col-span-2 flex justify-center">
                    <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold text-white shadow-md ${
                      user.stage === 'Bronze' ? 'bg-gradient-to-r from-orange-500 to-yellow-600' :
                      user.stage === 'Silver' ? 'bg-gradient-to-r from-gray-400 to-gray-600' :
                      user.stage === 'Gold' ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                      user.stage === 'Platinum' ? 'bg-gradient-to-r from-blue-400 to-purple-600' :
                      user.stage === 'Diamond' ? 'bg-gradient-to-r from-cyan-400 to-blue-600' :
                      'bg-gradient-to-r from-gray-400 to-gray-600'
                    }`}>
                      <span>{user.stage}</span>
                      <span>Lv.{user.stageLevel}</span>
                    </div>
                  </div>

                  {/* XP */}
                  <div className="col-span-2 text-center">
                    <div className="font-semibold text-gray-900 dark:text-white">{user.totalXP?.toLocaleString()}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">XP</div>
                  </div>

                  {/* Streak */}
                  <div className="col-span-2 text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <span className="text-orange-500">🔥</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{user.studyStreak}</span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">days</div>
                  </div>

                  {/* Quizzes */}
                  <div className="col-span-1 text-center">
                    <div className="font-semibold text-gray-900 dark:text-white">{user.completedQuizzes}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Leaderboard