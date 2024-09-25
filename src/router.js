import { createRouter } from 'vue-router';
import { createWebHistory } from 'vue-router';

import {nextTick} from 'vue';

import HomeLayout from './components/layouts/HomeLayout.vue';
import AboutLayout from './components/layouts/AboutLayout.vue';
import AccessibilityLayout from './components/layouts/AccessibilityLayout.vue';
import StatsLayout from './components/layouts/StatsLayout.vue';
import SearchLayout from './components/layouts/SearchLayout.vue';
import EnterpriseLayout from './components/layouts/EnterpriseLayout.vue';
import NaceLayout from './components/layouts/NaceLayout.vue';

const site_default_title = 'Subventions à la Fédération Wallonie-Bruxelles';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { 
      path: '/', 
      component: HomeLayout,
      meta: {
        title: 'Accueil'
      } 
    },
    { 
      path: '/enterprises/:be_number', 
      component: EnterpriseLayout,
      meta: {
        title: 'Organisation'
      },
      props: route => ({ beNumber: route.params.be_number })
    },
    { 
      path: '/naces/:category/:code', 
      component: NaceLayout,
      meta: {
        title: 'Activité'
      },
      props: route => ({ category: route.params.category, code: route.params.code })
    },
    { 
      path: '/search',
      component: SearchLayout,
      meta: {
        title: 'Recherche'
      },
      props: route => ({ searchName: route.query.name })
    },
    { 
      path: '/statistiques', 
      component: StatsLayout,
      meta: {
        title: 'Statistiques'
      } 
    },
    { 
      path: '/a-propos', 
      component: AboutLayout,
      meta: {
        title: 'À propos'
      }  
    },
    { 
      path: '/declaration-sur-l-accessibilite', 
      component: AccessibilityLayout,
      meta: {
        title: 'Déclaration d\'accessibilité'
      }  
    },
  ],
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
});

router.afterEach((to) => {
  nextTick(() => {
    document.title = site_default_title + ' - ' + to.meta.title || site_default_title;
  });
});

export default router;
