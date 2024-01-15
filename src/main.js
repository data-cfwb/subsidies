import { createApp } from 'vue'
import { createRouter } from 'vue-router'
import { createWebHistory } from 'vue-router'

import App from './App.vue'
import HomeLayout from './components/layouts/HomeLayout.vue'
import AboutLayout from './components/layouts/AboutLayout.vue'

import './styles/base.css'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: HomeLayout },
        { path: '/about', component: AboutLayout },
    ],
    })
const app = createApp(App)
app.use(router)
app.mount('#app')