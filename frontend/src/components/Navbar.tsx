'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const navLinks = [
    { href: '/dashboard', label: 'Event Types' },
    { href: '/bookings', label: 'Bookings' },
    { href: '/availability', label: 'Availability' },
    { href: '/settings', label: 'Settings' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link href="/" className="navbar-logo">Cal.com</Link>

        <div className="navbar-links">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`navbar-link ${pathname === link.href ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="navbar-user">
          {user ? (
            <div className="user-menu">
              <div className="user-avatar" title={user.name}>
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="user-info">
                <span className="user-name">{user.name}</span>
                <span className="user-handle">cal.com/{user.username}</span>
              </div>
              <button className="btn-signout" onClick={handleLogout}>Sign out</button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link href="/signin" className="btn-nav-signin">Sign in</Link>
              <Link href="/signup" className="btn-nav-signup">Get started</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
