/** @type {import('tailwindcss').Config} */
export default{
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
