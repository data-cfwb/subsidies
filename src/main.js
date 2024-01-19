import { createApp } from 'vue';
import { createRouter } from 'vue-router';
import { createWebHistory } from 'vue-router';

import {nextTick} from 'vue';

import App from './App.vue';

import HomeLayout from './components/layouts/HomeLayout.vue';
import AboutLayout from './components/layouts/AboutLayout.vue';
import StatsLayout from './components/layouts/StatsLayout.vue';
import SearchLayout from './components/layouts/SearchLayout.vue';
import EntrepriseLayout from './components/layouts/EntrepriseLayout.vue';

import './styles/base.css';

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
      path: '/entreprises/:be_number', 
      component: EntrepriseLayout,
      meta: {
        title: 'Organisation'
      } 
    },
    { 
      path: '/search', 
      component: SearchLayout,
      meta: {
        title: 'Recherche'
      } 
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
  ],
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
});

router.afterEach((to) => {
  nextTick(() => {
    document.title = site_default_title + ' - ' + to.meta.title || site_default_title;
  });
});

const app = createApp(App);
app.use(router);
app.mount('#app');