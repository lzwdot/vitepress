import vueJsx from '@vitejs/plugin-vue-jsx';
import { defineConfig } from 'vitepress';
import locales from './locales.js';
import markdown from './markdown.js';
import sidebarData from './../data/sidebar.json';

const baseUrl = process.env.CF_PAGES ? '/' : '/vitepress/'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: baseUrl,
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: `${baseUrl}logo.svg` }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.svg',
    nav: [
      { text: locales.vars['post'], link: '/post/README', activeMatch: '/post/' },
      { text: locales.vars['docs'], link: '/docs/README', activeMatch: '/docs/' },
    ],

    sidebar: {
      ...sidebarData['docs'],
      '/post/': [...sidebarData['post']],
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/lzwdot/vitepress' }],
    search: {
      provider: 'local',
      options: {
        ...locales.search.local,
      },
    },
    ...locales.themeConfig,
  },
  markdown,
  vite: {
    plugins: [vueJsx()],
  },
  ...locales.config,
});
