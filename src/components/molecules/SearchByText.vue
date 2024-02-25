<script setup lang="ts">
import { useStyle } from '@/stores/style'
import InputTextAtom from '../atoms/InputTextAtom.vue'

const { style } = useStyle()

const props = defineProps<{
  content: string
  placeholder: string
  keyId: string
}>()

const emit = defineEmits<{
  (e: 'emitContent', v: string): void
}>()

const emitContent = (e: string) => emit('emitContent', e)
</script>

<template>
  <div class="search-by-text">
    <span>🔎</span>
    <InputTextAtom
      :placeholder="props.placeholder"
      :content="props.content"
      :key-id="props.keyId"
      @emit-content="emitContent"
      class="text-input"
    />
  </div>
</template>

<style scoped lang="scss">
$buttonSize: v-bind('style.button.size');
$margin: 5px;
.search-by-text {
  position: relative;
  height: $buttonSize;
  width: 100%;
  display: flex;
  align-items: center;
  margin: $margin 0 $margin;
  & span {
    position: absolute;
    left: $margin;
  }
  & .text-input {
    width: 100%;
    padding-left: calc($margin * 6);
  }
}
</style>
