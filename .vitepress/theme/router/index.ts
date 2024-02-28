import { createRouter, createWebHistory } from 'vue-router';
import CannyWidget from './../slots/CannyWidget.vue';

function vRouter(base: string) {
  const routes = [
    {
      name: 'cannyWidget',
      path: `${base}feedback`,
      component: CannyWidget,
    },
    { path: `${base}feedback/:chapters*`, component: CannyWidget },
  ];

  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  return router;
}

export default vRouter;
