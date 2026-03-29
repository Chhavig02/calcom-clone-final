'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import './signup.css';

export default function SignupPage() {
  const [step, setStep] = useState<'initial' | 'email'>('initial');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(name, email, password, username || email.split('@')[0]);
      router.push('/dashboard');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-left">
        <div className="signup-form-container">
          <Link href="/" className="signup-logo">Cal.com</Link>

          {step === 'initial' ? (
            <>
              <div className="signup-header">
                <h1>Create your Cal.com account</h1>
                <p>Free for individuals. Team plans for collaborative features.</p>
              </div>

              <div className="data-region">
                <label>Data region</label>
                <div className="select-wrapper">
                  <select>
                    <option>United States</option>
                    <option>European Union</option>
                  </select>
                </div>
              </div>

              <div className="divider-line"></div>

              <button
                className="btn-google-signup"
                onClick={() => setStep('email')}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://www.google.com/favicon.ico" alt="G" width="18" height="18" />
                Continue with Google
              </button>

              <div className="or-divider"><span>or</span></div>

              <button
                className="btn-email-signup"
                onClick={() => setStep('email')}
              >
                Continue with Email
              </button>

              <div className="saml-link">
                or <Link href="/signin">SAML SSO</Link>
              </div>

              <p className="signin-prompt">
                Already have an account? <Link href="/signin">Sign in</Link>
              </p>
            </>
          ) : (
            <>
              <div className="signup-header">
                <button className="back-btn" onClick={() => setStep('initial')}>← Back</button>
                <h1>Create your account</h1>
              </div>

              {error && <div className="error-banner">{error}</div>}

              <form onSubmit={handleEmailSubmit} className="signup-form">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="John Doe"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={e => {
                      setEmail(e.target.value);
                      if (!username) setUsername(e.target.value.split('@')[0]);
                    }}
                    placeholder="john@example.com"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <div className="username-wrapper">
                    <span>cal.com/</span>
                    <input
                      id="username"
                      type="text"
                      required
                      value={username}
                      onChange={e => setUsername(e.target.value.toLowerCase().replace(/\s/g, ''))}
                      placeholder="johndoe"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    type="password"
                    required
                    minLength={8}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Min. 8 characters"
                  />
                </div>
                <button type="submit" className="btn-submit" disabled={loading}>
                  {loading ? 'Creating account...' : 'Create Account'}
                </button>
              </form>

              <p className="signin-prompt">
                Already have an account? <Link href="/signin">Sign in</Link>
              </p>
            </>
          )}
        </div>
      </div>

      <div className="signup-right">
        <div className="signup-illustration">
          <div className="rating-badges">
            <div className="badge-item">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p>Product of the Day</p>
              <strong>1st</strong>
            </div>
            <div className="badge-item">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p>Product of the Week</p>
              <strong>1st</strong>
            </div>
            <div className="badge-item">
              <div className="stars">⭐⭐⭐⭐½</div>
              <p>Product of the Month</p>
              <strong>1st</strong>
            </div>
          </div>

          <div className="booking-preview-card">
            <div className="preview-header">
              <div className="preview-avatar">AF</div>
              <div>
                <p className="preview-name">Alex Fisher</p>
                <p className="preview-event">Design Workshop</p>
              </div>
            </div>
            <p className="preview-desc">A longer chat to run through design.</p>
            <div className="preview-meta">
              <span>🕒 30 mins</span>
              <span>🎥 Zoom</span>
              <span>🌍 Europe/Dublin</span>
            </div>
            <div className="preview-calendar-header">
              <span>June 2023</span>
              <div className="preview-time-cols">
                <div>
                  <p className="day-label">MON 20</p>
                  <button>9:30 am</button>
                  <button>10:00 am</button>
                  <button>10:30 am</button>
                  <button className="selected-time">11:00 am</button>
                  <button>12:00 pm</button>
                </div>
                <div>
                  <p className="day-label">TUE 21</p>
                  <button>9:30 am</button>
                  <button>10:00 am</button>
                  <button>11:30 am</button>
                  <button>12:00 pm</button>
                </div>
              </div>
            </div>
          </div>

          <div className="features-row">
            <div className="feature-item">📅 Connect all your calendars</div>
            <div className="feature-item">⏰ Set your availability</div>
            <div className="feature-item">🔗 Share a link or embed</div>
          </div>
        </div>
      </div>
    </div>
  );
}
