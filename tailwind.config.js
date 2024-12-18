/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9f0',
          100: '#dcf0dc',
          200: '#bbd9bb',
          300: '#92c292',
          400: '#69a769',
          500: '#4d8b4d',
          600: '#3d703d',
          700: '#335933',
          800: '#2b472b',
          900: '#243b24',
        },
        secondary: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#b84141',
          600: '#9c3535',
          700: '#822c2c',
          800: '#6b2424',
          900: '#581e1e',
        },
        tertiary: {
          50: '#f0f2f8',
          100: '#e0e4f0',
          200: '#c2c9e1',
          300: '#a3aed2',
          400: '#8593c3',
          500: '#324178',
          600: '#283460',
          700: '#212b4f',
          800: '#1b233f',
          900: '#161c33',
        },
      },
      animation: {
        'bounce-delayed': 'bounce 1s infinite 200ms',
        'bounce-delayed-2': 'bounce 1s infinite 400ms',
      }
    },
  },
  plugins: [],
};