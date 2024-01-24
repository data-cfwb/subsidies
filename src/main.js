import { createApp } from 'vue';

import App from './App.vue';
import router from './router.js';

import LoadingFwb from './components/partials/LoadingFwb.vue';
import headerPartial from './components/partials/headerPartial.vue';

import './styles/base.css';

const app = createApp(App);

// htmlWebpackPlugin.options

app.config.globalProperties.$filters = {
  formatToEuros(value) {
    if (!value) return '';
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value);
  },
  numberFormatRound(value) {
    if (!value) return '';
    return new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 2 }).format(value);
  },
  joinOnKey: (array, key) => array.map(item => item[key]).join(' / '),
};

app.component('LoadingFwb', LoadingFwb);
app.component('HeaderPartial', headerPartial);

app.use(router);
app.mount('#app');