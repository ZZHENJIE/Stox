<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        contentPaddingTop: {
            type: [String, Number],
            default: "60px",
        },
    }
})
</script>

<template>
    <div class="layout-container">
        <div class="header-wrapper">
            <div class="header">
                <n-card>
                    <slot name="header" />
                </n-card>
            </div>
        </div>
        <div class="content" :style="{ paddingTop: contentPaddingTop }">
            <slot />
        </div>
    </div>
</template>

<style scoped>
.layout-container {
    position: relative;
    width: 100%;
    min-height: 100vh;
}

.header-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    /* 使用视口宽度确保全宽 */
    z-index: 1000;
}

.header {
    width: 100%;
    max-width: 100%;
    /* 防止内容溢出 */
    margin: 0 auto;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.content {
    width: 100%;
    min-height: calc(100vh - v-bind(contentPaddingTop));
}
</style>