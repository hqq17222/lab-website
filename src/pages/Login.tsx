import { useState, FormEvent } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { LogIn, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export function Login() {
  const { user, signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (user) return <Navigate to="/admin" replace />

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signIn(email, password)
      navigate('/admin')
    } catch {
      setError('邮箱或密码错误，请重试。')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-forest-50 dark:bg-forest-950 px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-forest-600 flex items-center justify-center mx-auto mb-3">
            <span className="text-white font-bold text-2xl font-serif">林</span>
          </div>
          <h1 className="text-xl font-serif font-bold text-forest-800 dark:text-forest-100">
            林业装备与信息智能化实验室
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">北京林业大学</p>
        </div>

        {/* Form */}
        <div className="bg-white dark:bg-forest-900 rounded-2xl shadow-sm border border-forest-100 dark:border-forest-800 p-8">
          <h2 className="text-lg font-semibold text-forest-800 dark:text-forest-100 mb-6">登录管理系统</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">邮箱</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-3 py-2.5 border border-gray-200 dark:border-forest-700 rounded-lg bg-white dark:bg-forest-950 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-forest-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">密码</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2.5 border border-gray-200 dark:border-forest-700 rounded-lg bg-white dark:bg-forest-950 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-forest-500 pr-10"
                />
                <button type="button" onClick={() => setShowPw(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-forest-600 hover:bg-forest-500 disabled:opacity-60 text-white font-medium py-2.5 rounded-lg transition-colors"
            >
              {loading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <LogIn size={16} />}
              {loading ? '登录中...' : '登录'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          仅限授权人员登录 · 如需账号请联系管理员
        </p>
      </div>
    </div>
  )
}
