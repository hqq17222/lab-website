import { useState } from 'react'
import { Calendar, Tag } from 'lucide-react'
import type { Translations } from '../i18n'
import newsData from '../data/news.json'

interface NewsProps { t: Translations }

type Category = 'all' | 'research' | 'award' | 'event'

export function News({ t }: NewsProps) {
  const [activeCategory, setActiveCategory] = useState<Category>('all')
  const isZh = t.news.categories.all === '全部'

  const categories: Array<{ key: Category; label: string }> = [
    { key: 'all',      label: t.news.categories.all },
    { key: 'research', label: t.news.categories.research },
    { key: 'award',    label: t.news.categories.award },
    { key: 'event',    label: t.news.categories.event },
  ]

  const filtered = activeCategory === 'all'
    ? newsData.items
    : newsData.items.filter(n => n.category === activeCategory)

  return (
    <div className="min-h-screen pt-16">
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
                  {t.news.categories[item.category as Category]}
                </span>
              </div>
              <h3 className="font-semibold text-forest-800 dark:text-forest-100 text-lg leading-snug mb-2">
                {isZh ? item.title_zh : item.title_en}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {isZh ? item.summary_zh : item.summary_en}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
