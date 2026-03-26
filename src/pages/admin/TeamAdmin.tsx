import React, { useEffect, useState } from 'react';
import { supabase, TeamMember } from '../../lib/supabase';

const emptyForm = {
  name_zh: '',
  name_en: '',
  role_zh: '',
  role_en: '',
  direction_zh: '',
  direction_en: '',
  sort_order: 0,
};

type FormState = typeof emptyForm;

export default function TeamAdmin() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadMembers() {
    setLoading(true);
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .order('sort_order', { ascending: true });
    if (!error && data) setMembers(data as TeamMember[]);
    setLoading(false);
  }

  useEffect(() => {
    loadMembers();
  }, []);

  function openAdd() {
    setEditing(null);
    setForm(emptyForm);
    setError(null);
    setModalOpen(true);
  }

  function openEdit(member: TeamMember) {
    setEditing(member);
    setForm({
      name_zh: member.name_zh ?? '',
      name_en: member.name_en ?? '',
      role_zh: member.role_zh ?? '',
      role_en: member.role_en ?? '',
      direction_zh: member.direction_zh ?? '',
      direction_en: member.direction_en ?? '',
      sort_order: member.sort_order ?? 0,
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
        .from('team_members')
        .update(form)
        .eq('id', editing.id);
      if (err) {
        setError(err.message);
        setSaving(false);
        return;
      }
    } else {
      const { error: err } = await supabase.from('team_members').insert([form]);
      if (err) {
        setError(err.message);
        setSaving(false);
        return;
      }
    }
    setSaving(false);
    closeModal();
    loadMembers();
  }

  async function handleDelete(id: string | number) {
    if (!window.confirm('确认删除该成员？')) return;
    await supabase.from('team_members').delete().eq('id', id);
    loadMembers();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-serif font-bold text-forest-800 dark:text-forest-100">
          团队成员管理
        </h1>
        <button
          onClick={openAdd}
          className="bg-forest-600 hover:bg-forest-500 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          + 添加成员
        </button>
      </div>

      <div className="bg-white dark:bg-forest-900 rounded-xl border border-forest-100 dark:border-forest-800 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr>
              {['姓名（中/英）', '角色（中）', '研究方向（中）', '排序', '操作'].map((col) => (
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
            ) : members.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-sm text-gray-400">
                  暂无数据
                </td>
              </tr>
            ) : (
              members.map((m) => (
                <tr key={m.id}>
                  <td className="border-t border-forest-50 dark:border-forest-800 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    <div className="font-medium">{m.name_zh}</div>
                    <div className="text-gray-400 text-xs">{m.name_en}</div>
                  </td>
                  <td className="border-t border-forest-50 dark:border-forest-800 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    {m.role_zh}
                  </td>
                  <td className="border-t border-forest-50 dark:border-forest-800 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    {m.direction_zh}
                  </td>
                  <td className="border-t border-forest-50 dark:border-forest-800 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    {m.sort_order}
                  </td>
                  <td className="border-t border-forest-50 dark:border-forest-800 px-4 py-3 text-sm">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEdit(m)}
                        className="bg-forest-100 hover:bg-forest-200 text-forest-700 px-3 py-1 rounded text-sm"
                      >
                        编辑
                      </button>
                      <button
                        onClick={() => handleDelete(m.id)}
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
          <div className="bg-white dark:bg-forest-900 rounded-xl shadow-xl w-full max-w-lg mx-4 p-6">
            <h2 className="text-lg font-serif font-bold text-forest-800 dark:text-forest-100 mb-4">
              {editing ? '编辑成员' : '添加成员'}
            </h2>

            <div className="space-y-3">
              {[
                { label: '姓名（中文）', name: 'name_zh' },
                { label: '姓名（英文）', name: 'name_en' },
                { label: '角色（中文）', name: 'role_zh' },
                { label: '角色（英文）', name: 'role_en' },
                { label: '研究方向（中文）', name: 'direction_zh' },
                { label: '研究方向（英文）', name: 'direction_en' },
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
