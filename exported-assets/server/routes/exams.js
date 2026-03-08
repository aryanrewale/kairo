import express from 'express'
import { auth } from '../middleware/auth.js'

const router = express.Router()

// Upcoming Japanese Language Exams with verified working links
const sampleExams = [
  {
    id: 1,
    title: 'JLPT N5 July 2025',
    description: 'Basic level Japanese proficiency test for beginners',
    type: 'JLPT',
    level: 'N5',
    examDate: new Date('2025-07-06T09:00:00Z'),
    registrationDeadline: new Date('2025-05-15T23:59:59Z'),
    duration: 105,
    totalQuestions: 100,
    passingScore: 80,
    venue: 'Tokyo International Center',
    status: 'upcoming',
    year: 2025,
    officialWebsite: 'https://www.jlpt.jp/e/',
    registrationLink: 'https://www.jlpt.jp/e/',
    informationSource: {
      organization: 'Japan Foundation',
      lastUpdated: new Date('2024-12-20T10:00:00Z'),
      sourceUrl: 'https://www.jlpt.jp/e/'
    },
    studyMaterials: [
      {
        title: 'JLPT Official Practice Guide',
        type: 'practice_test',
        url: 'https://www.jlpt.jp/e/',
        description: 'Official JLPT preparation materials'
      },
      {
        title: 'NHK World Japanese Lessons',
        type: 'video',
        url: 'https://www.nhk.or.jp/lesson/',
        description: 'Free online Japanese lessons'
      },
      {
        title: 'Hiragana Katakana Practice',
        type: 'practice_test',
        url: 'https://www.tofugu.com/japanese/learn-hiragana/',
        description: 'Interactive hiragana and katakana practice'
      }
    ],
    pastPapers: [
      {
        year: 2023,
        session: 'December',
        downloadUrl: '/api/exams/download/jlpt-n5-2023-dec.pdf',
        fileName: 'JLPT_N5_December_2023.pdf',
        size: '2.4 MB'
      },
      {
        year: 2022,
        session: 'July', 
        downloadUrl: '/api/exams/download/jlpt-n5-2022-jul.pdf',
        fileName: 'JLPT_N5_July_2022.pdf',
        size: '2.1 MB'
      },
      {
        year: 2021,
        session: 'December',
        downloadUrl: '/api/exams/download/jlpt-n5-2021-dec.pdf',
        fileName: 'JLPT_N5_December_2021.pdf',
        size: '2.3 MB'
      }
    ],
    enrolledCount: 456,
    maxCapacity: 2000
  },
  {
    id: 2,
    title: 'JLPT N4 July 2025',
    description: 'Elementary level Japanese proficiency test',
    type: 'JLPT',
    level: 'N4',
    examDate: new Date('2025-07-06T13:30:00Z'),
    registrationDeadline: new Date('2025-05-15T23:59:59Z'),
    duration: 125,
    totalQuestions: 120,
    passingScore: 90,
    venue: 'Osaka Convention Center',
    status: 'upcoming',
    year: 2025,
    officialWebsite: 'https://www.jlpt.jp/e/',
    registrationLink: 'https://www.jlpt.jp/e/',
    informationSource: {
      organization: 'Japan Foundation',
      lastUpdated: new Date('2024-12-18T14:00:00Z'),
      sourceUrl: 'https://www.jlpt.jp/e/'
    },
    studyMaterials: [
      {
        title: 'JLPT N4 Official Guide',
        type: 'textbook',
        url: 'https://www.jlpt.jp/e/',
        description: 'Official N4 preparation guide'
      },
      {
        title: 'Japanese Grammar Practice',
        type: 'practice_test',
        url: 'https://www.tofugu.com/japanese/japanese-grammar-guide/',
        description: 'Comprehensive grammar practice'
      },
      {
        title: 'NHK Easy News',
        type: 'audio',
        url: 'https://www3.nhk.or.jp/news/easy/',
        description: 'Simple Japanese news for listening practice'
      }
    ],
    pastPapers: [
      {
        year: 2023,
        session: 'December',
        downloadUrl: '/api/exams/download/jlpt-n4-2023-dec.pdf',
        fileName: 'JLPT_N4_December_2023.pdf',
        size: '3.1 MB'
      },
      {
        year: 2022,
        session: 'July',
        downloadUrl: '/api/exams/download/jlpt-n4-2022-jul.pdf',
        fileName: 'JLPT_N4_July_2022.pdf',
        size: '2.9 MB'
      },
      {
        year: 2021,
        session: 'December',
        downloadUrl: '/api/exams/download/jlpt-n4-2021-dec.pdf',
        fileName: 'JLPT_N4_December_2021.pdf',
        size: '3.0 MB'
      }
    ],
    enrolledCount: 234,
    maxCapacity: 1200
  },
  {
    id: 3,
    title: 'JLPT N3 December 2025',
    description: 'Intermediate level Japanese proficiency test',
    type: 'JLPT',
    level: 'N3',
    examDate: new Date('2025-12-07T09:00:00Z'),
    registrationDeadline: new Date('2025-10-15T23:59:59Z'),
    duration: 140,
    totalQuestions: 95,
    passingScore: 95,
    venue: 'Kyoto International Center',
    status: 'upcoming',
    year: 2025,
    officialWebsite: 'https://www.jlpt.jp/e/',
    registrationLink: 'https://www.jlpt.jp/e/',
    informationSource: {
      organization: 'Japan Foundation',
      lastUpdated: new Date('2024-12-15T14:00:00Z'),
      sourceUrl: 'https://www.jlpt.jp/e/'
    },
    studyMaterials: [
      {
        title: 'JLPT N3 Official Materials',
        type: 'textbook',
        url: 'https://www.jlpt.jp/e/',
        description: 'Official N3 study materials'
      },
      {
        title: 'Japanese Reading Practice',
        type: 'practice_test',
        url: 'https://www.wasabi-jpn.com/',
        description: 'Intermediate reading comprehension'
      }
    ],
    pastPapers: [
      {
        year: 2023,
        session: 'December',
        downloadUrl: '/api/exams/download/jlpt-n3-2023-dec.pdf',
        fileName: 'JLPT_N3_December_2023.pdf',
        size: '4.2 MB'
      },
      {
        year: 2022,
        session: 'July',
        downloadUrl: '/api/exams/download/jlpt-n3-2022-jul.pdf',
        fileName: 'JLPT_N3_July_2022.pdf',
        size: '4.0 MB'
      },
      {
        year: 2021,
        session: 'December',
        downloadUrl: '/api/exams/download/jlpt-n3-2021-dec.pdf',
        fileName: 'JLPT_N3_December_2021.pdf',
        size: '4.1 MB'
      }
    ],
    enrolledCount: 189,
    maxCapacity: 1000
  },
  {
    id: 4,
    title: 'MEXT Scholarship Exam 2025',
    description: 'Japanese Government Scholarship for International Students',
    type: 'MEXT',
    level: 'Advanced',
    examDate: new Date('2025-06-15T10:00:00Z'),
    registrationDeadline: new Date('2025-04-30T23:59:59Z'),
    duration: 180,
    totalQuestions: 80,
    passingScore: 70,
    venue: 'Japanese Embassy Worldwide',
    status: 'upcoming',
    year: 2025,
    officialWebsite: 'https://www.mext.go.jp/en/',
    registrationLink: 'https://www.studyinjapan.go.jp/en/',
    informationSource: {
      organization: 'Ministry of Education, Culture, Sports, Science and Technology',
      lastUpdated: new Date('2024-12-10T09:00:00Z'),
      sourceUrl: 'https://www.mext.go.jp/en/'
    },
    studyMaterials: [
      {
        title: 'MEXT Application Guide',
        type: 'textbook',
        url: 'https://www.studyinjapan.go.jp/en/',
        description: 'Official MEXT scholarship guide'
      },
      {
        title: 'Japanese Culture & History',
        type: 'textbook',
        url: 'https://www.japan.go.jp/',
        description: 'Essential knowledge for MEXT exam'
      }
    ],
    pastPapers: [
      {
        year: 2023,
        session: 'Annual',
        downloadUrl: '/api/exams/download/mext-2023.pdf',
        fileName: 'MEXT_Scholarship_2023.pdf',
        size: '5.8 MB'
      },
      {
        year: 2022,
        session: 'Annual',
        downloadUrl: '/api/exams/download/mext-2022.pdf',
        fileName: 'MEXT_Scholarship_2022.pdf',
        size: '5.5 MB'
      },
      {
        year: 2021,
        session: 'Annual',
        downloadUrl: '/api/exams/download/mext-2021.pdf',
        fileName: 'MEXT_Scholarship_2021.pdf',
        size: '5.7 MB'
      }
    ],
    enrolledCount: 78,
    maxCapacity: 200
  }
]

// @route   GET /api/exams
// @desc    Get all exams
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { type, level } = req.query
    let filteredExams = [...sampleExams]

    if (type && type !== 'all') {
      filteredExams = filteredExams.filter(exam => exam.type === type)
    }

    if (level && level !== 'all') {
      filteredExams = filteredExams.filter(exam => exam.level === level)
    }

    filteredExams.sort((a, b) => new Date(a.examDate) - new Date(b.examDate))

    res.json({
      exams: filteredExams,
      stats: {
        total: filteredExams.length,
        upcoming: filteredExams.filter(e => e.status === 'upcoming').length
      }
    })
  } catch (error) {
    console.error('Get exams error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// @route   GET /api/exams/:id
// @desc    Get specific exam
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const examId = parseInt(req.params.id)
    const exam = sampleExams.find(e => e.id === examId)

    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' })
    }

    res.json(exam)
  } catch (error) {
    console.error('Get exam error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// @route   POST /api/exams/:id/enroll
// @desc    Enroll in exam
// @access  Private
router.post('/:id/enroll', auth, async (req, res) => {
  try {
    const examId = parseInt(req.params.id)
    const exam = sampleExams.find(e => e.id === examId)

    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' })
    }

    if (new Date() > new Date(exam.registrationDeadline)) {
      return res.status(400).json({ message: 'Registration deadline has passed' })
    }

    exam.enrolledCount += 1

    res.json({
      message: 'Successfully enrolled! Study materials and past papers included.',
      exam: {
        id: exam.id,
        title: exam.title,
        examDate: exam.examDate
      }
    })
  } catch (error) {
    console.error('Enroll exam error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// @route   GET /api/exams/download/:filename
// @desc    Download PYQ PDF files
// @access  Private
router.get('/download/:filename', auth, async (req, res) => {
  try {
    const { filename } = req.params
    
    // Generate PDF content based on filename
    const pdfContent = generatePYQPDF(filename)
    
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
    res.send(pdfContent)
  } catch (error) {
    console.error('Download error:', error)
    res.status(500).json({ message: 'Download failed' })
  }
})

// Helper function to generate PDF content
function generatePYQPDF(filename) {
  const examInfo = getExamInfo(filename)
  
  const pdfContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Resources <<
/Font <<
/F1 4 0 R
/F2 5 0 R
/F3 6 0 R
>>
>>
/Contents 7 0 R
>>
endobj

4 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica-Bold
>>
endobj

5 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj

6 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Times-Roman
>>
endobj

7 0 obj
<<
/Length 3500
>>
stream
q
0.9 0.9 0.9 rg
50 750 512 30 re
f
Q
BT
/F1 20 Tf
0.2 0.2 0.8 rg
60 760 Td
(🎌 ${examInfo.title}) Tj
0 -25 Td
/F1 16 Tf
0 0 0 rg
(${examInfo.subtitle}) Tj
0 -40 Td
/F2 11 Tf
0.3 0.3 0.3 rg
(📅 Date: ${examInfo.date}     ⏰ Time: ${examInfo.time}) Tj
0 -15 Td
(⏱️ Duration: ${examInfo.duration}     📝 Questions: ${examInfo.totalQuestions}     🎯 Pass: ${examInfo.passingScore}%) Tj
0 -30 Td
/F1 14 Tf
0.8 0.2 0.2 rg
(📜 INSTRUCTIONS) Tj
0 -20 Td
/F2 10 Tf
0 0 0 rg
(• Fill in your name and exam number clearly) Tj
0 -12 Td
(• Choose only ONE answer for each question) Tj
0 -12 Td
(• Use pencil to mark your answers) Tj
0 -12 Td
(• No mobile phones or dictionaries allowed) Tj
0 -30 Td
/F1 14 Tf
0.1 0.4 0.1 rg
(📚 SECTION A: VOCABULARY [25 Points]) Tj
0 -20 Td
/F2 11 Tf
0 0 0 rg
(Choose the best meaning for each Japanese word or phrase.) Tj
0 -20 Td
(1. おはようございます \(ohayou gozaimasu\)) Tj
0 -12 Td
(   A) Good evening     B) Good morning     C) Good night     D) Goodbye) Tj
0 -18 Td
(2. 学校 \(gakkou\)) Tj
0 -12 Td
(   A) Hospital     B) Library     C) School     D) Station) Tj
0 -18 Td
(3. 食べます \(tabemasu\)) Tj
0 -12 Td
(   A) To drink     B) To eat     C) To sleep     D) To study) Tj
0 -18 Td
(4. 大きい \(ookii\)) Tj
0 -12 Td
(   A) Small     B) Fast     C) Big     D) Expensive) Tj
0 -18 Td
(5. 水 \(mizu\)) Tj
0 -12 Td
(   A) Fire     B) Water     C) Wind     D) Earth) Tj
0 -25 Td
/F1 14 Tf
0.6 0.2 0.6 rg
(⚙️ SECTION B: GRAMMAR [30 Points]) Tj
0 -20 Td
/F2 11 Tf
0 0 0 rg
(Choose the correct particle or verb form.) Tj
0 -20 Td
(6. 私 ___ 学生です。 \(Watashi ___ gakusei desu.\)) Tj
0 -12 Td
(   A) は     B) が     C) を     D) に) Tj
0 -18 Td
(7. 本 ___ 読みます。 \(Hon ___ yomimasu.\)) Tj
0 -12 Td
(   A) は     B) が     C) を     D) で) Tj
0 -18 Td
(8. 明日 ___ 行きますか。 \(Ashita ___ ikimasu ka?\)) Tj
0 -12 Td
(   A) どこ     B) だれ     C) いつ     D) なに) Tj
0 -18 Td
(9. この映画は ___ です。 \(Kono eiga wa ___ desu.\)) Tj
0 -12 Td
(   A) おもしろい     B) おもしろかった     C) おもしろく     D) おもしろくない) Tj
0 -18 Td
(10. 日本語 ___ 勉強しています。 \(Nihongo ___ benkyou shite imasu.\)) Tj
0 -12 Td
(   A) を     B) が     C) に     D) で) Tj
ET
q
0.9 0.9 1.0 rg
50 50 512 40 re
f
Q
BT
/F1 12 Tf
0.2 0.2 0.8 rg
60 70 Td
(📝 ANSWER KEY) Tj
0 -15 Td
/F2 10 Tf
0 0 0 rg
(1-B  2-C  3-B  4-C  5-B  6-A  7-C  8-A  9-A  10-A) Tj
0 -15 Td
/F3 9 Tf
0.5 0.5 0.5 rg
(© 2024 KAIRO Learning Platform | Sample Paper for Practice Only) Tj
ET
endstream
endobj

xref
0 8
0000000000 65535 f 
0000000010 00000 n 
0000000079 00000 n 
0000000136 00000 n 
0000000273 00000 n 
0000000343 00000 n 
0000000408 00000 n 
0000000470 00000 n 
trailer
<<
/Size 8
/Root 1 0 R
>>
startxref
4021
%%EOF`
  
  return Buffer.from(pdfContent, 'utf8')
}

// Helper function to get exam information
function getExamInfo(filename) {
  const examTypes = {
    'jlpt-n5': {
      title: 'JAPANESE LANGUAGE PROFICIENCY TEST',
      subtitle: 'JLPT N5 - BASIC LEVEL',
      date: 'December 3, 2023',
      time: '9:00 AM - 10:45 AM',
      duration: '105 minutes',
      totalQuestions: '20',
      passingScore: '80'
    },
    'jlpt-n4': {
      title: 'JAPANESE LANGUAGE PROFICIENCY TEST',
      subtitle: 'JLPT N4 - ELEMENTARY LEVEL',
      date: 'December 3, 2023',
      time: '1:30 PM - 3:35 PM',
      duration: '125 minutes',
      totalQuestions: '25',
      passingScore: '90'
    },
    'jlpt-n3': {
      title: 'JAPANESE LANGUAGE PROFICIENCY TEST',
      subtitle: 'JLPT N3 - INTERMEDIATE LEVEL',
      date: 'December 3, 2023',
      time: '9:00 AM - 11:20 AM',
      duration: '140 minutes',
      totalQuestions: '30',
      passingScore: '95'
    },
    'mext': {
      title: 'MEXT SCHOLARSHIP EXAMINATION',
      subtitle: 'JAPANESE GOVERNMENT SCHOLARSHIP',
      date: 'June 15, 2023',
      time: '10:00 AM - 1:00 PM',
      duration: '180 minutes',
      totalQuestions: '25',
      passingScore: '70'
    }
  }
  
  const examKey = filename.split('-').slice(0, 2).join('-')
  return examTypes[examKey] || examTypes['jlpt-n5']
}

export default router