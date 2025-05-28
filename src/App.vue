<script lang="js">

import { ElAside, ElButton, ElContainer, ElIcon, ElMain, ElMenuItem, ElMenuItemGroup } from 'element-plus';
import { routes } from './router'

export default {
  data() {
    return {
      routes_list: []
    }
  },
  mounted() {
    for (let index = 0; index < routes.length; index++) {
      const router = routes[index];
      if (router.name === 'Home') {//不需要首页菜单栏
        continue;
      }
      if (router.name === 'SPAC_Calendar') {//修改显示内容
        router.name = 'SPAC Calendar';
      }
      this.routes_list.push({
        index: index.toString(),
        name: router.name,
        path: router.path
      });
    }
  },
  methods: {
    refresh() {
      window.location.reload();
    }
  }
}

</script>

<template>
  <ElContainer>
    <!-- 左侧菜单栏（固定宽度和位置） -->
    <ElAside style="position: fixed;" width="150px">
      <ElMenu>
        <!-- 菜单内容保持不变 -->
        <ElMenuItemGroup>
          <div style="text-align: center;">
            <ElButton @click="$router.push('/')" circle>
              <ElIcon>
                <HomeFilled />
              </ElIcon>
            </ElButton>
            <ElButton @click="$router.back()" circle>
              <ElIcon>
                <Back />
              </ElIcon>
            </ElButton>
            <ElButton @click="refresh()" circle>
              <ElIcon>
                <Refresh />
              </ElIcon>
            </ElButton>
          </div>
          <ElMenuItem v-for="item in routes_list" @click="$router.push(item.path)" :index="item.index">{{ item.name }}
          </ElMenuItem>
          <!-- <ElMenuItem @click="$router.push('/moomoo')" index="1-1">Moomoo</ElMenuItem>
          <ElMenuItem @click="$router.push('/finviz')" index="1-4">Finviz</ElMenuItem>
          <ElMenuItem @click="$router.push('/spac_calendar')" index="1-2">SPAC Calendar</ElMenuItem>
          <ElMenuItem @click="$router.push('/about')" index="1-3">About</ElMenuItem> -->
        </ElMenuItemGroup>
      </ElMenu>
    </ElAside>

    <!-- 右侧内容区（独立滚动） -->
    <ElMain style="margin-left: 150px;">

      <RouterView />
    </ElMain>
  </ElContainer>
</template>