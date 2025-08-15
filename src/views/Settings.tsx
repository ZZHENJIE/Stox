import { NButton } from 'naive-ui';
import { h } from 'vue';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent(() => {

    const router = useRouter();
    const render = () => h(NButton, {
        onClick: () => router.push({ name: 'About' })
    }, () => 'About');

    return render;
});