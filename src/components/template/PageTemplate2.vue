<script setup lang="ts">
import { useStylesPage } from '@/stores/stylesPage/stylesPage'
import { ref } from 'vue'

const stylePage = useStylesPage()

const sideWidth = ref('280px')

// const sideShowOpen = (sideWidth.value = '240px')

const sideShowToggle = () => {
  sideWidth.value === '280px' ? (sideWidth.value = '0px') : (sideWidth.value = '240px')
}
</script>

<template>
  <div class="page">
    <main>
      <slot name="main"></slot>
    </main>
    <aside :style="{ width: sideWidth }">
      <header>
        <button @click="sideShowToggle">x</button>
      </header>
      <slot name="aside"></slot>
    </aside>
    <div :style="{ 'z-index': '1' }">
      <slot name="windows"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page {
  background-color: v-bind('stylePage.atualColor.front');
  min-height: 100dvh;
  display: flex;
  flex-direction: row-reverse;
  & main {
    width: 100%;
  }
  & aside {
    overflow: hidden;
    transition: all 0.3s;
    position: sticky;
    top: 0;
    height: 100dvh;
    background-color: v-bind('stylePage.atualColor.back');
    border-right: solid 1px v-bind('stylePage.atualColor.border');
    flex-shrink: 0;
    & header {
      height: 40px;
      width: 100%;
    }
  }
}
</style>
