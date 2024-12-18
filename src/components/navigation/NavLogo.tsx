import React from 'react';
import { Link } from 'react-router-dom';

export default function NavLogo() {
  return (
    <Link to="/" className="flex items-center space-x-3">
      <img 
        src="https://i.ibb.co/G7tgyQJ/logo-tcs-couleurs.png"
        alt="T.C. SILLERY"
        className="h-10 w-10 object-contain"
      />
      <span className="text-base font-semibold text-tertiary-500 whitespace-nowrap">
        T.C. SILLERY
      </span>
    </Link>
  );
}