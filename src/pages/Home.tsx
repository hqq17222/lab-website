import { Link } from 'react-router-dom'
import { ArrowRight, ExternalLink, Cpu, Satellite } from 'lucide-react'
import type { Translations } from '../i18n'

const RESEARCHGATE = 'https://www.researchgate.net/profile/Qingqing-Huang-6'

interface HomeProps { t: Translations }

export function Home({ t }: HomeProps) {
  const icons = [<Cpu size={28} key="cpu" />, <Satellite size={28} key="sat" />]

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-forest-900 via-forest-800 to-forest-950" />
        {/* Decorative circles */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-forest-700/20 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-wood-400/10 blur-3xl" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-block bg-forest-700/50 border border-forest-600/50 rounded-full px-4 py-1.5 text-forest-200 text-sm mb-6">
            {t.lab.university}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight mb-4">
            {t.home.hero.title}
          </h1>
          <p className="text-lg text-forest-200 max-w-2xl mx-auto mb-8 leading-relaxed">
            {t.home.hero.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/research"
              className="inline-flex items-center gap-2 bg-forest-500 hover:bg-forest-400 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              {t.home.hero.btnResearch}
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border border-forest-400 text-forest-200 hover:bg-forest-800 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              {t.home.hero.btnContact}
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-forest-400">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-forest-400" />
        </div>
      </section>

      {/* About */}
      <section className="py-20 bg-white dark:bg-forest-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-forest-800 dark:text-forest-100 mb-6">
              {t.home.about.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
              {t.home.about.text}
            </p>
          </div>
        </div>
      </section>

      {/* Research Directions */}
      <section className="py-20 bg-forest-50 dark:bg-forest-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-forest-800 dark:text-forest-100 text-center mb-12">
            {t.home.directions.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {t.home.directions.items.map((item, i) => (
              <div
                key={i}
                className="bg-white dark:bg-forest-800 rounded-2xl p-8 shadow-sm border border-forest-100 dark:border-forest-700 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-forest-100 dark:bg-forest-700 text-forest-600 dark:text-forest-300 flex items-center justify-center mb-4">
                  {icons[i]}
                </div>
                <h3 className="text-xl font-semibold text-forest-800 dark:text-forest-100 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/research"
              className="inline-flex items-center gap-2 text-forest-600 dark:text-forest-300 hover:text-forest-800 dark:hover:text-forest-100 font-medium transition-colors"
            >
              {t.home.hero.btnResearch} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links / Platforms */}
      <section className="py-20 bg-white dark:bg-forest-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-forest-800 dark:text-forest-100 text-center mb-10">
            {t.home.quickLinks.title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* Data Platform */}
            <div className="bg-gradient-to-br from-forest-700 to-forest-900 rounded-2xl p-6 text-white">
              <Satellite size={32} className="mb-4 text-forest-300" />
              <h3 className="font-semibold text-lg mb-2">{t.home.quickLinks.dataWebsite}</h3>
              <p className="text-forest-300 text-sm mb-4">{t.projects.platformDesc.slice(0, 60)}...</p>
              <span className="inline-flex items-center gap-1 text-sm text-forest-400 italic">
                {t.projects.platformTbd}
              </span>
            </div>

            {/* ResearchGate */}
            <a
              href={RESEARCHGATE}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-br from-wood-300 to-wood-500 rounded-2xl p-6 text-white hover:opacity-90 transition-opacity block"
            >
              <div className="w-8 h-8 rounded bg-white/20 flex items-center justify-center mb-4">
                <span className="font-bold text-sm">RG</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">{t.home.quickLinks.researchGate}</h3>
              <p className="text-white/70 text-sm mb-4">{t.publications.subtitle.slice(0, 50)}...</p>
              <span className="inline-flex items-center gap-1 text-sm font-medium">
                {t.publications.viewAll} <ExternalLink size={13} />
              </span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
