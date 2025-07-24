<script lang="ts">
import { AddCircle, CloseCircle } from '@vicons/ionicons5';
import { NButton, NFlex, NFormItemGi, NInputGroup, NScrollbar, NSpace, } from 'naive-ui';
import { h } from 'vue';

export default {
    components: {
        AddCircle,
        CloseCircle
    },
    data() {
        return {
            new_keyword: ''
        }
    },
    methods: {
        reset_config() {
            this.$ResetConfig().then(value => {
                if (value) {
                    this.$DiscreteApi().notification.create({
                        title: '重置设置成功 刷新后才能正常使用🥳'
                    })
                }
            })
        },
        add_keyword() {
            if (!this.new_keyword.trim()) {
                return
            }
            const alreadyExists = this.$Config().keywords.some(
                k => k === this.new_keyword
            )
            if (alreadyExists) {
                this.$DiscreteApi().message.warning(`关键词 "${this.new_keyword}" 已存在`)
            } else {
                this.$Config().keywords.push(this.new_keyword);
                this.$DiscreteApi().message.success(`成功添加关键词: ${this.new_keyword}`);
                this.new_keyword = '';
            }
        },
        delete_keyword(keyword: string) {
            this.$Config().keywords = this.$Config().keywords.filter(k => k !== keyword)
        },
        keywords_management() {
            this.$DiscreteApi().modal.create({
                preset: 'card',
                style: {
                    height: '500px',
                    width: '800px'
                },
                content: () => {
                    return h(NScrollbar, {
                        style: {
                            'max-height': '420px'
                        }
                    }, {
                        default: () => this.$Config().keywords.map(item =>
                            h('div', {
                                style: 'display: flex; justify-content: space-between; align-items: center; padding: 8px;'
                            }, [
                                h('span', item),
                                h(NButton, {
                                    size: 'small',
                                    onClick: () => this.delete_keyword(item)
                                }, () => 'Delete')
                            ])
                        )
                    })
                }
            })
        }
    }
}

</script>

<template>
    <NForm>
        <NGrid :cols="24" :x-gap="24">

            <NFormItemGi :span="4" label="Language">
                <n-radio-group v-model:value="$Config().language">
                    <n-radio-button value="zh">
                        简体中文
                    </n-radio-button>
                    <n-radio-button value="en">
                        English
                    </n-radio-button>
                </n-radio-group>
            </NFormItemGi>

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

            <NFormItemGi :span="12" label="Keywords">
                <NSpace>
                    <NInputGroup>
                        <n-input v-model:value="new_keyword" style="width: 120px;" />
                        <n-button @click="add_keyword" type="primary" ghost>
                            Add
                        </n-button>
                    </NInputGroup>
                    <NButton @click="keywords_management">
                        Management
                    </NButton>
                </NSpace>
            </NFormItemGi>

            <NFormItemGi :span="6" label="Finviz Token">
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
                    <NFlex>
                        <NButton round type="info" @click="$router.push({ name: 'About' })">
                            About
                        </NButton>
                        <NButton round type="info" @click="reset_config">
                            Reset
                        </NButton>
                    </NFlex>
                </div>
            </NGi>
        </NGrid>
    </NForm>

</template>