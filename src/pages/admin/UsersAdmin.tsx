import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

type Role = 'admin' | 'data_admin' | 'user';

const ROLE_LABELS: Record<Role, string> = {
  admin: '全站管理员',
  data_admin: '数据管理员',
  user: '普通用户',
};

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  role: Role;
}

export default function UsersAdmin() {
  const { isAdmin } = useAuth();

  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);
  const [selectedRole, setSelectedRole] = useState<Role>('user');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  async function loadProfiles() {
    setLoading(true);
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('email', { ascending: true });
    if (!error && data) setProfiles(data as Profile[]);
    setLoading(false);
  }

  useEffect(() => {
    loadProfiles();
  }, []);

  function openEditRole(profile: Profile) {
    setEditingProfile(profile);
    setSelectedRole(profile.role ?? 'user');
    setError(null);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingProfile(null);
    setError(null);
  }

  async function handleSaveRole() {
    if (!editingProfile) return;
    setSaving(true);
    setError(null);
    const { error: err } = await supabase
      .from('profiles')
      .update({ role: selectedRole })
      .eq('id', editingProfile.id);
    if (err) {
      setError(err.message);
      setSaving(false);
      return;
    }
    setSaving(false);
    closeModal();
    loadProfiles();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-serif font-bold text-forest-800 dark:text-forest-100">
          用户管理
        </h1>
      </div>

      <div className="mb-4 px-4 py-3 bg-forest-50 dark:bg-forest-800 border border-forest-100 dark:border-forest-700 rounded-lg text-sm text-forest-700 dark:text-forest-300">
        通过 Supabase 控制台邀请新用户
      </div>

      <div className="bg-white dark:bg-forest-900 rounded-xl border border-forest-100 dark:border-forest-800 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr>
              {['邮箱', '姓名', '角色', '操作'].map((col) => (
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
            ) : profiles.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-sm text-gray-400">
                  暂无用户
                </td>
              </tr>
            ) : (
              profiles.map((profile) => (
                <tr key={profile.id}>
                  <td className="border-t border-forest-50 dark:border-forest-800 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    {profile.email}
                  </td>
                  <td className="border-t border-forest-50 dark:border-forest-800 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    {profile.full_name ?? <span className="text-gray-400">—</span>}
                  </td>
                  <td className="border-t border-forest-50 dark:border-forest-800 px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                        profile.role === 'admin'
                          ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300'
                          : profile.role === 'data_admin'
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
                          : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                      }`}
                    >
                      {ROLE_LABELS[profile.role] ?? profile.role}
                    </span>
                  </td>
                  <td className="border-t border-forest-50 dark:border-forest-800 px-4 py-3 text-sm">
                    <button
                      onClick={() => openEditRole(profile)}
                      className="bg-forest-100 hover:bg-forest-200 text-forest-700 px-3 py-1 rounded text-sm"
                    >
                      修改角色
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && editingProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-forest-900 rounded-xl shadow-xl w-full max-w-lg mx-4 p-6">
            <h2 className="text-lg font-serif font-bold text-forest-800 dark:text-forest-100 mb-4">
              修改用户角色
            </h2>

            <div className="mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                用户：<span className="font-medium">{editingProfile.email}</span>
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                角色
              </label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as Role)}
                className="w-full px-3 py-2 border border-gray-200 dark:border-forest-700 rounded-lg bg-white dark:bg-forest-950 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-forest-500"
              >
                <option value="admin">全站管理员</option>
                <option value="data_admin">数据管理员</option>
                <option value="user">普通用户</option>
              </select>
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
                onClick={handleSaveRole}
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
