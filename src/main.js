import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import VueDragscroll from "vue-dragscroll";
import bcrypt from 'bcryptjs';

import './assets/main.scss'
import 'bootstrap'
import '@fortawesome/fontawesome-free/css/all.css'


const app = createApp(App)

app.use(router)
app.use(bcrypt)
app.use(VueDragscroll);
app.mount('#app')
