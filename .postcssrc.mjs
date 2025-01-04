/** @type {import('postcss-load-config').Config} */
export default{
  plugins: {
    tailwindcss: { config: './.tailwindrc.mjs' },
    autoprefixer: {},
  },
};
