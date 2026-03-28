'use client';

import Link from 'next/link';
import { useState } from 'react';
import './EventCard.css';

interface EventCardProps {
  id: string;
  title: string;
  description: string;
  duration: number;
  slug: string;
  isEnabled: boolean;
  onDelete?: (id: string) => void;
}

const EventCard = ({ id, title, description, duration, slug, isEnabled, onDelete }: EventCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${window.location.origin}/book/${slug}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="event-card">
      <div className="event-card-header">
        <div className="event-card-dot"></div>
        <div className="event-card-info">
          <h3 className="event-card-title">{title}</h3>
          <p className="event-card-slug">/{slug}</p>
        </div>
      </div>

      {description && <p className="event-card-description">{description}</p>}

      <div className="event-card-meta">
        <span className="duration-badge">🕒 {duration}m</span>
        <span className="status-badge">{isEnabled ? '● Active' : '○ Inactive'}</span>
      </div>

      <div className="event-card-footer">
        <button className="btn-card-action" onClick={handleCopy}>
          {copied ? '✓ Copied!' : '🔗 Copy link'}
        </button>
        <Link href={`/book/${slug}`} target="_blank" className="btn-card-action">
          👁 Preview
        </Link>
        {onDelete && (
          <button className="btn-card-action btn-delete" onClick={() => onDelete(id)}>
            🗑 Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default EventCard;
