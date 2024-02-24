// https://vitepress.dev/guide/custom-theme
import { h, type DefineComponent } from 'vue';
import { type Theme } from 'vitepress';
import vRouter from './router';
import DefaultTheme from 'vitepress/theme';
import PostMeta from './slots/PostMeta/index.vue';
import SidebarTitle from './slots/SidebarTitle.vue';
import LatestPost from './slots/LatestPost.vue';
import NotFound from './slots/NotFound.vue';
import Analytics from './slots/Analytics.vue';
import './assets/style.scss';

const components = import.meta.glob('./../components/*.vue');

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'sidebar-nav-before': () => h(SidebarTitle),
      'doc-before': () => h(PostMeta),
      'home-hero-info-after': () => h(LatestPost),
      'not-found': () => h(NotFound),
      'layout-bottom': () => h(Analytics),
    });
  },
  enhanceApp({ app, router, siteData }) {
    // https://vitepress.dev/guide/extending-default-theme#registering-global-components
    for (const path in components) {
      components[path]().then((comp) => {
        const _comp = comp as DefineComponent;
        app.component(_comp.default['__name'], _comp.default);
      });
    }

    if (!import.meta.env.SSR) {
      app.use(vRouter(siteData.value.base));
    }
  },
} satisfies Theme;
