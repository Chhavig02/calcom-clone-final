import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="container hero-container">
        <div className="hero-left">
          <div className="promo-badge">
            <span className="badge">Moving from Clockwise?</span>
            <span className="promo-text">Set a priority call with our team today!</span>
            <button className="promo-btn">Book a demo ↗</button>
          </div>
          
          <div className="hero-content">
            <span className="version-badge">Cal.com launches v6.3 &gt;</span>
            <h1>The better way to schedule your meetings</h1>
            <p>
              A fully customizable scheduling software for individuals, businesses taking 
              calls and developers building scheduling platforms where users meet users.
            </p>
            
            <div className="hero-cta">
              <button className="btn btn-primary btn-google">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://www.google.com/favicon.ico" alt="Google" width="16" height="16" />
                Sign up with Google
              </button>
              <button className="btn btn-secondary">
                Sign up with email &gt;
              </button>
            </div>
            <p className="no-card">No credit card required</p>
          </div>
        </div>
        
        <div className="hero-right">
          <div className="hero-mockup-card">
            <div className="mockup-header">
              <div className="mockup-avatar">EB</div>
              <div className="mockup-details">
                <p className="mockup-name">Emma Brown</p>
                <p className="mockup-title">Office Hours</p>
              </div>
            </div>
            <p className="mockup-desc">
              Join a virtual meeting to discuss your child&apos;s academic progress and development plan.
            </p>
            <div className="mockup-duration">
              <span className="duration-pill active">15m</span>
              <span className="duration-pill">30m</span>
              <span className="duration-pill">45m</span>
              <span className="duration-pill">1h</span>
            </div>
            <div className="mockup-meta">
              <span>🖥️ MS Teams</span>
              <span>🌍 America/New York ⌄</span>
            </div>
            
            <div className="mockup-calendar">
              <div className="calendar-header">
                <span className="month">May 2025</span>
              </div>
              <div className="calendar-grid">
                <span>SUN</span><span>MON</span><span>TUE</span><span>WED</span><span>THU</span>
                <span className="muted"></span><span className="muted"></span><span className="muted"></span><span>1</span><span>2</span>
                <span>5</span><span className="active">6</span><span>7</span><span>8</span><span>9</span>
                <span>12</span><span>13</span><span>14</span><span>15</span><span className="selected">16</span>
              </div>
            </div>
          </div>
          
          <div className="hero-ratings">
             <div className="rating-item">⭐⭐⭐⭐⭐ Trustpilot</div>
             <div className="rating-item">⭐⭐⭐⭐⭐ Product Hunt</div>
             <div className="rating-item">⭐⭐⭐⭐⭐ G2</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
