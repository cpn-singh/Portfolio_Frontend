import React, { useState, useEffect, useRef } from 'react';

export default function LiveReelPreview({ project, onOpenModal }) {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(640);
  const [isHovered, setIsHovered] = useState(false);
  const [hasActivated, setHasActivated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);

  // Scale 1280x800 base layout to fit current container width
  useEffect(() => {
    if (!containerRef.current) return;
    const updateSize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateSize();

    let ro;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(updateSize);
      ro.observe(containerRef.current);
    }
    window.addEventListener('resize', updateSize);

    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  const scale = containerWidth ? containerWidth / 1280 : 0.5;

  const handleMouseEnter = () => {
    setIsHovered(true);
    setHasActivated(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const toggleInteractive = (e) => {
    e.stopPropagation();
    setHasActivated(true);
    setIsInteractive(!isInteractive);
  };

  const displayHost = project.liveUrl
    ? project.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')
    : '';

  return (
    <div
      ref={containerRef}
      className={`live-reel-preview-wrap ${isHovered ? 'is-hovered' : ''} ${isInteractive ? 'is-interactive' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Thumbnail */}
      <img
        src={project.image}
        alt={project.title}
        className="live-reel-still-img"
        loading="lazy"
      />

      {/* Live preview iframe */}
      {hasActivated && (
        <div
          className={`live-reel-iframe-layer ${isLoaded ? 'loaded' : 'connecting'} ${isHovered || isInteractive ? 'visible' : ''}`}
        >
          <div
            className="live-reel-iframe-scaler"
            style={{
              width: '1280px',
              height: '800px',
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
              pointerEvents: isInteractive ? 'auto' : 'none',
            }}
          >
            <iframe
              src={project.liveUrl}
              title={`${project.title} Live Preview`}
              className="live-reel-iframe"
              onLoad={() => setIsLoaded(true)}
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </div>

          {/* Loading state */}
          {!isLoaded && (
            <div className="live-reel-loader">
              <div className="live-reel-loader-content">
                <span className="live-pulse-dot green" />
                <span className="live-loader-text">CONNECTING LIVE INSTANCE...</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Status badge */}
      <div className="live-reel-top-bar">
        <div className={`live-reel-badge ${isInteractive ? 'interactive-active' : ''}`}>
          <span className="live-pulse-dot green" />
          <span className="badge-text">{isInteractive ? 'INTERACTIVE MODE' : 'LIVE REEL'}</span>
        </div>

        {isInteractive && (
          <button
            type="button"
            className="live-exit-btn"
            onClick={toggleInteractive}
          >
            <span>LOCK SCROLL ✕</span>
          </button>
        )}
      </div>

      {/* Action bar */}
      <div className="live-reel-controls-bar">
        <div className="live-meta-info">
          <span className="live-status-pill">● 200 OK</span>
          <span className="live-url-tag">{displayHost}</span>
        </div>

        <div className="live-actions-group">
          <button
            type="button"
            className={`live-action-btn ${isInteractive ? 'active' : ''}`}
            onClick={toggleInteractive}
            title={isInteractive ? 'Exit Interactive Mode' : 'Interact directly inside card'}
          >
            <span>{isInteractive ? 'LOCK' : 'TEST DRIVE'}</span>
          </button>

          <button
            type="button"
            className="live-action-btn primary"
            onClick={(e) => {
              e.stopPropagation();
              onOpenModal(project);
            }}
            title="Expand into Responsive Device Sandbox"
          >
            <span>EXPAND ⛶</span>
          </button>
        </div>
      </div>
    </div>
  );
}
