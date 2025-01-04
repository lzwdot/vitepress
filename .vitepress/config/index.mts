// import vueJsx from '@vitejs/plugin-vue-jsx';
import { defineConfig } from 'vitepress';
import locales from './locales.js';
import markdown from './markdown.js';
import packageJson from './../../package.json';
import sidebarData from './../data/sidebar.json';
import reWriteData from './../data/reWrite.json';

const baseUrl = process.env.CF_PAGES ? '/' : (process.env.GITHUB_ACTIONS ? '/vitepress/' : '/');
// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: './src',
  base: baseUrl,
  cleanUrls: true,
  head: [
    [
      'link',
      { rel: 'icon', type: 'image/svg+xml', href: `${baseUrl}logo.svg` },
    ],
    [
      'link',
      {
        rel: 'preconnect',
        crossorigin: '',
        href: `https://${locales.search.algolia.appId}-dsn.algolia.net`,
      },
    ]
  ],
  rewrites: {
    'page/about.md': 'about.md',
    ...reWriteData,
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.svg',
    nav: [
      {
        text: locales.vars['post'],
        link: '/post',
        activeMatch: '/post',
      },
      {
        text: locales.vars['docs'],
        link: '/docs',
        activeMatch: '/docs',
      },
      {
        text: packageJson.devDependencies.vitepress,
        items: [
          {
            text: locales.vars['about'],
            link: '/about',
            activeMatch: '/about',
          }
        ]
      },
    ],
    // @ts-ignore
    sidebar: {
      ...sidebarData,
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/lzwdot/vitepress' },
    ],
    search: {
      provider: 'algolia',
      options: {
        ...locales.search.algolia,
      },
    },
    ...locales.themeConfig,
  },
  markdown,
  vite: {
    // plugins: [vueJsx()],
  },
  sitemap: {
    hostname: 'https://lzwdot.com',
  },
  ...locales.config,
});
