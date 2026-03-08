import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, Star, Sparkles, Brain, Users, Trophy, Zap, Shield, CreditCard, Clock, ArrowRight, Play, ChevronUp } from 'lucide-react'

const Services = () => {
  const [selectedPlan, setSelectedPlan] = useState('premium')
  const { user } = useAuth()
  const navigate = useNavigate()
  const [scrollY, setScrollY] = useState(0)
  const [scrollDirection, setScrollDirection] = useState('down')
  const [lastScrollY, setLastScrollY] = useState(0)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollDirection(currentScrollY > lastScrollY ? 'down' : 'up')
      setScrollY(currentScrollY)
      setLastScrollY(currentScrollY)
      setShowScrollTop(currentScrollY > 300)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handlePlanSelect = (planId) => {
    if (planId === 'free') {
      navigate('/login')
    } else {
      // Handle other plans (premium, pro)
      alert(`Selected ${planId} plan. This would normally redirect to checkout.`)
    }
  }

  const plans = [
    {
      id: 'free',
      name: 'はじめて',
      subtitle: 'Hajimete (Beginner)',
      price: 0,
      period: 'Forever Free',
      description: 'Perfect for trying out Japanese learning',
      features: [
        '500 basic vocabulary cards',
        'Hiragana & Katakana practice',
        'Basic grammar lessons',
        'Community access'
      ],
      cta: 'Start Learning',
      popular: false
    },
    {
      id: 'premium',
      name: '上達',
      subtitle: 'Jōtatsu (Progress)',
      price: 19,
      period: 'per month',
      description: 'Comprehensive learning with AI assistance',
      features: [
        '5000+ vocabulary with audio',
        'AI-powered conversation practice',
        'JLPT N5-N1 preparation',
        'Kanji stroke order practice',
        'Grammar explanations & examples',
        'Custom profile photo upload',
        'Offline mode & mobile app'
      ],
      cta: 'Start 7-Day Trial',
      popular: true
    },
    {
      id: 'pro',
      name: '達人',
      subtitle: 'Tatsujin (Master)',
      price: 49,
      period: 'per month',
      description: 'Advanced features for serious learners',
      features: [
        'Everything in 上達 plan',
        '2 live tutoring sessions/month',
        'Business Japanese content',
        'Cultural context lessons',
        'Pronunciation analysis',
        'Custom profile photo upload',
        'Custom learning paths'
      ],
      cta: 'Go Pro',
      popular: false
    }
  ]

  const features = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: 'AI-Powered Learning',
      description: 'Personalized lessons that adapt to your learning style and pace'
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: 'Interactive Practice',
      description: 'Engaging exercises with real-time feedback and corrections'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Live Tutoring',
      description: 'Connect with native speakers for authentic conversation practice'
    },
    {
      icon: <Trophy className="h-8 w-8" />,
      title: 'JLPT Preparation',
      description: 'Comprehensive test prep for all JLPT levels N5 through N1'
    }
  ]

  const testimonials = [
    {
      name: 'Alex Thompson',
      level: 'N3 → N1 in 8 months',
      content: 'KAIRO\'s AI tutor helped me pass JLPT N1. The conversation practice was incredibly realistic.',
      avatar: '👨‍💼'
    },
    {
      name: 'Maria Santos',
      level: 'Complete beginner → N4',
      content: 'Started from zero and now I can have basic conversations. The kanji practice is amazing!',
      avatar: '👩‍🎓'
    },
    {
      name: 'David Kim',
      level: 'Business Japanese fluent',
      content: 'The business Japanese content helped me land a job in Tokyo. Worth every penny!',
      avatar: '👨‍💻'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-purple-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute top-10 left-10 text-8xl text-gray-800 dark:text-white transition-transform duration-300 ease-out"
          style={{
            transform: `translateY(${scrollY * 0.3}px) rotate(${scrollDirection === 'down' ? scrollY * 0.1 : -scrollY * 0.1}deg)`
          }}
        >
          漢
        </div>
        <div 
          className="absolute top-32 right-20 text-6xl text-blue-600 dark:text-blue-300 transition-transform duration-300 ease-out"
          style={{
            transform: `translateY(${scrollY * -0.2}px) rotate(${scrollDirection === 'down' ? -scrollY * 0.05 : scrollY * 0.05}deg)`
          }}
        >
          字
        </div>
        <div 
          className="absolute bottom-40 left-1/4 text-7xl text-purple-600 dark:text-purple-300 transition-transform duration-300 ease-out"
          style={{
            transform: `translateY(${scrollY * 0.4}px) rotate(${scrollDirection === 'down' ? scrollY * 0.08 : -scrollY * 0.08}deg)`
          }}
        >
          あ
        </div>
        <div 
          className="absolute bottom-20 right-1/3 text-5xl text-pink-600 dark:text-pink-300 transition-transform duration-300 ease-out"
          style={{
            transform: `translateY(${scrollY * -0.3}px) rotate(${scrollDirection === 'down' ? -scrollY * 0.06 : scrollY * 0.06}deg)`
          }}
        >
          カ
        </div>
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-9xl text-cyan-600 dark:text-cyan-300 transition-transform duration-300 ease-out"
          style={{
            transform: `translate(-50%, -50%) translateY(${scrollY * 0.2}px) rotate(${scrollDirection === 'down' ? scrollY * 0.05 : -scrollY * 0.05}deg)`
          }}
        >
          🎌
        </div>
        
        {/* Floating KAIRO Logo */}
        <div 
          className="absolute top-10 right-10 opacity-20 dark:opacity-30 transition-all duration-500 ease-out"
          style={{
            transform: `translateY(${scrollY * (scrollDirection === 'down' ? 0.3 : -0.3)}px) scale(${1 + scrollY * 0.0005}) rotate(${scrollDirection === 'down' ? scrollY * 0.08 : -scrollY * 0.08}deg)`
          }}
        >
          <div className="text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            KAIRØ
          </div>
        </div>
      </div>
      <div className="absolute inset-0">
        <div 
          className="floating-sakura sakura-1 transition-transform duration-300 ease-out"
          style={{
            transform: `translateY(${scrollY * 0.15}px) rotate(${scrollDirection === 'down' ? scrollY * 0.03 : -scrollY * 0.03}deg)`
          }}
        >
          🌸
        </div>
        <div 
          className="floating-sakura sakura-2 transition-transform duration-300 ease-out"
          style={{
            transform: `translateY(${scrollY * -0.1}px) rotate(${scrollDirection === 'down' ? -scrollY * 0.04 : scrollY * 0.04}deg)`
          }}
        >
          🌸
        </div>
        <div 
          className="floating-sakura sakura-3 transition-transform duration-300 ease-out"
          style={{
            transform: `translateY(${scrollY * 0.2}px) rotate(${scrollDirection === 'down' ? scrollY * 0.05 : -scrollY * 0.05}deg)`
          }}
        >
          🌸
        </div>
        <div 
          className="floating-sakura sakura-4 transition-transform duration-300 ease-out"
          style={{
            transform: `translateY(${scrollY * -0.18}px) rotate(${scrollDirection === 'down' ? -scrollY * 0.02 : scrollY * 0.02}deg)`
          }}
        >
          🌸
        </div>
      </div>
      <style>{`
        .floating-sakura {
          position: absolute;
          font-size: 2rem;
          animation: sakuraFloat 15s ease-in-out infinite;
        }
        .sakura-1 { top: 20%; left: 15%; animation-delay: 0s; }
        .sakura-2 { top: 60%; right: 20%; animation-delay: 3s; }
        .sakura-3 { bottom: 30%; left: 25%; animation-delay: 6s; }
        .sakura-4 { bottom: 70%; right: 15%; animation-delay: 9s; }
        @keyframes sakuraFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          25% { transform: translateY(-20px) rotate(90deg); opacity: 0.7; }
          50% { transform: translateY(-40px) rotate(180deg); opacity: 1; }
          75% { transform: translateY(-20px) rotate(270deg); opacity: 0.7; }
        }
      `}</style>
      
      {/* Pricing Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Choose Your Learning Path
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Start free, upgrade when you're ready
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 cursor-pointer ${
                plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {plan.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {plan.subtitle}
                </p>
                
                <div className="mb-4">
                  <span className="text-5xl font-black text-gray-900 dark:text-white">
                    ${plan.price}
                  </span>
                  <span className="text-gray-600 dark:text-gray-300 ml-2">
                    {plan.period}
                  </span>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300">
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handlePlanSelect(plan.id)}
                className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                  plan.popular
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Payment Security */}
        <div className="mt-16 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-sm text-gray-600 dark:text-gray-300">
            <div className="group relative flex flex-col items-center space-y-2 p-4 rounded-xl hover:bg-white/80 dark:hover:bg-gray-700/80 transition-all duration-300 cursor-pointer">
              <Shield className="h-6 w-6 text-green-500 group-hover:scale-110 transition-transform" />
              <span className="font-medium">SSL Encrypted</span>
              <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 bg-gradient-to-br from-green-600 to-green-700 text-white text-xs px-4 py-3 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 w-72 z-20 border border-green-500">
                <div className="flex items-center mb-2">
                  <Shield className="h-4 w-4 mr-2 text-green-200" />
                  <span className="font-bold text-green-100">Bank-Level Security</span>
                </div>
                <div className="space-y-1 text-green-50">
                  <div>✓ 256-bit SSL encryption</div>
                  <div>✓ Same security as online banking</div>
                  <div>✓ Data encrypted in transit and at rest</div>
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-6 border-transparent border-t-green-600"></div>
              </div>
            </div>
            
            <div className="group relative flex flex-col items-center space-y-2 p-4 rounded-xl hover:bg-white/80 dark:hover:bg-gray-700/80 transition-all duration-300 cursor-pointer">
              <CreditCard className="h-6 w-6 text-blue-500 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Secure Payments</span>
              <div className="absolute -top-28 left-1/2 transform -translate-x-1/2 bg-gradient-to-br from-blue-600 to-blue-700 text-white text-xs px-4 py-3 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 w-72 z-20 border border-blue-500">
                <div className="flex items-center mb-2">
                  <CreditCard className="h-4 w-4 mr-2 text-blue-200" />
                  <span className="font-bold text-blue-100">Industry Standard Security</span>
                </div>
                <div className="space-y-1 text-blue-50">
                  <div>✓ PCI DSS Level 1 compliant</div>
                  <div>✓ Visa, MasterCard, Amex accepted</div>
                  <div>✓ Fraud protection included</div>
                  <div>✓ Never store card details</div>
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-6 border-transparent border-t-blue-600"></div>
              </div>
            </div>
            
            <div className="group relative flex flex-col items-center space-y-2 p-4 rounded-xl hover:bg-white/80 dark:hover:bg-gray-700/80 transition-all duration-300 cursor-pointer">
              <Clock className="h-6 w-6 text-purple-500 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Cancel Anytime</span>
              <div className="absolute -top-28 left-1/2 transform -translate-x-1/2 bg-gradient-to-br from-purple-600 to-purple-700 text-white text-xs px-4 py-3 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 w-72 z-20 border border-purple-500">
                <div className="flex items-center mb-2">
                  <Clock className="h-4 w-4 mr-2 text-purple-200" />
                  <span className="font-bold text-purple-100">Complete Flexibility</span>
                </div>
                <div className="space-y-1 text-purple-50">
                  <div>✓ Cancel with 1-click</div>
                  <div>✓ No hidden fees</div>
                  <div>✓ No long-term contracts</div>
                  <div>✓ Prorated refunds available</div>
                  <div>✓ Pause subscription option</div>
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-6 border-transparent border-t-purple-600"></div>
              </div>
            </div>
            
            <div className="group relative flex flex-col items-center space-y-2 p-4 rounded-xl hover:bg-white/80 dark:hover:bg-gray-700/80 transition-all duration-300 cursor-pointer">
              <Zap className="h-6 w-6 text-yellow-500 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Instant Access</span>
              <div className="absolute -top-28 left-1/2 transform -translate-x-1/2 bg-gradient-to-br from-yellow-500 to-orange-600 text-white text-xs px-4 py-3 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 w-72 z-20 border border-yellow-400">
                <div className="flex items-center mb-2">
                  <Zap className="h-4 w-4 mr-2 text-yellow-200" />
                  <span className="font-bold text-yellow-100">Immediate Access</span>
                </div>
                <div className="space-y-1 text-yellow-50">
                  <div>✓ No waiting periods</div>
                  <div>✓ Instant account activation</div>
                  <div>✓ Download mobile app immediately</div>
                  <div>✓ All features unlocked instantly</div>
                  <div>✓ 24/7 availability</div>
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-6 border-transparent border-t-yellow-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Success Stories
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Real results from real learners
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 cursor-pointer hover:bg-white/90 dark:hover:bg-gray-800/90">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3 group-hover:scale-110 transition-transform duration-300">{testimonial.avatar}</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                    {testimonial.level}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                "{testimonial.content}"
              </p>
              <div className="flex mt-4 group-hover:scale-110 transition-transform duration-300">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current hover:text-yellow-500 transition-colors" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-pulse"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Start Your Japanese Journey?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join 100,000+ learners mastering Japanese with KAIRO
            </p>
            <div className="flex flex-col items-center gap-6">
              <button 
                onClick={() => navigate('/login')}
                className="group bg-white text-blue-600 px-12 py-5 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-110 hover:shadow-2xl flex items-center space-x-3"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="flex flex-col sm:flex-row items-center gap-4 text-sm opacity-75">
                <span>✓ No credit card required</span>
                <span className="hidden sm:block">•</span>
                <span>✓ 7-day free trial</span>
                <span className="hidden sm:block">•</span>
                <span>✓ Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-50 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center transform ${
          showScrollTop ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}
        style={{
          transitionDuration: showScrollTop ? '0.3s' : '0.2s',
          transitionTimingFunction: showScrollTop ? 'cubic-bezier(0.34, 1.56, 0.64, 1)' : 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }}
        aria-label="Scroll to top"
      >
        <ChevronUp className="h-6 w-6" />
      </button>
    </div>
  )
}

export default Services
