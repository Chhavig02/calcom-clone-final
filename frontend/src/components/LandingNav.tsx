import Link from 'next/link';
import './LandingNav.css';

const LandingNav = () => {
  return (
    <header className="landing-nav">
      <div className="container landing-nav-content">
        <div className="landing-nav-logo">
          <Link href="/">
            <span className="logo-text">Cal.com</span>
          </Link>
        </div>

        <nav className="landing-nav-links">
          <span className="nav-item">Solutions <span className="chevron">⌄</span></span>
          <Link href="/signup" className="nav-item">Enterprise</Link>
          <Link href="/signup" className="nav-item">Cal.ai</Link>
          <span className="nav-item">Developer <span className="chevron">⌄</span></span>
          <span className="nav-item">Resources <span className="chevron">⌄</span></span>
          <Link href="/signup" className="nav-item">Pricing</Link>
        </nav>

        <div className="landing-nav-actions">
          <Link href="/signin" className="nav-item sign-in">Sign in</Link>
          <Link href="/signup" className="btn btn-primary get-started">Get started</Link>
        </div>
      </div>
    </header>
  );
};

export default LandingNav;
