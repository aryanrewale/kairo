import { useState, useEffect } from 'react'
import { BookOpen, Trophy, GraduationCap, Globe, Brain, FileText, Video, Upload, DollarSign, Gift, X, Play, Download, Eye, Star } from 'lucide-react'

const Learning = () => {
  const [activeTab, setActiveTab] = useState('japanese')
  const [showSelectionModal, setShowSelectionModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [contentType, setContentType] = useState('videos') // 'videos' or 'notes'
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [uploadType, setUploadType] = useState('free')
  const [customPrice, setCustomPrice] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const tabs = [
    { id: 'japanese', name: 'Japanese Language', icon: '🇯🇵', color: 'from-red-500 to-pink-500' },
    { id: 'competition', name: 'Japanese Competitions', icon: '🏆', color: 'from-yellow-500 to-orange-500' },
    { id: 'jlpt', name: 'JLPT Preparation', icon: '📝', color: 'from-indigo-500 to-purple-500' },
    { id: 'business', name: 'Business Japanese', icon: '💼', color: 'from-purple-500 to-pink-500' },
    { id: 'culture', name: 'Japanese Culture', icon: '🏯', color: 'from-green-500 to-teal-500' },
    { id: 'scholarship', name: 'Scholarship Prep', icon: '🎓', color: 'from-blue-500 to-indigo-500' }
  ]

  const categories = {
    japanese: [
      { id: 'hiragana', name: 'Hiragana', icon: 'あ', description: 'Basic Japanese syllabary' },
      { id: 'katakana', name: 'Katakana', icon: 'カ', description: 'Foreign words syllabary' },
      { id: 'kanji', name: 'Kanji', icon: '漢', description: 'Chinese characters' },
      { id: 'grammar', name: 'Grammar', icon: '文', description: 'Japanese grammar rules' },
      { id: 'vocabulary', name: 'Vocabulary', icon: '語', description: 'Essential Japanese words' },
      { id: 'conversation', name: 'Conversation', icon: '話', description: 'Speaking practice' }
    ],
    competition: [
      { id: 'eju', name: 'EJU (留学試験)', icon: '🎌', description: 'Examination for Japanese University Admission' },
      { id: 'jlpt', name: 'JLPT Competition', icon: '📝', description: 'Japanese Language Proficiency Test' },
      { id: 'kanji', name: 'Kanji Kentei', icon: '漢', description: 'Japanese Kanji Aptitude Test' },
      { id: 'speech', name: 'Speech Contest', icon: '🎤', description: 'Japanese Speech Competitions' },
      { id: 'calligraphy', name: 'Shodo Contest', icon: '🖌️', description: 'Japanese Calligraphy Competition' },
      { id: 'culture', name: 'Culture Quiz', icon: '🏯', description: 'Japanese Culture Knowledge Contest' }
    ],
    scholarship: [
      { id: 'mext', name: 'MEXT Scholarship', icon: '🎌', description: 'Japanese government scholarship' },
      { id: 'jasso', name: 'JASSO Scholarship', icon: '🏫', description: 'Student services organization' },
      { id: 'university', name: 'University Scholarships', icon: '🎓', description: 'Individual university programs' },
      { id: 'private', name: 'Private Scholarships', icon: '💰', description: 'Corporate and foundation grants' },
      { id: 'research', name: 'Research Scholarships', icon: '🔬', description: 'Graduate research funding' },
      { id: 'exchange', name: 'Exchange Programs', icon: '🌏', description: 'Student exchange opportunities' }
    ],
    business: [
      { id: 'keigo', name: 'Keigo (Honorifics)', icon: '🙇', description: 'Polite Japanese forms' },
      { id: 'meetings', name: 'Business Meetings', icon: '👔', description: 'Professional communication' },
      { id: 'emails', name: 'Business Emails', icon: '📧', description: 'Formal correspondence' },
      { id: 'presentations', name: 'Presentations', icon: '📊', description: 'Business presentations' },
      { id: 'negotiations', name: 'Negotiations', icon: '🤝', description: 'Business negotiations' },
      { id: 'etiquette', name: 'Business Etiquette', icon: '🎩', description: 'Professional manners' }
    ],
    culture: [
      { id: 'festivals', name: 'Japanese Festivals', icon: '🎆', description: 'Traditional celebrations' },
      { id: 'tea', name: 'Tea Ceremony', icon: '🍵', description: 'Traditional tea culture' },
      { id: 'martial', name: 'Martial Arts', icon: '🥋', description: 'Traditional fighting arts' },
      { id: 'anime', name: 'Anime & Manga', icon: '📺', description: 'Popular culture' },
      { id: 'food', name: 'Japanese Cuisine', icon: '🍣', description: 'Traditional and modern food' },
      { id: 'history', name: 'Japanese History', icon: '🏛️', description: 'Historical periods and events' }
    ],
    jlpt: [
      { id: 'n5', name: 'JLPT N5', icon: '5️⃣', description: 'Beginner level' },
      { id: 'n4', name: 'JLPT N4', icon: '4️⃣', description: 'Elementary level' },
      { id: 'n3', name: 'JLPT N3', icon: '3️⃣', description: 'Intermediate level' },
      { id: 'n2', name: 'JLPT N2', icon: '2️⃣', description: 'Upper intermediate' },
      { id: 'n1', name: 'JLPT N1', icon: '1️⃣', description: 'Advanced level' },
      { id: 'practice', name: 'Practice Tests', icon: '📋', description: 'Mock examinations' }
    ]
  }

  const getContentForCategory = (categoryId) => {
    const contentMap = {
      hiragana: {
        videos: [
          { id: 1, title: 'Learn ALL Hiragana in 1 Hour - Complete Guide', duration: '1:00:00', views: 2340000, rating: 4.9, author: 'JapanesePod101', isPaid: false, youtubeId: '6p9Il_j0zjc', thumbnail: 'https://img.youtube.com/vi/6p9Il_j0zjc/maxresdefault.jpg' },
          { id: 2, title: 'Hiragana Writing Practice - All 46 Characters', duration: '25:30', views: 890000, rating: 4.8, author: 'Japanese Ammo with Misa', isPaid: false, youtubeId: 'RaTXGdaGOUE', thumbnail: 'https://img.youtube.com/vi/RaTXGdaGOUE/maxresdefault.jpg' },
          { id: 3, title: 'Hiragana Memory Tricks and Mnemonics', duration: '18:45', views: 650000, rating: 4.7, author: 'Learn Japanese with Yuta', isPaid: false, youtubeId: 'wD3FJgij79c', thumbnail: 'https://img.youtube.com/vi/wD3FJgij79c/maxresdefault.jpg' },
          { id: 4, title: 'Advanced Hiragana Combinations', duration: '32:20', views: 420000, rating: 4.6, author: 'Nihongo Master', isPaid: true, price: '$4.99', youtubeId: 'Nq1LKXbOB5s', thumbnail: 'https://img.youtube.com/vi/Nq1LKXbOB5s/maxresdefault.jpg' }
        ],
        notes: [
          { id: 1, title: 'Complete Hiragana Chart with Stroke Order', pages: 12, downloads: 45000, rating: 4.9, author: 'Tofugu', isPaid: false, url: 'https://www.tofugu.com/japanese/hiragana-chart/', description: 'Free downloadable hiragana chart with proper stroke order' },
          { id: 2, title: 'Hiragana Practice Worksheets Bundle', pages: 35, downloads: 32000, rating: 4.8, author: 'JapaneseTeacher.org', isPaid: false, url: 'https://japaneseteacher.org/hiragana-worksheets/', description: 'Comprehensive practice sheets for all hiragana characters' },
          { id: 3, title: 'Hiragana Memory Palace Guide', pages: 20, downloads: 28000, rating: 4.7, author: 'Memory Master', isPaid: true, price: '$7.99', url: 'https://example.com/hiragana-memory', description: 'Advanced memory techniques for hiragana mastery' },
          { id: 4, title: 'Interactive Hiragana Exercises', pages: 45, downloads: 18000, rating: 4.9, author: 'Interactive Learning', isPaid: true, price: '$12.99', url: 'https://example.com/hiragana-interactive', description: 'Digital interactive exercises with audio pronunciation' }
        ]
      },
      katakana: {
        videos: [
          { id: 1, title: 'Master Katakana in 1 Hour - Complete Tutorial', duration: '1:02:30', views: 1950000, rating: 4.8, author: 'JapanesePod101', isPaid: false, youtubeId: 'wD3FJgij79c', thumbnail: 'https://img.youtube.com/vi/wD3FJgij79c/maxresdefault.jpg' },
          { id: 2, title: 'Katakana vs Hiragana - When to Use Each', duration: '22:15', views: 850000, rating: 4.9, author: 'Japanese Ammo with Misa', isPaid: false, youtubeId: 'CF3MRMBjd20', thumbnail: 'https://img.youtube.com/vi/CF3MRMBjd20/maxresdefault.jpg' },
          { id: 3, title: 'Katakana Stroke Order and Writing Tips', duration: '28:40', views: 620000, rating: 4.7, author: 'Nihongo no Mori', isPaid: false, youtubeId: 'FknmUij6ZIk', thumbnail: 'https://img.youtube.com/vi/FknmUij6ZIk/maxresdefault.jpg' },
          { id: 4, title: 'Advanced Katakana - Foreign Words Mastery', duration: '35:50', views: 380000, rating: 4.8, author: 'Advanced Japanese', isPaid: true, price: '$6.99', youtubeId: 'UHo3qUb79No', thumbnail: 'https://img.youtube.com/vi/UHo3qUb79No/maxresdefault.jpg' }
        ],
        notes: [
          { id: 1, title: 'Katakana Complete Reference Guide', pages: 15, downloads: 38000, rating: 4.8, author: 'Tofugu', isPaid: false, url: 'https://www.tofugu.com/japanese/katakana-chart/', description: 'Complete katakana chart with stroke order and examples' },
          { id: 2, title: '500 Essential Katakana Words', pages: 28, downloads: 25000, rating: 4.9, author: 'Vocabulary Master', isPaid: false, url: 'https://www.fluentu.com/blog/japanese/katakana-words/', description: 'Most common katakana words with meanings' },
          { id: 3, title: 'Katakana Practice Workbook', pages: 40, downloads: 22000, rating: 4.7, author: 'Practice Pro', isPaid: true, price: '$9.99', url: 'https://example.com/katakana-workbook', description: 'Comprehensive katakana writing and reading exercises' },
          { id: 4, title: 'Katakana Speed Reading Course', pages: 60, downloads: 15000, rating: 4.8, author: 'Speed Learning', isPaid: true, price: '$15.99', url: 'https://example.com/katakana-speed', description: 'Advanced techniques for fast katakana recognition' }
        ]
      },
      kanji: {
        videos: [
          { id: 1, title: 'Kanji Learning System - Master Any Character', duration: '35:20', views: 1800000, rating: 4.9, author: 'Japanese Ammo with Misa', isPaid: false, youtubeId: 'CF3MRMBjd20', thumbnail: 'https://img.youtube.com/vi/CF3MRMBjd20/maxresdefault.jpg' },
          { id: 2, title: 'JLPT N5 Kanji Complete Course', duration: '1:25:45', views: 950000, rating: 4.8, author: 'JapanesePod101', isPaid: false, youtubeId: 'bHUvykXL8wE', thumbnail: 'https://img.youtube.com/vi/bHUvykXL8wE/maxresdefault.jpg' },
          { id: 3, title: 'Kanji Radicals Mastery Course', duration: '42:30', views: 720000, rating: 4.7, author: 'Kanji Master', isPaid: false, youtubeId: 'rGrBHiuPlT0', thumbnail: 'https://img.youtube.com/vi/rGrBHiuPlT0/maxresdefault.jpg' },
          { id: 4, title: 'Advanced Kanji Memory Techniques', duration: '55:15', views: 480000, rating: 4.9, author: 'Memory Expert', isPaid: true, price: '$19.99', youtubeId: 'kQVGl2GOjqs', thumbnail: 'https://img.youtube.com/vi/kQVGl2GOjqs/maxresdefault.jpg' },
          { id: 5, title: 'Business Kanji Masterclass', duration: '1:10:30', views: 320000, rating: 4.8, author: 'Business Japanese Pro', isPaid: true, price: '$24.99', youtubeId: 'FknmUij6ZIk', thumbnail: 'https://img.youtube.com/vi/FknmUij6ZIk/maxresdefault.jpg' }
        ],
        notes: [
          { id: 1, title: 'Complete JLPT Kanji Database N5-N1', pages: 120, downloads: 67000, rating: 4.9, author: 'JLPT Master', isPaid: false, url: 'https://jlptstudy.net/N5/?kanji-list', description: 'All JLPT kanji with readings, meanings, and examples' },
          { id: 2, title: 'Kanji Stroke Order Mastery Guide', pages: 45, downloads: 45000, rating: 4.8, author: 'Stroke Master', isPaid: false, url: 'https://www.tofugu.com/japanese/kanji-stroke-order/', description: 'Complete guide to proper kanji writing technique' },
          { id: 3, title: 'Kanji Etymology and Origins', pages: 80, downloads: 28000, rating: 4.9, author: 'Etymology Expert', isPaid: true, price: '$18.99', url: 'https://example.com/kanji-etymology', description: 'Historical development and meaning of kanji characters' },
          { id: 4, title: '1000 Most Common Kanji Flashcards', pages: 200, downloads: 35000, rating: 4.7, author: 'Flashcard Pro', isPaid: true, price: '$14.99', url: 'https://example.com/kanji-flashcards', description: 'Digital flashcard system with spaced repetition' },
          { id: 5, title: 'Kanji Composition and Structure', pages: 65, downloads: 22000, rating: 4.8, author: 'Structure Sensei', isPaid: true, price: '$16.99', url: 'https://example.com/kanji-structure', description: 'Understanding kanji components and formation rules' }
        ]
      },
      grammar: {
        videos: [
          { id: 1, title: 'Japanese Grammar Explained - Particles は, が, を', duration: '25:40', views: 1200000, rating: 4.8, author: 'Japanese Ammo with Misa', isPaid: false, youtubeId: 'FknmUij6ZIk', thumbnail: 'https://img.youtube.com/vi/FknmUij6ZIk/maxresdefault.jpg' },
          { id: 2, title: 'Japanese Verb Conjugation Made Easy', duration: '35:20', views: 890000, rating: 4.9, author: 'JapanesePod101', isPaid: false, youtubeId: 'UHo3qUb79No', thumbnail: 'https://img.youtube.com/vi/UHo3qUb79No/maxresdefault.jpg' },
          { id: 3, title: 'Japanese Sentence Structure - Word Order Explained', duration: '18:15', views: 650000, rating: 4.7, author: 'Learn Japanese with Yuta', isPaid: false, youtubeId: 'rGrBHiuPlT0', thumbnail: 'https://img.youtube.com/vi/rGrBHiuPlT0/maxresdefault.jpg' }
        ],
        notes: [
          { id: 1, title: 'Japanese Grammar Guide', pages: 120, downloads: 89000, rating: 4.9, author: 'Tae Kim', isPaid: false, url: 'http://www.guidetojapanese.org/learn/grammar', description: 'Complete Japanese grammar guide from basics to advanced' },
          { id: 2, title: 'Japanese Particles Cheat Sheet', pages: 8, downloads: 56000, rating: 4.8, author: 'FluentU', isPaid: false, url: 'https://www.fluentu.com/blog/japanese/japanese-particles-cheat-sheet/', description: 'Quick reference for all Japanese particles' },
          { id: 3, title: 'JLPT Grammar Lists', pages: 40, downloads: 42000, rating: 4.7, author: 'JLPT Study Guide', isPaid: false, url: 'https://jlptstudy.net/N5/?grammar-list', description: 'Grammar points organized by JLPT level' }
        ]
      },
      eju: {
        videos: [
          { id: 1, title: 'EJU Exam Explained - Study in Japan Guide', duration: '15:30', views: 180000, rating: 4.8, author: 'Study in Japan', isPaid: false, youtubeId: 'kQVGl2GOjqs', thumbnail: 'https://img.youtube.com/vi/kQVGl2GOjqs/maxresdefault.jpg' },
          { id: 2, title: 'How to Prepare for EJU Japanese Test', duration: '22:45', views: 95000, rating: 4.7, author: 'Japan Study Support', isPaid: false, youtubeId: 'Nq1LKXbOB5s', thumbnail: 'https://img.youtube.com/vi/Nq1LKXbOB5s/maxresdefault.jpg' },
          { id: 3, title: 'EJU Reading Comprehension Strategies', duration: '28:20', views: 67000, rating: 4.6, author: 'EJU Prep Channel', isPaid: false, youtubeId: 'wD3FJgij79c', thumbnail: 'https://img.youtube.com/vi/wD3FJgij79c/maxresdefault.jpg' }
        ],
        notes: [
          { id: 1, title: 'EJU Official Information', pages: 20, downloads: 15000, rating: 4.9, author: 'JASSO', isPaid: false, url: 'https://www.jasso.go.jp/en/study_j/eju/', description: 'Official EJU examination information and guidelines' },
          { id: 2, title: 'EJU Sample Questions', pages: 35, downloads: 12000, rating: 4.8, author: 'JASSO', isPaid: false, url: 'https://www.jasso.go.jp/en/study_j/eju/examinee/examination.html', description: 'Official EJU sample questions and format' },
          { id: 3, title: 'EJU Study Guide', pages: 50, downloads: 8500, rating: 4.7, author: 'Study in Japan', isPaid: false, url: 'https://www.studyinjapan.go.jp/en/planning/eju/', description: 'Comprehensive EJU preparation guide' }
        ]
      },
      n5: {
        videos: [
          { id: 1, title: 'JLPT N5 Complete Study Guide - Pass the Test!', duration: '1:25:30', views: 850000, rating: 4.9, author: 'JapanesePod101', isPaid: false, youtubeId: 'bHUvykXL8wE', thumbnail: 'https://img.youtube.com/vi/bHUvykXL8wE/maxresdefault.jpg' },
          { id: 2, title: 'JLPT N5 Grammar - All You Need to Know', duration: '45:20', views: 620000, rating: 4.8, author: 'Japanese Ammo with Misa', isPaid: false, youtubeId: 'CF3MRMBjd20', thumbnail: 'https://img.youtube.com/vi/CF3MRMBjd20/maxresdefault.jpg' },
          { id: 3, title: 'JLPT N5 Listening Practice Test', duration: '35:15', views: 420000, rating: 4.7, author: 'JLPT Sensei', isPaid: false, youtubeId: 'FknmUij6ZIk', thumbnail: 'https://img.youtube.com/vi/FknmUij6ZIk/maxresdefault.jpg' }
        ],
        notes: [
          { id: 1, title: 'JLPT N5 Study Materials', pages: 80, downloads: 95000, rating: 4.9, author: 'JLPT Study Guide', isPaid: false, url: 'https://jlptstudy.net/N5/', description: 'Complete N5 vocabulary, kanji, and grammar lists' },
          { id: 2, title: 'JLPT N5 Practice Tests', pages: 60, downloads: 78000, rating: 4.8, author: 'JLPT Official', isPaid: false, url: 'https://www.jlpt.jp/e/samples/forlearners.html', description: 'Official JLPT N5 sample questions and practice tests' },
          { id: 3, title: 'N5 Vocabulary Flashcards', pages: 25, downloads: 65000, rating: 4.7, author: 'Memrise', isPaid: false, url: 'https://www.memrise.com/courses/english/japanese/', description: 'Interactive N5 vocabulary flashcards and exercises' }
        ]
      }
    }
    
    // Add vocabulary and conversation content
    if (categoryId === 'vocabulary') {
      return {
        videos: [
          { id: 1, title: 'Essential Japanese Vocabulary - 1000 Most Common Words', duration: '1:25:30', views: 1850000, rating: 4.9, author: 'JapanesePod101', isPaid: false, youtubeId: 'wD3FJgij79c', thumbnail: 'https://img.youtube.com/vi/wD3FJgij79c/maxresdefault.jpg' },
          { id: 2, title: 'Japanese Vocabulary Memory Techniques', duration: '32:45', views: 920000, rating: 4.8, author: 'Memory Master', isPaid: false, youtubeId: 'CF3MRMBjd20', thumbnail: 'https://img.youtube.com/vi/CF3MRMBjd20/maxresdefault.jpg' },
          { id: 3, title: 'Daily Life Japanese Vocabulary', duration: '28:20', views: 680000, rating: 4.7, author: 'Daily Japanese', isPaid: false, youtubeId: 'FknmUij6ZIk', thumbnail: 'https://img.youtube.com/vi/FknmUij6ZIk/maxresdefault.jpg' },
          { id: 4, title: 'Advanced Vocabulary Building System', duration: '45:15', views: 380000, rating: 4.9, author: 'Vocabulary Expert', isPaid: true, price: '$17.99', youtubeId: 'UHo3qUb79No', thumbnail: 'https://img.youtube.com/vi/UHo3qUb79No/maxresdefault.jpg' }
        ],
        notes: [
          { id: 1, title: 'Core Japanese Vocabulary 2000 Words', pages: 95, downloads: 78000, rating: 4.9, author: 'Core Learning', isPaid: false, url: 'https://www.fluentu.com/blog/japanese/japanese-vocabulary/', description: 'Essential vocabulary for everyday communication' },
          { id: 2, title: 'JLPT Vocabulary Lists N5-N1', pages: 120, downloads: 65000, rating: 4.8, author: 'JLPT Master', isPaid: false, url: 'https://jlptstudy.net/N5/?vocabulary-list', description: 'Complete JLPT vocabulary organized by level' },
          { id: 3, title: 'Japanese Vocabulary Flashcard System', pages: 200, downloads: 45000, rating: 4.7, author: 'Flashcard Pro', isPaid: true, price: '$12.99', url: 'https://example.com/vocab-flashcards', description: 'Interactive digital flashcards with spaced repetition' }
        ]
      }
    }
    
    if (categoryId === 'conversation') {
      return {
        videos: [
          { id: 1, title: 'Japanese Conversation for Beginners - Essential Phrases', duration: '35:20', views: 1450000, rating: 4.8, author: 'Conversation Master', isPaid: false, youtubeId: 'wD3FJgij79c', thumbnail: 'https://img.youtube.com/vi/wD3FJgij79c/maxresdefault.jpg' },
          { id: 2, title: 'Natural Japanese Conversation Practice', duration: '42:15', views: 890000, rating: 4.9, author: 'Native Speaker Pro', isPaid: false, youtubeId: 'CF3MRMBjd20', thumbnail: 'https://img.youtube.com/vi/CF3MRMBjd20/maxresdefault.jpg' },
          { id: 3, title: 'Japanese Pronunciation and Accent Training', duration: '28:45', views: 650000, rating: 4.7, author: 'Pronunciation Sensei', isPaid: false, youtubeId: 'FknmUij6ZIk', thumbnail: 'https://img.youtube.com/vi/FknmUij6ZIk/maxresdefault.jpg' },
          { id: 4, title: 'Advanced Conversation Techniques', duration: '48:30', views: 320000, rating: 4.9, author: 'Advanced Speaker', isPaid: true, price: '$19.99', youtubeId: 'UHo3qUb79No', thumbnail: 'https://img.youtube.com/vi/UHo3qUb79No/maxresdefault.jpg' }
        ],
        notes: [
          { id: 1, title: 'Japanese Conversation Starter Guide', pages: 65, downloads: 52000, rating: 4.8, author: 'Conversation Pro', isPaid: false, url: 'https://www.fluentu.com/blog/japanese/japanese-conversation/', description: 'Essential phrases and expressions for daily conversation' },
          { id: 2, title: 'Situational Conversation Handbook', pages: 85, downloads: 38000, rating: 4.9, author: 'Situation Master', isPaid: false, url: 'https://example.com/situational-conversation', description: 'Conversations for specific situations and contexts' },
          { id: 3, title: 'Advanced Conversation Patterns', pages: 120, downloads: 25000, rating: 4.7, author: 'Pattern Expert', isPaid: true, price: '$16.99', url: 'https://example.com/conversation-patterns', description: 'Complex conversation structures and natural expressions' }
        ]
      }
    }
    
    return contentMap[categoryId] || {
      videos: [
        { id: 1, title: `Complete ${categoryId} Learning Course`, duration: '45:30', views: 25000, rating: 4.8, author: 'KAIRO Sensei', isPaid: false, youtubeId: 'wD3FJgij79c', thumbnail: 'https://img.youtube.com/vi/wD3FJgij79c/maxresdefault.jpg' },
        { id: 2, title: `Advanced ${categoryId} Mastery`, duration: '1:02:45', views: 18000, rating: 4.9, author: 'Expert Teacher', isPaid: true, price: '$19.99', youtubeId: 'CF3MRMBjd20', thumbnail: 'https://img.youtube.com/vi/CF3MRMBjd20/maxresdefault.jpg' },
        { id: 3, title: `${categoryId} Practice and Application`, duration: '35:20', views: 32000, rating: 4.7, author: 'Practice Master', isPaid: false, youtubeId: 'FknmUij6ZIk', thumbnail: 'https://img.youtube.com/vi/FknmUij6ZIk/maxresdefault.jpg' }
      ],
      notes: [
        { id: 1, title: `${categoryId} Complete Study Guide`, pages: 85, downloads: 8200, rating: 4.9, author: 'Study Guide Pro', isPaid: false, url: 'https://example.com/study-guide', description: `Comprehensive ${categoryId} study material with examples` },
        { id: 2, title: `${categoryId} Quick Reference Manual`, pages: 35, downloads: 5800, rating: 4.6, author: 'Reference Team', isPaid: false, url: 'https://example.com/quick-ref', description: `Quick reference and essential ${categoryId} information` },
        { id: 3, title: `${categoryId} Practice Workbook`, pages: 120, downloads: 3950, rating: 4.8, author: 'Exercise Creator', isPaid: true, price: '$12.99', url: 'https://example.com/practice', description: `Comprehensive practice exercises and solutions for ${categoryId}` }
      ]
    }
  }

  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
    setShowSelectionModal(false)
  }

  const requestFilePermission = () => {
    return new Promise((resolve) => {
      // Show permission modal
      const permissionModal = document.createElement('div')
      permissionModal.className = 'fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4'
      permissionModal.innerHTML = `
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6">
          <div class="text-center mb-6">
            <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">File Access Permission</h3>
            <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              KAIRO Learning Center needs access to your device files to upload ${contentType === 'videos' ? 'videos' : 'documents'}. This allows you to share educational content with the community.
            </p>
          </div>
          
          <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
            <div class="flex items-start space-x-3">
              <svg class="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
              </svg>
              <div>
                <h4 class="text-sm font-semibold text-blue-800 dark:text-blue-200">What we'll access:</h4>
                <ul class="text-xs text-blue-700 dark:text-blue-300 mt-1 space-y-1">
                  <li>• Only files you specifically select</li>
                  <li>• ${contentType === 'videos' ? 'Video files (MP4, MOV, AVI)' : 'Document files (PDF, DOC, TXT)'}</li>
                  <li>• No automatic access to other files</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div class="flex space-x-3">
            <button id="deny-permission" class="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium">
              Deny
            </button>
            <button id="allow-permission" class="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-medium">
              Allow Access
            </button>
          </div>
        </div>
      `
      
      document.body.appendChild(permissionModal)
      
      document.getElementById('allow-permission').onclick = () => {
        document.body.removeChild(permissionModal)
        resolve(true)
      }
      
      document.getElementById('deny-permission').onclick = () => {
        document.body.removeChild(permissionModal)
        resolve(false)
      }
    })
  }

  const handleFileUpload = async () => {
    const hasPermission = await requestFilePermission()
    if (hasPermission) {
      document.getElementById('file-upload-input').click()
    }
  }

  const handleFileSelect = (file) => {
    if (!file) return
    
    const maxSize = contentType === 'videos' ? 500 * 1024 * 1024 : 50 * 1024 * 1024 // 500MB for videos, 50MB for docs
    
    if (file.size > maxSize) {
      alert(`File size exceeds ${contentType === 'videos' ? '500MB' : '50MB'} limit`)
      return
    }
    
    setSelectedFile(file)
  }

  const handleFileDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleSubmitUpload = async () => {
    if (!selectedFile) return
    
    setIsUploading(true)
    setUploadProgress(0)
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          setShowUploadModal(false)
          setSelectedFile(null)
          setUploadType('free')
          setCustomPrice('')
          alert('Content uploaded successfully!')
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const UploadModal = () => (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={() => {
        setShowUploadModal(false)
        setUploadType('free')
        setCustomPrice('')
        setSelectedFile(null)
      }}
    >
      <div 
        className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 border border-white/20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Upload {contentType === 'videos' ? 'Video' : 'Notes'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Share your knowledge with the community</p>
          </div>
          <button 
            onClick={() => {
              setShowUploadModal(false)
              setUploadType('free')
              setCustomPrice('')
            }} 
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Content Title</label>
            <input 
              type="text" 
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
              placeholder={`Enter ${contentType === 'videos' ? 'video' : 'document'} title`} 
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Description</label>
            <textarea 
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none" 
              rows="4" 
              placeholder="Describe what learners will gain from this content"
            ></textarea>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Content Access</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setUploadType('free')}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  uploadType === 'free'
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-green-300'
                }`}
              >
                <div className="flex items-center justify-center mb-2">
                  <Gift className={`w-6 h-6 ${uploadType === 'free' ? 'text-green-600' : 'text-gray-400'}`} />
                </div>
                <div className={`text-sm font-medium ${uploadType === 'free' ? 'text-green-700 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}`}>
                  Free Access
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  Available to everyone
                </div>
              </button>
              
              <button
                onClick={() => setUploadType('paid')}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  uploadType === 'paid'
                    ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-yellow-300'
                }`}
              >
                <div className="flex items-center justify-center mb-2">
                  <DollarSign className={`w-6 h-6 ${uploadType === 'paid' ? 'text-yellow-600' : 'text-gray-400'}`} />
                </div>
                <div className={`text-sm font-medium ${uploadType === 'paid' ? 'text-yellow-700 dark:text-yellow-400' : 'text-gray-600 dark:text-gray-400'}`}>
                  Premium Content
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  Paid access only
                </div>
              </button>
            </div>
          </div>
          
          {uploadType === 'paid' && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4 border border-yellow-200 dark:border-yellow-800">
              <label className="block text-sm font-semibold text-yellow-800 dark:text-yellow-300 mb-3">Set Your Price</label>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {['$4.99', '$9.99', '$14.99', '$19.99', '$24.99', '$29.99'].map((price) => (
                  <button
                    key={price}
                    onClick={() => setCustomPrice(price.replace('$', ''))}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      customPrice === price.replace('$', '')
                        ? 'bg-yellow-500 text-white'
                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-yellow-100 dark:hover:bg-yellow-800/30'
                    }`}
                  >
                    {price}
                  </button>
                ))}
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-yellow-700 dark:text-yellow-300">Custom:</span>
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={customPrice}
                    onChange={(e) => setCustomPrice(e.target.value)}
                    className="w-full pl-8 pr-4 py-2 border border-yellow-300 dark:border-yellow-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
              <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-2">
                💡 Recommended: $4.99-$19.99 for most content
              </p>
            </div>
          )}
          
          <div 
            onClick={() => handleFileUpload()}
            onDrop={(e) => handleFileDrop(e)}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer group relative"
          >
            {selectedFile ? (
              <div>
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">✓</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {selectedFile.name}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Size: {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
                <button 
                  onClick={(e) => { e.stopPropagation(); setSelectedFile(null); }}
                  className="text-xs text-red-500 hover:text-red-700 underline"
                >
                  Remove file
                </button>
              </div>
            ) : (
              <div>
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Upload className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Upload Your {contentType === 'videos' ? 'Video' : 'File'}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {contentType === 'videos' 
                    ? 'Supported: MP4, MOV, AVI (Max 500MB)' 
                    : 'Supported: PDF, DOC, DOCX, TXT (Max 50MB)'
                  }
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  Drag and drop or click to browse
                </p>
              </div>
            )}
            
            {isUploading && (
              <div className="absolute inset-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Uploading... {uploadProgress}%</p>
                  <div className="w-48 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            
            <input 
              type="file" 
              id="file-upload-input"
              accept={contentType === 'videos' ? 'video/*' : '.pdf,.doc,.docx,.txt,.ppt,.pptx'}
              onChange={(e) => handleFileSelect(e.target.files[0])}
              className="hidden"
            />
          </div>
          
          <div className="flex space-x-4">
            <button 
              onClick={() => {
                setShowUploadModal(false)
                setUploadType('free')
                setCustomPrice('')
                setSelectedFile(null)
              }} 
              className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
            >
              Cancel
            </button>
            <button 
              onClick={handleSubmitUpload}
              disabled={!selectedFile || isUploading}
              className={`flex-1 px-6 py-3 rounded-xl font-medium shadow-lg transition-all ${
                !selectedFile || isUploading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 hover:shadow-xl'
              } text-white`}
            >
              {isUploading ? 'Uploading...' : uploadType === 'paid' && customPrice ? `Upload for $${customPrice}` : 'Upload Content'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-purple-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-8xl text-gray-800 dark:text-white transition-transform duration-300" style={{ transform: `translateY(${scrollY * 0.3}px)` }}>学</div>
        <div className="absolute top-32 right-20 text-6xl text-blue-600 dark:text-blue-300 transition-transform duration-300" style={{ transform: `translateY(${scrollY * -0.2}px)` }}>習</div>
        <div className="absolute bottom-40 left-1/4 text-7xl text-purple-600 dark:text-purple-300 transition-transform duration-300" style={{ transform: `translateY(${scrollY * 0.4}px)` }}>📚</div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Learning Center 📚
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Master Japanese and excel in competitive exams</p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id)
                  setSelectedCategory(null)
                }}
                className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? `bg-gradient-to-r ${tab.color} text-white shadow-lg scale-105`
                    : 'bg-white/70 dark:bg-gray-800/70 text-gray-700 dark:text-gray-300 hover:shadow-md'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Grid */}
        {!selectedCategory ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories[activeTab]?.map((category) => (
              <div
                key={category.id}
                onClick={() => handleCategorySelect(category)}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl p-6 border border-white/20 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 text-2xl">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{category.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{category.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Content View */
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl p-8 border border-white/20 dark:border-gray-700/50">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <button onClick={() => setSelectedCategory(null)} className="mr-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                  ←
                </button>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedCategory.name}</h2>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                  <button
                    onClick={() => setContentType('videos')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      contentType === 'videos' ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow' : 'text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    <Video className="w-4 h-4 mr-2 inline" />
                    Videos
                  </button>
                  <button
                    onClick={() => setContentType('notes')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      contentType === 'notes' ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow' : 'text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    <FileText className="w-4 h-4 mr-2 inline" />
                    Notes
                  </button>
                </div>
                
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all flex items-center"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload {contentType === 'videos' ? 'Video' : 'Notes'}
                </button>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getContentForCategory(selectedCategory.id)[contentType].map((item) => (
                <div key={item.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl overflow-hidden hover:shadow-lg transition-all">
                  {contentType === 'videos' ? (
                    <>
                      <div className="relative">
                        <img src={item.thumbnail} alt={item.title} className="w-full h-40 object-cover" />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer" onClick={() => window.open(`https://www.youtube.com/watch?v=${item.youtubeId}`, '_blank')}>
                          <div className="bg-red-600 rounded-full p-3">
                            <Play className="w-8 h-8 text-white" />
                          </div>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          {item.duration}
                        </div>
                        {item.isPaid && (
                          <div className="absolute top-2 left-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg">
                            💎 {item.price}
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">by {item.author}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                          <div className="flex items-center">
                            <Eye className="w-3 h-3 mr-1" />
                            {item.views}
                          </div>
                          <div className="flex items-center">
                            <Star className="w-3 h-3 mr-1 text-yellow-500" />
                            {item.rating}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                        {item.isPaid && (
                          <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg">
                            💎 {item.price}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{item.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
                        <span>{item.pages} pages</span>
                        <div className="flex items-center">
                          <Download className="w-3 h-3 mr-1" />
                          {item.downloads}
                        </div>
                        <div className="flex items-center">
                          <Star className="w-3 h-3 mr-1 text-yellow-500" />
                          {item.rating}
                        </div>
                      </div>
                      <button 
                        onClick={() => window.open(item.url, '_blank')}
                        className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all"
                      >
                        View Resource
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {showUploadModal && <UploadModal />}
    </div>
  )
}

export default Learning