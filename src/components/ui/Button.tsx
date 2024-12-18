import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-tertiary-500 focus:ring-offset-2',
          {
            // Primary - Bleu marine du club
            'bg-tertiary-500 text-white hover:bg-tertiary-600': variant === 'primary',
            // Secondary - Rouge du club
            'bg-secondary-500 text-white hover:bg-secondary-600': variant === 'secondary',
            // Outline - Bordure verte du club
            'border-2 border-primary-500 text-primary-500 hover:bg-primary-50': variant === 'outline',
            // Tailles
            'px-3 py-1.5 text-sm': size === 'sm',
            'px-4 py-2': size === 'md',
            'px-6 py-3 text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
export default Button;