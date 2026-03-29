const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const fetchEventTypes = async () => {
  const res = await fetch(`${API_BASE_URL}/event-types`);
  if (!res.ok) throw new Error('Failed to fetch event types');
  return res.json();
};

export const fetchAvailability = async () => {
  const res = await fetch(`${API_BASE_URL}/availability`);
  if (!res.ok) throw new Error('Failed to fetch availability');
  return res.json();
};

export const fetchBookings = async () => {
  const res = await fetch(`${API_BASE_URL}/bookings`);
  if (!res.ok) throw new Error('Failed to fetch bookings');
  return res.json();
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createBooking = async (data: any) => {
  const res = await fetch(`${API_BASE_URL}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res;
};

export const cancelBooking = async (id: string) => {
  const res = await fetch(`${API_BASE_URL}/bookings/${id}/cancel`, {
    method: 'PATCH',
  });
  return res.json();
};
