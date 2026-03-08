// Simple test script to verify chat API endpoints
import axios from 'axios'

const API_BASE = 'http://localhost:5000/api'

// Test function
async function testChatAPI() {
  try {
    console.log('Testing Chat API endpoints...')
    
    // Test health check first
    const healthResponse = await axios.get(`${API_BASE}/health`)
    console.log('✅ Health check:', healthResponse.data)
    
    // Test basic suggestions endpoint (without auth for now)
    try {
      const suggestionsResponse = await axios.get(`${API_BASE}/chat/suggestions`, {
        params: { 
          context: JSON.stringify({ learningLevel: 'beginner', focusArea: 'conversation' }) 
        }
      })
      console.log('✅ Suggestions endpoint working')
    } catch (error) {
      console.log('❌ Suggestions endpoint needs auth:', error.response?.status)
    }
    
    console.log('Chat API test completed')
    
  } catch (error) {
    console.error('❌ Test failed:', error.message)
  }
}

testChatAPI()