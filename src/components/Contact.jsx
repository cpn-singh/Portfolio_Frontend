import React, { useState } from 'react';

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const interestButtons = [
    { label: 'PYTHON FULL STACK', subject: "🐍 I am looking for a Python Full Stack Engineer. Let's talk" },
    { label: 'DJANGO & REST FRAMEWORK', subject: "🚀 Need a Django backend & REST API built. Let's talk" },
    { label: 'FRONTEND DEVELOPMENT', subject: "👨‍💻 I am looking for a Frontend Developer. Let's talk" },
    { label: 'REACT.JS & VITE', subject: "⚛️ I am looking for a React.js Specialist. Let's talk" },
    { label: 'TAILWIND CSS & UI/UX', subject: "💎 I want a modern responsive UI built with Tailwind. Let's talk" },
    { label: 'POSTGRESQL & MYSQL', subject: "🗄️ Looking for relational database design with PostgreSQL & MySQL. Let's talk" },
    { label: 'AI WEB APIS', subject: "⚡ Need custom Python & AI API integration. Let's talk" },
    { label: 'PIZZA & COFFEE', subject: "🍕 mmm... I love pizza! Let's connect and code together!" }
  ];

  const copyEmail = () => {
    navigator.clipboard.writeText('cpnsingh2001@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  return (
    <section id="contact" className="pd-contact-section">
      <div className="main-wrapper footer-main-wrapper">
        <div className="text footer-connect-header">
          <h3 className="h1--uppercase footer-split-title">
            <span className="split"><span className="line">Let's</span></span>
            <span className="split"><span className="line">Connect</span></span>
          </h3>

          <div className="skills footer-skills-wrap">
            <p className="h2--uppercase footer-interest-label">
              <span>I'm always interested about</span>
            </p>

            <div className="footer-interest-buttons">
              {interestButtons.map((btn, idx) => (
                <a
                  key={idx}
                  href={`mailto:cpnsingh2001@gmail.com?subject=${encodeURIComponent(btn.subject)}`}
                  className="pd-btn-marquee"
                  role="button"
                >
                  <span>{btn.label}</span>
                  <div className="marquee-track" aria-hidden="true">
                    <div className="marquee-inner">
                      <span>{btn.label} &nbsp;•&nbsp; {btn.label} &nbsp;•&nbsp; {btn.label} &nbsp;•&nbsp; {btn.label} &nbsp;•&nbsp; </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="content footer-content-block">
          <div className="top footer-project-mind-box">
            <p className="h2--uppercase mind-question-text">
              <span>Are you minding a project?</span>
            </p>
            <a
              href="https://wa.me/919350349962"
              target="_blank"
              rel="noopener noreferrer"
              className="pd-btn-marquee light cta-giant-contact-btn"
              role="button"
            >
              <span>CONTACT ME</span>
              <div className="marquee-track" aria-hidden="true">
                <div className="marquee-inner">
                  <span>CONTACT ME &nbsp;•&nbsp; CONTACT ME &nbsp;•&nbsp; CONTACT ME &nbsp;•&nbsp; CONTACT ME &nbsp;•&nbsp; </span>
                </div>
              </div>
            </a>
          </div>

          <div className="footer-direct-contacts-row">
            <div className="contact-pill-item">
              <span className="pill-tag">EMAIL</span>
              <a href="mailto:cpnsingh2001@gmail.com" className="pill-val-link">
                cpnsingh2001@gmail.com
              </a>
              <button className="pill-copy-action" onClick={copyEmail}>
                {copiedEmail ? '✓ COPIED' : 'COPY'}
              </button>
            </div>

            <div className="contact-pill-item">
              <span className="pill-tag">PHONE</span>
              <a href="tel:+919350349962" className="pill-val-link">
                +91 9350349962
              </a>
            </div>

            <div className="contact-pill-item">
              <span className="pill-tag">LOCATION</span>
              <span className="pill-val-static">Maujpur, Delhi, India</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
