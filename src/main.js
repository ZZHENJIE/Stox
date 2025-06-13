import { createApp } from "vue";
import App from "./App.vue";
import router from './router';
import 'vfonts/FiraCode.css';
import { listenEvent } from './tauri';

const vueApp = createApp(App);
vueApp.use(router);
vueApp.mount('#app');

await listenEvent();