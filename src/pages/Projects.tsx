import { ExternalLink, Database, FlaskConical } from 'lucide-react'
import type { Translations } from '../i18n'

const DATA_PLATFORM_URL = '' // TBD — fill in when available

interface ProjectsProps { t: Translations }

const placeholderProjects = [
  {
    title: '天空地一体化林业监测关键技术研究',
    source: '国家自然科学基金',
    period: '2022–2025',
    status: '在研',
  },
  {
    title: '大型林业作业机械智能化改造示范',
    source: '国家林草局',
    period: '2023–2026',
    status: '在研',
  },
  {
    title: '北方寒区森林碳储量遥感核算研究',
    source: '北京市自然科学基金',
    period: '2021–2024',
    status: '在研',
  },
]

export function Projects({ t }: ProjectsProps) {
  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <div className="bg-gradient-to-br from-forest-800 to-forest-950 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold mb-4">{t.projects.title}</h1>
          <p className="text-forest-200 text-lg">{t.projects.subtitle}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Data Platform Highlight */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-forest-700 via-forest-800 to-forest-950 rounded-2xl p-8 text-white">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                <Database size={24} />
              </div>
              <div>
                <h2 className="text-xl font-serif font-bold">{t.projects.platformTitle}</h2>
                <p className="text-forest-300 mt-2 leading-relaxed">{t.projects.platformDesc}</p>
              </div>
            </div>

            {DATA_PLATFORM_URL ? (
              <a
                href={DATA_PLATFORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-forest-800 hover:bg-forest-50 px-5 py-2.5 rounded-lg font-medium transition-colors mt-4"
              >
                <ExternalLink size={15} />
                {t.projects.visitPlatform}
              </a>
            ) : (
              <div className="inline-flex items-center gap-2 bg-white/10 text-forest-300 border border-white/20 px-5 py-2.5 rounded-lg text-sm mt-4 italic">
                {t.projects.platformTbd}
              </div>
            )}
          </div>
        </section>

        {/* Research Projects */}
        <section>
          <h2 className="text-xl font-serif font-bold text-forest-800 dark:text-forest-100 mb-6 flex items-center gap-2">
            <FlaskConical size={20} className="text-forest-600 dark:text-forest-400" />
            {t.projects.researchProjects}
          </h2>

          <div className="space-y-4">
            {placeholderProjects.map((proj, i) => (
              <div
                key={i}
                className="bg-white dark:bg-forest-800 border border-forest-100 dark:border-forest-700 rounded-xl p-6 flex flex-col sm:flex-row sm:items-center gap-4"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-forest-800 dark:text-forest-100">{proj.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{proj.source} · {proj.period}</p>
                </div>
                <span className="flex-shrink-0 inline-block bg-forest-100 dark:bg-forest-700 text-forest-700 dark:text-forest-200 px-3 py-1 rounded-full text-xs font-medium">
                  {proj.status}
                </span>
              </div>
            ))}
          </div>

          <p className="text-sm text-gray-400 dark:text-gray-500 mt-6 text-center italic">
            以上为占位内容，请替换为真实项目信息 / Placeholder — replace with actual projects
          </p>
        </section>
      </div>
    </div>
  )
}
