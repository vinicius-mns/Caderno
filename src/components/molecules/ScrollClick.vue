<script setup lang="ts">
import { useStyle } from '@/stores/style'
import { ref } from 'vue'
import ThemeButton from '../atoms/ThemeButton.vue'

const { style } = useStyle()

const container = ref<HTMLElement>()

const toScroll = (type: 'left' | 'right') => {
  const range = window.innerWidth / 2
  const scroll = (to: number) => {
    if (container.value) {
      if (typeof container.value.scrollLeft === 'number') {
        container.value.scrollLeft = to
      }
    }
  }
  const execute = {
    left: () => {
      if (container.value) scroll(container.value.scrollLeft + range)
    },
    right: () => {
      if (container.value) scroll(container.value.scrollLeft - range)
    }
  }
  execute[type]()
}

const leftIco = '<'

const rightIco = '>'
</script>

<template>
  <div class="scroll-click-container">
    <ThemeButton class="button" @click="() => toScroll('right')">
      {{ leftIco }}
    </ThemeButton>
    <div class="container" ref="container">
      <slot></slot>
    </div>
    <ThemeButton class="button" @click="() => toScroll('left')">
      {{ rightIco }}
    </ThemeButton>
  </div>
</template>

<style scoped lang="scss">
$buttonSize: v-bind('style.button.size');
$margin: 10px;
.scroll-click-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  & .container {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    overflow: hidden;
    scroll-behavior: smooth;
  }
  & .button {
    height: 60%;
    flex-shrink: 0;
    aspect-ratio: 1;
    border-radius: 50%;
  }
}
</style>
