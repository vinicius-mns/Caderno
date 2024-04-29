<!-- <script setup lang="ts">
import { reactive } from 'vue'
import FixedCard from '../atoms/FixedCard.vue'
import ThemeButton from '../atoms/ThemeButton.vue'

const props = defineProps<{
  visible: boolean
}>()

const emit = defineEmits<{
  (e: 'toggleVisible', v: void): void
}>()

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

const close = () => {
  popUp.close()
  emit('toggleVisible')
}
</script>

<template>
  <div class="button-container">
    <ThemeButton :class="[!props.visible ? 'transparent' : '', 'button']" @click="openPopUp"
      >+</ThemeButton
    >
    <FixedCard v-if="popUp.show" :cursor-position="cursor" @close="close">
      <slot></slot>
    </FixedCard>
  </div>
</template>

<style scoped lang="scss">
.button {
  height: 100%;
  width: 100%;
  border-radius: 50%;
  background-color: rgba(110, 110, 110, 0.4);
}
.transparent {
  background-color: transparent;
  color: transparent;
  &:hover {
    background-color: transparent;
    color: transparent;
  }
}
</style> -->
