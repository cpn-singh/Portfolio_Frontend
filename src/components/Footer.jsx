import React, { useState, useEffect } from 'react';
import StarIcon from './StarIcon';

export default function Footer() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const istTime = now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        });
        setTime(istTime);
      } catch {
        setTime(new Date().toLocaleTimeString());
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer id="footer" className="pd-site-footer" role="contentinfo">
      <div className="footer-container">

        {/* Status bar */}
        <div className="footer-status-bar">
          <div className="status-item live-pulse-wrap">
            <span className="live-radar-dot" />
            <span className="status-text">AVAILABLE FOR FULL-TIME &amp; CONTRACT ROLES</span>
          </div>

          <div className="status-item time-item">
            <span className="status-label">LOCAL TIME:</span>
            <span className="status-val font-mono">{time ? `DELHI, IN • ${time} IST` : 'DELHI, IN'}</span>
          </div>
        </div>

        {/* Footer links */}
        <div className="footer-main-grid">

          <div className="footer-col brand-col">
            <div className="footer-brand-header">
              <div className="footer-star-wrap">
                <StarIcon size={32} />
              </div>
              <h3 className="footer-brand-title">CHAITANYA PRATAP NARAYAN</h3>
            </div>
            <p className="footer-brand-desc">
              Python Full Stack &amp; Frontend Developer bridging rock-solid backend architectures with high-performance, 60fps React &amp; Tailwind client interfaces.
            </p>
            <div className="footer-quick-contacts">
              <a href="mailto:cpnsingh2001@gmail.com" className="footer-contact-link">
                <span className="link-icon">✉</span>
                <span>cpnsingh2001@gmail.com</span>
              </a>
              <a href="tel:+919350349962" className="footer-contact-link">
                <span className="link-icon">📞</span>
                <span>+91 9350349962</span>
              </a>
            </div>
          </div>

          <div className="footer-col nav-col">
            <h4 className="footer-col-heading">NAVIGATION</h4>
            <ul className="footer-links-list">
              <li><a href="#hero">01. Home</a></li>
              <li><a href="#intro">02. About &amp; Bio</a></li>
              <li><a href="#cases">03. Selected Works</a></li>
              <li><a href="#skills">04. Capabilities</a></li>
              <li><a href="#contact">05. Let's Connect</a></li>
              <li>
                <a href="https://cpn-resume.vercel.app/" target="_blank" rel="noopener noreferrer" className="external-link">
                  Resume <span>↗</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-col socials-col">
            <h4 className="footer-col-heading">CHANNELS &amp; SOCIALS</h4>
            <ul className="footer-links-list">
              <li>
                <a href="https://wa.me/919350349962" target="_blank" rel="noopener noreferrer" className="highlight-social">
                  <span>WhatsApp Direct</span>
                  <span className="social-badge">QUICK CHAT</span>
                </a>
              </li>
              <li>
                <a href="https://github.com/cpn-singh" target="_blank" rel="noopener noreferrer">
                  GitHub <span>↗</span>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/chaitanya-pratap-narayan-83a42a411/" target="_blank" rel="noopener noreferrer">
                  LinkedIn <span>↗</span>
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/_random.click01_/" target="_blank" rel="noopener noreferrer">
                  Instagram <span>↗</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-col back-top-col">
            <h4 className="footer-col-heading">ENGINEERING</h4>
            <div className="footer-stack-tags">
              <span className="stack-tag">React 18</span>
              <span className="stack-tag">Vite</span>
              <span className="stack-tag">Lenis Scroll</span>
              <span className="stack-tag">Django REST</span>
              <span className="stack-tag">PostgreSQL</span>
              <span className="stack-tag">Tailwind CSS</span>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="footer-back-to-top-btn"
              aria-label="Back to top of page"
            >
              <span>BACK TO TOP</span>
              <div className="btn-arrow-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="19" x2="12" y2="5" />
                  <polyline points="5 12 12 5 19 12" />
                </svg>
              </div>
            </button>
          </div>

        </div>

        {/* Signature watermark */}
        <div className="footer-giant-signature" aria-hidden="true">
          <span>CHAITANYA PRATAP NARAYAN</span>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom-bar">
          <p className="footer-copyright">
            © {new Date().getFullYear()} CHAITANYA PRATAP NARAYAN. ALL RIGHTS RESERVED.
          </p>
          <p className="footer-built-with">
            DESIGNED &amp; DEVELOPED WITH KINETIC PRECISION • DELHI, INDIA
          </p>
        </div>

      </div>
    </footer>
  );
}
