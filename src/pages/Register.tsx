import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { createPlayer } from '@/services/players';
import { FFT_RANKINGS } from '@/lib/constants';
import { AtSign, Lock, User, Phone, Trophy } from 'lucide-react';
import Button from '@/components/ui/Button';
import AuthCard from '@/components/auth/AuthCard';
import FormField from '@/components/auth/FormField';

interface RegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  gender: 'M' | 'F';
  phoneNumber: string;
  fftRanking: string;
}

export default function Register() {
  const { register: registerAuth } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<RegisterForm>();
  const password = watch('password');

  const onSubmit = async (data: RegisterForm) => {
    try {
      const { user } = await registerAuth(data.email, data.password);
      
      await createPlayer({
        id: user.uid,
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        phoneNumber: data.phoneNumber,
        fftRanking: data.fftRanking,
        email: data.email
      });

      navigate('/');
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
    }
  };

  return (
    <AuthCard 
      title="Inscription" 
      subtitle="Créez votre compte joueur"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="Prénom"
            icon={<User className="w-4 h-4" />}
            {...register('firstName', { required: 'Prénom requis' })}
            error={errors.firstName?.message}
          />
          
          <FormField
            label="Nom"
            icon={<User className="w-4 h-4" />}
            {...register('lastName', { required: 'Nom requis' })}
            error={errors.lastName?.message}
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Genre</label>
          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                value="M"
                {...register('gender', { required: 'Genre requis' })}
                className="mr-2"
              />
              <span className="text-sm">Homme</span>
            </label>
            <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                value="F"
                {...register('gender', { required: 'Genre requis' })}
                className="mr-2"
              />
              <span className="text-sm">Femme</span>
            </label>
          </div>
          {errors.gender && (
            <p className="text-sm text-red-600 mt-1">{errors.gender.message}</p>
          )}
        </div>

        <FormField
          label="Email"
          type="email"
          icon={<AtSign className="w-4 h-4" />}
          {...register('email', {
            required: 'Email requis',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Email invalide'
            }
          })}
          error={errors.email?.message}
        />

        <FormField
          label="Mot de passe"
          type="password"
          icon={<Lock className="w-4 h-4" />}
          {...register('password', {
            required: 'Mot de passe requis',
            minLength: {
              value: 6,
              message: 'Le mot de passe doit contenir au moins 6 caractères'
            }
          })}
          error={errors.password?.message}
        />

        <FormField
          label="Confirmer le mot de passe"
          type="password"
          icon={<Lock className="w-4 h-4" />}
          {...register('confirmPassword', {
            required: 'Veuillez confirmer votre mot de passe',
            validate: value => 
              value === password || 'Les mots de passe ne correspondent pas'
          })}
          error={errors.confirmPassword?.message}
        />

        <FormField
          label="Téléphone"
          icon={<Phone className="w-4 h-4" />}
          {...register('phoneNumber', {
            required: 'Numéro de téléphone requis',
            pattern: {
              value: /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
              message: 'Numéro de téléphone invalide'
            }
          })}
          error={errors.phoneNumber?.message}
          placeholder="06 12 34 56 78"
        />

        <div className="space-y-1">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <Trophy className="w-4 h-4 text-gray-400 mr-2" />
            Classement FFT
          </label>
          <select
            {...register('fftRanking', { required: 'Classement FFT requis' })}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-tertiary-500 focus:border-transparent"
          >
            <option value="">Sélectionnez votre classement</option>
            {FFT_RANKINGS.map((ranking) => (
              <option key={ranking} value={ranking}>
                {ranking}
              </option>
            ))}
          </select>
          {errors.fftRanking && (
            <p className="text-sm text-red-600">{errors.fftRanking.message}</p>
          )}
        </div>

        <Button 
          type="submit" 
          className="w-full bg-tertiary-500 hover:bg-tertiary-600"
          disabled={isSubmitting}
        >
          S'inscrire
        </Button>

        <p className="text-sm text-center text-gray-600">
          Déjà inscrit ?{' '}
          <Link to="/login" className="font-medium text-tertiary-500 hover:text-tertiary-600">
            Connectez-vous
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}