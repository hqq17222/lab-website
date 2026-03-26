import { zh } from './zh'
import { en } from './en'

export type Lang = 'zh' | 'en'
export type Translations = typeof zh

export const translations: Record<Lang, Translations> = { zh, en }
