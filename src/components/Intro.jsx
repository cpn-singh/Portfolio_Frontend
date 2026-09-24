import React from 'react';

export default function Intro() {
  return (
    <section id="intro" className="pd-intro-section">
      <div className="main-wrapper intro-main-wrapper">
        <div className="intro-text-column">
          <h2 className="heading--uppercase--inline intro-title">
            <span className="split">
              <span className="line">Hello. I am Chaitanya</span>
              <div className="symbol--right">Chaitanya Pratap Narayan</div>
            </span>
          </h2>

          <p className="h2--uppercase animation-line intro-lead-line">
            PYTHON FULL STACK &amp; FRONTEND DEVELOPER
          </p>

          <p className="h2--uppercase animation-line intro-body-text">
            I use my passion and engineering craft to build robust digital products and scalable web applications. I specialize in end-to-end web development: architecting clean, secure python backends with <strong>django</strong> & <strong>django rest framework</strong>, designing relational databases, and crafting high-performance client-side interfaces using <strong>react.js</strong>, <strong>vite</strong>, AND <strong>tailwind css</strong>.
          </p>

          <p className="h2--uppercase animation-line intro-body-text">
            Graduated with a{" "}
            <strong>Bachelor of Computer Applications (BCA)</strong> from{" "}
            <strong>Kalinga University</strong>, and currently working as a{" "}
            <strong>Frontend Developer Intern at Uncodemy</strong>. I combine
            robust engineering with intuitive, accessible, and visually striking
            digital experiences.
          </p>

          <div className="skills-chipset-grid">
            <div className="skill-chip-box">
              <span className="chip-cat">BACKEND &amp; CORE</span>
              <div className="chip-tags">
                <span className="chip-tag highlight">Python 3</span>
                <span className="chip-tag highlight">Django</span>
                <span className="chip-tag highlight">Django REST Framework</span>
                <span className="chip-tag">PostgreSQL</span>
                <span className="chip-tag">MySQL</span>
                <span className="chip-tag">RESTful APIs</span>
              </div>
            </div>

            <div className="skill-chip-box">
              <span className="chip-cat">FRONTEND &amp; CREATIVE</span>
              <div className="chip-tags">
                <span className="chip-tag highlight">React.js</span>
                <span className="chip-tag highlight">Next.js</span>
                <span className="chip-tag">JavaScript (ES6+)</span>
                <span className="chip-tag">Tailwind CSS</span>
                <span className="chip-tag">UI/UX Design</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile image */}
        <div className="intro-portrait-column">
          <div className="portrait-showcase-frame">
            <img
              src="/assets/images/my-pic.jpeg"
              alt="Chaitanya Pratap Narayan — Python Full Stack & Frontend Developer"
              className="portrait-showcase-img"
            />
            <div className="portrait-glass-caption">
              <div className="portrait-caption-meta">
                <span className="caption-author-name">CHAITANYA PRATAP NARAYAN</span>
                <span className="caption-author-title">PYTHON FULL STACK &amp; FRONTEND DEVELOPER</span>
              </div>
              <span className="caption-location-pill">📍 DELHI, INDIA</span>
            </div>
          </div>

          <div className="portrait-sub-statement">
            <span className="sub-statement-line">"CRAFTING PYTHON BACKENDS &amp; 60FPS REACT EXPERIENCES."</span>
          </div>
        </div>
      </div>
    </section>
  );
}
