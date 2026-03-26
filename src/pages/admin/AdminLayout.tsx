import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Users, BookOpen, FlaskConical, Newspaper, Settings, LogOut, Menu, X, Globe } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export function AdminLayout() {
  const { profile, signOut, isAdmin } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  async function handleSignOut() {
    await signOut()
    navigate('/login')
  }

  const roleLabel: Record<string, string> = {
    admin: '全站管理员',
    data_admin: '数据管理员',
    user: '普通用户',
  }

  const navItems = [
    { to: '/admin', icon: <LayoutDashboard size={18} />, label: '控制台', end: true },
    { to: '/admin/team', icon: <Users size={18} />, label: '团队成员' },
    { to: '/admin/publications', icon: <BookOpen size={18} />, label: '学术成果' },
    { to: '/admin/projects', icon: <FlaskConical size={18} />, label: '项目与平台' },
    { to: '/admin/news', icon: <Newspaper size={18} />, label: '新闻动态' },
    ...(isAdmin ? [
      { to: '/admin/users', icon: <Users size={18} />, label: '用户管理' },
      { to: '/admin/settings', icon: <Settings size={18} />, label: '站点设置' },
    ] : []),
  ]

  const Sidebar = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-5 border-b border-forest-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-forest-500 flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm font-serif">林</span>
          </div>
          <div>
            <div className="text-sm font-semibold text-forest-100 leading-tight">管理后台</div>
            <div className="text-xs text-forest-400">北京林业大学</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map(({ to, icon, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-forest-700 text-white'
                  : 'text-forest-300 hover:bg-forest-800 hover:text-forest-100'
              }`
            }
          >
            {icon}
            {label}
          </NavLink>
        ))}
      </nav>

      {/* User info + actions */}
      <div className="p-3 border-t border-forest-800 space-y-1">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-forest-300 hover:bg-forest-800 hover:text-forest-100 transition-colors"
        >
          <Globe size={18} />
          查看网站
        </a>
        <div className="px-3 py-2">
          <p className="text-xs font-medium text-forest-200 truncate">{profile?.email}</p>
          <p className="text-xs text-forest-500">{roleLabel[profile?.role ?? 'user']}</p>
        </div>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-forest-300 hover:bg-red-900/40 hover:text-red-300 transition-colors"
        >
          <LogOut size={18} />
          退出登录
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-forest-950">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-56 bg-forest-900 flex-shrink-0">
        <Sidebar />
      </aside>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-56 bg-forest-900 flex flex-col">
            <Sidebar />
          </div>
          <div className="flex-1 bg-black/50" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar (mobile) */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-white dark:bg-forest-900 border-b border-gray-200 dark:border-forest-800">
          <button onClick={() => setSidebarOpen(true)} className="text-gray-500 dark:text-gray-300">
            <Menu size={22} />
          </button>
          <span className="font-semibold text-forest-800 dark:text-forest-100">管理后台</span>
          {sidebarOpen && (
            <button onClick={() => setSidebarOpen(false)} className="ml-auto text-gray-500">
              <X size={22} />
            </button>
          )}
        </div>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
