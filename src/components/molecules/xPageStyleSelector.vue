<!-- <script setup lang="ts">
import ThemeP from '../atoms/ThemeP.vue'
import ThemeButton from '../atoms/ThemeButton.vue'
import { useStylesPage } from '@/stores/stylesPage/stylesPage'

const stylePage = useStylesPage()

const emit = defineEmits<{
  (e: 'emitColor', v: string): void
}>()

const emitColor = (name: string) => emit('emitColor', name)
</script>

<template>
  <div class="page-color-container">
    <div class="color-options-container">
      <div
        class="colors-container"
        v-for="(color, i) in colorsList"
        :key="i"
        :style="{ backgroundColor: color.back, border: `solid 1px ${color.border}` }"
      >
        <ThemeButton
          class="button"
          :style="{
            backgroundColor: color.front,
            color: color.text,
            border: `solid 1px ${color.border}`
          }"
          @click="() => emitColor(color.name)"
        >
          <div class="button-slot">
            <ThemeP :content="color.name" :style="{ color: color.text }" />
            <div class="hover-color" :style="{ backgroundColor: color.hover }"></div>
          </div>
        </ThemeButton>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page-color-container {
  .color-options-container {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    .colors-container {
      flex-grow: 1;
      width: 45%;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      border-radius: v-bind('stylePage.value.borderRadius.outside');
      & .button {
        flex-shrink: 0;
        width: 50%;
        height: 36px;
        overflow: hidden;
        & .button-slot {
          height: 100%;
          position: relative;
          & .hover-color {
            height: 100%;
            width: 50%;
          }
          & p {
            font-size: 16px;
            width: 100%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            position: absolute;
          }
        }
      }
    }
  }
}
</style> -->
