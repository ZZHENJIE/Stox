import { createApp } from 'vue'
import App from './App.vue'
import { router } from './utils/Router';
import { listenEvent } from './utils/Tauri';
import Stox from './utils/Stox';
// @ts-ignore
import 'vfonts/FiraSans.css'
import { i18n } from './utils/I18n';

const app = createApp(App);
app.use(router);
app.use(i18n);
app.use(Stox);
app.mount('#app');

await listenEvent();
