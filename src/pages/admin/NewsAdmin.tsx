import React, { useEffect, useState } from 'react';
import { supabase, NewsItem } from '../../lib/supabase';

type Category = 'research' | 'award' | 'event';

const CATEGORY_LABELS: Record<Category, string> = {
  research: '科研进展',
  award: '获奖荣誉',
  event: '学术活动',
};

const emptyForm = {
  date: new Date().toISOString().slice(0, 10),
  category: 'research' as Category,
  title_zh: '',
  title_en: '',
  summary_zh: '',
  summary_en: '',
};

type FormState = typeof emptyForm;

export default function NewsAdmin() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<NewsItem | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadNews() {
    setLoading(true);
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('date', { ascending: false });
    if (!error && data) setNews(data as NewsItem[]);
    setLoading(false);
  }

  useEffect(() => {
    loadNews();
  }, []);

  function openAdd() {
    setEditing(null);
    setForm(emptyForm);
    setError(null);
    setModalOpen(true);
  }

  function openEdit(item: NewsItem) {
    setEditing(item);
    setForm({
      date: item.date ? item.date.slice(0, 10) : new Date().toISOString().slice(0, 10),
      category: (item.category as Category) ?? 'research',
      title_zh: item.title_zh ?? '',
      title_en: item.title_en ?? '',
      summary_zh: item.summary_zh ?? '',
      summary_en: item.summary_en ?? '',
    });
    setError(null);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditing(null);
    setForm(emptyForm);
    setError(null);
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    if (editing) {
      const { error: err } = await supabase
        .from('news')
        .update(form)
        .eq('id', editing.id);
      if (err) {
        setError(err.message);
        setSaving(false);
        return;
      }
    } else {
      const { error: err } = await supabase.from('news').insert([form]);
      if (err) {
        setError(err.message);
        setSaving(false);
        return;
      }
    }
    setSaving(false);
    closeModal();
    loadNews();
  }

  async function handleDelete(id: string | number) {
    if (!window.confirm('确认删除该新闻条目？')) return;
    await supabase.from('news').delete().eq('id', id);
    loadNews();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-serif font-bold text-forest-800 dark:text-forest-100">
          新闻动态管理
        </h1>
        <button
          onClick={openAdd}
          className="bg-forest-600 hover:bg-forest-500 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          + 添加新闻
        </button>
      </div>

      <div className="bg-white dark:bg-forest-900 rounded-xl border border-forest-100 dark:border-forest-800 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr>
              {['日期', '类别', '标题（中）', '操作'].map((col) => (
                <th
                  key={col}
                  className="bg-forest-50 dark:bg-forest-800 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 py-3 text-left"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-sm text-gray-400">
                  加载中…
                </td>
              </tr>
            ) : news.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-sm text-gray-400">
                  暂无数据
                </td>
              </tr>
            ) : (
              news.map((item) => (
                <tr key={item.id}>
                  <td className="border-t border-forest-50 dark:border-forest-800 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">
                    {item.date ? item.date.slice(0, 10) : '—'}
                  </td>
                  <td className="border-t border-forest-50 dark:border-forest-800 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-forest-100 text-forest-700 dark:bg-forest-800 dark:text-forest-300">
                      {CATEGORY_LABELS[(item.category as Category)] ?? item.category}
                    </span>
                  </td>
                  <td className="border-t border-forest-50 dark:border-forest-800 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 max-w-sm">
                    <div className="truncate">{item.title_zh}</div>
                  </td>
                  <td className="border-t border-forest-50 dark:border-forest-800 px-4 py-3 text-sm">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEdit(item)}
                        className="bg-forest-100 hover:bg-forest-200 text-forest-700 px-3 py-1 rounded text-sm"
                      >
                        编辑
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded text-sm"
                      >
                        删除
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-forest-900 rounded-xl shadow-xl w-full max-w-lg mx-4 p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-serif font-bold text-forest-800 dark:text-forest-100 mb-4">
              {editing ? '编辑新闻' : '添加新闻'}
            </h2>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                  日期
                </label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-forest-700 rounded-lg bg-white dark:bg-forest-950 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-forest-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                  类别
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-forest-700 rounded-lg bg-white dark:bg-forest-950 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-forest-500"
                >
                  <option value="research">科研进展</option>
                  <option value="award">获奖荣誉</option>
                  <option value="event">学术活动</option>
                </select>
              </div>

              {[
                { label: '标题（中文）', name: 'title_zh' },
                { label: '标题（英文）', name: 'title_en' },
              ].map(({ label, name }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                    {label}
                  </label>
                  <input
                    type="text"
                    name={name}
                    value={(form as any)[name]}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-forest-700 rounded-lg bg-white dark:bg-forest-950 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-forest-500"
                  />
                </div>
              ))}

              {[
                { label: '摘要（中文）', name: 'summary_zh' },
                { label: '摘要（英文）', name: 'summary_en' },
              ].map(({ label, name }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                    {label}
                  </label>
                  <textarea
                    name={name}
                    value={(form as any)[name]}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-forest-700 rounded-lg bg-white dark:bg-forest-950 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-forest-500 resize-y"
                  />
                </div>
              ))}
            </div>

            {error && (
              <p className="mt-3 text-sm text-red-600 dark:text-red-400">{error}</p>
            )}

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-forest-800"
              >
                取消
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-forest-600 hover:bg-forest-500 text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50"
              >
                {saving ? '保存中…' : '保存'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
