'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import './success.css';

function SuccessContent() {
  const params = useSearchParams();
  const eventName = params.get('event') || 'Meeting';
  const date = params.get('date') || '';
  const time = params.get('time') || '';
  const name = params.get('name') || 'Guest';

  const googleCalUrl = date && time ? (() => {
    const start = new Date(`${date} ${time}`);
    const end = new Date(start.getTime() + 30 * 60000);
    const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventName)}&dates=${fmt(start)}/${fmt(end)}`;
  })() : null;

  return (
    <div className="success-page">
      <div className="success-card">
        <div className="success-icon">✓</div>
        <h1>This meeting is scheduled</h1>
        <p className="success-subtitle">
          A calendar invitation has been sent to your email address.
        </p>

        <div className="booking-summary">
          <div className="summary-row">
            <span className="summary-label">📅 What</span>
            <span className="summary-value">{eventName}</span>
          </div>
          {date && (
            <div className="summary-row">
              <span className="summary-label">🕒 When</span>
              <span className="summary-value">
                {new Date(date).toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
                {time && ` at ${time}`}
              </span>
            </div>
          )}
          <div className="summary-row">
            <span className="summary-label">👤 Who</span>
            <span className="summary-value">{name}</span>
          </div>
        </div>

        <div className="success-actions">
          {googleCalUrl && (
            <a href={googleCalUrl} target="_blank" rel="noopener noreferrer" className="btn-add-cal">
              + Add to Google Calendar
            </a>
          )}
          <Link href="/" className="btn-done">Done</Link>
        </div>
      </div>
    </div>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense fallback={<div className="success-page"><div className="success-card">Loading...</div></div>}>
      <SuccessContent />
    </Suspense>
  );
}
