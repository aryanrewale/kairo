import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../context/AuthContext'
import { User, Mail, Calendar, Edit, Save, X, ChevronUp, Camera } from 'lucide-react'
import { redirectToPremium } from '../utils/premiumUtils'

const Profile = () => {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    bio: '',
    joinDate: '',
    avatar: '',
    japaneseLevel: 'N5',
    studyGoal: 'daily',
    preferredLearningStyle: 'visual',
    nativeLanguage: 'English'
  })
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [showAvatarModal, setShowAvatarModal] = useState(false)
  const [showFollowModal, setShowFollowModal] = useState(null) // 'following' or 'followers'
  const fileInputRef = useRef(null)

  const { user, updateUser } = useAuth()

  const freeAvatars = [
    { id: 'male1', type: 'human', gender: 'male', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', name: 'Alex' },
    { id: 'female1', type: 'human', gender: 'female', url: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=150&h=150&fit=crop&crop=face', name: 'Emma' },
    { id: 'male2', type: 'human', gender: 'male', url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', name: 'Carlos' },
    { id: 'female2', type: 'human', gender: 'female', url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', name: 'Sofia' },
    { id: 'male3', type: 'human', gender: 'male', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face', name: 'David' },
    { id: 'female3', type: 'human', gender: 'female', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face', name: 'Maya' },
    { id: 'male4', type: 'human', gender: 'male', url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face', name: 'Ryan' },
    { id: 'female4', type: 'human', gender: 'female', url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face', name: 'Luna' },
    { id: 'male5', type: 'human', gender: 'male', url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face', name: 'Kai' },
    { id: 'female5', type: 'human', gender: 'female', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face', name: 'Zoe' }
  ]

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return
      
      setLoading(true)
      try {
        const token = localStorage.getItem('token')
        const response = await fetch('/api/users/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        
        if (response.ok) {
          const userData = await response.json()
          setProfile({
            username: userData.username || '',
            email: userData.email || '',
            firstName: userData.profile?.firstName || '',
            lastName: userData.profile?.lastName || '',
            bio: userData.profile?.bio || '',
            joinDate: userData.createdAt || userData.profile?.joinedDate || '2024-01-15',
            avatar: userData.profile?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
            japaneseLevel: userData.progress?.japaneseLevel || 'N5',
            studyGoal: userData.profile?.studyGoal || 'daily',
            preferredLearningStyle: userData.profile?.preferredLearningStyle || 'visual',
            nativeLanguage: userData.profile?.nativeLanguage || 'English'
          })
        } else {
          console.error('Failed to fetch profile data')
        }
      } catch (error) {
        console.error('Error fetching profile:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [user])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfile(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          username: profile.username,
          firstName: profile.firstName,
          lastName: profile.lastName,
          bio: profile.bio,
          japaneseLevel: profile.japaneseLevel,
          studyGoal: profile.studyGoal,
          preferredLearningStyle: profile.preferredLearningStyle,
          nativeLanguage: profile.nativeLanguage,
          avatar: profile.avatar
        })
      })
      
      if (response.ok) {
        setIsEditing(false)
        // Update user context with new data
        updateUser(profile)
        alert('Profile updated successfully!')
      } else {
        throw new Error('Failed to update profile')
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Failed to update profile. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    // Reset to original values - in a real app, you'd fetch fresh data
    setIsEditing(false)
  }

  const autoCropImage = (imageSrc) => {
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        
        const size = 200
        canvas.width = size
        canvas.height = size
        
        const minDimension = Math.min(img.width, img.height)
        const sourceX = (img.width - minDimension) / 2
        const sourceY = (img.height - minDimension) / 2
        
        ctx.drawImage(
          img,
          sourceX, sourceY, minDimension, minDimension,
          0, 0, size, size
        )
        
        resolve(canvas.toDataURL('image/jpeg', 0.9))
      }
      img.src = imageSrc
    })
  }

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = async (e) => {
        const croppedImage = await autoCropImage(e.target.result)
        
        setProfile(prev => ({
          ...prev,
          avatar: croppedImage
        }))
        updateUser({ avatar: croppedImage })
        
        try {
          const token = localStorage.getItem('token')
          await fetch('/api/users/avatar', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ avatar: croppedImage })
          })
        } catch (error) {
          console.error('Failed to save avatar:', error)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = () => {
    if (!user?.isPremium) {
      redirectToPremium('Custom photo upload')
      return
    }
    fileInputRef.current?.click()
  }

  const selectFreeAvatar = async (avatar) => {
    const avatarData = typeof avatar === 'string' ? avatar : `human-${avatar.id}`
    setProfile(prev => ({
      ...prev,
      avatar: avatarData
    }))
    updateUser({ avatar: avatarData })
    setShowAvatarModal(false)
    
    // Save to backend
    try {
      const token = localStorage.getItem('token')
      await fetch('/api/users/avatar', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ avatar: avatarData })
      })
    } catch (error) {
      console.error('Failed to save avatar:', error)
    }
  }

  const renderAvatar = (avatarData, size = 'w-32 h-32') => {
    if (typeof avatarData === 'string' && avatarData.startsWith('human-')) {
      const avatarId = avatarData.replace('human-', '')
      const avatar = freeAvatars.find(a => a.id === avatarId)
      if (avatar) {
        return (
          <img
            src={avatar.url}
            alt={avatar.name}
            className={`${size} rounded-full object-cover shadow-xl border-4 border-white/50`}
          />
        )
      }
    }
    return (
      <img
        src={avatarData || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'}
        alt="Profile"
        className={`${size} rounded-full object-cover shadow-xl border-4 border-white/50`}
      />
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-6xl opacity-10 animate-float text-purple-300">漢</div>
        <div className="absolute top-40 right-20 text-4xl opacity-10 animate-float-delayed text-pink-300">字</div>
        <div className="absolute bottom-40 left-20 text-5xl opacity-10 animate-float text-indigo-300">あ</div>
        <div className="absolute bottom-20 right-10 text-6xl opacity-10 animate-float-delayed text-purple-300">カ</div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl opacity-5 animate-pulse text-gradient">KAIRO</div>
        
        {/* Floating Sakura Petals */}
        <div className="absolute top-10 left-1/4 text-pink-300 opacity-20 animate-float text-2xl">🌸</div>
        <div className="absolute top-32 right-1/3 text-pink-300 opacity-20 animate-float-delayed text-xl">🌸</div>
        <div className="absolute bottom-20 left-1/3 text-pink-300 opacity-20 animate-float text-2xl">🌸</div>
        <div className="absolute top-2/3 right-1/4 text-pink-300 opacity-20 animate-float-delayed text-xl">🌸</div>
      </div>

      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/20">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-3">
                👤 Profile Settings
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Manage your account and Japanese learning preferences
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-white/20">
                <div className="text-center">
                  <div className="relative inline-block mb-6">
                    <div className="relative group">
                      {renderAvatar(profile.avatar, 'w-40 h-40')}
                      {isEditing && (
                        <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                          <div className="flex space-x-3">
                            <button
                              onClick={() => setShowAvatarModal(true)}
                              className="bg-white/90 text-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                              title="Choose Free Avatar"
                            >
                              <span className="text-lg">🎭</span>
                            </button>
                            <button
                              onClick={triggerFileInput}
                              className="bg-white/90 text-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 backdrop-blur-sm relative"
                              title="Upload Custom Photo (Premium)"
                            >
                              <Camera className="h-5 w-5" />
                              {!user?.isPremium && (
                                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg">
                                  💎
                                </div>
                              )}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </div>
                  <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                    {profile.firstName} {profile.lastName}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    @{profile.username}
                  </p>
                  
                  {/* Following/Followers Stats */}
                  <div className="flex justify-center space-x-6 mb-6">
                    <button 
                      onClick={() => setShowFollowModal('following')}
                      className="text-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg p-2 transition-colors"
                    >
                      <div className="text-xl font-bold text-gray-900 dark:text-white">248</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Following</div>
                    </button>
                    <button 
                      onClick={() => setShowFollowModal('followers')}
                      className="text-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg p-2 transition-colors"
                    >
                      <div className="text-xl font-bold text-gray-900 dark:text-white">1.2k</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Followers</div>
                    </button>
                    <button 
                      onClick={() => setShowFollowModal('friends')}
                      className="text-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg p-2 transition-colors"
                    >
                      <div className="text-xl font-bold text-gray-900 dark:text-white">156</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Friends</div>
                    </button>
                  </div>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="h-4 w-4 mr-2" />
                      Joined {new Date(profile.joinDate).toLocaleDateString()}
                    </div>
                    <div className="space-y-3">
                      <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 backdrop-blur-sm text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium border border-purple-200 dark:border-purple-700">
                        🎌 JLPT {profile.japaneseLevel}
                      </div>
                      <div className="inline-block px-4 py-2 bg-gradient-to-r from-indigo-100 to-blue-100 dark:from-indigo-900/30 dark:to-blue-900/30 backdrop-blur-sm text-indigo-800 dark:text-indigo-200 rounded-full text-sm font-medium border border-indigo-200 dark:border-indigo-700">
                        📊 Level Badge: {profile.japaneseLevel === 'N5' ? 'Beginner' : profile.japaneseLevel === 'N4' ? 'Elementary' : profile.japaneseLevel === 'N3' ? 'Intermediate' : profile.japaneseLevel === 'N2' ? 'Upper Intermediate' : profile.japaneseLevel === 'N1' ? 'Advanced' : 'Beginner'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header Card */}
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-lg">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Personal Information
                  </h3>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </button>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-gray-400 disabled:to-gray-500 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center transition-all duration-300 shadow-md"
                      >
                        <Save className="h-4 w-4 mr-1" />
                        {saving ? 'Saving...' : 'Save'}
                      </button>
                      <button
                        onClick={handleCancel}
                        className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center transition-all duration-300 shadow-md"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Username */}
                <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-lg rounded-xl p-4 border border-white/20">
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wide">
                    Username
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="username"
                      value={profile.username}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border-0 rounded-lg bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm focus:ring-1 focus:ring-purple-400 dark:text-white text-sm"
                    />
                  ) : (
                    <div className="flex items-center">
                      <User className="h-4 w-4 text-purple-500 mr-2" />
                      <span className="text-gray-900 dark:text-white text-sm">{profile.username}</span>
                    </div>
                  )}
                </div>

                {/* Email */}
                <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-lg rounded-xl p-4 border border-white/20">
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wide">
                    Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border-0 rounded-lg bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm focus:ring-1 focus:ring-purple-400 dark:text-white text-sm"
                    />
                  ) : (
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-purple-500 mr-2" />
                      <span className="text-gray-900 dark:text-white text-sm">{profile.email}</span>
                    </div>
                  )}
                </div>

                {/* First Name */}
                <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-lg rounded-xl p-4 border border-white/20">
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wide">
                    First Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="firstName"
                      value={profile.firstName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border-0 rounded-lg bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm focus:ring-1 focus:ring-purple-400 dark:text-white text-sm"
                    />
                  ) : (
                    <span className="text-gray-900 dark:text-white text-sm">{profile.firstName}</span>
                  )}
                </div>

                {/* Last Name */}
                <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-lg rounded-xl p-4 border border-white/20">
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wide">
                    Last Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="lastName"
                      value={profile.lastName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border-0 rounded-lg bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm focus:ring-1 focus:ring-purple-400 dark:text-white text-sm"
                    />
                  ) : (
                    <span className="text-gray-900 dark:text-white text-sm">{profile.lastName}</span>
                  )}
                </div>
              </div>

              {/* Bio - Full Width */}
              <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-lg rounded-xl p-4 border border-white/20">
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wide">
                  Bio
                </label>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={profile.bio}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border-0 rounded-lg bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm focus:ring-1 focus:ring-purple-400 dark:text-white text-sm resize-none"
                  />
                ) : (
                  <p className="text-gray-900 dark:text-white text-sm leading-relaxed">{profile.bio}</p>
                )}
              </div>

              {/* Japanese Learning Preferences */}
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-lg">
                <h4 className="text-lg font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                  🎌 Japanese Learning Preferences
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Japanese Level */}
                  <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-lg rounded-xl p-4 border border-white/20">
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wide">
                      Current JLPT Level
                    </label>
                    {isEditing ? (
                      <select
                        name="japaneseLevel"
                        value={profile.japaneseLevel}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border-0 rounded-lg bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm focus:ring-1 focus:ring-purple-400 dark:text-white text-sm"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="N5">N5 (Beginner)</option>
                        <option value="N4">N4 (Elementary)</option>
                        <option value="N3">N3 (Intermediate)</option>
                        <option value="N2">N2 (Upper Intermediate)</option>
                        <option value="N1">N1 (Advanced)</option>
                      </select>
                    ) : (
                      <span className="text-gray-900 dark:text-white text-sm">{profile.japaneseLevel}</span>
                    )}
                  </div>

                  {/* Study Goal */}
                  <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-lg rounded-xl p-4 border border-white/20">
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wide">
                      Study Goal
                    </label>
                    {isEditing ? (
                      <select
                        name="studyGoal"
                        value={profile.studyGoal}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border-0 rounded-lg bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm focus:ring-1 focus:ring-purple-400 dark:text-white text-sm"
                      >
                        <option value="casual">Casual Learning</option>
                        <option value="daily">Daily Practice</option>
                        <option value="intensive">Intensive Study</option>
                        <option value="exam">JLPT Preparation</option>
                      </select>
                    ) : (
                      <span className="text-gray-900 dark:text-white text-sm capitalize">{profile.studyGoal.replace('_', ' ')}</span>
                    )}
                  </div>

                  {/* Learning Style */}
                  <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-lg rounded-xl p-4 border border-white/20">
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wide">
                      Learning Style
                    </label>
                    {isEditing ? (
                      <select
                        name="preferredLearningStyle"
                        value={profile.preferredLearningStyle}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border-0 rounded-lg bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm focus:ring-1 focus:ring-purple-400 dark:text-white text-sm"
                      >
                        <option value="visual">Visual (Flashcards, Images)</option>
                        <option value="auditory">Auditory (Listening, Speaking)</option>
                        <option value="reading">Reading & Writing</option>
                        <option value="mixed">Mixed Approach</option>
                      </select>
                    ) : (
                      <span className="text-gray-900 dark:text-white text-sm capitalize">{profile.preferredLearningStyle}</span>
                    )}
                  </div>

                  {/* Native Language */}
                  <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-lg rounded-xl p-4 border border-white/20">
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wide">
                      Native Language
                    </label>
                    {isEditing ? (
                      <select
                        name="nativeLanguage"
                        value={profile.nativeLanguage}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border-0 rounded-lg bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm focus:ring-1 focus:ring-purple-400 dark:text-white text-sm"
                      >
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                        <option value="German">German</option>
                        <option value="Chinese">Chinese</option>
                        <option value="Korean">Korean</option>
                        <option value="Other">Other</option>
                      </select>
                    ) : (
                      <span className="text-gray-900 dark:text-white text-sm">{profile.nativeLanguage}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Following/Followers Modal */}
      {showFollowModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-3xl max-w-md w-full max-h-[80vh] border border-white/20 shadow-2xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {showFollowModal === 'following' ? 'Following' : showFollowModal === 'followers' ? 'Followers' : 'Friends'}
                </h3>
                <button 
                  onClick={() => setShowFollowModal(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {(showFollowModal === 'following' ? [
                  { id: 1, name: 'Sakura_Chan', username: 'sakura_chan', level: 'Advanced', avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=50&h=50&fit=crop&crop=face', isFollowing: true },
                  { id: 2, name: 'TokyoDreamer', username: 'tokyo_dreamer', level: 'Intermediate', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face', isFollowing: true },
                  { id: 3, name: 'KanjiMaster', username: 'kanji_master', level: 'Expert', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face', isFollowing: true },
                  { id: 4, name: 'HiraganaHero', username: 'hiragana_hero', level: 'Beginner', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face', isFollowing: true },
                  { id: 5, name: 'NihongoNinja', username: 'nihongo_ninja', level: 'Advanced', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face', isFollowing: true }
                ] : showFollowModal === 'followers' ? [
                  { id: 6, name: 'AnimeStudent', username: 'anime_student', level: 'Intermediate', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop&crop=face', isFollowing: false },
                  { id: 7, name: 'StudyBuddy22', username: 'study_buddy22', level: 'Beginner', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=50&h=50&fit=crop&crop=face', isFollowing: false },
                  { id: 8, name: 'JapanLover99', username: 'japan_lover99', level: 'Intermediate', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=50&h=50&fit=crop&crop=face', isFollowing: true },
                  { id: 9, name: 'KawaiiLearner', username: 'kawaii_learner', level: 'Advanced', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=50&h=50&fit=crop&crop=face', isFollowing: false },
                  { id: 10, name: 'SushiSensei', username: 'sushi_sensei', level: 'Expert', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop&crop=face', isFollowing: true }
                ] : [
                  { id: 11, name: 'YukiSan', username: 'yuki_san', level: 'Advanced', avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=50&h=50&fit=crop&crop=face', isFriend: true, status: 'online' },
                  { id: 12, name: 'RyuKun', username: 'ryu_kun', level: 'Expert', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face', isFriend: true, status: 'offline' },
                  { id: 13, name: 'MiaChan', username: 'mia_chan', level: 'Intermediate', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face', isFriend: true, status: 'online' },
                  { id: 14, name: 'TaroSensei', username: 'taro_sensei', level: 'Expert', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face', isFriend: true, status: 'away' },
                  { id: 15, name: 'AikoStudent', username: 'aiko_student', level: 'Beginner', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop&crop=face', isFriend: true, status: 'online' }
                ]).map((person) => (
                  <div key={person.id} className="flex items-center justify-between p-3 bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white dark:hover:bg-gray-700 transition-all">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={person.avatar} 
                        alt={person.name}
                        className="w-12 h-12 rounded-full object-cover shadow-lg border-2 border-white/50"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{person.name}</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">@{person.username}</p>
                        <p className="text-xs text-purple-600 dark:text-purple-400">{person.level}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {showFollowModal === 'friends' && (
                        <div className={`w-3 h-3 rounded-full ${
                          person.status === 'online' ? 'bg-green-500' : 
                          person.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                        }`}></div>
                      )}
                      <div className="flex space-x-2">
                        {showFollowModal === 'following' ? (
                          <button className="px-3 py-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-full text-xs font-medium hover:from-gray-600 hover:to-gray-700 transition-all">
                            Unfollow
                          </button>
                        ) : showFollowModal === 'followers' ? (
                          <button className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                            person.isFollowing 
                              ? 'bg-gradient-to-r from-gray-500 to-gray-600 text-white hover:from-gray-600 hover:to-gray-700' 
                              : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600'
                          }`}>
                            {person.isFollowing ? 'Following' : 'Follow'}
                          </button>
                        ) : (
                          <button className="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full text-xs font-medium hover:from-red-600 hover:to-pink-600 transition-all">
                            Unfriend
                          </button>
                        )}
                        <button className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-xs font-medium hover:from-purple-600 hover:to-pink-600 transition-all">
                          Message
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {showFollowModal === 'following' ? '248 people you follow' : 
                   showFollowModal === 'followers' ? '1,200 followers' : 
                   '156 friends'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Avatar Selection Modal */}
      {showAvatarModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl max-w-md w-full p-6 border border-white/20 shadow-2xl">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                Choose Your Avatar
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Select from our free avatar collection
              </p>
            </div>
            
            <div className="grid grid-cols-5 gap-3 mb-6">
              {freeAvatars.map((avatar, index) => (
                <button
                  key={index}
                  onClick={() => selectFreeAvatar(avatar)}
                  className="group relative flex flex-col items-center p-2 rounded-xl hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-300">
                  <img
                    src={avatar.url}
                    alt={avatar.name}
                    className="w-16 h-16 rounded-full object-cover shadow-lg border-2 border-white/50 group-hover:border-purple-500 transition-all duration-300 group-hover:scale-110"
                  />
                  <span className="text-xs text-gray-600 dark:text-gray-400 mt-1 text-center font-medium">{avatar.name}</span>
                  <div className="absolute inset-0 bg-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-purple-600 text-xl font-bold">✓</span>
                  </div>
                </button>
              ))}
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowAvatarModal(false)}
                className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={triggerFileInput}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 text-sm relative"
              >
                {user?.isPremium ? 'Custom Photo' : 'Upgrade for Custom'}
                {!user?.isPremium && (
                  <span className="ml-1">💎</span>
                )}
              </button>
            </div>
            
            {!user?.isPremium && (
              <div className="mt-4 p-3 bg-yellow-100/80 dark:bg-yellow-900/30 backdrop-blur-sm rounded-xl border border-yellow-200 dark:border-yellow-700">
                <p className="text-xs text-yellow-800 dark:text-yellow-300 text-center">
                  💎 <strong>Premium Feature:</strong> Upload custom photos with Pro subscription
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 z-50 hover:scale-110 animate-bounce"
        >
          <ChevronUp className="h-6 w-6" />
        </button>
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-3deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default Profile