/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './.vitepress/**/*.{vue,js,ts,jsx,tsx}',
    './post/**/*.{vue,md}',
    './dosc/**/*.{vue,md}',
    './page/**/*.{vue,md}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
