import vueJsx from '@vitejs/plugin-vue-jsx';
import { defineConfig } from 'vitepress';
import locales from './locales.js';
import markdown from './markdown.js';
import sidebarData from './../data/sidebar.json';
import reWriteData from './../data/reWrite.json';

const baseUrl = process.env.CF_PAGES ? '/' : '/vitepress/';
const gTagId = 'G-CY2Z4947PL';
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
    ],
    // [
    //   'script',
    //   {
    //     async: '',
    //     src: `https://www.googletagmanager.com/gtag/js?id=${gTagId}`,
    //   },
    // ],
    // [
    //   'script',
    //   {},
    //   `window.dataLayer = window.dataLayer || [];
    //   function gtag(){dataLayer.push(arguments);}
    //   gtag('js', new Date());
    //   gtag('config', '${gTagId}');`,
    // ],
  ],
  rewrites: {
    'page/feedback.md': 'feedback.md',
    ...reWriteData,
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.svg',
    nav: [
      {
        text: locales.vars['post'],
        link: '/post/README',
        activeMatch: '/post',
      },
      {
        text: locales.vars['note'],
        link: '/note/README',
        activeMatch: '/note',
      },
      {
        text: locales.vars['issue'],
        link: '/issue/README',
        activeMatch: '/issue',
      },
      {
        text: locales.vars['feedback'],
        link: '/feedback',
        activeMatch: '/feedback',
      },
      {
        text: locales.vars['docusaurus'],
        link: 'https://lzwdot.github.io/docusaurus/',
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
    plugins: [vueJsx()],
  },
  sitemap: {
    hostname: 'https://lzwdot.com',
  },
  ...locales.config,
});
