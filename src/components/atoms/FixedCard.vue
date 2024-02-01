<script setup lang="ts">
import { useStyle } from '@/stores/style'
import { onMounted, ref } from 'vue'

const { style } = useStyle()

const props = defineProps<{
  cursorPosition: { x: number; y: number }
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

onMounted(() => {
  cardRepositionX()
  cardRepositionY()
})
</script>

<template>
  <div class="float-card translatex translatey" @click.stop ref="card">
    <slot class="slot"></slot>
  </div>
</template>

<style scoped lang="scss">
$buttonSize: v-bind('style.button.size');
$cardColor: v-bind('style.component.bgColor');
$buttonColor: v-bind('style.button.bgColor');
$boxShadow: v-bind('style.boxShadow');
.float-card {
  z-index: 1;
  position: fixed;
  padding: 10px;
  border-radius: 8px;
  background-color: $cardColor;
  box-shadow: $boxShadow;

  left: v-bind(leftCard);
  top: v-bind(topCard);
}
</style>
