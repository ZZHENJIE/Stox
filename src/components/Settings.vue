<script lang="ts">
import { darkTheme, lightTheme } from 'naive-ui';

export default {
    data() {
        return {
            lightTheme: lightTheme,
            darkTheme: darkTheme,
            theme: false,//light true,dark false
        }
    },
    mounted() {
        this.theme = this.$Config().theme.name === 'light' ? true : false;
    },
    methods: {
        theme_handle_change(value: boolean) {
            this.$Config().theme = value ? lightTheme : darkTheme;
        }
    }
}

</script>

<template>
    <NForm>
        <NGrid :cols="24" :x-gap="24">

            <NFormItemGi :span="4" label="Theme Change">
                <NSwitch @update:value="theme_handle_change" v-model:value="theme">
                    <template #checked>
                        Light
                    </template>
                    <template #unchecked>
                        Dark
                    </template>
                </NSwitch>
            </NFormItemGi>

            <NFormItemGi :span="4" label="Kimi Button">
                <NSwitch v-model:value="$Config().kimi.is_show_button">
                    <template #checked>
                        Show
                    </template>
                    <template #unchecked>
                        Hide
                    </template>
                </NSwitch>
            </NFormItemGi>

            <NFormItemGi :span="16" label="Finviz Token">
                <NInput v-model:value="$Config().finviz.token" type="text" />
            </NFormItemGi>

            <NFormItemGi :span="4" label="Macro Small Font">
                <n-input-number v-model:value="$Config().macro_small.time_font_size" />
            </NFormItemGi>

            <NFormItemGi :span="6" label="Macro Small Font Color">
                <n-color-picker v-model:value="$Config().macro_small.time_font_color" />
            </NFormItemGi>

            <NGi :span="24">
                <div style="display: flex; justify-content: flex-end">
                    <NButton round type="info" @click="$ResetConfig">
                        Reset
                    </NButton>
                </div>
            </NGi>
        </NGrid>
    </NForm>

</template>