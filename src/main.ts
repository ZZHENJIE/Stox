import { createApp } from 'vue'
import App from './App.vue'
import { router } from './Router';
import { listenEvent } from './Tauri';
import 'vfonts/FiraCode.css';

const app = createApp(App);
app.use(router);
app.mount('#app');

await listenEvent();
