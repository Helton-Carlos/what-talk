/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        'whatsapp-bp': '755px',
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        custom: ['Abel', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
