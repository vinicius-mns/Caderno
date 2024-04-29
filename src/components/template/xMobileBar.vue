<!-- <script setup lang="ts">
// import { useStyle } from '@/stores/style'
import CardCreate from '../organisms/card/CardCreate.vue'
import ThemeButton from '../atoms/ThemeButton.vue'
import ThemeEmoji from '../atoms/ThemeEmoji.vue'

// const { style } = useStyle()

const emit = defineEmits<{
  (e: 'openPanel', v: void): void
}>()

const openPanel = () => emit('openPanel')
</script>

<template>
  <main class="mobile-bar">
    <ThemeButton @click="openPanel">
      <ThemeEmoji emoji="⭐" :colored="true" size="24px" />
    </ThemeButton>
    <CardCreate class="create-card" />
  </main>
</template>

<style scoped lang="scss">
.mobile-bar {
  height: 50px;
  width: 100dvw;
  bottom: 0;
  position: fixed;
  background-color: red;
  display: flex;
  justify-content: space-evenly;
  & .create-card {
    width: 80%;
  }
  @media screen and (min-width: 769px) {
    display: none;
  }
}
</style> -->
