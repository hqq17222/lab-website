import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

interface SettingField {
  key: string;
  label: string;
  placeholder?: string;
}

const SETTING_FIELDS: SettingField[] = [
  {
    key: 'data_platform_url',
    label: '天空地数据平台 URL',
    placeholder: 'https://example.com/data-platform',
  },
];

type SettingsMap = Record<string, string>;

export default function SettingsAdmin() {
  const { isAdmin } = useAuth();

  const [values, setValues] = useState<SettingsMap>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  async function loadSettings() {
    setLoading(true);
    const keys = SETTING_FIELDS.map((f) => f.key);
    const { data, error } = await supabase
      .from('settings')
      .select('key, value')
      .in('key', keys);
    if (!error && data) {
      const map: SettingsMap = {};
      for (const row of data as { key: string; value: string }[]) {
        map[row.key] = row.value ?? '';
      }
      setValues(map);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadSettings();
  }, []);

  function handleChange(key: string, val: string) {
    setValues((prev) => ({ ...prev, [key]: val }));
    setSuccessMsg(null);
    setErrorMsg(null);
  }

  async function handleSave() {
    setSaving(true);
    setSuccessMsg(null);
    setErrorMsg(null);

    const upsertRows = SETTING_FIELDS.map((f) => ({
      key: f.key,
      value: values[f.key] ?? '',
    }));

    const { error } = await supabase
      .from('settings')
      .upsert(upsertRows, { onConflict: 'key' });

    if (error) {
      setErrorMsg(`保存失败：${error.message}`);
    } else {
      setSuccessMsg('设置已保存');
    }

    setSaving(false);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-serif font-bold text-forest-800 dark:text-forest-100">
          系统设置
        </h1>
      </div>

      <div className="bg-white dark:bg-forest-900 rounded-xl border border-forest-100 dark:border-forest-800 p-6 max-w-xl">
        {loading ? (
          <p className="text-sm text-gray-400">加载中…</p>
        ) : (
          <div className="space-y-5">
            {SETTING_FIELDS.map((field) => (
              <div key={field.key}>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                  {field.label}
                </label>
                <input
                  type="text"
                  value={values[field.key] ?? ''}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-forest-700 rounded-lg bg-white dark:bg-forest-950 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-forest-500"
                />
              </div>
            ))}

            {successMsg && (
              <p className="text-sm text-green-600 dark:text-green-400">{successMsg}</p>
            )}
            {errorMsg && (
              <p className="text-sm text-red-600 dark:text-red-400">{errorMsg}</p>
            )}

            <div className="pt-1">
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-forest-600 hover:bg-forest-500 text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50"
              >
                {saving ? '保存中…' : '保存设置'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
