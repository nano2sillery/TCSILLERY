import React from 'react';
import { cn } from '@/lib/utils';

interface AvatarProps {
  firstName?: string;
  lastName?: string;
  gender: 'M' | 'F';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showBorder?: boolean;
}

export default function Avatar({ 
  firstName = '',
  lastName = '',
  gender, 
  size = 'md', 
  className = '',
  showBorder = false,
}: AvatarProps) {
  const sizeClasses = {
    xs: 'w-8 h-8 text-xs',
    sm: 'w-12 h-12 text-sm',
    md: 'w-16 h-16 text-lg',
    lg: 'w-20 h-20 text-xl',
    xl: 'w-24 h-24 text-2xl'
  };

  const colors = {
    M: {
      bg: 'bg-[#2b69d8]/10',
      text: 'text-[#2b69d8]',
      border: 'border-[#2b69d8]'
    },
    F: {
      bg: 'bg-[#da2084]/10',
      text: 'text-[#da2084]',
      border: 'border-[#da2084]'
    }
  };

  // Obtenir les initiales
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  return (
    <div className={cn(
      sizeClasses[size],
      colors[gender].bg,
      colors[gender].text,
      'rounded-full flex items-center justify-center font-semibold',
      showBorder && `border-2 ${colors[gender].border}`,
      className
    )}>
      {initials || '?'}
    </div>
  );
}