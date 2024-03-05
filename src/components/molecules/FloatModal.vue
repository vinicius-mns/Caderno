<script setup lang="ts">
import { reactive } from 'vue'
import FixedCard from '../atoms/FixedCard.vue'
import { useStyle } from '@/stores/style'
import ThemeIco from '../atoms/ThemeIco.vue'

const { style } = useStyle()

const props = defineProps<{
  ico: string
  title: string
  show: boolean
}>()

const emit = defineEmits<{
  (e: 'open', v: null): void
  (e: 'close', v: null): void
}>()

const cursor = reactive({ x: 0, y: 0 })

const cursorPosition = (e: MouseEvent) => {
  cursor.x = e.clientX
  cursor.y = e.clientY
}

const openPopUp = (e: MouseEvent) => {
  emit('open', null)
  cursorPosition(e)
}

const closePopUp = () => {
  emit('close', null)
}
</script>

<template>
  <div class="button-container">
    <ThemeIco :ico="props.ico" :colored="false" size="24px" :content="title" @click="openPopUp" />
    <FixedCard v-if="props.show" :cursor-position="cursor" class="relative-fixed-card">
      <header>
        <p>{{ title }}</p>
        <button class="close-button" @click="closePopUp">X</button>
      </header>
      <slot></slot>
    </FixedCard>
  </div>
</template>

<style scoped lang="scss">
$size: v-bind('style.button.size');
$textColor: v-bind('style.button.textColor');
.button-container {
  & .relative-fixed-card {
    & header {
      position: relative;
      height: $size;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: $textColor;
      & .close-button {
        height: 100%;
        aspect-ratio: 1;
        position: absolute;
        right: 0;
        top: 0;
        cursor: pointer;
        border: none;
        background-color: transparent;
        color: $textColor;
        &:hover {
          background-color: red;
        }
      }
    }
  }
}
</style>
