<script setup lang="ts">
import { useStylesPage } from '@/stores/stylesPage/stylesPage'
import { nextTick, reactive, ref } from 'vue'

const stylePage = useStylesPage()

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

const openCard = (e: MouseEvent) => {
  setCursorPostion(e)
  openFlotCard()
  nextTick(() => {
    cardRepositionX()
  })
}
</script>

<template>
  <div class="float-card-description" @mousemove="openCard" @mouseleave="closeFlotCard">
    <slot></slot>
    <p class="description-text" v-if="showFlotCard" ref="card">{{ props.content }}</p>
  </div>
</template>

<style scoped lang="scss">
.description-text {
  position: fixed;
  padding: 10px;
  color: v-bind('stylePage.atualColor.text');
  background-color: v-bind('stylePage.atualColor.front');
  border-radius: v-bind('stylePage.borderRadius.inside');
  border: solid 1px v-bind('stylePage.atualColor.border');
  text-wrap: nowrap;
  top: v-bind('cursorPosition.y');
  left: v-bind('cursorPosition.x');
  transform: translate(0, -120%);
  opacity: 0;
  animation: init 0.2s forwards;
}
@keyframes init {
  to {
    opacity: 100%;
    transform: translate(0, -180%);
  }
}
</style>
