<script lang="js">
import { routes } from './router';
import { Home, ArrowBackCircle, RefreshCircle } from '@vicons/ionicons5';
import { darkTheme } from 'naive-ui';

export default {
    components: {
        Home,
        ArrowBackCircle,
        RefreshCircle
    },
    data() {
        return {
            menuOptions: [],
            activeKey: '',
            darkTheme: darkTheme
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
    created() {
        console.log();
    },
    mounted() {
        for (const route of routes) {
            if (route.name === 'Home') continue;
            if (route.name === 'Macro_Small') continue;
            if (route.name === 'Moomoo_new') continue;

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
    <n-config-provider :theme="darkTheme">
        <n-layout style="height: 100vh;">
            <n-layout position="absolute" has-sider>
                <n-layout-sider v-show="$route.meta.standalone === false" style="padding-top: 5px;" width="200px"
                    :native-scrollbar="false" bordered>
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
                    <n-menu :options="menuOptions" :router="true" v-model:value="activeKey" @update:value="jump">
                    </n-menu>
                </n-layout-sider>
                <n-layout-content :native-scrollbar="false">
                    <RouterView style="padding: 5px;"></RouterView>
                </n-layout-content>
            </n-layout>
        </n-layout>
    </n-config-provider>
</template>