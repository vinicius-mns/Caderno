<script setup lang="ts">
import { ref } from 'vue'
import { useStyle } from '@/stores/style'

const { style } = useStyle()

const props = defineProps<{
  options: string[]
  selected: string
}>()

const emit = defineEmits<{
  (e: 'emitSelected', v: string): void
}>()

const select = ref(props.selected)

const emitSelected = () => emit('emitSelected', select.value)
</script>

<template>
  <div class="emojis-container">
    <div v-for="(option, i) in props.options" :key="i" class="emoji">
      <input
        type="radio"
        name="radioOptions"
        :id="`${i}-${option}`"
        :value="option"
        v-model="select"
        @change="emitSelected"
      />
      <label :for="`${i}-${option}`" :style="{ backgroundColor: option }"></label>
    </div>
  </div>
</template>

<style scoped lang="scss">
$buttonSize: v-bind('style.button.size');
$color: v-bind('style.button.textColor');
$boxShadow: v-bind('style.boxShadow');
.emojis-container {
  padding: 10px;
  width: 95%;
  overflow: auto;
  flex-wrap: wrap;
  display: flex;
  align-content: flex-start;
  & .emoji {
    height: $buttonSize;
    width: $buttonSize;
    flex-shrink: 0;
    margin: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    & input[type='radio'] {
      height: 0;
      width: 0;
      visibility: hidden;
    }
    & label {
      border-radius: 50%;
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      aspect-ratio: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      background-color: white;
      & p {
        font-size: $buttonSize;
      }
      &:hover {
        background-color: $color;
        box-shadow: $boxShadow;
      }
    }
    input:checked + label {
      box-shadow: 0 0 0 2px rgba(255, 0, 0, 0.5);
    }
  }
}
</style>
