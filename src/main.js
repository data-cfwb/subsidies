import { createApp } from 'vue';
import { createRouter } from 'vue-router';
import { createWebHistory } from 'vue-router';

import App from './App.vue';

import HomeLayout from './components/layouts/HomeLayout.vue';
import AboutLayout from './components/layouts/AboutLayout.vue';
import StatsLayout from './components/layouts/StatsLayout.vue';
import SearchLayout from './components/layouts/SearchLayout.vue';

import './styles/base.css';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/entreprises/:be_number', component: HomeLayout },
    { path: '/search', component: SearchLayout },
    { path: '/statistiques', component: StatsLayout },
    { path: '/a-propos', component: AboutLayout },
  ],
});

const app = createApp(App);
app.use(router);
app.mount('#app');