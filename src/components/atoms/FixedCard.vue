<script setup lang="ts">
import { useStyle } from '@/stores/style'
import { onMounted, ref } from 'vue'

const { style } = useStyle()

const props = defineProps<{
  cursorPosition: { x: number; y: number }
}>()

const emit = defineEmits<{
  (e: 'toggleVisible', v: void): void
}>()

const card = ref<HTMLElement>()

const topCard = ref(`${props.cursorPosition.y}px`)
const leftCard = ref(`${props.cursorPosition.x}px`)

const cardRepositionX = () => {
  const cardWidth = card.value?.clientWidth as number
  const cardInRightSide = props.cursorPosition.x > window.innerWidth / 2
  const cardTranslateToLeft = `${props.cursorPosition.x - cardWidth}px`
  if (cardInRightSide) leftCard.value = cardTranslateToLeft
}

const cardRepositionY = () => {
  const cardHeight = card.value?.clientHeight as number
  const cardInBottonSide = props.cursorPosition.y > window.innerHeight / 2
  const cardTranslateToTop = `${props.cursorPosition.y - cardHeight}px`
  if (cardInBottonSide) topCard.value = cardTranslateToTop
}

const close = () => emit('toggleVisible')

onMounted(() => {
  cardRepositionX()
  cardRepositionY()
})
</script>

<template>
  <div class="float-card" @click.stop ref="card">
    <slot class="slot"></slot>
  </div>
  <div class="glass" @click="close"></div>
</template>

<style scoped lang="scss">
$borderRadius: v-bind('style.button.borderRadius');
$buttonSize: v-bind('style.button.size');
$cardColor: v-bind('style.color.base');
$buttonColor: v-bind('style.button.bgColor');
$boxShadow: v-bind('style.boxShadow');
.float-card {
  transition: background-color 1s;
  z-index: 2;
  position: fixed;
  padding: 10px;
  border-radius: $borderRadius;
  background-color: $cardColor;
  box-shadow: $boxShadow;
  left: v-bind(leftCard);
  top: v-bind(topCard);
}
.glass {
  z-index: 1;
  content: '';
  background-color: v-bind('style.color.neutral');
  opacity: 30%;
  position: fixed;
  width: 100%;
  height: 100dvh;
  top: 0;
  left: 0;
}
</style>
