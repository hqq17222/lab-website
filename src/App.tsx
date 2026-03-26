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
import { useLang } from './hooks/useLang'
import { useTheme } from './hooks/useTheme'

function App() {
  const { lang, setLang, t } = useLang()
  const { dark, toggleDark } = useTheme()

  return (
    <div className="min-h-screen flex flex-col">
      <Header t={t} lang={lang} setLang={setLang} dark={dark} toggleDark={toggleDark} />
      <main className="flex-1">
        <Routes>
          <Route path="/"             element={<Home t={t} />} />
          <Route path="/research"     element={<Research t={t} />} />
          <Route path="/team"         element={<Team t={t} />} />
          <Route path="/publications" element={<Publications t={t} />} />
          <Route path="/projects"     element={<Projects t={t} />} />
          <Route path="/news"         element={<News t={t} />} />
          <Route path="/contact"      element={<Contact t={t} />} />
        </Routes>
      </main>
      <Footer t={t} />
    </div>
  )
}

export default App
