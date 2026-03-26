import { ExternalLink, Mail } from 'lucide-react'
import type { Translations } from '../i18n'

interface TeamProps { t: Translations }

const CONTACT_EMAIL = 'huangqq@bjfu.edu.cn'

export function Team({ t }: TeamProps) {
  const { pi } = t.team

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <div className="bg-gradient-to-br from-forest-800 to-forest-950 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold mb-4">{t.team.title}</h1>
          <p className="text-forest-200 text-lg">{t.team.subtitle}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* PI Card */}
        <section className="mb-16">
          <div className="bg-white dark:bg-forest-800 rounded-2xl p-8 shadow-sm border border-forest-100 dark:border-forest-700 max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              {/* Avatar placeholder */}
              <div className="flex-shrink-0 w-24 h-24 rounded-2xl bg-gradient-to-br from-forest-500 to-forest-700 flex items-center justify-center">
                <span className="text-white font-bold text-2xl font-serif">黄</span>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-serif font-bold text-forest-800 dark:text-forest-100">
                  {pi.name}
                </h2>
                <p className="text-forest-600 dark:text-forest-300 font-medium mt-1">{pi.title}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">{pi.affiliation}</p>

                <p className="text-gray-600 dark:text-gray-300 mt-4 leading-relaxed">{pi.bio}</p>

                <div className="flex flex-wrap gap-3 mt-5">
                  <a
                    href={pi.researchGate}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-forest-100 dark:bg-forest-700 text-forest-700 dark:text-forest-200 hover:bg-forest-200 dark:hover:bg-forest-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    <ExternalLink size={14} />
                    ResearchGate
                  </a>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="inline-flex items-center gap-2 bg-wood-100 dark:bg-forest-700 text-wood-700 dark:text-wood-300 hover:bg-wood-200 dark:hover:bg-forest-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    <Mail size={14} />
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Members placeholder */}
        <section className="mb-16">
          <h2 className="text-xl font-serif font-bold text-forest-800 dark:text-forest-100 mb-6">
            {t.team.members}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-forest-800 rounded-xl p-4 border border-dashed border-forest-200 dark:border-forest-700 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-forest-100 dark:bg-forest-700 mx-auto mb-2" />
                <div className="h-3 bg-forest-100 dark:bg-forest-700 rounded mx-auto mb-1 w-3/4" />
                <div className="h-2 bg-forest-50 dark:bg-forest-800 rounded mx-auto w-1/2" />
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-400 dark:text-gray-500 text-center mt-4 italic">
            {t.team.members} — 待完善 / To be updated
          </p>
        </section>

        {/* Join Us */}
        <section className="bg-gradient-to-br from-forest-700 to-forest-900 rounded-2xl p-8 text-white text-center max-w-2xl mx-auto">
          <h3 className="text-xl font-serif font-bold mb-3">{t.team.joinUs.title}</h3>
          <p className="text-forest-200 mb-6 leading-relaxed">{t.team.joinUs.desc}</p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex items-center gap-2 bg-white text-forest-800 hover:bg-forest-50 px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <Mail size={16} />
            {t.team.joinUs.btn}
          </a>
        </section>
      </div>
    </div>
  )
}
