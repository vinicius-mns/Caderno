<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    size?: string
  }>(),
  {
    size: '18px'
  }
)
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24">
    <path
      d="M23,11H13V1a1,1,0,0,0-1-1h0a1,1,0,0,0-1,1V11H1a1,1,0,0,0-1,1H0a1,1,0,0,0,1,1H11V23a1,1,0,0,0,1,1h0a1,1,0,0,0,1-1V13H23a1,1,0,0,0,1-1h0A1,1,0,0,0,23,11Z"
    />
  </svg>
</template>

<style scoped lang="scss">
svg {
  height: v-bind('props.size');
  width: v-bind('props.size');
}
</style>
