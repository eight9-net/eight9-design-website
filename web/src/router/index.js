import { createRouter, createWebHashHistory } from 'vue-router';
import MainLayout from '../layouts/MainLayout.vue';
import Home from '../views/LandingView.vue';

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: Home,
      },
      // {
      //   path: 'projects',
      //   name: 'projects',
      //   component: () => import('../views/Projects.vue')
      // },
      {
        path: 'services',
        name: 'services',
        component: () => import('../views/Services.vue')
      },
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition; // Go back to saved position on back/forward navigation
    } else if (to.hash) {
      // If there's a hash, scroll to the element with that selector
      return {
        el: to.hash,
        // Optional: add smooth behavior if the browser supports it
        behavior: 'smooth',
      };
    } else {
      return { top: 0 }; // Otherwise, scroll to the top of the page
    }
  },
});

export default router;
