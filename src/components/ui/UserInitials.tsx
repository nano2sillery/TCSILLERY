import React from 'react';
import { cn } from '@/lib/utils';

interface UserInitialsProps {
  firstName?: string;
  lastName?: string;
  gender: 'M' | 'F';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export default function UserInitials({ 
  firstName = '',
  lastName = '',
  gender, 
  size = 'md',
  className = ''
}: UserInitialsProps) {
  const sizeClasses = {
    xs: 'h-8 w-8 text-sm',
    sm: 'h-12 w-12 text-lg',
    md: 'h-16 w-16 text-2xl',
    lg: 'h-20 w-20 text-3xl',
    xl: 'h-24 w-24 text-4xl'
  };

  const colors = {
    M: {
      bg: 'bg-[#2b69d8]',
    },
    F: {
      bg: 'bg-[#da2084]',
    }
  };

  const initials = `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase() || '?';

  return (
    <div 
      className={cn(
        sizeClasses[size],
        colors[gender].bg,
        'rounded-full flex items-center justify-center font-bold tracking-tight text-white',
        className
      )}
    >
      {initials}
    </div>
  );
}