import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  className?: string;
}

export default function AuthCard({ children, title, subtitle, className }: AuthCardProps) {
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className={cn("max-w-md w-full mx-auto", className)}>
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <img 
              src="https://i.ibb.co/G7tgyQJ/logo-tcs-couleurs.png"
              alt="Tennis Club de Sillery"
              className="h-16 w-16 mx-auto object-contain"
            />
          </Link>
          <h2 className="mt-4 text-2xl font-bold text-tertiary-500">{title}</h2>
          {subtitle && (
            <p className="mt-2 text-sm text-gray-600">{subtitle}</p>
          )}
        </div>

        <div className="bg-white py-8 px-6 shadow-sm rounded-xl">
          {children}
        </div>
      </div>
    </div>
  );
}