import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bszeutfgfltpmeocthel.supabase.co'
const supabaseAnonKey = 'sb_publishable_DyMy9IYHyyTUSayuMTqaGg_oG6Os6cf'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Role = 'admin' | 'data_admin' | 'user'

export interface Profile {
  id: string
  email: string
  name: string | null
  role: Role
}

export interface Publication {
  id: number
  year: number
  title_zh: string
  title_en: string
  authors: string
  journal: string
  doi: string
  url: string
}

export interface TeamMember {
  id: number
  name_zh: string
  name_en: string
  role_zh: string
  role_en: string
  direction_zh: string
  direction_en: string
  sort_order: number
}

export interface Project {
  id: number
  title_zh: string
  title_en: string
  source_zh: string
  source_en: string
  period: string
  status_zh: string
  status_en: string
  sort_order: number
}

export interface NewsItem {
  id: number
  date: string
  category: 'research' | 'award' | 'event'
  title_zh: string
  title_en: string
  summary_zh: string
  summary_en: string
}
