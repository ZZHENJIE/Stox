<script lang="ts">

export default {

}

</script>

<template>
    <NForm>
        <NGrid :cols="24" :x-gap="24">

            <NFormItemGi :span="4" label="Theme Change">
                <NSwitch v-model:value="$Config().is_dark_theme">
                    <template #checked>
                        Dark
                    </template>
                    <template #unchecked>
                        Light
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