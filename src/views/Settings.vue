<script lang="ts">

import { NButton, NForm, NFormItemGi, NGrid, NSpace, NSwitch } from 'naive-ui';
import { Reset_Config, Save_Config, Get_Config, DEFAULT_CONFIG } from '../Config';

export default {
    data() {
        return {
            config: DEFAULT_CONFIG
        }
    },
    async mounted() {
        this.config = await Get_Config();
    },
    methods: {
        Reset_Config,
        Save_Config,
        save() {
            Save_Config(this.config)
            window.location.reload();
        }
    }
}

</script>

<template>
    <NForm>
        <NGrid :cols="24" :x-gap="24">
            <NFormItemGi :span="6" label="Theme Change">
                <NSwitch v-model:value="config.isLightTheme">
                    <template #checked>
                        Dark
                    </template>
                    <template #unchecked>
                        Light
                    </template>
                </NSwitch>
            </NFormItemGi>

            <NFormItemGi :span="18" label="Finviz API Token">
                <n-input v-model:value="config.finviz_token" type="text" />
            </NFormItemGi>

            <NFormItemGi :span="24">
                <NSpace>
                    <NButton round type="info" @click="Reset_Config">
                        Reset
                    </NButton>
                    <NButton round type="primary" @click="save">
                        Save
                    </NButton>
                </NSpace>
            </NFormItemGi>
        </NGrid>
    </NForm>

</template>