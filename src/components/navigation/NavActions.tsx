import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/ui/Button';
import UserInitials from '@/components/ui/UserInitials';

export default function NavActions() {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  if (!currentUser) {
    return (
      <>
        <Link to="/login">
          <Button variant="secondary" size="sm">Connexion</Button>
        </Link>
        <Link to="/register">
          <Button size="sm">Inscription</Button>
        </Link>
      </>
    );
  }

  return (
    <>
      <Link 
        to="/profile"
        className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <UserInitials
          firstName={currentUser.displayName?.split(' ')[0] || ''}
          lastName={currentUser.displayName?.split(' ')[1] || ''}
          gender="M"
          size="xs"
        />
        <span className="text-sm text-gray-700">Mon profil</span>
      </Link>
      <Button 
        onClick={handleLogout} 
        variant="outline"
        size="sm"
        className="border-secondary-500 text-secondary-500 hover:bg-secondary-50"
      >
        Déconnexion
      </Button>
    </>
  );
}