<script setup lang="ts">
import { useStyle } from '@/stores/style'
import { nextTick, reactive, ref } from 'vue'

const { style } = useStyle()

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
      <div class="float-card" @click.stop ref="card">
        <slot class="slot" name="container-slot"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
// $borderRadius: v-bind('style.button.borderRadius');
$buttonSize: v-bind('style.button.size');
$cardColor: v-bind('style.color.background');
$buttonColor: v-bind('style.button.bgColor');
$boxShadow: v-bind('style.boxShadow');
.container-float-modal {
  height: 100%;
  width: 100%;
  & .button-open-modal {
    width: 100%;
    height: 100%;
  }
  & .glass {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1;
    padding: 0;
    margin: 0;
    width: 100dvw;
    height: 100dvh;
    background-color: transparent;
    backdrop-filter: blur(4px);
  }
  & .float-card {
    z-index: 2;
    transition: background-color 1s;
    position: fixed;
    background-color: $cardColor;
    box-shadow: $boxShadow;
    left: v-bind('cursorPosition.x');
    top: v-bind('cursorPosition.y');
    opacity: 0;
    margin-top: 20px;
    animation: init 0.3s forwards;
    max-width: 100%;
    margin-left: 0;
    margin-right: 0;
    border: solid 1px v-bind('style.color.base');
  }
}
@keyframes init {
  to {
    opacity: 100%;
    margin-top: 0;
    // transform: translateY(0);
  }
}
</style>
