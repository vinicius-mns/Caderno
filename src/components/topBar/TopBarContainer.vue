<script setup lang="ts">
import DesktopContainer from './DesktopContainer.vue'
import MobileContainer from './MobileContainer.vue'
import { onMounted, ref } from 'vue'

const isMobile = ref(true)

onMounted(() => {
  const screen = window.innerWidth
  const mobileDevice = screen < 769
  mobileDevice ? (isMobile.value = true) : (isMobile.value = false)
})
</script>

<template>
  <div class="topbar-container">
    <DesktopContainer v-show="!isMobile" />
    <MobileContainer v-show="isMobile" />
  </div>
</template>

<style scoped lang="scss">
.topbar-container {
  width: 100%;
  height: 100%;
}
</style>
