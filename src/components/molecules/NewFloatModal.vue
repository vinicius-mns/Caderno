<script setup lang="ts">
import { reactive, ref } from 'vue'
import CardFloatModal from '../atoms/CardFloatModal.vue'

const props = withDefaults(
  defineProps<{
    closeOnClick?: boolean
    clickStop?: boolean
  }>(),
  {
    closeOnClick: false,
    clickStop: false
  }
)

const showFlotModal = ref(false)

const cursorPosition = reactive({ x: 0, y: 0 })

const setCursorPostion = (e: MouseEvent) => {
  cursorPosition.x = e.clientX
  cursorPosition.y = e.clientY + 10
}

const open = (e: MouseEvent) => {
  setCursorPostion(e)
  showFlotModal.value = true
}

const close = () => (showFlotModal.value = false)
</script>

<template>
  <div class="container-float-modal">
    <div v-if="clickStop" class="button-slot" @click.stop="open">
      <slot name="button-slot"></slot>
    </div>

    <div v-else class="button-slot" @click="open">
      <slot name="button-slot"></slot>
    </div>

    <CardFloatModal
      v-if="showFlotModal"
      v-bind="props"
      :cursor-x="cursorPosition.x"
      :cursor-y="cursorPosition.y"
      @close="close"
    >
      <slot name="container-slot" />
    </CardFloatModal>
  </div>
</template>

<style scoped lang="scss"></style>
