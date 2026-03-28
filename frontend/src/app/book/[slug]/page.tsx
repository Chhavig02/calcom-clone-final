'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchEventTypes, fetchAvailability, createBooking } from '@/lib/api';
import './booking-page.css';

export default function PublicBookingPage() {
  const { slug } = useParams();
  const [eventType, setEventType] = useState<any>(null);
  const [availability, setAvailability] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1); // 1: Date, 2: Time, 3: Form
  const [bookerName, setBookerName] = useState('');
  const [bookerEmail, setBookerEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const events = await fetchEventTypes();
        const event = events.find((e: any) => e.slug === slug);
        setEventType(event);

        const avail = await fetchAvailability();
        setAvailability(avail);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [slug]);

  const generateTimeSlots = (date: Date) => {
    if (!eventType || !availability) return [];
    
    const dayOfWeek = date.getDay();
    const dayAvail = availability.find(a => a.dayOfWeek === dayOfWeek);
    
    if (!dayAvail) return [];

    const slots = [];
    let current = new Date(date);
    const [startH, startM] = dayAvail.startTime.split(':').map(Number);
    const [endH, endM] = dayAvail.endTime.split(':').map(Number);
    
    current.setHours(startH, startM, 0, 0);
    const endTimeObj = new Date(date);
    endTimeObj.setHours(endH, endM, 0, 0);

    while (current < endTimeObj) {
      slots.push(new Date(current).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
      current.setMinutes(current.getMinutes() + eventType.duration);
    }

    return slots;
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setStep(2);
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;

    setIsSubmitting(true);
    const start = new Date(selectedDate);
    const [h, m] = selectedTime.split(':').map(Number);
    start.setHours(h, m, 0, 0);
    
    const end = new Date(start);
    end.setMinutes(end.getMinutes() + eventType.duration);

    try {
      const res = await createBooking({
        eventTypeId: eventType._id,
        bookerName,
        bookerEmail,
        startTime: start.toISOString(),
        endTime: end.toISOString()
      });

      if (res.ok) {
        const params = new URLSearchParams({
          event: eventType.title,
          date: selectedDate.toLocaleDateString(),
          time: selectedTime,
          name: bookerName,
        });
        window.location.href = `/booking/success?${params.toString()}`;
      } else {
        const data = await res.json();
        alert(data.message || 'Error creating booking');
      }
    } catch (err) {
      console.error(err);
      alert('Internal server error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="loading-container">Loading...</div>;
  if (!eventType) return <div className="error-container">Event not found.</div>;

  return (
    <div className="booking-page-container">
      <div className="booking-card">
        <div className="booking-sidebar">
          <div className="sidebar-header">
            <div className="host-avatar">JD</div>
            <p className="host-name">John Doe</p>
          </div>
          <h1 className="event-title-booking">{eventType.title}</h1>
          <div className="event-meta">
            <span className="meta-item">🕒 {eventType.duration}m</span>
          </div>
          <p className="event-description-booking">{eventType.description}</p>
        </div>

        <div className="booking-main">
          {step === 1 && (
            <div className="date-selection">
              <div className="calendar-header-main">
                <h2>Select a Date</h2>
                <div className="calendar-nav">
                  <span className="current-month">
                    {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}
                  </span>
                  <div className="nav-arrows">
                    <button className="nav-arrow">&lt;</button>
                    <button className="nav-arrow">&gt;</button>
                  </div>
                </div>
              </div>
              
              <div className="calendar-grid-7">
                <span>SUN</span><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span>
                {/* Dynamic empty slots for month start */}
                {[...Array(new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay())].map((_, i) => (
                  <span key={`empty-${i}`} className="muted-day"></span>
                ))}
                
                {/* Real days for the current month */}
                {[...Array(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate())].map((_, i) => {
                  const dayNum = i + 1;
                  const d = new Date(new Date().getFullYear(), new Date().getMonth(), dayNum);
                  const isAvailable = availability.some(a => a.dayOfWeek === d.getDay());
                  const isToday = d.toDateString() === new Date().toDateString();
                  const isSelected = selectedDate?.toDateString() === d.toDateString();
                  
                  return (
                    <button 
                      key={i} 
                      className={`calendar-cell ${!isAvailable ? 'unavailable' : ''} ${isToday ? 'today' : ''} ${isSelected ? 'selected-cell' : ''}`}
                      disabled={!isAvailable}
                      onClick={() => handleDateSelect(d)}
                    >
                      {dayNum}
                      {isAvailable && !isToday && <div className="avail-dot"></div>}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && selectedDate && (
            <div className="time-selection">
              <button className="btn-back" onClick={() => setStep(1)}>← Back</button>
              <h2>Select a Time</h2>
              <p className="selected-date-label">{selectedDate.toDateString()}</p>
              <div className="time-slots-grid">
                {generateTimeSlots(selectedDate).map((time) => (
                  <button 
                    key={time} 
                    className={`time-slot-btn ${selectedTime === time ? 'selected' : ''}`}
                    onClick={() => { setSelectedTime(time); setStep(3); }}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && selectedDate && selectedTime && (
            <div className="form-selection">
              <button className="btn-back" onClick={() => setStep(2)}>← Back</button>
              <h2>Confirm Booking</h2>
              <p className="booking-summary">
                {selectedDate.toDateString()} at {selectedTime}
              </p>
              <form onSubmit={handleBooking} className="booking-form">
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input 
                    id="name" 
                    type="text" 
                    required 
                    value={bookerName} 
                    onChange={e => setBookerName(e.target.value)} 
                    placeholder="Jane Doe"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input 
                    id="email" 
                    type="email" 
                    required 
                    value={bookerEmail} 
                    onChange={e => setBookerEmail(e.target.value)} 
                    placeholder="jane@example.com"
                  />
                </div>
                <button type="submit" className="btn-confirm" disabled={isSubmitting}>
                  {isSubmitting ? 'Confirming...' : 'Confirm Booking'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
