<!-- <script setup lang="ts">
import { useStylesPage } from '@/stores/stylesPage/stylesPage'

const stylePage = useStylesPage()
</script>

<template>
  <div class="page">
    <main>
      <slot name="main"></slot>
    </main>
    <aside>
      <slot name="aside"></slot>
    </aside>
    <slot name="windows"></slot>
  </div>
</template>

<style scoped lang="scss">
.page {
  background-color: v-bind('stylePage.atualColor.back');
  min-height: 100dvh;
  & main {
    padding-bottom: 100px;
  }
  & aside {
    position: fixed;
    width: 60%;
    bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    flex-shrink: 0;
    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }
}
</style> -->
