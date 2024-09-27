<script setup lang="ts">
import { computed, reactive, ref, watchEffect } from 'vue'

const props = defineProps<{
  initValue: number
  name: string
  limit: {
    min: number
    max: number
  }
}>()

const emit = defineEmits<{
  (e: 'emitValue', vale: number): void
}>()

const reactiveValue = ref(props.initValue)

watchEffect(() => {
  emit('emitValue', Number(reactiveValue.value))
})

const focus = reactive({
  value: false,
  on: () => (focus.value = true),
  off: () => (focus.value = false)
})

const trackCursor = reactive({
  value: {
    x: '1px',
    y: '1px'
  },
  setValue: (e: MouseEvent) => {
    if (e.target instanceof Element) {
      const container = e.target.getBoundingClientRect()
      trackCursor.value.x = `${e.clientX - container.left}px`
      trackCursor.value.y = `${e.clientY - container.top}px`
    }
  }
})

const top = computed(() => trackCursor.value.y)
const left = computed(() => trackCursor.value.x)
</script>

<template>
  <div class="range-container">
    <div class="value-range" v-if="focus.value">{{ reactiveValue }}</div>
    <input
      type="range"
      v-model="reactiveValue"
      :name="props.name"
      :min="props.limit.min"
      :max="props.limit.max"
      class="range"
      @mouseenter="focus.on"
      @mouseleave="focus.off"
      @mousemove="trackCursor.setValue"
    />
  </div>
</template>

<style scoped lang="scss">
.range-container {
  width: 100%;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  & .range {
    width: 100%;
    margin: 0;
    padding: 0;
    cursor: pointer;
    opacity: 50%;
    filter: grayscale(100%);
    &:hover {
      filter: grayscale(0);
      opacity: 100%;
    }
  }
  & .value-range {
    height: 30px;
    aspect-ratio: 1;
    border-radius: 50%;
    position: absolute;
    top: calc(v-bind(top) + 10px);
    left: calc(v-bind(left) + 10px);
    display: flex;
    align-items: center;
    justify-content: center;
    color: black;
    background-color: white;
  }
}
</style>
