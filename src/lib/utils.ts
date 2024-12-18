import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(d);
}

export function formatPhoneNumber(phone: string): string {
  return phone.replace(/(\d{2})(?=\d)/g, '$1 ').trim();
}

export function calculateGamesFromScore(score: string): number {
  const [score1, score2] = score.split('-').map(Number);
  return (score1 || 0) + (score2 || 0);
}