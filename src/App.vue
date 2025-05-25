<script lang="js">

import { ElAside, ElBacktop, ElButton, ElContainer, ElIcon, ElMain, ElMenuItem, ElMenuItemGroup, ElScrollbar } from 'element-plus';

export default {
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
          <ElMenuItem @click="$router.push('/new')" index="1-1">New</ElMenuItem>
          <ElMenuItem @click="$router.push('/finviz')" index="1-4">Finviz</ElMenuItem>
          <ElMenuItem @click="$router.push('/spac_calendar')" index="1-2">SPAC Calendar</ElMenuItem>
          <ElMenuItem @click="$router.push('/about')" index="1-3">About</ElMenuItem>
        </ElMenuItemGroup>
      </ElMenu>
    </ElAside>

    <!-- 右侧内容区（独立滚动） -->
    <ElMain style="margin-left: 150px;">

      <RouterView />
    </ElMain>
  </ElContainer>
</template>