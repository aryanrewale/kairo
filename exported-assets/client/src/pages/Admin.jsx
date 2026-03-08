import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { Users, BookOpen, FileText, BarChart3, Settings, Shield } from 'lucide-react'

const Admin = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalQuizzes: 0,
    totalExams: 0
  })
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('dashboard')

  const { user } = useAuth()

  useEffect(() => {
    // Simulate fetching admin stats - replace with actual API call
    const fetchStats = async () => {
      setLoading(true)
      // Mock data - replace with actual API call
      setTimeout(() => {
        setStats({
          totalUsers: 15420,
          activeUsers: 8934,
          totalQuizzes: 156,
          totalExams: 23
        })
        setLoading(false)
      }, 1000)
    }

    if (user) {
      fetchStats()
    }
  }, [user])

  const adminSections = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: <BarChart3 className="h-5 w-5" />,
      description: 'Overview of platform statistics and metrics'
    },
    {
      id: 'users',
      title: 'User Management',
      icon: <Users className="h-5 w-5" />,
      description: 'Manage user accounts and permissions'
    },
    {
      id: 'content',
      title: 'Content Management',
      icon: <BookOpen className="h-5 w-5" />,
      description: 'Manage quizzes, flashcards, and study materials'
    },
    {
      id: 'exams',
      title: 'Exam Management',
      icon: <FileText className="h-5 w-5" />,
      description: 'Oversee certification exams and results'
    },
    {
      id: 'settings',
      title: 'System Settings',
      icon: <Settings className="h-5 w-5" />,
      description: 'Configure platform settings and preferences'
    }
  ]

  const recentActivities = [
    {
      id: 1,
      user: 'John Doe',
      action: 'Completed quiz "JavaScript Fundamentals"',
      timestamp: '2 minutes ago',
      type: 'quiz_completion'
    },
    {
      id: 2,
      user: 'Sarah Wilson',
      action: 'Enrolled in "React Developer Certification"',
      timestamp: '5 minutes ago',
      type: 'exam_enrollment'
    },
    {
      id: 3,
      user: 'Mike Johnson',
      action: 'Created new flashcard set "CSS Grid"',
      timestamp: '10 minutes ago',
      type: 'content_creation'
    },
    {
      id: 4,
      user: 'Emily Davis',
      action: 'Passed "Web Development Basics" exam',
      timestamp: '15 minutes ago',
      type: 'exam_passed'
    }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Admin Dashboard
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Welcome back, {user?.username}! Here's what's happening on your platform.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Users
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.totalUsers.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Active Users
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.activeUsers.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <BookOpen className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Quizzes
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.totalQuizzes}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                <FileText className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Exams
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.totalExams}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Admin Sections */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Admin Sections
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {adminSections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveTab(section.id)}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        activeTab === section.id
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${
                          activeTab === section.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                        }`}>
                          {section.icon}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            {section.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {section.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Recent Activity
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                        <Shield className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {activity.user}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {activity.action}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          {activity.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin
