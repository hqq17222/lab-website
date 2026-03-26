import { useState } from 'react'
import { translations, type Lang, type Translations } from '../i18n'

export function useLang() {
  const [lang, setLang] = useState<Lang>('zh')
  const t: Translations = translations[lang]
  return { lang, setLang, t }
}
