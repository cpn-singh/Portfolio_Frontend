import React, { useState, useEffect } from 'react';

export default function LiveProjectModal({ project, onClose }) {
  const [device, setDevice] = useState('desktop'); // 'desktop', 'tablet', 'mobile'
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const [key, setKey] = useState(0); // for reloading iframe

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const handleDeviceChange = (newDevice) => {
    setDevice(newDevice);
  };

  const handleReload = () => {
    setIsIframeLoaded(false);
    setKey((prev) => prev + 1);
  };

  const displayHost = project.liveUrl
    ? project.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')
    : '';

  return (
    <div className="live-modal-overlay" onClick={onClose}>
      <div
        className="live-modal-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="live-modal-header">
          {/* Project title */}
          <div className="live-modal-brand">
            <span className="live-modal-title">{project.title}</span>
            <span className="live-modal-status-badge">
              <span className="live-pulse-dot green" /> LIVE PREVIEW
            </span>
          </div>

          {/* Viewport switcher */}
          <div className="live-modal-device-switcher">
            <button
              type="button"
              className={`device-btn ${device === 'desktop' ? 'active' : ''}`}
              onClick={() => handleDeviceChange('desktop')}
              title="Desktop View (1440px)"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              <span>DESKTOP</span>
            </button>

            <button
              type="button"
              className={`device-btn ${device === 'tablet' ? 'active' : ''}`}
              onClick={() => handleDeviceChange('tablet')}
              title="Tablet View (768px)"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
                <line x1="12" y1="18" x2="12.01" y2="18" />
              </svg>
              <span>TABLET</span>
            </button>

            <button
              type="button"
              className={`device-btn ${device === 'mobile' ? 'active' : ''}`}
              onClick={() => handleDeviceChange('mobile')}
              title="Mobile View (390px)"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                <line x1="12" y1="18" x2="12.01" y2="18" />
              </svg>
              <span>MOBILE</span>
            </button>
          </div>

          {/* Controls */}
          <div className="live-modal-actions">
            <button
              type="button"
              className="modal-icon-btn"
              onClick={handleReload}
              title="Reload Live Frame"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="23 4 23 10 17 10" />
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
              </svg>
            </button>

            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-link-btn"
              title="Open Live Website in New Tab"
            >
              <span>OPEN SITE</span>
              <svg width="12" height="12" viewBox="0 0 17 17" fill="none">
                <path d="M14.875 13.357V3.643L1.518 17 0 15.482 13.357 2.125H3.643V0H17v13.357z" fill="currentColor" />
              </svg>
            </a>

            <button
              type="button"
              className="modal-close-btn"
              onClick={onClose}
              title="Close Live Preview (ESC)"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Viewport frame */}
        <div className="live-modal-stage">
          <div className={`live-modal-device-frame device-${device}`}>
            {!isIframeLoaded && (
              <div className="modal-iframe-loader">
                <span className="live-pulse-dot green large" />
                <span className="loader-label">INITIALIZING LIVE PRODUCTION SANDBOX...</span>
              </div>
            )}
            <iframe
              key={key}
              src={project.liveUrl}
              title={`${project.title} Live Sandbox`}
              className="live-modal-iframe"
              onLoad={() => setIsIframeLoaded(true)}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </div>
        </div>

        {/* Status footer */}
        <div className="live-modal-footer">
          <div className="modal-footer-url">
            <span className="footer-label">CONNECTED ENDPOINT:</span>
            <span className="footer-link">{project.liveUrl}</span>
          </div>
          <div className="modal-footer-hint">
            <span>PRESS <strong>ESC</strong> TO RETURN TO PORTFOLIO</span>
          </div>
        </div>
      </div>
    </div>
  );
}
