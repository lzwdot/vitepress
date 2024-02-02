// https://vitepress.dev/guide/custom-theme
import { h } from 'vue';
import { type Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import HtmlDemo from './../global/HtmlDemo.vue';
import JsDemo from './../global/JsDemo.vue';
import PostArchive from './../global/PostArchive.vue';
import DocsArchive from './../global/DocsArchive.vue';
import PostMeta from './components/PostMeta/index.vue';
import SidebarTitle from './components/SidebarTitle.vue';
import LatestPost from './components/LatestPost.vue';
import './style.scss';

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'sidebar-nav-before': () => h(SidebarTitle),
      'doc-before': () => h(PostMeta),
      'home-hero-info-after': () => h(LatestPost),
    });
  },
  enhanceApp({ app, router, siteData }) {
    // https://vitepress.dev/guide/extending-default-theme#registering-global-components
    app.component('HtmlDemo', HtmlDemo);
    app.component('JsDemo', JsDemo);
    app.component('PostArchive', PostArchive);
    app.component('DocsArchive', DocsArchive);
  },
} satisfies Theme;
