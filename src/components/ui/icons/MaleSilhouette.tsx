import React from 'react';

export default function MaleSilhouette({ className = '' }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      className={className}
      fill="currentColor"
    >
      <path d="M12 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM8.5 7a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0zM6 15.5a4.5 4.5 0 0 1 4.5-4.5h3a4.5 4.5 0 0 1 4.5 4.5V21a1 1 0 0 1-1 1h-10a1 1 0 0 1-1-1v-5.5z" />
    </svg>
  );
}