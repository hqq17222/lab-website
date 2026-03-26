import { ExternalLink } from 'lucide-react'
import type { Translations } from '../i18n'

const RESEARCHGATE = 'https://www.researchgate.net/profile/Qingqing-Huang-6'
const DATA_PLATFORM_URL = '' // TBD

interface FooterProps {
  t: Translations
}

export function Footer({ t }: FooterProps) {
  return (
    <footer className="bg-forest-900 dark:bg-forest-950 text-forest-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-forest-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">林</span>
              </div>
              <span className="font-semibold text-forest-100">{t.lab.name}</span>
            </div>
            <p className="text-sm text-forest-400">{t.lab.university}</p>
            <p className="text-xs text-forest-500 mt-1 italic">{t.lab.tagline}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-forest-200 mb-3">{t.home.quickLinks.title}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={DATA_PLATFORM_URL || '#'}
                  className="flex items-center gap-1 text-forest-400 hover:text-forest-200 transition-colors"
                  target={DATA_PLATFORM_URL ? '_blank' : undefined}
                  rel="noopener noreferrer"
                >
                  <ExternalLink size={13} />
                  {t.home.quickLinks.dataWebsite}
                  {!DATA_PLATFORM_URL && <span className="text-xs text-forest-600 ml-1">(即将上线)</span>}
                </a>
              </li>
              <li>
                <a
                  href={RESEARCHGATE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-forest-400 hover:text-forest-200 transition-colors"
                >
                  <ExternalLink size={13} />
                  {t.home.quickLinks.researchGate}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-forest-200 mb-3">{t.contact.title}</h4>
            <p className="text-sm text-forest-400">{t.contact.addressVal}</p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-forest-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-forest-500">
          <span>© {new Date().getFullYear()} {t.footer.rights} · {t.footer.university}</span>
          <span>Built with React + Vite</span>
        </div>
      </div>
    </footer>
  )
}
