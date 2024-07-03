<script setup lang="ts">
import { useStyle } from '@/stores/style'
import ThemeP from '../atoms/ThemeP.vue'
import ThemeButton from '../atoms/ThemeButton.vue'

const { optionsStyle } = useStyle()

const emit = defineEmits<{
  (e: 'emitStyle', v: number): void
}>()

const emitStyle = (n: number) => {
  emit('emitStyle', n)
}
</script>

<template>
  <div class="page-color-container">
    <div class="color-options-container">
      <div class="colors-container" v-for="(option, i) in optionsStyle" :key="i">
        <div class="colors">
          <div class="color" :style="{ backgroundColor: option.color.one }"></div>
          <div
            class="color"
            :style="{ backgroundColor: option.color.two, borderRadius: option.borderRadius.one }"
          ></div>
          <div
            class="color"
            :style="{ backgroundColor: option.color.three, borderRadius: option.borderRadius.two }"
          ></div>
          <div
            class="color"
            :style="{ backgroundColor: option.color.four, borderRadius: option.borderRadius.trhee }"
          ></div>
        </div>
        <ThemeButton
          class="button"
          :style="{ backgroundColor: option.color.three, color: option.color.text }"
          @click="() => emitStyle(i)"
        >
          <ThemeP content="Selecionar estilo" :style="{ color: option.color.text }" />
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
    flex-direction: column;
    .colors-container {
      display: flex;
      margin-bottom: 10px;
      & .colors {
        width: 60%;
        flex-shrink: 0;
        display: flex;
        margin-bottom: 5px;
        & .color {
          height: 45px;
          width: 100%;
          margin-left: 5px;
        }
      }
      & .button {
        height: 45px;
        width: 100%;
        margin-left: 5px;
        & p {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
