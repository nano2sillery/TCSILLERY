import React from 'react';
import { cn } from '@/lib/utils';
import { AvatarProps } from './types';
import { sizeClasses, colors } from './styles';
import { getInitials } from './utils';

export default function Avatar({ 
  firstName = '',
  lastName = '',
  gender, 
  size = 'md', 
  className = '',
  showBorder = false,
}: AvatarProps) {
  const initials = getInitials(firstName, lastName);

  return (
    <div className={cn(
      sizeClasses[size],
      colors[gender].bg,
      colors[gender].text,
      'rounded-full flex items-center justify-center font-semibold',
      showBorder && `border-2 ${colors[gender].border}`,
      className
    )}>
      {initials}
    </div>
  );
}