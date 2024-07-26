/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        darkblue: '#1D212F',
        purple: '#5D29FA',
        lime: '#CFE517',
        gray: '#717171'
      }
    }
  },
  plugins: []
}
