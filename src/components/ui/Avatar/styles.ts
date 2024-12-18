import { AvatarSize, Gender } from './types';

export const sizeClasses: Record<AvatarSize, string> = {
  xs: 'w-8 h-8 text-xs',
  sm: 'w-12 h-12 text-sm',
  md: 'w-16 h-16 text-lg',
  lg: 'w-20 h-20 text-xl',
  xl: 'w-24 h-24 text-2xl'
};

export const colors: Record<Gender, {
  bg: string;
  text: string;
  border: string;
}> = {
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