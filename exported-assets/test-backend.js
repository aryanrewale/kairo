// Simple test script to check backend connectivity
import axios from 'axios'

const BASE_URL = 'http://localhost:5004'

async function testBackend() {
  console.log('Testing backend connectivity...')
  
  try {
    // Test health endpoint
    console.log('\n1. Testing health endpoint...')
    const healthResponse = await axios.get(`${BASE_URL}/api/health`)
    console.log('✅ Health check:', healthResponse.data)
    
    // Test registration
    console.log('\n2. Testing registration...')
    const testUser = {
      username: 'testuser' + Date.now(),
      email: `test${Date.now()}@example.com`,
      password: 'test123'
    }
    
    const registerResponse = await axios.post(`${BASE_URL}/api/auth/register`, testUser)
    console.log('✅ Registration:', registerResponse.data)
    
    // Test login
    console.log('\n3. Testing login...')
    const loginResponse = await axios.post(`${BASE_URL}/api/auth/login`, {
      email: testUser.email,
      password: testUser.password
    })
    console.log('✅ Login:', loginResponse.data)
    
    console.log('\n🎉 All tests passed! Backend is working correctly.')
    
  } catch (error) {
    console.error('\n❌ Backend test failed:')
    if (error.code === 'ECONNREFUSED') {
      console.error('- Backend server is not running on port 5004')
      console.error('- Make sure to run: npm run server')
    } else if (error.response) {
      console.error('- Status:', error.response.status)
      console.error('- Message:', error.response.data?.message || error.response.data)
    } else {
      console.error('- Error:', error.message)
    }
  }
}

testBackend()