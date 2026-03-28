'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/context/AuthContext';
import './availability.css';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

interface DayAvail {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  enabled: boolean;
  _id?: string;
}

export default function AvailabilityPage() {
  const { user, loading: authLoading, getAuthHeaders } = useAuth();
  const router = useRouter();
  const [availability, setAvailability] = useState<DayAvail[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) router.push('/signin');
  }, [user, authLoading, router]);

  useEffect(() => {
    if (!user) return;
    fetch(`${API}/api/availability`, { headers: getAuthHeaders() })
      .then(r => r.json())
      .then((data: any[]) => {
        const fullAvail = DAYS.map((_, index) => {
          const found = data.find(a => a.dayOfWeek === index);
          return found
            ? { ...found, enabled: true }
            : { dayOfWeek: index, startTime: '09:00', endTime: '17:00', enabled: false };
        });
        setAvailability(fullAvail);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);

  const handleToggle = (index: number) => {
    setAvailability(prev => prev.map((d, i) => i === index ? { ...d, enabled: !d.enabled } : d));
  };

  const handleTimeChange = (index: number, field: 'startTime' | 'endTime', value: string) => {
    setAvailability(prev => prev.map((d, i) => i === index ? { ...d, [field]: value } : d));
  };

  const saveAvailability = async () => {
    setSaving(true);
    setSuccess(false);
    try {
      const dataToSave = availability.filter(a => a.enabled);
      const res = await fetch(`${API}/api/availability`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ availability: dataToSave }),
      });
      if (res.ok) setSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (authLoading) return <div className="loading-container">Loading...</div>;
  if (!user) return null;

  return (
    <div className="availability-page">
      <Navbar />
      <main className="container main-content">
        <header className="page-header">
          <div>
            <h1 className="page-title">Availability</h1>
            <p className="page-subtitle">Configure times when you are available for bookings.</p>
          </div>
          <button className="btn-save-main" onClick={saveAvailability} disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </header>

        {success && (
          <div className="success-banner">✓ Availability saved successfully!</div>
        )}

        {loading ? (
          <div className="loading-state">Loading schedule...</div>
        ) : (
          <div className="availability-container">
            <div className="availability-card">
              <div className="card-header">
                <h3>Weekly Hours</h3>
                <p>Set when you're regularly available</p>
              </div>
              <div className="days-list">
                {availability.map((day, index) => (
                  <div key={index} className={`day-row ${!day.enabled ? 'day-disabled' : ''}`}>
                    <div className="day-info">
                      <label className="toggle-label">
                        <input
                          type="checkbox"
                          checked={day.enabled}
                          onChange={() => handleToggle(index)}
                          className="toggle-input"
                        />
                        <div className="toggle-switch"></div>
                      </label>
                      <span className="day-name">{DAYS[index]}</span>
                    </div>

                    {day.enabled ? (
                      <div className="time-inputs">
                        <input
                          type="time"
                          value={day.startTime}
                          onChange={e => handleTimeChange(index, 'startTime', e.target.value)}
                        />
                        <span className="time-separator">—</span>
                        <input
                          type="time"
                          value={day.endTime}
                          onChange={e => handleTimeChange(index, 'endTime', e.target.value)}
                        />
                      </div>
                    ) : (
                      <div className="unavailable-label">Unavailable</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
