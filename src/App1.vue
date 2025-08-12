<script lang="ts">
import { Home as HomeIcon, ArrowBackCircle, RefreshCircle } from '@vicons/ionicons5';
import { Menu } from './plugins/Router';
import { darkTheme, lightTheme } from "naive-ui";
import Kimi from './components/Kimi/Kimi.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    components: {
        HomeIcon,
        ArrowBackCircle,
        RefreshCircle,
    },
    data() {
        return {
            menu_options: Menu(),
            active_key: null as any,
            view_key: 0,
            darkTheme,
            lightTheme,
        }
    },
    methods: {
        Jump(_: string, item: any) {
            this.$router.push({
                name: item.key
            });
        }
    },
    mounted() {
        this.active_key = this.$route.name;
        this.$i18n.locale = this.$Config().language;
    },
    watch: {
        '$route'(to) {
            this.active_key = to.name
        },
    }
})

</script>

<template>
    <NConfigProvider :theme="$Config().is_dark_theme ? darkTheme : lightTheme">
        <NLayout position="absolute" has-sider>
            <NLayoutSider :native-scrollbar="false" v-show="$route.meta.standalone === false" width="200px"
                v-model:collapsed="$Config().main_menu_collapsed" show-trigger style="padding-top: 5px;">
                <n-flex justify="center">
                    <NButton round @click="$router.push({ name: 'Home' })">
                        <template #icon>
                            <NIcon>
                                <HomeIcon></HomeIcon>
                            </NIcon>
                        </template>
                    </NButton>
                    <NButton round @click="$router.back();">
                        <template #icon>
                            <NIcon>
                                <ArrowBackCircle></ArrowBackCircle>
                            </NIcon>
                        </template>
                    </NButton>
                    <NButton round @click="view_key += 1">
                        <template #icon>
                            <NIcon>
                                <RefreshCircle></RefreshCircle>
                            </NIcon>
                        </template>
                    </NButton>
                </n-flex>
                <NMenu :options="menu_options" v-model:value="active_key" @update:value="Jump">
                </NMenu>
            </NLayoutSider>
            <NLayoutContent :native-scrollbar="false">
                <RouterView style="padding: 5px;" :key="view_key">
                </RouterView>
                <Kimi v-if="$Config().main_menu_collapsed && $Config().kimi.is_show_button" />
            </NLayoutContent>
        </NLayout>
    </NConfigProvider>
</template>
