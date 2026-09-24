import React from 'react';
import StarIcon from './StarIcon';

export default function Hero() {
  return (
    <div className="page-header pd-hero-section" id="hero">
      {/* Background video */}
      <div className="main-bg-plane">
        <video
          className="hero-ambient-video"
          src="/assets/videos/hero-ambient.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="hero-dark-overlay" />
      </div>

      {/* Availability badge */}
      <div className="hero-main-wrapper">
        <div className="hero-heading-group">
          <div className="toptitle-element">
            <span>creative</span>
          </div>

          <h1 className="uppercase hero-split-title">
            <span className="split"><div className="line">DESIGNER</div></span>
            <span className="split"><div className="line">DEVELOPER</div></span>
          </h1>
        </div>

        <div className="hero-content-group">
          <p className="h2--uppercase hero-line-lead">
            PYTHON FULL STACK &amp; FRONTEND DEVELOPER
          </p>
          <p className="hero-line-body">
            Specializing in Python Full Stack web development, Django, React.js, and high-performance UI/UX based in Delhi. I build fast, resilient architectures from relational databases to buttery-smooth client interfaces. I love brutalist aesthetics, pizza, and art.
          </p>

          <div className="hero-cta-wrap">
            <a
              href="https://wa.me/919350349962"
              target="_blank"
              rel="noopener noreferrer"
              className="pd-btn-marquee"
              role="button"
            >
              <span>Contact me</span>
              <div className="marquee-track" aria-hidden="true">
                <div className="marquee-inner">
                  <span>Contact me &nbsp;•&nbsp; Contact me &nbsp;•&nbsp; Contact me &nbsp;•&nbsp; Contact me &nbsp;•&nbsp; Contact me &nbsp;•&nbsp; </span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
