import React, { useEffect, useRef, useState } from 'react';

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  const mouse = useRef({ x: -100, y: -100, targetX: -100, targetY: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');

  useEffect(() => {
    const onMouseMove = (e) => {
      mouse.current.targetX = e.clientX;
      mouse.current.targetY = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Click ripple effect
    const onClick = (e) => {
      const ripple = document.createElement('div');
      ripple.className = 'cursor-click-shockwave';
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      document.body.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    };
    window.addEventListener('click', onClick);

    // Smooth cursor interpolation loop
    let reqId;
    const animate = () => {
      reqId = requestAnimationFrame(animate);

      const ease = 0.18;
      mouse.current.x += (mouse.current.targetX - mouse.current.x) * ease;
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * ease;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.targetX}px, ${mouse.current.targetY}px, 0)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0)`;
      }
    };
    animate();

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onClick);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="custom-dot" />
      <div
        ref={ringRef}
        className={`custom-ring ${isHovering ? 'is-hover' : ''}`}
      >
        {cursorText && <span className="ring-text">{cursorText}</span>}
      </div>
    </>
  );
}
