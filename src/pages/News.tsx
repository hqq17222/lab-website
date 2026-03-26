import { useState } from 'react'
import { Calendar, Tag } from 'lucide-react'
import type { Translations } from '../i18n'

interface NewsProps { t: Translations }

type Category = 'all' | 'research' | 'award' | 'event'

const placeholderNews = [
  {
    date: '2024-11-20',
    category: 'research' as Category,
    titleZh: '实验室在天空地一体化监测研究方面取得新进展',
    titleEn: 'Lab achieves new progress in sky-ground integrated monitoring research',
    summaryZh: '课题组发表了关于多源遥感数据融合的最新研究成果，相关成果已被国际期刊接收。',
    summaryEn: 'The group published new findings on multi-source remote sensing data fusion, accepted by an international journal.',
  },
  {
    date: '2024-09-05',
    category: 'event' as Category,
    titleZh: '实验室成员参加第十届全国林业信息化大会',
    titleEn: 'Lab members attend the 10th National Forestry Informatization Conference',
    summaryZh: '实验室多名师生赴会做学术报告，与国内同行展开深入交流。',
    summaryEn: 'Several lab members presented at the conference and engaged in academic exchanges.',
  },
  {
    date: '2024-06-15',
    category: 'award' as Category,
    titleZh: '实验室研究成果荣获省部级科技奖励',
    titleEn: 'Lab research recognized with provincial/ministerial science and technology award',
    summaryZh: '课题组承担的林业机械智能化项目荣获北京市科学技术奖二等奖。',
    summaryEn: 'The intelligent forestry machinery project won the 2nd prize of Beijing Science and Technology Award.',
  },
]

export function News({ t }: NewsProps) {
  const [activeCategory, setActiveCategory] = useState<Category>('all')

  const categories: Array<{ key: Category; label: string }> = [
    { key: 'all',      label: t.news.categories.all },
    { key: 'research', label: t.news.categories.research },
    { key: 'award',    label: t.news.categories.award },
    { key: 'event',    label: t.news.categories.event },
  ]

  const filtered = activeCategory === 'all'
    ? placeholderNews
    : placeholderNews.filter(n => n.category === activeCategory)

  const isZh = t.news.categories.all === '全部'

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <div className="bg-gradient-to-br from-forest-800 to-forest-950 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold mb-4">{t.news.title}</h1>
          <p className="text-forest-200 text-lg">{t.news.subtitle}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeCategory === key
                  ? 'bg-forest-600 text-white'
                  : 'bg-forest-100 dark:bg-forest-800 text-forest-700 dark:text-forest-200 hover:bg-forest-200 dark:hover:bg-forest-700'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* News list */}
        <div className="space-y-6">
          {filtered.map((item, i) => (
            <article
              key={i}
              className="bg-white dark:bg-forest-800 border border-forest-100 dark:border-forest-700 rounded-xl p-6 hover:shadow-sm transition-shadow"
            >
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="inline-flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
                  <Calendar size={12} />
                  {item.date}
                </span>
                <span className="inline-flex items-center gap-1 text-xs bg-forest-100 dark:bg-forest-700 text-forest-600 dark:text-forest-300 px-2 py-0.5 rounded-full">
                  <Tag size={11} />
                  {t.news.categories[item.category]}
                </span>
              </div>
              <h3 className="font-semibold text-forest-800 dark:text-forest-100 text-lg leading-snug mb-2">
                {isZh ? item.titleZh : item.titleEn}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {isZh ? item.summaryZh : item.summaryEn}
              </p>
            </article>
          ))}
        </div>

        <p className="text-center text-sm text-gray-400 dark:text-gray-500 mt-10 italic">
          以上为示例内容，请替换为真实新闻 / Placeholder — replace with actual news
        </p>
      </div>
    </div>
  )
}
