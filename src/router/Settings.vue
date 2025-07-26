<script lang="ts">
import { AddCircle, CloseCircle } from '@vicons/ionicons5';
import { NButton, NCollapseItem, NDescriptions, NDescriptionsItem, NFlex, NRadioGroup, } from 'naive-ui';
import { h } from 'vue';
import KeywordsManager from '../components/Settings/KeywordsManager.vue';
import FinvizParameterManager from '../components/Settings/FinvizParameterManager.vue';
import FinvizIgnoreManager from '../components/Settings/FinvizIgnoreManager.vue';

export default {
    components: {
        AddCircle,
        CloseCircle,
    },
    methods: {
        reset_config() {
            if (this.$ResetConfig()) {
                this.$DiscreteApi().notification.create({
                    title: '重置设置成功 刷新后才能正常使用🥳'
                })
            }
        },
        keywords_manager() {
            this.$DiscreteApi().modal.create({
                preset: 'card',
                style: {
                    height: '500px',
                    width: '800px'
                },
                title: () => 'Keywords Manager',
                content: () => h(KeywordsManager, {
                    keywords: this.$Config().keywords,
                    discreteapi: this.$DiscreteApi(),
                    onUpdateKeywords: (newKeywords) => {
                        this.$Config().keywords = newKeywords;
                    },
                })
            })
        },
        finviz_parameter_manager() {
            this.$DiscreteApi().modal.create({
                preset: 'card',
                style: {
                    height: '500px',
                    width: '800px'
                },
                title: () => 'Parameter Manager',
                content: () => h(FinvizParameterManager, {
                    parameter: this.$Config().finviz.screener_parameter_list,
                    onUpdateParameter: (value) => {
                        this.$Config().finviz.screener_parameter_list = value;
                    }
                })
            })
        },
        finviz_ignore_manager() {
            this.$DiscreteApi().modal.create({
                preset: 'card',
                style: {
                    height: '500px',
                    width: '800px'
                },
                title: () => 'Ignore Manager',
                content: () => h(FinvizIgnoreManager, {
                    ignore: this.$Config().finviz.ignore,
                    discreteapi: this.$DiscreteApi(),
                    onUpdateIgnore: (newignore) => {
                        this.$Config().finviz.ignore = newignore;
                    },
                })
            })
        },
        language_change(value: string) {
            this.$i18n.locale = value;
        }
    }
}

</script>

<template>
    <NCollapse arrow-placement="right" accordion>
        <NCollapseItem title="Global" name="1">
            <NDescriptions :column="4">
                <NDescriptionsItem label="Language">
                    <NRadioGroup v-model:onUpdateValue="language_change" v-model:value="$Config().language">
                        <n-radio-button value="zh-CN">
                            简体中文
                        </n-radio-button>
                        <n-radio-button value="en-US">
                            English
                        </n-radio-button>
                    </NRadioGroup>
                </NDescriptionsItem>

                <NDescriptionsItem label="Select Theme">
                    <NSwitch v-model:value="$Config().is_dark_theme">
                        <template #checked>
                            Dark
                        </template>
                        <template #unchecked>
                            Light
                        </template>
                    </NSwitch>
                </NDescriptionsItem>

                <NDescriptionsItem label="Kimi Button Show">
                    <NSwitch v-model:value="$Config().kimi.is_show_button">
                        <template #checked>
                            Show
                        </template>
                        <template #unchecked>
                            Hide
                        </template>
                    </NSwitch>
                </NDescriptionsItem>
                <NDescriptionsItem label="Keywords">
                    <NButton @click="keywords_manager">
                        Manager
                    </NButton>
                </NDescriptionsItem>
            </NDescriptions>
        </NCollapseItem>

        <NCollapseItem title="Finviz" name="2">
            <NDescriptions :column="4">
                <NDescriptionsItem label="Token">
                    <NInput v-model:value="$Config().finviz.token" type="text" style="width: 200px;" />
                </NDescriptionsItem>

                <NDescriptionsItem label="Parameter">
                    <NButton @click="finviz_parameter_manager">Manager</NButton>
                </NDescriptionsItem>

                <NDescriptionsItem label="Ignore">
                    <NButton @click="finviz_ignore_manager">Manager</NButton>
                </NDescriptionsItem>
            </NDescriptions>
        </NCollapseItem>

        <NCollapseItem title="Macro Small" name="3">
            <NDescriptions :column="4">
                <NDescriptionsItem label="Font Size">
                    <n-input-number style="width: 200px;" v-model:value="$Config().macro_small.time_font_size" />
                </NDescriptionsItem>

                <NDescriptionsItem label="Font Color">
                    <n-color-picker v-model:value="$Config().macro_small.time_font_color" />
                </NDescriptionsItem>
            </NDescriptions>
        </NCollapseItem>
    </NCollapse>
    <div style="display: flex; justify-content: flex-end">
        <NFlex>
            <NButton round type="info" @click="$router.push({ name: 'About' })">
                {{ $t('about') }}
            </NButton>
            <NButton round type="info" @click="reset_config">
                Reset
            </NButton>
        </NFlex>
    </div>
</template>