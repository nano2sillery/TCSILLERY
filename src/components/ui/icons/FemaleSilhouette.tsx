import React from 'react';

export default function FemaleSilhouette({ className = '' }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      className={className}
      fill="currentColor"
    >
      <path d="M12 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM8.5 7a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0zM12 13a6 6 0 0 0-6 6v1h3v2h6v-2h3v-1a6 6 0 0 0-6-6z" />
    </svg>
  );
}