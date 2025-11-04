/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#ff5a0a',
        secondary: '#231815',
        accent: '#ffb14f',
        muted: '#fff7f2',
      },
      fontFamily: {
        display: ['Poppins', 'ui-sans-serif', 'system-ui'],
        body: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        card: '0 18px 38px rgba(255, 90, 10, 0.14)',
      },
      keyframes: {
        carousel: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        carousel: 'carousel 25s linear infinite',
      },
    },
  },
  plugins: [],
}
