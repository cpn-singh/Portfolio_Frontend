import React, { useEffect, useState } from 'react';

export default function Navbar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header id="header" className="pd-header fixed--bg" role="banner">
      <div className="wrap-header">
        <nav className="main-navigation">
          <div className="title">
            <a href="/">
              <span className="brand-name-serif">Chaitanya Pratap Narayan</span>
            </a>
          </div>

          <div id="main-menu" role="navigation">
            <ul>
              <li>
                <a href="#cases">
                  works
                </a>
              </li>
              <li>
                <a href="#intro">
                  about
                </a>
              </li>
              <li>
                <a href="#skills">
                  skills
                </a>
              </li>
              <li>
                <a href="#contact">
                  contact
                </a>
              </li>
            </ul>
          </div>

          <div className="header-right-actions">
            <a
              href="https://cpn-resume.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="pd-resume-pill"
            >
              <span>RESUME</span>
              <span className="arrow-up-right">↗</span>
            </a>
          </div>
        </nav>

        {/* Scroll progress line */}
        <div
          className="header-progress-line"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </header>
  );
}
