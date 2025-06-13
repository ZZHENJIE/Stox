<script lang="js">

import { Reset_Config, Save_Config, Get_Config, DEFAULT_CONFIG } from '../script/config'

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
    <n-form>
        <n-grid :cols="24" :x-gap="24">
            <n-form-item-gi :span="6" label="Theme Change">
                <n-switch v-model:value="config.isLightTheme">
                    <template #checked>
                        Dark
                    </template>
                    <template #unchecked>
                        Light
                    </template>
                </n-switch>
            </n-form-item-gi>

            <n-form-item-gi :span="18" label="Finviz API Token">
                <n-input v-model:value="config.finviz_token" type="text" />
            </n-form-item-gi>

            <n-form-item-gi :span="24">
                <n-space>
                    <n-button round type="info" @click="Reset_Config">
                        Reset
                    </n-button>
                    <n-button round type="primary" @click="save">
                        Save
                    </n-button>
                </n-space>
            </n-form-item-gi>
        </n-grid>
    </n-form>

</template>