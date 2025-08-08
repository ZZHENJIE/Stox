<script lang="ts">
import { defineComponent, h, type VNode } from 'vue';
import Discrete from '../components/Discrete';


export default defineComponent({
    methods: {
        test() {
            const array: VNode[] = [];
            for (let i = 0; i < 100; i++) {
                array.push(h('p', null, i.toString()));
            };
            Discrete.Modal(this.$Config(), {
                content: () => h('div', null, array)
            });

        }
    },
})

</script>

<template>
    <NButton @click="test">xxx</NButton>
    <!-- <HeaderView content-padding-top="60px">
        <template #header>
            xxx
        </template>
<p v-for="i in 100">{{ i }}</p>
</HeaderView> -->
</template>