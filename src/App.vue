<script lang="ts">
import { Home as HomeIcon, ArrowBackCircle, RefreshCircle } from '@vicons/ionicons5';
import { MenuData } from './utils/Router';
import { darkTheme, lightTheme } from "naive-ui";
import Kimi from './components/Kimi/Kimi.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    components: {
        HomeIcon,
        ArrowBackCircle,
        RefreshCircle,
        Kimi
    },
    data() {
        return {
            menuOptions: MenuData(),
            activeKey: null as any,
            darkTheme,
            lightTheme,
            viewKey: 0
        }
    },
    methods: {
        jump(_: string, item: any) {
            this.$router.push({
                name: item.key
            });
        },
        collapsed_change(value: boolean) {
            this.$Config().main_menu_collapsed = value;
        }
    },
    mounted() {
        this.activeKey = this.$route.name;
        this.$i18n.locale = this.$Config().language;
    },
    watch: {
        '$route'(to) {
            this.activeKey = to.name
        },
    }
})

</script>

<template>
    <NConfigProvider :theme="$Config().is_dark_theme ? darkTheme : lightTheme">
        <NLayout position="absolute" has-sider>
            <NLayoutSider :native-scrollbar="false" v-show="$route.meta.standalone === false" style="padding-top: 5px;"
                width="200px" bordered :collapsed="$Config().main_menu_collapsed" show-trigger
                :on-update:collapsed="collapsed_change" :collapsed-width="18">
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
                    <NButton round @click="viewKey += 1">
                        <template #icon>
                            <NIcon>
                                <RefreshCircle></RefreshCircle>
                            </NIcon>
                        </template>
                    </NButton>
                </n-flex>
                <NMenu :options="menuOptions" v-model:value="activeKey" @update:value="jump">
                </NMenu>
            </NLayoutSider>
            <NLayoutContent :native-scrollbar="false" style="padding: 5px;">
                <RouterView :key="viewKey">
                </RouterView>
                <Kimi v-if="$Config().main_menu_collapsed && $Config().kimi.is_show_button" />
            </NLayoutContent>
        </NLayout>
    </NConfigProvider>
</template>
