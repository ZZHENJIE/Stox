<script lang="ts">
import { Chatbox } from '@vicons/ionicons5';
import Login from './Login.vue';
import Chat from './Chat.vue';
import { h } from 'vue';

export default {
    components: {
        Chatbox,
        Login,
        Chat
    },
    methods: {
        login_succeed(obj: object) {
            this.$Config().kimi.login_status = obj;
        },
        log_out() {
            this.$Config().kimi.login_status = null;
        },
        start() {
            const app = this;
            this.$DiscreteApi().modal.create({
                preset: 'card',
                style: {
                    height: '500px',
                    width: '800px'
                },
                content() {
                    const login_status = app.$Config().kimi.login_status;
                    if (login_status != null) {
                        return h(Chat, {
                            modelValue: login_status,
                            log_out: app.log_out
                        });
                    } else {
                        return h(Login, {
                            succeed: app.login_succeed
                        });
                    }
                },
            })
        }
    }
}

</script>

<template>
    <n-float-button @click="start" :left="50" :bottom="50">
        <n-icon>
            <Chatbox />
        </n-icon>
    </n-float-button>
</template>