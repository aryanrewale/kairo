import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const app = express()
app.use(express.json())

// Test MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kairo')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err))

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'Server working', jwt: !!process.env.JWT_SECRET })
})

app.listen(3001, () => console.log('Test server on port 3001'))