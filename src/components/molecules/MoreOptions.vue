<script setup lang="ts">
import { reactive } from 'vue'
import FixedCard from '../atoms/FixedCard.vue'
import ThemeButton from '../atoms/ThemeButton.vue'

const popUp = reactive({
  show: false,
  open: () => (popUp.show = true),
  close: () => (popUp.show = false)
})

const cursor = reactive({ x: 0, y: 0 })

const cursorPosition = (e: MouseEvent) => {
  cursor.x = e.clientX
  cursor.y = e.clientY
}

const openPopUp = (e: MouseEvent) => {
  cursorPosition(e)
  popUp.open()
}
</script>

<template>
  <div class="button-container">
    <ThemeButton class="button" @click="openPopUp">+</ThemeButton>
    <FixedCard v-if="popUp.show" :cursor-position="cursor">
      <slot></slot>
    </FixedCard>
  </div>
</template>

<style scoped lang="scss">
.button {
  height: 100%;
  width: 100%;
}
</style>
