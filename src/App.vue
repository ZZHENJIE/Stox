<script lang="js">

import { ElAside, ElButton, ElContainer, ElIcon, ElMain, ElMenuItem, ElMenuItemGroup, ElScrollbar } from 'element-plus';

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
    <ElAside width="150px">
      <ElScrollbar>

        <ElMenu>

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
            <ElMenuItem @click="$router.push('/spac_calendar')" index="1-2">SPAC Calendar</ElMenuItem>
            <ElMenuItem @click="$router.push('/about')" index="1-3">About</ElMenuItem>
          </ElMenuItemGroup>
        </ElMenu>
      </ElScrollbar>
    </ElAside>

    <ElMain>
      <RouterView></RouterView>
    </ElMain>
  </ElContainer>
</template>
