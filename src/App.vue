<script lang="js">
import { routes } from './router';
import { Home, ArrowBackCircle, RefreshCircle, Settings } from '@vicons/ionicons5';
import { Get_Config } from './script/config';

export default {
    components: {
        Home,
        ArrowBackCircle,
        RefreshCircle,
        Settings
    },
    data() {
        return {
            menuOptions: [],
            activeKey: '',
            theme: null
        }
    },
    methods: {
        jump(key, item) {
            this.$router.push({
                name: item.key
            })
        },
        to_home() {
            this.$router.push({
                name: 'Home'
            })
        },
        back() {
            this.$router.back();
        },
        refresh() {
            window.location.reload();
        }
    },
    mounted() {
        Get_Config().then(config => {
            this.theme = config.theme;
        })

        for (const route of routes) {
            if (route.name === 'Home') continue;
            if (route.name === 'MacroSmall') continue;
            if (route.name === 'FutuNew') continue;
            if (route.name === 'About') continue;

            this.menuOptions.push({
                label: route.meta.title,
                key: route.name,
                path: route.path,
            })
        }
        this.activeKey = this.$route.name;
    },
    watch: {
        '$route'(to) {
            this.activeKey = to.name
        }
    }
}
</script>

<template>
    <n-config-provider :theme="theme">
        <n-layout position="absolute" has-sider>
            <n-layout-sider v-show="$route.meta.standalone === false" style="padding-top: 5px;" width="200px"
                :native-scrollbar="false" bordered>
                <n-space vertical>
                    <n-space justify="center">
                        <n-button round @click="to_home">
                            <template #icon>
                                <n-icon>
                                    <Home></Home>
                                </n-icon>
                            </template>
                        </n-button>
                        <n-button round @click="back">
                            <template #icon>
                                <n-icon>
                                    <ArrowBackCircle></ArrowBackCircle>
                                </n-icon>
                            </template>
                        </n-button>
                        <n-button round @click="refresh">
                            <template #icon>
                                <n-icon>
                                    <RefreshCircle></RefreshCircle>
                                </n-icon>
                            </template>
                        </n-button>
                    </n-space>
                    <n-menu :options="menuOptions" v-model:value="activeKey" @update:value="jump">
                    </n-menu>
                </n-space>
            </n-layout-sider>
            <n-layout-content :native-scrollbar="false" style="padding: 5px;">
                <RouterView></RouterView>
            </n-layout-content>
        </n-layout>
    </n-config-provider>
</template>