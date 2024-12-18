import React from 'react';
import { cn } from '@/lib/utils';

interface TennisBallProps {
  className?: string;
}

export default function TennisBall({ className }: TennisBallProps) {
  return (
    <div className={cn(
      "w-4 h-4 rounded-full bg-[#c8f048] border-2 border-[#a8d038]",
      "shadow-lg",
      className
    )} />
  );
}