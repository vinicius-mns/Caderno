<script setup lang="ts">
import { reactive } from 'vue'
import ThemeButton from '../atoms/ThemeButton.vue'
import SideBar from './SideBar.vue'
import ThemeComponent from '../atoms/ThemeComponent.vue'
import CardCreate from '../organisms/card/CardCreate.vue'
// import DarkMode from '../organisms/DarkMode.vue'
import ConfigGlobal from '../organisms/ConfigGlobal.vue'

const sideBar = reactive({
  show: false,
  open: () => (sideBar.show = true),
  close: () => (sideBar.show = false)
})
</script>

<template>
  <div class="mobile-bar">
    <CardCreate />
    <ThemeButton @click="sideBar.open" class="button"></ThemeButton>
    <ThemeComponent v-if="sideBar.show" class="side-bar-container">
      <header>
        <ThemeButton @click="sideBar.close" class="button">x</ThemeButton>
        <ConfigGlobal />
      </header>
      <SideBar />
    </ThemeComponent>
  </div>
</template>

<style scoped lang="scss">
.mobile-bar {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  & .button {
    aspect-ratio: 1;
    border-radius: 50%;
  }
  & .side-bar-container {
    padding: 2%;
    box-sizing: border-box;
    width: 90%;
    position: fixed;
    height: 100dvh;
    top: 0;
    right: 0;
    & header {
      width: 100%;
      display: flex;
      background-color: red;
      justify-content: space-between;
    }
  }
}
</style>
