import { useEffect, useRef } from 'react'
import { useAuth } from '../context/AuthContext'

export const useActivityTracker = () => {
  const { user } = useAuth()
  const sessionStartTime = useRef(Date.now())

  const trackActivity = async (type, data = {}) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      await fetch('/api/progress/activity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ type, ...data })
      })
    } catch (error) {
      console.error('Error tracking activity:', error)
    }
  }

  const trackStudySession = async () => {
    const sessionTime = Date.now() - sessionStartTime.current
    if (sessionTime > 60000) {
      await trackActivity('study_session', {
        category: 'General Study',
        timeSpent: Math.floor(sessionTime / 1000)
      })
    }
  }

  useEffect(() => {
    if (!user) return

    const handleBeforeUnload = () => {
      trackStudySession()
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      trackStudySession()
    }
  }, [user])

  return { trackActivity }
}