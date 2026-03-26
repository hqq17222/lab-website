import { Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { Research } from './pages/Research'
import { Team } from './pages/Team'
import { Publications } from './pages/Publications'
import { Projects } from './pages/Projects'
import { News } from './pages/News'
import { Contact } from './pages/Contact'
import { Login } from './pages/Login'
import { AdminLayout } from './pages/admin/AdminLayout'
import { Dashboard } from './pages/admin/Dashboard'
import TeamAdmin from './pages/admin/TeamAdmin'
import PublicationsAdmin from './pages/admin/PublicationsAdmin'
import ProjectsAdmin from './pages/admin/ProjectsAdmin'
import NewsAdmin from './pages/admin/NewsAdmin'
import UsersAdmin from './pages/admin/UsersAdmin'
import SettingsAdmin from './pages/admin/SettingsAdmin'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import { useLang } from './hooks/useLang'
import { useTheme } from './hooks/useTheme'

function AppInner() {
  const { lang, setLang, t } = useLang()
  const { dark, toggleDark } = useTheme()

  return (
    <Routes>
      {/* Public site */}
      <Route path="/" element={
        <div className="min-h-screen flex flex-col">
          <Header t={t} lang={lang} setLang={setLang} dark={dark} toggleDark={toggleDark} />
          <main className="flex-1">
            <Routes>
              <Route index element={<Home t={t} />} />
              <Route path="research" element={<Research t={t} />} />
              <Route path="team" element={<Team t={t} />} />
              <Route path="publications" element={<Publications t={t} />} />
              <Route path="projects" element={<Projects t={t} />} />
              <Route path="news" element={<News t={t} />} />
              <Route path="contact" element={<Contact t={t} />} />
            </Routes>
          </main>
          <Footer t={t} />
        </div>
      } />

      {/* Login */}
      <Route path="/login" element={<Login />} />

      {/* Admin */}
      <Route path="/admin" element={
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="team" element={<ProtectedRoute requireDataAdmin><TeamAdmin /></ProtectedRoute>} />
        <Route path="publications" element={<ProtectedRoute requireDataAdmin><PublicationsAdmin /></ProtectedRoute>} />
        <Route path="projects" element={<ProtectedRoute requireDataAdmin><ProjectsAdmin /></ProtectedRoute>} />
        <Route path="news" element={<ProtectedRoute requireDataAdmin><NewsAdmin /></ProtectedRoute>} />
        <Route path="users" element={<ProtectedRoute requireAdmin><UsersAdmin /></ProtectedRoute>} />
        <Route path="settings" element={<ProtectedRoute requireAdmin><SettingsAdmin /></ProtectedRoute>} />
      </Route>
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  )
}

export default App
