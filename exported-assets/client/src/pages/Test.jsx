import { useState, useEffect } from 'react'
import axios from 'axios'

const Test = () => {
  const [apiStatus, setApiStatus] = useState('Testing...')
  const [error, setError] = useState(null)

  useEffect(() => {
    const testAPI = async () => {
      try {
        const response = await axios.get('/api/test')
        setApiStatus(`✅ API Working: ${response.data.message}`)
      } catch (err) {
        setError(`❌ API Error: ${err.message}`)
        console.error('API Test Error:', err)
      }
    }

    testAPI()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          API Test Page
        </h1>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Connection Status:</h2>
          <p className="text-lg">{apiStatus}</p>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      </div>
    </div>
  )
}

export default Test