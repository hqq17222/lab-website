import { useEffect, useState } from 'react'
import { Users, BookOpen, FlaskConical, Newspaper } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'

export function Dashboard() {
  const { profile } = useAuth()
  const [counts, setCounts] = useState({ team: 0, publications: 0, projects: 0, news: 0 })

  useEffect(() => {
    async function load() {
      const [t, p, pr, n] = await Promise.all([
        supabase.from('team_members').select('*', { count: 'exact', head: true }),
        supabase.from('publications').select('*', { count: 'exact', head: true }),
        supabase.from('projects').select('*', { count: 'exact', head: true }),
        supabase.from('news').select('*', { count: 'exact', head: true }),
      ])
      setCounts({ team: t.count ?? 0, publications: p.count ?? 0, projects: pr.count ?? 0, news: n.count ?? 0 })
    }
    load()
  }, [])

  const roleLabel: Record<string, string> = {
    admin: '全站管理员',
    data_admin: '数据管理员',
    user: '普通用户',
  }

  const stats = [
    { label: '团队成员', value: counts.team, icon: <Users size={20} />, to: '/admin/team' },
    { label: '学术成果', value: counts.publications, icon: <BookOpen size={20} />, to: '/admin/publications' },
    { label: '科研项目', value: counts.projects, icon: <FlaskConical size={20} />, to: '/admin/projects' },
    { label: '新闻动态', value: counts.news, icon: <Newspaper size={20} />, to: '/admin/news' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-serif font-bold text-forest-800 dark:text-forest-100">
          欢迎回来，{profile?.name || profile?.email?.split('@')[0]}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          当前身份：<span className="text-forest-600 dark:text-forest-300 font-medium">{roleLabel[profile?.role ?? 'user']}</span>
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon }) => (
          <div key={label} className="bg-white dark:bg-forest-900 rounded-xl p-5 border border-forest-100 dark:border-forest-800 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-500 dark:text-gray-400 text-sm">{label}</span>
              <div className="text-forest-500 dark:text-forest-400">{icon}</div>
            </div>
            <p className="text-3xl font-bold text-forest-800 dark:text-forest-100">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white dark:bg-forest-900 rounded-xl p-6 border border-forest-100 dark:border-forest-800">
        <h2 className="font-semibold text-forest-800 dark:text-forest-100 mb-2">使用说明</h2>
        <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 list-disc list-inside">
          <li>左侧菜单选择要管理的内容类型</li>
          <li>修改后内容会立即在网站上显示</li>
          <li>全站管理员可管理用户账号和站点设置</li>
          <li>如有问题请联系全站管理员</li>
        </ul>
      </div>
    </div>
  )
}
