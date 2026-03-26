import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Sun, Moon, Menu, X, Globe, LogIn, LayoutDashboard } from 'lucide-react'
import type { Lang, Translations } from '../i18n'
import { useAuth } from '../context/AuthContext'

interface HeaderProps {
  t: Translations
  lang: Lang
  setLang: (l: Lang) => void
  dark: boolean
  toggleDark: () => void
}

export function Header({ t, lang, setLang, dark, toggleDark }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { user } = useAuth()

  const navLinks = [
    { to: '/',            label: t.nav.home },
    { to: '/research',    label: t.nav.research },
    { to: '/team',        label: t.nav.team },
    { to: '/publications',label: t.nav.publications },
    { to: '/projects',    label: t.nav.projects },
    { to: '/news',        label: t.nav.news },
    { to: '/contact',     label: t.nav.contact },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-forest-950/90 backdrop-blur-md border-b border-forest-200 dark:border-forest-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-forest-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">林</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-bold text-forest-800 dark:text-forest-100 leading-tight">
                {lang === 'zh' ? '林业装备与信息智能化' : 'Forestry Equipment & Intelligence'}
              </div>
              <div className="text-xs text-forest-500 dark:text-forest-400">
                {lang === 'zh' ? '北京林业大学' : 'Beijing Forestry University'}
              </div>
            </div>
          </NavLink>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-forest-100 dark:bg-forest-800 text-forest-700 dark:text-forest-200'
                      : 'text-gray-600 dark:text-gray-300 hover:text-forest-700 dark:hover:text-forest-200 hover:bg-forest-50 dark:hover:bg-forest-900'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Lang toggle */}
            <button
              onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
              className="flex items-center gap-1 px-2 py-1.5 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-forest-50 dark:hover:bg-forest-900 transition-colors"
              title="Switch language"
            >
              <Globe size={15} />
              <span>{lang === 'zh' ? 'EN' : '中'}</span>
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggleDark}
              className="p-1.5 rounded-md text-gray-600 dark:text-gray-300 hover:bg-forest-50 dark:hover:bg-forest-900 transition-colors"
              title={dark ? 'Light mode' : 'Dark mode'}
            >
              {dark ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            {/* Login / Admin */}
            {user ? (
              <Link to="/admin"
                className="hidden sm:flex items-center gap-1 px-2 py-1.5 rounded-md text-sm font-medium text-forest-600 dark:text-forest-300 hover:bg-forest-50 dark:hover:bg-forest-900 transition-colors">
                <LayoutDashboard size={15} />
                <span>管理</span>
              </Link>
            ) : (
              <Link to="/login"
                className="hidden sm:flex items-center gap-1 px-2 py-1.5 rounded-md text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-forest-50 dark:hover:bg-forest-900 transition-colors">
                <LogIn size={15} />
                <span>登录</span>
              </Link>
            )}

            {/* Mobile menu */}
            <button
              onClick={() => setMenuOpen(o => !o)}
              className="lg:hidden p-1.5 rounded-md text-gray-600 dark:text-gray-300 hover:bg-forest-50 dark:hover:bg-forest-900 transition-colors"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white dark:bg-forest-950 border-t border-forest-100 dark:border-forest-800 px-4 py-3 space-y-1">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-forest-100 dark:bg-forest-800 text-forest-700 dark:text-forest-200'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-forest-50 dark:hover:bg-forest-900'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  )
}
