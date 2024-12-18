import React from 'react';
import { cn } from '@/lib/utils';

interface PageTitleProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageTitle({ children, className }: PageTitleProps) {
  return (
    <h1 className={cn(
      "text-2xl font-bold text-tertiary-500 text-center mb-8",
      className
    )}>
      {children}
    </h1>
  );
}