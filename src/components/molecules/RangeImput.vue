<script setup lang="ts">
import ThemeRange from '@/components/atoms/ThemeRange.vue'
import { reactive } from 'vue'
import ThemeP from '../atoms/ThemeP.vue'

const props = defineProps<{
  initValue: number
  title: {
    content: string
    visible: boolean
  }
  limit: {
    max: number
    min: number
  }
}>()

const emit = defineEmits<{
  (e: 'emitValue', v: number): void
}>()

const range = reactive({
  value: props.initValue,
  set: (e: number) => {
    range.value = e
    emit('emitValue', e)
  }
})
</script>

<template>
  <div class="range-container" :title="props.title.content">
    <ThemeP v-if="props.title.visible" :content="props.title.content" />
    <ThemeRange
      :init-value="props.initValue"
      :name="props.title.content"
      :limit="props.limit"
      @emit-value="range.set"
      class="range"
    />
  </div>
</template>

<style scoped lang="scss">
.range-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  & .range {
    width: 100%;
  }
}
</style>
