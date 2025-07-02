<script lang="ts">
import { Home, ArrowBackCircle, RefreshCircle, Settings } from '@vicons/ionicons5';
import { MenuData } from './Router';
import { Get_Config, type AppConfig } from './Config';
import { darkTheme, lightTheme, NMessageProvider, NModalProvider } from 'naive-ui';

export default {
    components: {
        Home,
        ArrowBackCircle,
        RefreshCircle,
        Settings
    },
    data() {
        return {
            menuOptions: MenuData(),
            config: {} as AppConfig,
            activeKey: null as any,
            theme: null as any
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
        }
    },
    async mounted() {
        this.activeKey = this.$route.name;
        this.config = await Get_Config();
        this.theme = this.config.isLightTheme === true ? lightTheme : darkTheme;
    },
    watch: {
        '$route'(to) {
            this.activeKey = to.name
        }
    }
}

</script>

<template>
    <NConfigProvider :theme="theme">
        <NModalProvider>
            <NMessageProvider>
                <NLayout position="absolute" has-sider>
                    <NLayoutSider v-show="$route.meta.standalone === false" style="padding-top: 5px;" width="200px"
                        :native-scrollbar="false" bordered>
                        <NSpace justify="center">
                            <NButton round @click="$router.push({ name: 'Home' })">
                                <template #icon>
                                    <NIcon>
                                        <Home></Home>
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
                        </NSpace>
                        <NMenu :options="menuOptions" v-model:value="activeKey" @update:value="jump">
                        </NMenu>
                    </NLayoutSider>
                    <NLayoutContent :native-scrollbar="false" style="padding: 5px;">
                        <RouterView></RouterView>
                    </NLayoutContent>
                </NLayout>
            </NMessageProvider>
        </NModalProvider>
    </NConfigProvider>
</template>