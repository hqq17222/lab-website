import { Cpu, Satellite } from 'lucide-react'
import type { Translations } from '../i18n'

interface ResearchProps { t: Translations }

export function Research({ t }: ResearchProps) {
  const dirs = [
    { icon: <Cpu size={32} />, data: t.research.dir1 },
    { icon: <Satellite size={32} />, data: t.research.dir2 },
  ]

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <div className="bg-gradient-to-br from-forest-800 to-forest-950 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold mb-4">{t.research.title}</h1>
          <p className="text-forest-200 text-lg">{t.research.subtitle}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-16">
          {dirs.map(({ icon, data }, i) => (
            <div
              key={i}
              className={`flex flex-col lg:flex-row gap-10 items-start ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              {/* Icon block */}
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-2xl bg-forest-100 dark:bg-forest-800 text-forest-600 dark:text-forest-300 flex items-center justify-center shadow-sm">
                  {icon}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h2 className="text-2xl font-serif font-bold text-forest-800 dark:text-forest-100 mb-4">
                  {data.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 text-lg">
                  {data.desc}
                </p>

                {/* Topics */}
                <div className="flex flex-wrap gap-2">
                  {data.topics.map((topic) => (
                    <span
                      key={topic}
                      className="bg-forest-100 dark:bg-forest-800 text-forest-700 dark:text-forest-200 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
