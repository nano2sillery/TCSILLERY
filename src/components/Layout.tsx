import React from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import MobileNav from './MobileNav';
import UserInitials from './ui/UserInitials';

export default function Layout() {
  const { currentUser } = useAuth();
  const { profile } = useProfile(currentUser?.uid);
  const location = useLocation();
  const isWelcomePage = location.pathname === '/welcome';

  return (
    <div className="min-h-screen bg-gray-50">
      {!isWelcomePage && (
        <nav className="fixed top-0 left-0 right-0 bg-gray-100 shadow-sm z-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              {/* Logo */}
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

              {/* Avatar profil */}
              {currentUser && profile && (
                <Link 
                  to="/profile"
                  className="p-1.5 rounded-lg hover:bg-white/50 transition-colors"
                >
                  <UserInitials
                    firstName={profile.firstName}
                    lastName={profile.lastName}
                    gender={profile.gender}
                    size="xs"
                  />
                </Link>
              )}
            </div>
          </div>
        </nav>
      )}

      <main className={`mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 ${!isWelcomePage ? 'mt-16' : ''}`}>
        <Outlet />
      </main>

      {currentUser && !isWelcomePage && <MobileNav />}
    </div>
  );
}