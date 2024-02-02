/** @type {import('postcss').Config} */
module.exports = {
  plugins: {
    tailwindcss: { config: './.tailwindrc.cjs' },
    autoprefixer: {},
  },
};
