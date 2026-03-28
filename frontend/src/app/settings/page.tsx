'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/context/AuthContext';
import './settings.css';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function SettingsPage() {
  const { user, loading: authLoading, getAuthHeaders } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading && !user) router.push('/signin');
    if (user) {
      setName(user.name);
      setUsername(user.username);
    }
  }, [user, authLoading, router]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSaving(true);
    try {
      const res = await fetch(`${API}/api/auth/profile`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ name, username }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setSuccess('Profile updated successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (authLoading) return <div className="loading-container">Loading...</div>;
  if (!user) return null;

  return (
    <div className="settings-page">
      <Navbar />
      <main className="container main-content">
        <header className="page-header">
          <div>
            <h1 className="page-title">Settings</h1>
            <p className="page-subtitle">Manage your account settings and preferences.</p>
          </div>
        </header>

        <div className="settings-layout">
          <nav className="settings-nav">
            <button className="settings-nav-item active">Profile</button>
            <button className="settings-nav-item">Billing</button>
            <button className="settings-nav-item">Notifications</button>
            <button className="settings-nav-item">Security</button>
          </nav>

          <div className="settings-content">
            <div className="settings-card">
              <h2>Profile</h2>
              <p>Update your personal information.</p>

              {success && <div className="success-banner">✓ {success}</div>}
              {error && <div className="error-banner">✗ {error}</div>}

              <form onSubmit={handleSave} className="settings-form">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="input-disabled"
                  />
                  <p className="field-hint">Email cannot be changed.</p>
                </div>

                <div className="form-group">
                  <label>Username</label>
                  <div className="username-wrapper">
                    <span>cal.com/</span>
                    <input
                      type="text"
                      value={username}
                      onChange={e => setUsername(e.target.value.toLowerCase().replace(/\s/g, ''))}
                      required
                    />
                  </div>
                  <p className="field-hint">Your public booking URL: <strong>cal.com/{username}</strong></p>
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn-save" disabled={saving}>
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>

            <div className="settings-card danger-zone">
              <h2>Danger Zone</h2>
              <p>Permanently delete your account and all data.</p>
              <button className="btn-danger" onClick={() => alert('Account deletion coming soon.')}>
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
