<script setup lang="ts">
import { ref } from 'vue'
import { useStyle } from '@/stores/style'

const { atualStyle } = useStyle()

const props = defineProps<{
  emojis: string[]
  emojiSelected: string
}>()

const emit = defineEmits<{
  (e: 'changeEmoji', v: string): void
}>()

const emojiR = ref(props.emojiSelected)

const sendSelected = () => emit('changeEmoji', emojiR.value)
</script>

<template>
  <div class="emojis-container">
    <div v-for="(emoji, i) in props.emojis" :key="i" class="emoji">
      <input
        type="radio"
        name="emojisOptions"
        :id="`tagid-${JSON.stringify(i)}`"
        :value="emoji"
        v-model="emojiR"
        @change="sendSelected"
      />
      <label :for="`tagid-${JSON.stringify(i)}`">
        <p>{{ emoji }}</p>
      </label>
    </div>
  </div>
</template>

<style scoped lang="scss">
$buttonSize: 36px;
$color: v-bind('atualStyle.color.text');
.emojis-container {
  padding: 10px;
  box-sizing: border-box;
  width: 360px;
  height: 400px;
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
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      & p {
        font-size: $buttonSize;
      }
      &:hover {
        background-color: $color;
      }
    }
    input:checked + label {
      background-color: $color;
      border: solid 1px red;
    }
  }
}
</style>
