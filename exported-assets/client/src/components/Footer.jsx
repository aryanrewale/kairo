import { Link, useLocation } from 'react-router-dom'

const Footer = () => {
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  const isServicesPage = location.pathname === '/services'
  const currentYear = new Date().getFullYear()

  // Simple copyright footer for non-home pages
  if (!isHomePage) {
    return (
      <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {currentYear} KAIRØ. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-purple-900 border-t border-gray-200 dark:border-gray-700">
      {/* Animated Background - Only on Home Page */}
      {isHomePage && (
        <>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 text-8xl text-gray-800 dark:text-white animate-pulse">漢</div>
            <div className="absolute top-32 right-20 text-6xl text-blue-600 dark:text-blue-300 animate-pulse" style={{animationDelay: '1s'}}>字</div>
            <div className="absolute bottom-40 left-1/4 text-7xl text-purple-600 dark:text-purple-300 animate-pulse" style={{animationDelay: '2s'}}>あ</div>
            <div className="absolute bottom-20 right-1/3 text-5xl text-pink-600 dark:text-pink-300 animate-pulse" style={{animationDelay: '3s'}}>カ</div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-9xl text-cyan-600 dark:text-cyan-300 animate-pulse" style={{animationDelay: '4s'}}>🎌</div>
          </div>
          <div className="absolute inset-0">
            <div className="floating-sakura sakura-1">🌸</div>
            <div className="floating-sakura sakura-2">🌸</div>
            <div className="floating-sakura sakura-3">🌸</div>
            <div className="floating-sakura sakura-4">🌸</div>
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
        </>
      )}
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                KAIRØ
              </span>
              <span className="text-xl">🎌</span>
            </div>
            <p className="mb-4 max-w-md text-gray-600 dark:text-gray-400">
              Master Japanese language with our comprehensive learning platform. 
              From flashcards to live chat exchanges, we make learning Japanese engaging and effective.
            </p>
            <div className="flex space-x-4">
              <a href="#" className={`transition-colors ${isHomePage ? 'text-gray-300 hover:text-white' : 'text-gray-400 hover:text-primary-600 dark:hover:text-primary-400'}`}>
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C8.396 0 7.989.013 6.756.072 5.526.13 4.718.333 4.015.63a5.82 5.82 0 00-2.105 1.37A5.82 5.82 0 00.63 4.015C.333 4.718.131 5.526.072 6.756.013 7.989 0 8.396 0 12.017c0 3.624.013 4.09.072 5.321.058 1.23.26 2.038.558 2.741.306.7.717 1.304 1.37 2.105.802.802 1.405 1.064 2.105 1.37.703.297 1.511.499 2.741.558C7.989 23.988 8.396 24 12.017 24c3.624 0 4.09-.013 5.321-.072 1.23-.058 2.038-.26 2.741-.558a5.82 5.82 0 002.105-1.37A5.82 5.82 0 0023.37 19.759c.297-.703.499-1.511.558-2.741.059-1.23.072-1.697.072-5.321 0-3.624-.013-4.09-.072-5.321-.058-1.23-.26-2.038-.558-2.741a5.82 5.82 0 00-1.37-2.105A5.82 5.82 0 0019.759.63c-.703-.297-1.511-.499-2.741-.558C16.09.013 15.624.001 12.017.001zM12.017 2.163c3.557 0 3.983.014 5.388.072 1.3.059 2.006.277 2.476.461.622.242 1.067.532 1.533.998.466.466.756.911.998 1.533.184.47.402 1.176.461 2.476.058 1.405.072 1.831.072 5.388 0 3.557-.014 3.983-.072 5.388-.059 1.3-.277 2.006-.461 2.476a4.13 4.13 0 01-.998 1.533 4.13 4.13 0 01-1.533.998c-.47.184-1.176.402-2.476.461-1.405.058-1.831.072-5.388.072-3.557 0-3.983-.014-5.388-.072-1.3-.059-2.006-.277-2.476-.461a4.13 4.13 0 01-1.533-.998 4.13 4.13 0 01-.998-1.533c-.184-.47-.402-1.176-.461-2.476-.058-1.405-.072-1.831-.072-5.388 0-3.557.014-3.983.072-5.388.059-1.3.277-2.006.461-2.476.242-.622.532-1.067.998-1.533a4.13 4.13 0 011.533-.998c.47-.184 1.176-.402 2.476-.461 1.405-.058 1.831-.072 5.388-.072zm0 3.675a6.179 6.179 0 100 12.358 6.179 6.179 0 000-12.358zm0 10.196a4.017 4.017 0 110-8.034 4.017 4.017 0 010 8.034zm7.877-10.457a1.444 1.444 0 11-2.888 0 1.444 1.444 0 012.888 0z"/>
                </svg>
              </a>
              <a href="#" className={`transition-colors ${isHomePage ? 'text-gray-300 hover:text-white' : 'text-gray-400 hover:text-primary-600 dark:hover:text-primary-400'}`}>
                <span className="sr-only">WhatsApp</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
                </svg>
              </a>
              <a href="#" className={`transition-colors ${isHomePage ? 'text-gray-300 hover:text-white' : 'text-gray-400 hover:text-primary-600 dark:hover:text-primary-400'}`}>
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className={`transition-colors ${isHomePage ? 'text-gray-300 hover:text-white' : 'text-gray-400 hover:text-primary-600 dark:hover:text-primary-400'}`}>
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className={`transition-colors ${isHomePage ? 'text-gray-300 hover:text-white' : 'text-gray-400 hover:text-primary-600 dark:hover:text-primary-400'}`}>
                <span className="sr-only">Google</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className={`text-sm font-semibold tracking-wider uppercase mb-4 ${isHomePage ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
              Services
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className={`transition-colors ${isHomePage ? 'text-gray-300 hover:text-white' : 'text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400'}`}>
                  Language Learning
                </Link>
              </li>
              <li>
                <Link to="/services" className={`transition-colors ${isHomePage ? 'text-gray-300 hover:text-white' : 'text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400'}`}>
                  JLPT Preparation
                </Link>
              </li>
              <li>
                <Link to="/services" className={`transition-colors ${isHomePage ? 'text-gray-300 hover:text-white' : 'text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400'}`}>
                  Live Chat Exchange
                </Link>
              </li>
              <li>
                <Link to="/services" className={`transition-colors ${isHomePage ? 'text-gray-300 hover:text-white' : 'text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400'}`}>
                  Flashcards & Quizzes
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className={`text-sm font-semibold tracking-wider uppercase mb-4 ${isHomePage ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className={`transition-colors ${isHomePage ? 'text-gray-300 hover:text-white' : 'text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400'}`}>
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/help" className={`transition-colors ${isHomePage ? 'text-gray-300 hover:text-white' : 'text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400'}`}>
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/help" className={`transition-colors ${isHomePage ? 'text-gray-300 hover:text-white' : 'text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400'}`}>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/about-us" className={`transition-colors ${isHomePage ? 'text-gray-300 hover:text-white' : 'text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400'}`}>
                  About Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col items-center space-y-4">
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                © {currentYear} KAIRØ. All rights reserved.
              </p>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <Link to="/privacy-policy" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Privacy Policy
                </Link>
                <span>•</span>
                <Link to="/terms-of-service" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                Made with ❤️ for Japanese learners worldwide
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer