import mongoose from 'mongoose'
import User from './server/models/User.js'
import dotenv from 'dotenv'

dotenv.config({ path: './server/.env' })

const createTestUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kairo')
    console.log('Connected to MongoDB')

    // Delete existing test user
    await User.deleteOne({ email: 'test@kairo.com' })
    
    // Create test user
    const testUser = new User({
      username: 'testuser',
      email: 'test@kairo.com',
      password: 'test123'
    })

    await testUser.save()
    console.log('Test user created successfully!')
    console.log('Email: test@kairo.com')
    console.log('Password: test123')
    
    process.exit(0)
  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  }
}

createTestUser()