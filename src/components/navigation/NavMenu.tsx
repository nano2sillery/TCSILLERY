import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Home, Trophy, BarChart2, UserCircle, LogOut } from 'lucide-react';

interface NavMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NavMenu({ isOpen, onClose }: NavMenuProps) {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      onClose();
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="md:hidden">
      <div className="fixed inset-0 bg-black bg-opacity-25" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {currentUser ? (
            <>
              <div className="p-4 border-b">
                <Link 
                  to="/profile" 
                  className="flex items-center space-x-3"
                  onClick={onClose}
                >
                  <UserCircle className="h-6 w-6 text-tertiary-500" />
                  <span className="font-medium">Mon profil</span>
                </Link>
              </div>
              <nav className="flex-1 px-2 py-4 space-y-2">
                <Link
                  to="/"
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100"
                  onClick={onClose}
                >
                  <Home className="h-5 w-5 text-gray-500" />
                  <span>Accueil</span>
                </Link>
                <Link
                  to="/matches"
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100"
                  onClick={onClose}
                >
                  <Trophy className="h-5 w-5 text-gray-500" />
                  <span>Matches</span>
                </Link>
                <Link
                  to="/statistics"
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100"
                  onClick={onClose}
                >
                  <BarChart2 className="h-5 w-5 text-gray-500" />
                  <span>Statistiques</span>
                </Link>
              </nav>
              <div className="p-4 border-t">
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 w-full px-3 py-2 text-left text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Déconnexion</span>
                </button>
              </div>
            </>
          ) : (
            <div className="p-4 space-y-4">
              <Link
                to="/login"
                className="block w-full px-4 py-2 text-center text-white bg-tertiary-500 rounded-lg hover:bg-tertiary-600"
                onClick={onClose}
              >
                Connexion
              </Link>
              <Link
                to="/register"
                className="block w-full px-4 py-2 text-center text-tertiary-500 border border-tertiary-500 rounded-lg hover:bg-tertiary-50"
                onClick={onClose}
              >
                Inscription
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}