import { createApp } from 'vue';

import App from './App.vue';
import router from './router.js';

import LoadingFwb from './components/partials/LoadingFwb.vue';
import HeaderPartial from './components/partials/HeaderPartial.vue';

import './styles/base.css';

const app = createApp(App);

// htmlWebpackPlugin.options

app.config.globalProperties.$filters = {
  formatToEuros(value) {
    if (!value) return '0 €';
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value);
  },
  numberFormatRound(value) {
    if (!value) return '0';
    return new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 2 }).format(value);
  },
  joinOnKey: (array, key) => array.map(item => item[key]).join(' / '),
  //  [ { "language": "DE", "description": "Vereinigung ohne Gewinnerzielungsabsicht" }, { "language": "FR", "description": "Association sans but lucratif" }, { "language": "NL", "description": "Vereniging zonder winstoogmerk" } ] => "Association sans but lucratif"
  getTranslation: (array, key) => array.find(item => item.language === key)?.description,
};

app.component('LoadingFwb', LoadingFwb);
app.component('HeaderPartial', HeaderPartial);

app.use(router);
app.mount('#app');