import React from 'react';

export default function StarIcon({ size = 48, className = '' }) {
  return (
    <svg
      className={`patrick-star-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M30 0L33.8 22.2L55.5 14.5L39.2 30L55.5 45.5L33.8 37.8L30 60L26.2 37.8L4.5 45.5L20.8 30L4.5 14.5L26.2 22.2L30 0Z"
        fill="#F3DBC7"
      />
    </svg>
  );
}
