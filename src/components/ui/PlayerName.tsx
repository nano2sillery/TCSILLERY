import React from 'react';
import { cn } from '@/lib/utils';

interface PlayerNameProps {
  firstName: string;
  lastName: string;
  showFirstName?: boolean;
  className?: string;
  firstNameClassName?: string;
  lastNameClassName?: string;
}

export default function PlayerName({
  firstName,
  lastName,
  showFirstName = true,
  className,
  firstNameClassName,
  lastNameClassName
}: PlayerNameProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      {showFirstName && (
        <span className={cn("text-sm", firstNameClassName)}>
          {firstName}
        </span>
      )}
      <span className={cn("font-semibold uppercase", lastNameClassName)}>
        {lastName}
      </span>
    </div>
  );
}