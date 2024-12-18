import React from 'react';

interface CircularProgressProps {
  value: number;
  maxValue: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label: string;
  sublabel?: string;
  icon?: React.ReactNode;
}

export default function CircularProgress({
  value,
  maxValue,
  size = 120,
  strokeWidth = 8,
  color = '#324178',
  label,
  sublabel,
  icon
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = Math.min((value || 0) / maxValue, 1);
  const offset = circumference - (progress * circumference);

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Cercle de fond */}
        <svg className="transform -rotate-90" width={size} height={size}>
          <circle
            className="text-gray-200"
            strokeWidth={strokeWidth}
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
          <circle
            className="transition-all duration-500 ease-out"
            strokeWidth={strokeWidth}
            stroke={color}
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
            style={{
              strokeDasharray: `${circumference} ${circumference}`,
              strokeDashoffset: offset || 0,
              strokeLinecap: 'round'
            }}
          />
        </svg>
        {/* Valeur centrale */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ color }}
        >
          {icon && <div className="mb-1">{icon}</div>}
          <span className="text-xl font-bold">{value || 0}</span>
          {sublabel && (
            <span className="text-xs text-gray-500">{sublabel}</span>
          )}
        </div>
      </div>
      <span className="mt-2 text-sm font-medium text-gray-600">{label}</span>
    </div>
  );
}