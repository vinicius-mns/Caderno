<script setup lang="ts">
import { ref } from 'vue'
import ThemeButton from '../atoms/ThemeButton.vue'

const props = defineProps<{ range: number; scrollButtons: boolean }>()

const container = ref<HTMLElement>()

const toScroll = (type: 'left' | 'right') => {
  // const range = window.innerWidth / 2
  const scroll = (to: number) => {
    if (container.value) {
      if (typeof container.value.scrollLeft === 'number') {
        container.value.scrollLeft = to
      }
    }
  }
  const execute = {
    left: () => {
      console.log('clicado')
      if (container.value) scroll(container.value.scrollLeft + props.range)
    },
    right: () => {
      if (container.value) scroll(container.value.scrollLeft - props.range)
    }
  }
  execute[type]()
}

const leftIco = '<'
const rightIco = '>'
</script>

<template>
  <div class="scroll-click-container">
    <ThemeButton class="button" @click="() => toScroll('right')" v-if="props.scrollButtons">
      {{ leftIco }}
    </ThemeButton>
    <div class="container" ref="container">
      <slot></slot>
    </div>
    <ThemeButton class="button" @click="() => toScroll('left')" v-if="props.scrollButtons">
      {{ rightIco }}
    </ThemeButton>
  </div>
</template>

<style scoped lang="scss">
$buttonSize: 36px;
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
