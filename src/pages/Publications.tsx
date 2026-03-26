import { ExternalLink } from 'lucide-react'
import type { Translations } from '../i18n'

const RESEARCHGATE = 'https://www.researchgate.net/profile/Qingqing-Huang-6'

interface PublicationsProps { t: Translations }

// Placeholder publications — replace with real ones
const placeholderPubs = [
  {
    year: 2024,
    title: '基于多源遥感数据的森林蓄积量估测研究',
    authors: 'Huang Q., et al.',
    journal: 'Forest Ecology and Management',
    doi: '',
  },
  {
    year: 2024,
    title: '大型林业作业机械智能控制系统设计与仿真',
    authors: 'Huang Q., et al.',
    journal: '林业工程学报',
    doi: '',
  },
  {
    year: 2023,
    title: '天空地一体化林业资源监测框架构建',
    authors: 'Huang Q., et al.',
    journal: 'Remote Sensing',
    doi: '',
  },
]

export function Publications({ t }: PublicationsProps) {
  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <div className="bg-gradient-to-br from-forest-800 to-forest-950 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold mb-4">{t.publications.title}</h1>
          <p className="text-forest-200 text-lg">{t.publications.subtitle}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* ResearchGate banner */}
        <a
          href={RESEARCHGATE}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between bg-gradient-to-r from-wood-300 to-wood-500 text-white rounded-2xl p-6 mb-10 hover:opacity-90 transition-opacity"
        >
          <div>
            <div className="font-semibold text-lg">{t.publications.viewAll}</div>
            <div className="text-white/70 text-sm mt-1">{t.publications.note}</div>
          </div>
          <ExternalLink size={24} className="flex-shrink-0 ml-4" />
        </a>

        {/* Publication list */}
        <h2 className="text-xl font-serif font-bold text-forest-800 dark:text-forest-100 mb-6">
          {t.publications.recent}
        </h2>

        <div className="space-y-4">
          {placeholderPubs.map((pub, i) => (
            <div
              key={i}
              className="bg-white dark:bg-forest-800 border border-forest-100 dark:border-forest-700 rounded-xl p-6 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-forest-100 dark:bg-forest-700 rounded-lg flex items-center justify-center">
                  <span className="text-forest-600 dark:text-forest-300 font-bold text-sm">{pub.year}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-forest-800 dark:text-forest-100 leading-snug">
                    {pub.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{pub.authors}</p>
                  <p className="text-sm text-forest-600 dark:text-forest-300 mt-1 italic">{pub.journal}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-gray-400 dark:text-gray-500 mt-8 italic">
          以上为占位内容，请替换为真实论文信息 / Placeholder — replace with actual publications
        </p>
      </div>
    </div>
  )
}
