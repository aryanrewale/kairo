import mongoose from 'mongoose'
import User from './models/User.js'
import dotenv from 'dotenv'

dotenv.config()

async function createTestUser() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kairo')
    console.log('Connected to MongoDB')
    
    const existingUser = await User.findOne({ email: 'test@test.com' })
    if (existingUser) {
      console.log('Test user already exists')
      process.exit(0)
    }
    
    const testUser = new User({
      username: 'testuser',
      email: 'test@test.com',
      password: 'test123'
    })
    
    await testUser.save()
    console.log('✅ Test user created!')
    console.log('Email: test@test.com')
    console.log('Password: test123')
    process.exit(0)
  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  }
}

createTestUser()