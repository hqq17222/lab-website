import React, { useEffect, useState } from 'react';
import { supabase, Project } from '../../lib/supabase';

const emptyForm = {
  title_zh: '',
  title_en: '',
  source_zh: '',
  source_en: '',
  period: '',
  status_zh: '在研',
  status_en: 'Ongoing',
  sort_order: 0,
};

type FormState = typeof emptyForm;

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadProjects() {
    setLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('sort_order', { ascending: true });
    if (!error && data) setProjects(data as Project[]);
    setLoading(false);
  }

  useEffect(() => {
    loadProjects();
  }, []);

  function openAdd() {
    setEditing(null);
    setForm(emptyForm);
    setError(null);
    setModalOpen(true);
  }

  function openEdit(project: Project) {
    setEditing(project);
    setForm({
      title_zh: project.title_zh ?? '',
      title_en: project.title_en ?? '',
      source_zh: project.source_zh ?? '',
      source_en: project.source_en ?? '',
      period: project.period ?? '',
      status_zh: project.status_zh ?? '在研',
      status_en: project.status_en ?? 'Ongoing',
      sort_order: project.sort_order ?? 0,
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

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
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
        .from('projects')
        .update(form)
        .eq('id', editing.id);
      if (err) {
        setError(err.message);
        setSaving(false);
        return;
      }
    } else {
      const { error: err } = await supabase.from('projects').insert([form]);
      if (err) {
        setError(err.message);
        setSaving(false);
        return;
      }
    }
    setSaving(false);
    closeModal();
    loadProjects();
  }

  async function handleDelete(id: string | number) {
    if (!window.confirm('确认删除该项目？')) return;
    await supabase.from('projects').delete().eq('id', id);
    loadProjects();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-serif font-bold text-forest-800 dark:text-forest-100">
          科研项目管理
        </h1>
        <button
          onClick={openAdd}
          className="bg-forest-600 hover:bg-forest-500 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          + 添加项目
        </button>
      </div>

      <div className="bg-white dark:bg-forest-900 rounded-xl border border-forest-100 dark:border-forest-800 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr>
              {['项目名称（中）', '资助来源（中）', '期限', '状态', '操作'].map((col) => (
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
            ) : projects.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-sm text-gray-400">
                  暂无数据
                </td>
              </tr>
            ) : (
              projects.map((p) => (
                <tr key={p.id}>
                  <td className="border-t border-forest-50 dark:border-forest-800 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 max-w-xs">
                    <div className="font-medium truncate">{p.title_zh}</div>
                    <div className="text-xs text-gray-400 truncate">{p.title_en}</div>
                  </td>
                  <td className="border-t border-forest-50 dark:border-forest-800 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    {p.source_zh}
                  </td>
                  <td className="border-t border-forest-50 dark:border-forest-800 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">
                    {p.period}
                  </td>
                  <td className="border-t border-forest-50 dark:border-forest-800 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                        p.status_zh === '在研'
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300'
                          : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                      }`}
                    >
                      {p.status_zh}
                    </span>
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
              {editing ? '编辑项目' : '添加项目'}
            </h2>

            <div className="space-y-3">
              {[
                { label: '项目名称（中文）', name: 'title_zh' },
                { label: '项目名称（英文）', name: 'title_en' },
                { label: '资助来源（中文）', name: 'source_zh' },
                { label: '资助来源（英文）', name: 'source_en' },
                { label: '期限（如：2022–2025）', name: 'period' },
                { label: '状态（中文）', name: 'status_zh' },
                { label: '状态（英文）', name: 'status_en' },
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

              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                  排序（数字越小越靠前）
                </label>
                <input
                  type="number"
                  name="sort_order"
                  value={form.sort_order}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-forest-700 rounded-lg bg-white dark:bg-forest-950 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-forest-500"
                />
              </div>
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
