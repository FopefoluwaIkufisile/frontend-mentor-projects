/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html', // or './src/**/*.{js,ts,jsx,tsx,html}'
  ],
  theme: {
    extend: {
      screens: {
        leader: '820px', // ✅ your custom breakpoint
      },
    },
  },
  plugins: [],
};