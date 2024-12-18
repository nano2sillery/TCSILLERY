import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { AtSign, Lock } from 'lucide-react';
import Button from '@/components/ui/Button';
import AuthCard from '@/components/auth/AuthCard';
import FormField from '@/components/auth/FormField';

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    try {
      await login(data.email, data.password);
      navigate('/');
    } catch (error) {
      console.error('Erreur de connexion:', error);
    }
  };

  return (
    <AuthCard 
      title="Connexion" 
      subtitle="Accédez à votre espace joueur"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
          autoComplete="email"
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
          autoComplete="current-password"
        />

        <div>
          <Button 
            type="submit" 
            className="w-full bg-tertiary-500 hover:bg-tertiary-600"
            disabled={isSubmitting}
          >
            Se connecter
          </Button>
        </div>

        <p className="text-sm text-center text-gray-600">
          Pas encore de compte ?{' '}
          <Link to="/register" className="font-medium text-tertiary-500 hover:text-tertiary-600">
            Inscrivez-vous
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}