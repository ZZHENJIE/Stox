import { NImage, NSkeleton, type ImageProps } from 'naive-ui';
import { defineComponent, h, ref } from 'vue';

function LoadImage(options: ImageProps) {
    return defineComponent(() => {
        const is_loading = ref(true);

        return () => h('div', [
            h(NSkeleton, {
                width: options.width,
                height: options.height,
                sharp: false,
                style: { display: is_loading.value ? 'block' : 'none' }
            }),
            h(NImage, {
                ...options,
                style: { display: is_loading.value ? 'none' : 'block' },
                onLoad: () => is_loading.value = false
            })
        ]);
    });
}

export default {
    LoadImage
}
