<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
    methods: {
        async test() {
            const func = async () => {
                return new Promise((resolve, reject) => {
                    this.$DiscreteApi().modal.create({
                        preset: 'card',
                        onClose: () => {
                            resolve('done')
                        }
                    })
                })
            }

            console.log(await func());

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