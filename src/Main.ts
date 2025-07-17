import { createApp } from 'vue'
import App from './App.vue'
import { router } from './Router';
import { listenEvent } from './Tauri';
import Stox from './Stox';
import 'vfonts/FiraCode.css';

const app = createApp(App);
app.use(Stox);
app.use(router);
app.mount('#app');

await listenEvent();
