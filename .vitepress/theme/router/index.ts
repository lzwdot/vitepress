import { createRouter, createWebHistory } from 'vue-router';
import CannyWidget from './../slots/CannyWidget.vue';

function vRouter(base: string) {
  const routes = [
    {
      path: base,
      children: [
        {
          name: 'cannyWidget',
          path: `feedback`,
          component: CannyWidget,
        },
        { path: `feedback/:chapters*`, component: CannyWidget },
      ],
    },
  ];

  return createRouter({
    history: createWebHistory(),
    routes,
  });
}

export default vRouter;
