import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { Moon, Sun, LogOut, Menu, X, Star, MoreHorizontal, Bell } from 'lucide-react'
import { useState, useEffect } from 'react'

const Navbar = () => {
  const { user, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [userLevel, setUserLevel] = useState({ stage: 'Bronze', stageLevel: 1 })

  const notifications = [
    { id: 1, type: 'friend_request', title: 'Friend Request', message: 'KanjiMaster wants to be your friend', time: '2 min ago', icon: '👥', unread: true },
    { id: 2, type: 'community', title: 'Community Update', message: 'New discussion in Japanese Grammar group', time: '15 min ago', icon: '💬', unread: true },
    { id: 3, type: 'exam', title: 'Exam Reminder', message: 'JLPT N3 practice exam starts in 2 days', time: '1 hour ago', icon: '📝', unread: true },
    { id: 4, type: 'achievement', title: 'Achievement Unlocked', message: 'You completed 50 flashcards!', time: '3 hours ago', icon: '🏆', unread: false },
    { id: 5, type: 'friend_request', title: 'Friend Request', message: 'TokyoDreamer sent you a friend request', time: '1 day ago', icon: '👥', unread: false }
  ]

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsMenuOpen(false)
    setIsUserMenuOpen(false)
  }

  const closeMenu = () => setIsMenuOpen(false)
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen)
  const closeUserMenu = () => setIsUserMenuOpen(false)
  const toggleNotifications = () => setIsNotificationOpen(!isNotificationOpen)
  const closeNotifications = () => setIsNotificationOpen(false)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest('[data-menu-button]') || event.target.closest('[data-notification-button]')) return
      if (isUserMenuOpen && !event.target.closest('.user-menu-popup')) setIsUserMenuOpen(false)
      if (isNotificationOpen && !event.target.closest('.notification-dropdown')) setIsNotificationOpen(false)
    }
    if (isUserMenuOpen || isNotificationOpen) document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isUserMenuOpen, isNotificationOpen])

  useEffect(() => {
    const mainContent = document.querySelector('main')
    if (mainContent) {
      mainContent.style.filter = isUserMenuOpen ? 'blur(6px)' : 'none'
      mainContent.style.transition = 'filter 0.3s ease'
    }
  }, [isUserMenuOpen])

  useEffect(() => { if (user) fetchUserLevel() }, [user])

  const fetchUserLevel = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/progress/dashboard', { headers: { 'Authorization': `Bearer ${token}` } })
      if (response.ok) {
        const data = await response.json()
        setUserLevel({ stage: data.stage, stageLevel: data.stageLevel })
      }
    } catch (e) { console.error(e) }
  }

  const getStageColor = (stage) => {
    const colors = {
      Bronze: 'from-orange-600 to-yellow-600',
      Silver: 'from-gray-400 to-gray-600',
      Gold: 'from-yellow-400 to-yellow-600',
      Platinum: 'from-blue-400 to-purple-600',
      Diamond: 'from-cyan-400 to-blue-600'
    }
    return colors[stage] || 'from-zinc-500 to-zinc-600'
  }

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,700&family=Instrument+Sans:wght@600;700&family=JetBrains+Mono:wght@500&display=swap');`}</style>

      {/* spacer for fixed capsule */}
      <div className="h-[78px] sm:h-[88px]" />

      <nav className="fixed top-3 sm:top-4 left-0 right-0 z-40 px-3 sm:px-4 pointer-events-none">
        <div className="max-w-[1240px] mx-auto pointer-events-auto">
          {/* floating island capsule */}
          <div
            className="relative rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border border-black/[0.08] dark:border-white/10 flex items-center justify-between gap-2 sm:gap-4 px-2.5 sm:px-3 py-2"
            style={{
              boxShadow:
                '0 1px 0 rgba(255,255,255,0.9) inset, 0 1px 2px rgba(17,18,16,0.04), 0 8px 20px rgba(17,18,16,0.06), 0 24px 48px rgba(17,18,16,0.08)',
            }}
          >
            {/* inner bevel */}
            <div className="absolute inset-0 rounded-full pointer-events-none" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(0,0,0,0.06)' }} />

            {/* left: brand */}
            <div className="flex items-center gap-2 sm:gap-6 min-w-0">
              <Link to="/" onClick={closeMenu} className="flex items-center gap-2.5 sm:gap-3 pl-1 shrink-0 group">
                {/* embossed mark */}
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#111210] dark:bg-white text-white dark:text-black grid place-items-center shadow-[0_4px_12px_rgba(0,0,0,0.16),inset_0_1px_0_rgba(255,255,255,0.18)] group-active:scale-[0.98] transition">
                  <span className="text-[11px] font-black tracking-[-0.04em]" style={{ fontFamily: "'Fraunces', serif" }}>K</span>
                </div>
                <div className="leading-none">
                  <div className="text-[18px] sm:text-[20px] font-black tracking-[-0.04em]" style={{ fontFamily: "'Fraunces', serif" }}>KAIRØ</div>
                  <div className="hidden sm:block text-[10px] tracking-[0.14em] font-bold mono text-black/40 dark:text-white/40 -mt-1">JAPANESE ATELIER</div>
                </div>
              </Link>

              {/* desktop nav links - pill rail */}
              <div className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-[#F3EEE6] dark:bg-zinc-800 border border-black/5 dark:border-white/5">
                {[
                  { to: '/services', label: 'Services' },
                  { to: '/help', label: 'Help' },
                ].map((l) => (
                  !user && (
                    <Link
                      key={l.to}
                      to={l.to}
                      className={`px-4 py-1.5 rounded-full text-[13px] font-semibold tracking-tight transition ${
                        location.pathname === l.to ? 'bg-white dark:bg-zinc-700 shadow-sm border border-black/5' : 'text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white'
                      }`}
                    >
                      {l.label}
                    </Link>
                  )
                ))}
                {user && (
                  <>
                    {[
                      { to: '/dashboard', label: 'Dashboard' },
                      { to: '/flashcards', label: 'Decks' },
                      { to: '/chat', label: 'Chat' },
                    ].map((l) => (
                      <Link
                        key={l.to}
                        to={l.to}
                        className={`px-3.5 py-1.5 rounded-full text-[13px] font-semibold tracking-tight transition ${
                          location.pathname === l.to ? 'bg-white dark:bg-zinc-700 shadow-sm border border-black/5' : 'text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white'
                        }`}
                      >
                        {l.label}
                      </Link>
                    ))}
                  </>
                )}
              </div>
            </div>

            {/* right actions */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* theme */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#F3EEE6] dark:bg-zinc-800 border border-black/5 dark:border-white/10 grid place-items-center hover:scale-[1.02] active:scale-[0.98] transition"
                style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8), 0 2px 8px rgba(0,0,0,0.06)' }}
              >
                <span className="w-5 h-5 rounded-full bg-white dark:bg-zinc-900 grid place-items-center shadow-sm border border-black/5">
                  {isDark ? <Moon className="w-3.5 h-3.5 text-zinc-700" /> : <Sun className="w-3.5 h-3.5 text-amber-500" />}
                </span>
              </button>

              {user ? (
                <>
                  {/* notifications */}
                  <div className="relative">
                    <button
                      onClick={toggleNotifications}
                      data-notification-button
                      className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white dark:bg-zinc-800 border border-black/5 dark:border-white/10 grid place-items-center hover:bg-zinc-50 dark:hover:bg-zinc-700 transition"
                      style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), 0 2px 10px rgba(0,0,0,0.06)' }}
                    >
                      <Bell className="w-[18px] h-[18px] text-zinc-700 dark:text-zinc-200" />
                      <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#D93D1A] text-white text-[11px] font-black grid place-items-center shadow-[0_2px_8px_rgba(217,61,26,0.4)]">
                        {notifications.filter((n) => n.unread).length}
                      </span>
                    </button>

                    {isNotificationOpen && (
                      <div className="notification-dropdown absolute right-0 top-[48px] w-[340px] sm:w-80 bg-white dark:bg-zinc-900 rounded-[22px] shadow-[0_16px_48px_rgba(0,0,0,0.18)] border border-black/5 dark:border-white/10 overflow-hidden z-50">
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-[14px] font-black tracking-tight">Notifications</h3>
                            <button onClick={closeNotifications} className="w-7 h-7 rounded-full bg-zinc-100 dark:bg-zinc-800 grid place-items-center">
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                            {notifications.map((n) => (
                              <div key={n.id} className={`p-3 rounded-2xl border ${n.unread ? 'bg-[#FFF7F3] dark:bg-zinc-800 border-[#D93D1A]/15' : 'bg-zinc-50 dark:bg-zinc-800/60 border-black/5 dark:border-white/5'} `}>
                                <div className="flex gap-3">
                                  <div className="w-9 h-9 rounded-full bg-[#111210] text-white grid place-items-center text-[14px] shrink-0">{n.icon}</div>
                                  <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2">
                                      <p className="text-[13px] font-bold leading-none truncate">{n.title}</p>
                                      {n.unread && <span className="w-1.5 h-1.5 rounded-full bg-[#D93D1A] shrink-0" />}
                                    </div>
                                    <p className="text-[12px] leading-[1.4] font-medium text-black/60 dark:text-white/60 mt-1">{n.message}</p>
                                    <p className="text-[11px] mono font-bold text-black/30 dark:text-white/30 mt-1">{n.time}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          <button className="w-full mt-3 text-center text-[12px] font-bold tracking-[0.08em] mono text-[#D93D1A]">VIEW ALL →</button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* user capsule */}
                  <button
                    onClick={toggleUserMenu}
                    data-menu-button
                    className="flex items-center gap-2 sm:gap-2.5 pl-1 pr-1 sm:pr-1.5 py-1 rounded-full bg-[#111210] dark:bg-white text-white dark:text-black hover:brightness-[1.05] active:scale-[0.98] transition shadow-[0_6px_16px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.14)]"
                  >
                    <img
                      src={user?.profile?.avatar || user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face'}
                      alt=""
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border-2 border-white/20"
                    />
                    <span className="hidden sm:block text-[13px] font-bold tracking-tight pr-1 max-w-[120px] truncate">{user?.username}</span>
                    <span className="hidden sm:grid w-7 h-7 rounded-full bg-white/15 dark:bg-black/10 place-items-center">
                      <MoreHorizontal className="w-4 h-4" />
                    </span>
                    <span className="sm:hidden w-6 h-6 rounded-full bg-white/15 grid place-items-center">
                      <MoreHorizontal className="w-3.5 h-3.5" />
                    </span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-white dark:bg-zinc-800 border border-black/5 dark:border-white/10 text-[13px] font-bold tracking-tight hover:bg-zinc-50 dark:hover:bg-zinc-700 transition"
                    style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), 0 2px 10px rgba(0,0,0,0.06)' }}
                  >
                    Log in
                  </Link>
                  <Link
                    to="/register"
                    className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-full bg-[#D93D1A] text-white text-[13px] font-black tracking-tight hover:brightness-[1.05] active:translate-y-px transition shadow-[0_6px_16px_rgba(217,61,26,0.28),inset_0_1px_0_rgba(255,255,255,0.18)]"
                  >
                    <span className="hidden sm:inline">Start free</span>
                    <span className="sm:hidden">Join</span>
                    <span className="hidden sm:grid w-5 h-5 rounded-full bg-white text-[#D93D1A] place-items-center text-[12px]">↗</span>
                  </Link>
                  {/* mobile menu button when logged out */}
                  <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden w-9 h-9 rounded-full bg-white dark:bg-zinc-800 border border-black/5 grid place-items-center">
                    {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                  </button>
                </>
              )}

              {/* mobile hamburger for logged-in (extra) */}
              {user && (
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden w-9 h-9 rounded-full bg-white dark:bg-zinc-800 border border-black/5 grid place-items-center">
                  {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </button>
              )}
            </div>
          </div>

          {/* floating contact shadow */}
          <div className="mx-auto mt-2 h-5 max-w-[88%] bg-black/10 dark:bg-black/30 blur-[14px] rounded-full pointer-events-none hidden sm:block" />

          {/* mobile dropdown - sheet with depth */}
          {isMenuOpen && (
            <div className="mt-3 rounded-[22px] bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,0.16)] p-2 lg:hidden">
              <div className="grid gap-1">
                {user ? (
                  <>
                    {[
                      { to: '/dashboard', label: 'Dashboard', sub: 'Overview' },
                      { to: '/flashcards', label: 'Flashcards', sub: 'Decks & SRS' },
                      { to: '/quizzes', label: 'Quizzes', sub: 'Adaptive' },
                      { to: '/exams', label: 'Exams', sub: 'JLPT / MEXT' },
                      { to: '/chat', label: 'Chat', sub: 'Language exchange' },
                      { to: '/learning', label: 'Learning', sub: 'Paths' },
                      { to: '/profile', label: 'Profile', sub: 'Settings' },
                    ].map((l) => (
                      <Link key={l.to} to={l.to} onClick={closeMenu} className="flex items-center justify-between px-4 py-3 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition">
                        <span className="text-[14px] font-bold">{l.label}</span>
                        <span className="text-[11px] mono tracking-[0.08em] font-bold text-black/40 dark:text-white/40">{l.sub}</span>
                      </Link>
                    ))}
                  </>
                ) : (
                  <>
                    <Link to="/services" onClick={closeMenu} className="px-4 py-3 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-800 text-[14px] font-bold">
                      Services
                    </Link>
                    <Link to="/help" onClick={closeMenu} className="px-4 py-3 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-800 text-[14px] font-bold">
                      Help
                    </Link>
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <Link to="/login" onClick={closeMenu} className="text-center py-3 rounded-full bg-zinc-100 dark:bg-zinc-800 text-[14px] font-bold">
                        Log in
                      </Link>
                      <Link to="/register" onClick={closeMenu} className="text-center py-3 rounded-full bg-[#D93D1A] text-white text-[14px] font-black">
                        Start free
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* user popup */}
      {isUserMenuOpen && (
        <div className="fixed inset-0 bg-[#FFFCF8]/60 dark:bg-black/40 backdrop-blur-[2px] z-50 flex items-start justify-center sm:items-center p-3 sm:p-4" onClick={closeUserMenu}>
          <div
            className="user-menu-popup w-full max-w-[380px] bg-white dark:bg-zinc-900 rounded-[28px] shadow-[0_24px_64px_rgba(0,0,0,0.22)] border border-black/5 dark:border-white/10 overflow-hidden"
            style={{ animation: 'popUp 0.5s cubic-bezier(0.16,1,0.3,1)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 sm:p-6">
              <div className="text-center">
                <div className="relative inline-block">
                  <img
                    src={user?.profile?.avatar || user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face'}
                    alt=""
                    className="w-20 h-20 rounded-full object-cover border-[3px] border-white dark:border-zinc-800 shadow-[0_8px_24px_rgba(0,0,0,0.14)]"
                  />
                  {user?.isPremium && <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-amber-400 border-2 border-white grid place-items-center text-[12px]">★</span>}
                </div>
                <div className="mt-3 flex items-center justify-center gap-2">
                  <h3 className="text-[18px] font-black tracking-tight" style={{ fontFamily: "'Fraunces', serif" }}>
                    {user?.username}
                  </h3>
                  {user?.isPremium && <span className="text-[11px] font-black tracking-[0.08em] px-2 py-1 rounded-full bg-amber-400 text-black">PRO</span>}
                </div>
                <div className={`mt-2 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r ${getStageColor(userLevel.stage)} text-white text-[12px] font-black tracking-[0.06em] shadow-[0_4px_12px_rgba(0,0,0,0.12)]`}>
                  <Star className="w-3.5 h-3.5" /> {userLevel.stage} Lv.{userLevel.stageLevel}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5 mt-6">
                {[
                  { to: '/dashboard', label: 'Dashboard', icon: '◧' },
                  { to: '/flashcards', label: 'Decks', icon: '⧉' },
                  { to: '/quizzes', label: 'Quizzes', icon: '⬢' },
                  { to: '/learning', label: 'Learning', icon: '⬣' },
                  { to: '/exams', label: 'Exams', icon: '⬔' },
                  { to: '/chat', label: 'Chat', icon: '⬥' },
                  { to: '/profile', label: 'Profile', icon: '⬤' },
                ].map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={closeUserMenu}
                    className="group flex flex-col items-center gap-2 p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800 hover:bg-white dark:hover:bg-zinc-700 border border-black/5 dark:border-white/5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition"
                  >
                    <span className="w-9 h-9 rounded-xl bg-white dark:bg-zinc-900 border border-black/5 grid place-items-center text-[13px] font-black shadow-sm group-hover:scale-105 transition">
                      {l.icon}
                    </span>
                    <span className="text-[12px] font-bold tracking-tight">{l.label}</span>
                  </Link>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2 mt-2.5">
                <div className="rounded-2xl bg-[#F3EEE6] dark:bg-zinc-800 p-3 text-center border border-black/5">
                  <div className="text-[11px] mono tracking-[0.08em] font-bold text-black/40 dark:text-white/40">FOLLOWING</div>
                  <div className="text-[18px] font-black leading-none mt-1">248</div>
                </div>
                <div className="rounded-2xl bg-[#F3EEE6] dark:bg-zinc-800 p-3 text-center border border-black/5">
                  <div className="text-[11px] mono tracking-[0.08em] font-bold text-black/40 dark:text-white/40">FOLLOWERS</div>
                  <div className="text-[18px] font-black leading-none mt-1">1.2k</div>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="w-full mt-4 flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#111210] dark:bg-white text-white dark:text-black text-[14px] font-black hover:brightness-[1.05] active:scale-[0.98] transition shadow-[0_8px_20px_rgba(0,0,0,0.14)]"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`@keyframes popUp { 0%{opacity:0;transform:translateY(8px) scale(0.98)} 100%{opacity:1;transform:translateY(0) scale(1)} }`}</style>
    </>
  )
}

export default Navbar
