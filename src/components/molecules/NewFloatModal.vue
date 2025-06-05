<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
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

const button = ref<HTMLElement>()

const showFlotModal = ref(false)

const cursorPosition = reactive({ x: 0, y: 0 })

const position = reactive<{ x: 'left' | 'center' | 'right'; y: 'top' | 'bottom' }>({
  x: 'left',
  y: 'bottom'
})

const open = () => {
  const buttonReact = button.value?.getBoundingClientRect()!
  const { innerWidth: widthScreen, innerHeight: heightScreen } = window

  const buttonONLeft = buttonReact.left <= widthScreen * 0.3
  const buttonOnRight = buttonReact.right >= widthScreen * 0.7
  const buttonOnTop = buttonReact.bottom <= heightScreen / 2

  const bindX = {
    left: buttonReact.left,
    right: buttonReact.right,
    center: buttonReact.left + buttonReact.width / 2
  }

  const bindY = {
    top: buttonReact.bottom + 5,
    bottom: buttonReact.top - 5
  }

  const x = () => {
    if (buttonONLeft) return 'left'
    if (buttonOnRight) return 'right'
    return 'center'
  }

  const y = () => {
    if (buttonOnTop) return 'top'
    return 'bottom'
  }

  cursorPosition.x = bindX[x()]
  cursorPosition.y = bindY[y()]
  position.x = x()
  position.y = y()

  showFlotModal.value = true
}

const close = () => (showFlotModal.value = false)
</script>

<template>
  <div class="container-float-modal">
    <div v-if="clickStop" class="button-slot" @click.stop="open" ref="button">
      <slot name="button-slot"></slot>
    </div>

    <div v-else class="button-slot" @click="open" ref="button">
      <slot name="button-slot"></slot>
    </div>

    <CardFloatModal
      v-if="showFlotModal"
      v-bind="props"
      :cursor-x="cursorPosition.x"
      :cursor-y="cursorPosition.y"
      :position-x="position.x"
      :position-y="position.y"
      @close="close"
    >
      <slot name="container-slot" />
    </CardFloatModal>
  </div>
</template>

<style scoped lang="scss"></style>
