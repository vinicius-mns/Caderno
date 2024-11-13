<script setup lang="ts">
import { nextTick, reactive, ref } from 'vue'

const props = withDefaults(defineProps<{ closeOnClick?: boolean }>(), { closeOnClick: false })

const emit = defineEmits<{
  (e: 'open', v: void): void
  (e: 'close', v: void): void
}>()

const card = ref<HTMLElement>()

const showFlotModal = ref(false)

const open = () => {
  showFlotModal.value = true
  emit('open')
}

const close = () => {
  showFlotModal.value = false
  emit('close')
}

const toggleShowModal = () => (showFlotModal.value = !showFlotModal.value)

const cursorPosition = reactive({ x: '0px', y: '0px' })

const setCursorPostion = (e: MouseEvent) => {
  cursorPosition.x = `${e.clientX}px`
  cursorPosition.y = `${e.clientY}px`
}

const cardRepositionX = () => {
  const screen = window.innerWidth
  const cardWidth = card.value?.clientWidth as number
  const cardInRightSide = parseInt(cursorPosition.x) > screen / 2
  const cardTranslateToLeft = `${parseInt(cursorPosition.x) - cardWidth}px`
  if (screen <= 768) cursorPosition.x = `${screen / 2 - cardWidth / 2}px`
  else if (cardInRightSide) cursorPosition.x = cardTranslateToLeft
}

const cardRepositionY = () => {
  const cardHeight = card.value?.clientHeight as number
  const cardInBottonSide = parseInt(cursorPosition.y) > window.innerHeight / 2
  const cardTranslateToTop = `${parseInt(cursorPosition.y) - cardHeight}px`
  if (cardInBottonSide) cursorPosition.y = cardTranslateToTop
}

const openCard = (e: MouseEvent) => {
  setCursorPostion(e)
  toggleShowModal()
  nextTick(() => {
    cardRepositionX()
    cardRepositionY()
  })
}

const closeIfCloseOnClick = () => {
  props.closeOnClick && close()
}

defineExpose({
  open,
  close
})
</script>

<template>
  <div class="container-float-modal">
    <div class="button-slot" @click="openCard">
      <slot name="button-slot"></slot>
    </div>

    <div class="glass" v-if="showFlotModal" @click="close">
      <div class="float-card" @click.stop ref="card" @click="closeIfCloseOnClick">
        <slot class="slot" name="container-slot"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container-float-modal {
  & .glass {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 3;
    padding: 0;
    margin: 0;
    width: 100dvw;
    height: 100dvh;
    border-radius: 16px;
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(3px);
  }
  & .float-card {
    position: fixed;
    opacity: 0;
    left: v-bind('cursorPosition.x');
    top: v-bind('cursorPosition.y');
    animation: initModal 0.3s forwards;
    margin-top: 20px;
  }
}
@keyframes initModal {
  to {
    opacity: 100%;
    margin-top: 0;
  }
}
</style>
