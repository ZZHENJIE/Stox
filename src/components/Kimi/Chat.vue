<script lang="ts">
import { AddCircle, Exit } from '@vicons/ionicons5';
import { Kimi_Chat_List, Kimi_Create_Chat } from '../../utils/Request';

export default {
    components: {
        AddCircle,
        Exit
    },
    props: {
        modelValue: {
            type: Object,
            required: true,
        },
        log_out: {
            type: Function,
            required: true
        }
    },
    data() {
        return {
            is_create_chat: false,
            new_chat_name: '',
            chat_list: [] as any[]
        }
    },
    mounted() {
        console.log(this.modelValue);
        this.refresh();
    },
    methods: {
        refresh() {
            Kimi_Chat_List(this.modelValue.access_token).then(text => {
                const json = JSON.parse(text);
                this.chat_list = json.items;
                console.log(json);
            })
        },
        create_chat() {
            Kimi_Create_Chat(this.modelValue.access_token, this.new_chat_name).then(text => {
                const json = JSON.parse(text);
                console.log(json);

                this.refresh();
                this.is_create_chat = false;
                this.new_chat_name = '';
            })
        }
    }
}

</script>

<template>
    <n-flex>
        <n-card :title="modelValue.user.phone" style="margin-bottom: 16px">
            <template #header-extra>
                <n-flex>
                    <n-input-group v-if="is_create_chat">
                        <n-input v-model:value="new_chat_name" />
                        <n-button @click="create_chat" ghost>
                            <n-icon>
                                <AddCircle></AddCircle>
                            </n-icon>
                        </n-button>
                    </n-input-group>
                    <n-tooltip v-else trigger="hover">
                        <template #trigger>
                            <n-avatar round size="medium" :src="modelValue.user.avatar">
                            </n-avatar>
                        </template>
                        <n-flex>
                            <n-button @click="is_create_chat = true">
                                Create New Chat
                            </n-button>
                            <n-button @click="log_out">
                                Log Out
                            </n-button>
                        </n-flex>
                    </n-tooltip>
                </n-flex>
            </template>

            <n-tabs type="line" animated>
                <n-tab-pane v-for="item in chat_list" :name="item.id" :tab="item.name">
                    <n-scrollbar style="max-height: 140px">
                        <p v-for="item in 100">
                            Wonderwall
                        </p>
                    </n-scrollbar>
                </n-tab-pane>
            </n-tabs>
            <template #action>
                <n-input type="textarea" :autosize="{
                    minRows: 2,
                    maxRows: 4,
                }" />
            </template>
        </n-card>
    </n-flex>
</template>