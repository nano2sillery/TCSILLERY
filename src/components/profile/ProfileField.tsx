import React from 'react';
import { cn } from '@/lib/utils';

interface ProfileFieldProps {
  label: string;
  icon: React.ReactNode;
  error?: string;
  disabled?: boolean;
  isEditing?: boolean;
  colorClass: string;
  children: React.ReactNode;
}

export default function ProfileField({
  label,
  icon,
  error,
  disabled,
  isEditing,
  colorClass,
  children
}: ProfileFieldProps) {
  return (
    <div className="space-y-2">
      <label className={cn(
        "flex items-center space-x-2 text-sm font-medium",
        colorClass
      )}>
        {icon}
        <span>{label}</span>
      </label>
      {children}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}