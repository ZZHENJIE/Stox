import './Tauri';
import { createApp } from 'vue';
import App from './App';
// Plugins
import Stox from './plugins/Stox';
import { router } from './plugins/Router';
import { i18n } from './plugins/I18n';
// @ts-ignore
import 'vfonts/FiraSans.css'

const app = createApp(App);
app.use(i18n);
app.use(Stox);
app.use(router);
app.mount('#app');
