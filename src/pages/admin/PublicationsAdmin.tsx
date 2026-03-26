import React, { useEffect, useState } from 'react';
import { supabase, Publication } from '../../lib/supabase';

const emptyForm = {
  year: new Date().getFullYear(),
  title_zh: '',
  title_en: '',
  authors: '',
  journal: '',
  doi: '',
  url: '',
};

type FormState = typeof emptyForm;

export default function PublicationsAdmin() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Publication | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadPublications() {
    setLoading(true);
    const { data, error } = await supabase
      .from('publications')
      .select('*')
      .order('year', { ascending: false });
    if (!error && data) setPublications(data as Publication[]);
    setLoading(false);
  }

  useEffect(() => {
    loadPublications();
  }, []);

  function openAdd() {
    setEditing(null);
    setForm(emptyForm);
    setError(null);
    setModalOpen(true);
  }

  function openEdit(pub: Publication) {
    setEditing(pub);
    setForm({
      year: pub.year ?? new Date().getFullYear(),
      title_zh: pub.title_zh ?? '',
      title_en: pub.title_en ?? '',
      authors: pub.authors ?? '',
      journal: pub.journal ?? '',
      doi: pub.doi ?? '',
      url: pub.url ?? '',
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

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    if (editing) {
      const { error: err } = await supabase
        .from('publications')
        .update(form)
        .eq('id', editing.id);
      if (err) {
        setError(err.message);
        setSaving(false);
        return;
      }
    } else {
      const { error: err } = await supabase.from('publications').insert([form]);
      if (err) {
        setError(err.message);
        setSaving(false);
        return;
      }
    }
    setSaving(false);
    closeModal();
    loadPublications();
  }

  async function handleDelete(id: string | number) {
    if (!window.confirm('确认删除该论文？')) return;
    await supabase.from('publications').delete().eq('id', id);
    loadPublications();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-serif font-bold text-forest-800 dark:text-forest-100">
          论文发表管理
        </h1>
        <button
          onClick={openAdd}
          className="bg-forest-600 hover:bg-forest-500 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          + 添加论文
        </button>
      </div>

      <div className="bg-white dark:bg-forest-900 rounded-xl border border-forest-100 dark:border-forest-800 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr>
              {['年份', '标题（中）', '作者', '期刊', '操作'].map((col) => (
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
                <td colSpan={5} className="px-4 py-6 text-center text-sm text-gray-400">
                  加载中…
                </td>
              </tr>
            ) : publications.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-sm text-gray-400">
                  暂无数据
                </td>
              </tr>
            ) : (
              publications.map((p) => (
                <tr key={p.id}>
                  <td className="border-t border-forest-50 dark:border-forest-800 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">
                    {p.year}
                  </td>
                  <td className="border-t border-forest-50 dark:border-forest-800 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 max-w-xs">
                    <div className="truncate">{p.title_zh}</div>
                    {p.doi && (
                      <div className="text-xs text-gray-400 truncate">DOI: {p.doi}</div>
                    )}
                  </td>
                  <td className="border-t border-forest-50 dark:border-forest-800 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 max-w-[160px]">
                    <div className="truncate">{p.authors}</div>
                  </td>
                  <td className="border-t border-forest-50 dark:border-forest-800 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 max-w-[160px]">
                    <div className="truncate">{p.journal}</div>
                  </td>
                  <td className="border-t border-forest-50 dark:border-forest-800 px-4 py-3 text-sm">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEdit(p)}
                        className="bg-forest-100 hover:bg-forest-200 text-forest-700 px-3 py-1 rounded text-sm"
                      >
                        编辑
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
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
              {editing ? '编辑论文' : '添加论文'}
            </h2>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                  年份
                </label>
                <input
                  type="number"
                  name="year"
                  value={form.year}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-forest-700 rounded-lg bg-white dark:bg-forest-950 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-forest-500"
                />
              </div>

              {[
                { label: '标题（中文）', name: 'title_zh' },
                { label: '标题（英文）', name: 'title_en' },
                { label: '作者', name: 'authors' },
                { label: '期刊', name: 'journal' },
                { label: 'DOI', name: 'doi' },
                { label: '链接 URL', name: 'url' },
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
