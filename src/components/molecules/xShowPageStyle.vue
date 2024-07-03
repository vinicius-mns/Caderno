<!-- <script setup lang="ts">
import { useStyle } from '@/stores/style'
import ThemeP from '../atoms/ThemeP.vue'

const { optionsStyle } = useStyle()
</script>

<template>
  <div class="colors" v-for="(option, i) in optionsStyle" :key="i">
    <ThemeP content="texto" :style="{ color: option.color.text }" />
    <div class="color" :style="{ backgroundColor: option.color.one }"></div>
    <div class="color" :style="{ backgroundColor: option.color.two }"></div>
    <div class="color" :style="{ backgroundColor: option.color.three }"></div>
    <div class="color" :style="{ backgroundColor: option.color.four }"></div>
  </div>
</template>

<style scoped lang="scss">
.colors {
  width: 100%;
  height: 80px;
  background-color: rgb(116, 116, 116);
  display: flex;
  align-items: center;
  & .color {
    margin: 3px;
    height: 40px;
    aspect-ratio: 1;
  }
}
</style> -->
