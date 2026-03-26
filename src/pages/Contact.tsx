import { MapPin, Mail, ExternalLink } from 'lucide-react'
import type { Translations } from '../i18n'

const RESEARCHGATE = 'https://www.researchgate.net/profile/Qingqing-Huang-6'
const CONTACT_EMAIL = 'huangqq@bjfu.edu.cn'

interface ContactProps { t: Translations }

export function Contact({ t }: ContactProps) {
  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <div className="bg-gradient-to-br from-forest-800 to-forest-950 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold mb-4">{t.contact.title}</h1>
          <p className="text-forest-200 text-lg">{t.contact.subtitle}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-xl font-serif font-bold text-forest-800 dark:text-forest-100 mb-6">
              联系方式 / Contact Information
            </h2>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-forest-100 dark:bg-forest-800 text-forest-600 dark:text-forest-300 flex items-center justify-center flex-shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{t.contact.email}</p>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-forest-700 dark:text-forest-300 hover:underline"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-forest-100 dark:bg-forest-800 text-forest-600 dark:text-forest-300 flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{t.contact.address}</p>
                  <p className="text-forest-700 dark:text-forest-300">{t.contact.addressVal}</p>
                </div>
              </div>
            </div>

            {/* External Links */}
            <div className="mt-8">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">
                学术主页 / Academic Profile
              </h3>
              <a
                href={RESEARCHGATE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-wood-100 dark:bg-forest-800 text-wood-700 dark:text-wood-300 hover:bg-wood-200 dark:hover:bg-forest-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <ExternalLink size={14} />
                ResearchGate Profile
              </a>
            </div>
          </div>

          {/* Map / Quick message */}
          <div>
            <h2 className="text-xl font-serif font-bold text-forest-800 dark:text-forest-100 mb-6">
              {t.contact.form.message}
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                const form = e.target as HTMLFormElement
                const data = new FormData(form)
                const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(data.get('subject') as string)}&body=${encodeURIComponent(`${t.contact.form.name}: ${data.get('name')}\n\n${data.get('message')}`)}`
                window.location.href = mailto
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                    {t.contact.form.name}
                  </label>
                  <input
                    name="name"
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-200 dark:border-forest-700 rounded-lg bg-white dark:bg-forest-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-forest-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                    {t.contact.form.email}
                  </label>
                  <input
                    name="email"
                    type="email"
                    className="w-full px-3 py-2 border border-gray-200 dark:border-forest-700 rounded-lg bg-white dark:bg-forest-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-forest-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                  {t.contact.form.subject}
                </label>
                <input
                  name="subject"
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-200 dark:border-forest-700 rounded-lg bg-white dark:bg-forest-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-forest-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                  {t.contact.form.message}
                </label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  className="w-full px-3 py-2 border border-gray-200 dark:border-forest-700 rounded-lg bg-white dark:bg-forest-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-forest-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-forest-600 hover:bg-forest-500 text-white font-medium py-2.5 rounded-lg transition-colors"
              >
                {t.contact.form.send}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
