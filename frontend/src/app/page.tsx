'use client';

import LandingNav from '@/components/LandingNav';
import HeroSection from '@/components/HeroSection';
import UseCases from '@/components/UseCases';
import './landing-page.css';

export default function LandingPage() {
  return (
    <div className="landing-page">
      <LandingNav />
      <main>
        <HeroSection />
        
        <section className="trusted-by">
          <div className="container">
            <p className="trusted-label">Trusted by fast-growing companies around the world</p>
            <div className="logo-grid">
              <span className="logo">PlanetScale</span>
              <span className="logo">coinbase</span>
              <span className="logo">storyblok</span>
              <span className="logo">AngelList</span>
              <span className="logo">Raycast</span>
            </div>
          </div>
        </section>

        <UseCases />

        <section className="how-it-works">
          <div className="container text-center">
             <span className="badge-pill">🐾 How it works</span>
             <h2 className="section-title">With us, appointment scheduling is easy</h2>
             <p className="section-desc">Effortless scheduling for business and individuals, powerful solutions for fast-growing modern companies.</p>
             
             <div className="how-grid">
                <div className="how-card">
                  <div className="how-number">01</div>
                  <h3>Connect your calendar</h3>
                  <p>We&apos;ll handle all the cross-referencing, so you don&apos;t have to worry about double bookings.</p>
                  <div className="how-img-placeholder">
                     <div className="inner-circle">Cal.com</div>
                  </div>
                </div>
                <div className="how-card">
                  <div className="how-number">02</div>
                  <h3>Set your availability</h3>
                  <p>Want to block off weekends? Set up any buffers? We make that easy.</p>
                  <div className="how-img-placeholder availability-mock">
                     <div className="row"><span>Mon</span><span>8:30 am - 5:00 pm</span></div>
                     <div className="row"><span>Tue</span><span>9:00 am - 6:30 pm</span></div>
                  </div>
                </div>
                <div className="how-card">
                  <div className="how-number">03</div>
                  <h3>Choose how to meet</h3>
                  <p>It could be a video chat, phone call, or a walk in the park!</p>
                  <div className="how-img-placeholder meeting-mock">
                     <div className="meet-avatar">👤</div>
                     <div className="meet-avatar">👤</div>
                  </div>
                </div>
             </div>
             
             <div className="how-footer">
                <button className="btn btn-primary">Get started &gt;</button>
                <button className="btn btn-secondary">Book a demo &gt;</button>
             </div>
          </div>
        </section>

        <section className="benefits">
          <div className="container text-center">
             <span className="badge-pill">🎁 Benefits</span>
             <h2 className="section-title">Your all-purpose scheduling app</h2>
             <p className="section-desc">Discover a variety of our advanced features. Unlimited and free for individuals.</p>
             
             <div className="benefits-grid">
                <div className="benefit-card large">
                  <h3>Avoid meeting overload</h3>
                  <p>Only get booked when you want to. Set daily, weekly or monthly limits and add buffers around your events to allow you to focus or take a break.</p>
                  <div className="benefit-img">
                     {/* Mocking the 'Notice and buffers' card */}
                     <div className="buffer-mock">
                        <label>Minimum notice</label>
                        <div className="select-mock">24 hours ⌄</div>
                        <div className="flex gap-4">
                           <div className="flex-1">
                              <label>Buffer before event</label>
                              <div className="select-mock">30 mins ⌄</div>
                           </div>
                           <div className="flex-1">
                              <label>Buffer after event</label>
                              <div className="select-mock">30 mins ⌄</div>
                           </div>
                        </div>
                     </div>
                  </div>
                </div>
                
                <div className="benefit-card large">
                  <h3>Stand out with a custom booking link</h3>
                  <p>Customize your booking link so it&apos;s short and easy to remember for your bookers. No more long, complicated links one can easily forget.</p>
                  <div className="benefit-img slug-mock-container">
                     <div className="slug-pill">cal.com/bailey</div>
                     <div className="slug-card">
                        <div className="flex items-center gap-4">
                           <div className="avatar-sm">BP</div>
                           <div>
                              <p className="text-xs">Bailey Pumfleet</p>
                              <p className="text-sm font-semibold">Business meeting</p>
                           </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                           <span className="pill-xs">15m</span>
                           <span className="pill-xs">30m</span>
                           <span className="pill-xs">45m</span>
                        </div>
                     </div>
                  </div>
                </div>
             </div>
          </div>
        </section>
      </main>
      
      <footer className="landing-footer">
        <div className="container">
          <p>© 2026 Cal.com Clone. Built for SDE Assignment.</p>
        </div>
      </footer>
    </div>
  );
}
