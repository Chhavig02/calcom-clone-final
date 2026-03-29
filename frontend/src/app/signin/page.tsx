'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import './signin.css';

export default function SigninPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      router.push('/dashboard');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-page">
      <div className="signin-container">
        <Link href="/" className="signin-logo">Cal.com</Link>

        <div className="signin-card">
          <h1>Welcome back</h1>
          <p>Sign in to your Cal.com account</p>

          {error && <div className="error-banner">{error}</div>}

          <form onSubmit={handleSubmit} className="signin-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="john@example.com"
                autoFocus
              />
            </div>
            <div className="form-group">
              <div className="password-label-row">
                <label htmlFor="password">Password</label>
                <button type="button" className="forgot-link">Forgot?</button>
              </div>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            <button type="submit" className="btn-signin" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div className="or-divider"><span>or</span></div>

          <button className="btn-google-signin" onClick={() => router.push('/signup')}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://www.google.com/favicon.ico" alt="G" width="18" height="18" />
            Continue with Google
          </button>
        </div>

        <p className="signup-prompt">
          Don&apos;t have an account? <Link href="/signup">Sign up for free</Link>
        </p>
      </div>
    </div>
  );
}
