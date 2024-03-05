<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useStyle } from '@/stores/style'
import TopBar from '@/components/template/TopBar.vue'
import ThemeButton from '@/components/atoms/ThemeButton.vue'
import ControlPanel from '@/components/template/ControlPanel.vue'
import MobileBar from '@/components/template/MobileBar.vue'

const { style } = useStyle()

const show = reactive({
  value: true,
  open: () => (show.value = true),
  close: () => (show.value = false)
})

// onMounted(() => {
//   if (window.innerWidth < 768) show.close()
// })
</script>

<template>
  <div class="home-page-container">
    <div class="router">
      <RouterView />
    </div>
    <MobileBar @openPanel="show.open" />
    <div :class="[show.value ? 'panel' : 'minimize', '']" @mouseenter="show.open">
      <ControlPanel @closePanel="show.close" v-show="show.value" />
    </div>
  </div>
</template>

<style scoped lang="scss">
$transition: all 0.5s;
$panelW: 290px;
$routerW: 100%;
.home-page-container {
  transition: $transition;
  height: 100dvh;
  display: flex;
  flex-direction: row-reverse;
  background-color: v-bind('style.page.bgColor');
  & .panel {
    transition: $transition;
    width: $panelW;
    height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    flex-grow: 0;
    // &:active {
    //   z-index: 200;
    // }
    @media screen and (max-width: 768px) {
      position: fixed;
      width: 100%;
      background-color: rgb(89, 89, 89);
    }
  }
  & .minimize {
    transition: $transition;
    width: 20px;
    background-color: rgba(125, 125, 125, 0.3);
    @media screen and (max-width: 768px) {
      width: 0;
    }
  }
  & .router {
    transition: $transition;
    width: $routerW;
    height: 100dvh;
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
// @media screen and (max-width: 768px) {
// }
</style>
