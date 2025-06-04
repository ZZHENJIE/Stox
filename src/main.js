import { createApp } from "vue";
import App from "./App.vue";
import router from './router';
import 'vfonts/FiraCode.css';

const app = createApp(App);

app.config.globalProperties.$formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000)
    return `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())} - ${padZero(date.getHours())}:${padZero(date.getMinutes())}:${padZero(date.getSeconds())}`;
}

function padZero(num) {
    return num < 10 ? `0${num}` : num
}

app.use(router);
app.mount("#app");