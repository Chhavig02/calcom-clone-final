'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/context/AuthContext';
import './bookings.css';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function Bookings() {
  const { user, loading: authLoading, getAuthHeaders } = useAuth();
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'cancelled'>('upcoming');

  useEffect(() => {
    if (!authLoading && !user) router.push('/signin');
  }, [user, authLoading, router]);

  const loadBookings = () => {
    if (!user) return;
    setLoading(true);
    fetch(`${API}/api/bookings`, { headers: getAuthHeaders() })
      .then(r => r.json())
      .then(setBookings)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (user) loadBookings();
  }, [user]);

  const handleCancel = async (id: string) => {
    if (!confirm('Cancel this booking?')) return;
    await fetch(`${API}/api/bookings/${id}/cancel`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
    });
    loadBookings();
  };

  const filteredBookings = bookings.filter(b => b.status === activeTab.toUpperCase());

  if (authLoading) return <div className="loading-container">Loading...</div>;
  if (!user) return null;

  return (
    <div className="bookings-page">
      <Navbar />
      <main className="container main-content">
        <header className="page-header">
          <div>
            <h1 className="page-title">Bookings</h1>
            <p className="page-subtitle">See upcoming and past events booked through your links.</p>
          </div>
        </header>

        <div className="bookings-tabs">
          {(['upcoming', 'past', 'cancelled'] as const).map(tab => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="loading-state">Loading bookings...</div>
        ) : filteredBookings.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h2>No {activeTab} bookings</h2>
            <p>{activeTab === 'upcoming' ? 'Share your booking link to get your first booking.' : 'Nothing here yet.'}</p>
          </div>
        ) : (
          <div className="bookings-list">
            {filteredBookings.map((booking) => (
              <div key={booking._id} className="booking-card">
                <div className="booking-card-left">
                  <div className="booking-dot"></div>
                  <div className="booking-details">
                    <h3 className="booking-title">{booking.eventTypeId?.title || 'Meeting'}</h3>
                    <p className="booking-time">
                      {new Date(booking.startTime).toLocaleString([], { dateStyle: 'full', timeStyle: 'short' })}
                    </p>
                    <div className="booking-attendee">
                      <span className="attendee-avatar">{booking.bookerName?.charAt(0)}</span>
                      <div>
                        <p className="attendee-name">{booking.bookerName}</p>
                        <p className="attendee-email">{booking.bookerEmail}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="booking-card-right">
                  <span className={`status-pill ${booking.status.toLowerCase()}`}>
                    {booking.status}
                  </span>
                  {booking.status === 'UPCOMING' && (
                    <button className="btn-cancel" onClick={() => handleCancel(booking._id)}>
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
