<script setup lang="ts">
// import { useStyle } from '@/stores/style'
import { ref, watchEffect } from 'vue'

// const { style } = useStyle()

const props = defineProps<{
  initValue: number
}>()

const emit = defineEmits<{
  (e: 'emitValue', vale: number): void
}>()

const reactiveValue = ref(props.initValue)

watchEffect(() => {
  emit('emitValue', Number(reactiveValue.value))
})
</script>

<template>
  <input type="range" name="temporario" v-model="reactiveValue" min="1" max="3" class="range" />
</template>

<style scoped lang="scss">
.range {
  cursor: pointer;
  margin: 10px;
  opacity: 50%;
  filter: grayscale(100%);
  &:hover {
    filter: grayscale(0);
    opacity: 100%;
  }
}
</style>
