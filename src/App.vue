<script lang="ts">
import { Home as HomeIcon, ArrowBackCircle, RefreshCircle } from '@vicons/ionicons5';
import { MenuData } from './Router';
import Kimi from './components/Kimi/Main.vue';
import Start from './components/Start.vue';

export default {
    components: {
        HomeIcon,
        ArrowBackCircle,
        RefreshCircle,
        Kimi,
        Start
    },
    data() {
        return {
            menuOptions: MenuData(),
            activeKey: null as any,
            menu_collapsed: false,
            is_show: false,
            load_time: 1000
        }
    },
    methods: {
        jump(_: string, item: any) {
            this.$router.push({
                name: item.label
            });
        },
        refresh() {
            window.location.reload();
        },
        collapsed_change(value: boolean) {
            this.menu_collapsed = value;
        }
    },
    mounted() {
        this.activeKey = this.$route.name;
        setTimeout(() => {
            this.is_show = true;
        }, this.load_time);
    },
    beforeUnmount() {
        this.$SaveConfig();
    },
    watch: {
        '$route'(to) {
            this.activeKey = to.name
        },
    }
}

</script>

<template>
    <NConfigProvider v-if="is_show" :theme="$Config().theme">
        <NLayout position="absolute" has-sider>
            <NLayoutSider :native-scrollbar="false" v-show="$route.meta.standalone === false" style="padding-top: 5px;"
                width="200px" bordered :collapsed="menu_collapsed" show-trigger :on-update:collapsed="collapsed_change"
                :collapsed-width="18">
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
                    <NButton round @click="refresh">
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
                <RouterView>
                </RouterView>
                <Kimi v-if="menu_collapsed && $Config().kimi.is_show_button" />
            </NLayoutContent>
        </NLayout>
    </NConfigProvider>
    <Start :load_time="load_time" v-else></Start>
</template>