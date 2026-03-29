'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import EventCard from '@/components/EventCard';
import Modal from '@/components/Modal';
import { useAuth } from '@/context/AuthContext';
import './dashboard.css';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function Dashboard() {
  const { user, loading: authLoading, getAuthHeaders } = useAuth();
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [eventTypes, setEventTypes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newType, setNewType] = useState({ title: '', description: '', duration: 30, slug: '', location: 'Video call' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading && !user) router.push('/signin');
  }, [user, authLoading, router]);

  const loadData = () => {
    if (!user) return;
    setLoading(true);
    fetch(`${API}/api/event-types`, { headers: getAuthHeaders() })
      .then(r => r.json())
      .then(setEventTypes)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (user) loadData();
  }, [user]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      const res = await fetch(`${API}/api/event-types`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(newType),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setIsModalOpen(false);
      setNewType({ title: '', description: '', duration: 30, slug: '', location: 'Video call' });
      loadData();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || 'Failed to create event type');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this event type?')) return;
    await fetch(`${API}/api/event-types/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    loadData();
  };

  if (authLoading) return <div className="loading-container">Loading...</div>;
  if (!user) return null;

  return (
    <div className="dashboard-page">
      <Navbar />
      <main className="container main-content">
        <header className="page-header">
          <div>
            <h1 className="page-title">Event Types</h1>
            <p className="page-subtitle">Create events to share for people to book on your calendar.</p>
          </div>
          <button className="btn-primary" onClick={() => setIsModalOpen(true)}>+ New Event Type</button>
        </header>

        {loading ? (
          <div className="loading-state">Loading event types...</div>
        ) : eventTypes.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📅</div>
            <h2>No event types yet</h2>
            <p>Create your first event type to start sharing your calendar.</p>
            <button className="btn-primary" onClick={() => setIsModalOpen(true)}>Create your first event type</button>
          </div>
        ) : (
          <div className="event-types-grid">
            {eventTypes.map((event) => (
              <EventCard
                key={event._id}
                id={event._id}
                title={event.title}
                description={event.description}
                duration={event.duration}
                slug={event.slug}
                isEnabled={event.isEnabled}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create a new event type">
          <form onSubmit={handleCreate} className="event-type-form">
            {error && <div className="form-error">{error}</div>}
            <div className="form-group">
              <label>Title</label>
              <input type="text" required value={newType.title}
                onChange={e => setNewType({ ...newType, title: e.target.value })}
                placeholder="e.g. 15 Minute Meeting" />
            </div>
            <div className="form-group">
              <label>URL Slug</label>
              <div className="slug-input-wrapper">
                <span>cal.com/{user.username}/</span>
                <input type="text" required value={newType.slug}
                  onChange={e => setNewType({ ...newType, slug: e.target.value.toLowerCase().replace(/\s/g, '-') })}
                  placeholder="30min" />
              </div>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea rows={3} value={newType.description}
                onChange={e => setNewType({ ...newType, description: e.target.value })}
                placeholder="A brief description of this meeting..." />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Duration (minutes)</label>
                <input type="number" required min={5} value={newType.duration}
                  onChange={e => setNewType({ ...newType, duration: parseInt(e.target.value) })} />
              </div>
              <div className="form-group">
                <label>Location</label>
                <select value={newType.location}
                  onChange={e => setNewType({ ...newType, location: e.target.value })}>
                  <option>Video call</option>
                  <option>Phone call</option>
                  <option>Google Meet</option>
                  <option>Zoom</option>
                  <option>In person</option>
                </select>
              </div>
            </div>
            <div className="modal-actions">
              <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? 'Creating...' : 'Create Event Type'}
              </button>
            </div>
          </form>
        </Modal>
      </main>
    </div>
  );
}
