import { createApp } from 'vue'
import App from './App.vue'
import { router } from './utils/Router';
import { listenEvent } from './utils/Tauri';
import Stox from './utils/Stox';
// @ts-ignore
import 'vfonts/FiraSans.css'

const app = createApp(App);
app.use(Stox);
app.use(router);
app.mount('#app');

await listenEvent();
