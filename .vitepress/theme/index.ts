// https://vitepress.dev/guide/custom-theme
import { type DefineComponent, h } from 'vue';
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import PostMeta from './slots/PostMeta.vue';
import SidebarTitle from './slots/SidebarTitle.vue';
import LatestPost from './slots/LatestPost.vue';
import WebAnalytics from './slots/WebAnalytics.vue';
import BreadCrumb from './slots/BreadCrumb.vue';
import './assets/tailwind.css';
import './assets/style.scss';

const components = import.meta.glob('./../components/*.vue');

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'sidebar-nav-before': () => h(SidebarTitle),
      'doc-before': () => h('header', {}, [h(BreadCrumb), h(PostMeta)]),
      'home-hero-info-after': () => h(LatestPost),
      'layout-bottom': () => h(WebAnalytics),
    });
  },
  async enhanceApp({ app }) {
    // https://vitepress.dev/guide/extending-default-theme#registering-global-components
    for (const path in components) {
      const comp = await components[path]();
      const _comp = comp as DefineComponent;
      app.component(_comp.default['__name'], _comp.default);
    }
  },
} satisfies Theme;
