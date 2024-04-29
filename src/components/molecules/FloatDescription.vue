<script setup lang="ts">
import { useStyle } from '@/stores/style'
import { nextTick, reactive, ref } from 'vue'

const { style } = useStyle()

const props = defineProps<{
  content: string
}>()

const card = ref<HTMLElement>()

const showFlotCard = ref(false)

const openFlotCard = () => (showFlotCard.value = true)

const closeFlotCard = () => (showFlotCard.value = false)

const cursorPosition = reactive({ x: '0px', y: '0px' })

const setCursorPostion = (e: MouseEvent) => {
  cursorPosition.x = `${e.clientX}px`
  cursorPosition.y = `${e.clientY}px`
}

const cardRepositionX = () => {
  const screen = window.innerWidth
  const cardWidth = card.value?.clientWidth as number
  const x = parseInt(cursorPosition.x)
  if (x >= cardWidth / 2) cursorPosition.x = `${parseInt(cursorPosition.x) - cardWidth / 2}px`
  if (x + cardWidth / 2 >= screen) {
    cursorPosition.x = `${parseInt(cursorPosition.x) - cardWidth / 2}px`
  }
}

// const cardRepositionY = () => {
//   const cardHeight = card.value?.clientHeight as number
//   const cardInBottonSide = parseInt(cursorPosition.y) > window.innerHeight / 2
//   const cardTranslateToTop = `${parseInt(cursorPosition.y) - cardHeight}px`
//   if (cardInBottonSide) cursorPosition.y = cardTranslateToTop
// }

const openCard = (e: MouseEvent) => {
  setCursorPostion(e)
  openFlotCard()
  nextTick(() => {
    cardRepositionX()
    // cardRepositionY()
  })
}
</script>

<template>
  <div class="float-card-description" @mousemove="openCard" @mouseleave="closeFlotCard">
    <p class="description-text" v-if="showFlotCard" ref="card">{{ props.content }}</p>
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
$color: v-bind('style.color.text');
$backColor: v-bind('style.color.background');
.description-text {
  z-index: 2;
  position: fixed;
  padding: 10px;
  color: $color;
  background-color: $backColor;
  text-wrap: nowrap;
  top: v-bind('cursorPosition.y');
  left: v-bind('cursorPosition.x');
  transform: translate(0, -100%);
  opacity: 0;
  animation: init 0.3s forwards;
}
@keyframes init {
  to {
    opacity: 100%;
    transform: translate(0, -170%);
  }
}
</style>
