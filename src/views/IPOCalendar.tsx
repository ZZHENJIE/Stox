import { NLayout, NLayoutContent, NLayoutFooter, NLayoutHeader } from 'naive-ui';
import { defineComponent, h, type VNode } from 'vue';

export default defineComponent(() => {

    const header = () => {
        return h(NLayoutHeader, null, () => "Header")
    };
    const test = () => {
        const result: VNode[] = [];

        for (let i = 0; i < 100; i++) {
            result.push(h('div', null, i))
        }

        return result;
    }
    const content = () => {
        return h(NLayoutContent, null, () => test());
    };
    const footer = () => {
        return h(NLayoutFooter, null, () => "Footer")
    };

    const render = () => h(NLayout, null, () => [header(), content(), footer()]);

    return render;
});