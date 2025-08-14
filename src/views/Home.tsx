import { h } from 'vue';
import { defineComponent } from 'vue';
import Futu from '../components/Futu';

export default defineComponent(() => {
    const render = () => h(Futu.FlashNews());

    return render;
});