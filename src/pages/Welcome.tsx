import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@/components/ui/Button';

export default function Welcome() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-50">
      <div className="text-center space-y-8 max-w-2xl">
        <div className="flex flex-col items-center space-y-6">
          <img 
            src="https://i.ibb.co/G7tgyQJ/logo-tcs-couleurs.png"
            alt="Tennis Club de Sillery" 
            className="w-32 h-32 md:w-48 md:h-48 object-contain"
          />
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-[#324178]">
              T.C. SILLERY
            </h1>
            <p className="text-xs text-[#b84141]">
              Depuis 1981
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <p className="text-lg text-gray-600">
            Bienvenue sur l'application officielle du Tennis Club de Sillery.
            Connectez-vous pour gérer vos matches et suivre vos statistiques.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/login" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-[#324178] hover:bg-[#283460] text-white"
              >
                Connexion
              </Button>
            </Link>
            <Link to="/register" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto border-[#b84141] text-[#b84141] hover:bg-red-50"
              >
                Inscription
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}