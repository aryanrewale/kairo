import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { Calendar, Clock, Users, Award, ExternalLink, Download, BookOpen, MapPin, Gift, ChevronUp } from 'lucide-react'

const Exams = () => {
  const [exams, setExams] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedType, setSelectedType] = useState('all')
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [selectedExam, setSelectedExam] = useState(null)
  const [showScrollTop, setShowScrollTop] = useState(false)

  const { user } = useAuth()

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
    const fetchExams = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (selectedType !== 'all') params.append('type', selectedType)
        if (selectedLevel !== 'all') params.append('level', selectedLevel)

        const response = await fetch(`/api/exams?${params}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        
        if (response.ok) {
          const data = await response.json()
          setExams(data.exams)
        }
      } catch (error) {
        console.error('Error fetching exams:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchExams()
  }, [selectedType, selectedLevel])

  const enrollInExam = async (examId) => {
    try {
      const response = await fetch(`/api/exams/${examId}/enroll`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      })
      
      if (response.ok) {
        alert('Successfully enrolled!')
        window.location.reload()
      } else {
        const error = await response.json()
        alert(error.message)
      }
    } catch (error) {
      console.error('Error enrolling:', error)
      alert('Failed to enroll')
    }
  }

  const downloadPDF = async (downloadUrl, fileName) => {
    try {
      const response = await fetch(downloadUrl, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = fileName
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      } else {
        const error = await response.json()
        alert(error.message || 'Download failed')
      }
    } catch (error) {
      console.error('Download error:', error)
      alert('Download failed')
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getLevelColor = (level) => {
    const colors = {
      'N5': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      'N4': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      'N3': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      'N2': 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
      'N1': 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
      'Advanced': 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400'
    }
    return colors[level] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
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
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/20">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                🎌 Japanese Language Exams
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Free JLPT & MEXT exams with study materials and past papers
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                <div className="bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/30">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">{exams.length}</div>
                  <div className="text-gray-600 dark:text-gray-300">Available Exams</div>
                </div>
                <div className="bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/30">
                  <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">FREE</div>
                  <div className="text-gray-600 dark:text-gray-300">All Exams</div>
                </div>
                <div className="bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/30">
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">2025-26</div>
                  <div className="text-gray-600 dark:text-gray-300">Upcoming Years</div>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-12 flex flex-wrap gap-4 justify-center">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/20">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-6 py-3 border-0 rounded-xl bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 shadow-lg"
              >
                <option value="all">All Types</option>
                <option value="JLPT">JLPT</option>
                <option value="MEXT">MEXT</option>
              </select>

              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="ml-4 px-6 py-3 border-0 rounded-xl bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 shadow-lg"
              >
                <option value="all">All Levels</option>
                <option value="N5">N5 (Beginner)</option>
                <option value="N4">N4 (Elementary)</option>
                <option value="N3">N3 (Intermediate)</option>
                <option value="N2">N2 (Upper Intermediate)</option>
                <option value="N1">N1 (Advanced)</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>

          {/* Exams Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {exams.map((exam) => (
              <div key={exam.id} className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/20 hover:scale-105">
                {/* Header */}
                <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 p-6 text-white">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{exam.title}</h3>
                      <p className="text-purple-100">{exam.description}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(exam.level)} bg-white/20 text-white`}>
                      {exam.level}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-purple-100">
                    <Calendar className="h-4 w-4 mr-2" />
                    {formatDate(exam.examDate)}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Exam Details */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <Clock className="h-4 w-4 mr-2" />
                      <span className="text-sm">{exam.duration} minutes</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <Award className="h-4 w-4 mr-2" />
                      <span className="text-sm">{exam.passingScore}% to pass</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <Users className="h-4 w-4 mr-2" />
                      <span className="text-sm">{exam.enrolledCount} enrolled</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-sm">{exam.venue}</span>
                    </div>
                  </div>

                  {/* Free Badge */}
                  <div className="flex items-center justify-center mb-6 p-4 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl border border-green-200 dark:border-green-700">
                    <Gift className="h-5 w-5 text-green-600 mr-2" />
                    <span className="text-green-800 dark:text-green-300 font-semibold">
                      FREE + Study Materials + Past Papers
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-4">
                    <button
                      onClick={() => enrollInExam(exam.id)}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      Enroll Now (FREE)
                    </button>
                    
                    <div className="grid grid-cols-3 gap-3">
                      <a
                        href={exam.officialWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center px-3 py-3 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-xl hover:bg-white dark:hover:bg-gray-600 transition-all duration-300 text-sm shadow-lg"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Official
                      </a>
                      
                      <a
                        href={exam.registrationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center px-3 py-3 bg-purple-100/80 dark:bg-purple-900/30 backdrop-blur-sm text-purple-700 dark:text-purple-300 rounded-xl hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-all duration-300 text-sm shadow-lg"
                      >
                        <BookOpen className="h-4 w-4 mr-1" />
                        Register
                      </a>
                      
                      <button
                        onClick={() => setSelectedExam(exam)}
                        className="flex items-center justify-center px-3 py-3 bg-orange-100/80 dark:bg-orange-900/30 backdrop-blur-sm text-orange-700 dark:text-orange-300 rounded-xl hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-all duration-300 text-sm shadow-lg"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        PYQs
                      </button>
                    </div>
                  </div>

                  {/* Source Info */}
                  {exam.informationSource && (
                    <div className="mt-6 pt-4 border-t border-gray-200/50 dark:border-gray-600/50">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Source: {exam.informationSource.organization} | 
                        Updated: {new Date(exam.informationSource.lastUpdated).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Study Materials Modal */}
          {selectedExam && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-white/20 shadow-2xl">
                <div className="p-8">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {selectedExam.title} - Resources
                    </h3>
                    <button
                      onClick={() => setSelectedExam(null)}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-3xl transition-colors"
                    >
                      ×
                    </button>
                  </div>
                  
                  {/* Study Materials */}
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                      📚 Study Materials
                    </h4>
                    <div className="space-y-4">
                      {selectedExam.studyMaterials?.map((material, index) => (
                        <a
                          key={index}
                          href={material.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block p-6 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border border-white/30 rounded-2xl hover:bg-white/70 dark:hover:bg-gray-600/70 transition-all duration-300 shadow-lg"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h5 className="font-medium text-gray-900 dark:text-white">{material.title}</h5>
                              <p className="text-sm text-gray-600 dark:text-gray-300">{material.description}</p>
                            </div>
                            <ExternalLink className="h-5 w-5 text-purple-600" />
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Past Papers */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                      📄 Past Question Papers (PYQs)
                    </h4>
                    <div className="space-y-4">
                      {selectedExam.pastPapers?.map((paper, index) => (
                        <div key={index} className="flex items-center justify-between p-6 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border border-white/30 rounded-2xl hover:bg-white/70 dark:hover:bg-gray-600/70 transition-all duration-300 shadow-lg">
                          <div className="flex-1">
                            <h5 className="font-medium text-gray-900 dark:text-white">
                              {paper.fileName}
                            </h5>
                            <div className="flex items-center space-x-4 mt-1">
                              <span className="text-sm text-gray-600 dark:text-gray-300">
                                {paper.year} {paper.session}
                              </span>
                              <span className="text-sm text-purple-600 dark:text-purple-400">
                                {paper.size}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => downloadPDF(paper.downloadUrl, paper.fileName)}
                            className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl transition-all duration-300 shadow-lg"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download PDF
                          </button>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 p-4 bg-yellow-100/80 dark:bg-yellow-900/30 backdrop-blur-sm rounded-2xl border border-yellow-200 dark:border-yellow-700">
                      <p className="text-sm text-yellow-800 dark:text-yellow-300">
                        ⚠️ <strong>Note:</strong> These are sample PYQ files for practice. 
                        For official question papers, please visit the respective exam authority websites.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Empty State */}
          {exams.length === 0 && !loading && (
            <div className="text-center py-16">
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-3xl p-12 shadow-xl border border-white/20">
                <Calendar className="mx-auto h-16 w-16 text-gray-400 mb-6" />
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">
                  No exams found
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Try adjusting your filters to see more exams.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

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

export default Exams