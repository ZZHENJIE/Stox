<script lang="ts">
import { Chatbox } from '@vicons/ionicons5';

export default {
    components: {
        Chatbox
    },
    methods: {
        open() {
            this.$DiscreteApi().modal.create({
                preset: 'card',
                style: {
                    height: '500px',
                    width: '800px'
                },
            })
        }
    }
}

</script>

<template>
    <n-float-button @click="open" :left="50" :bottom="50">
        <n-icon>
            <Chatbox />
        </n-icon>
    </n-float-button>
</template>