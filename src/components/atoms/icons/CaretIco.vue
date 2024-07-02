<script setup lang="ts">
const props = defineProps<{
  direction: 'right' | 'down'
}>()
</script>

<template>
  <svg
    v-show="props.direction === 'right'"
    xmlns="http://www.w3.org/2000/svg"
    id="Outline"
    viewBox="0 0 24 24"
    width="512"
    height="512"
  >
    <path
      d="M9,17.88V6.71A1,1,0,0,1,10.71,6l5.58,5.59a1,1,0,0,1,0,1.41l-5.58,5.59A1,1,0,0,1,9,17.88Z"
    />
  </svg>
  <svg
    v-show="props.direction === 'down'"
    xmlns="http://www.w3.org/2000/svg"
    id="Outline"
    viewBox="0 0 24 24"
    width="512"
    height="512"
  >
    <path
      d="M6.41,9H17.59a1,1,0,0,1,.7,1.71l-5.58,5.58a1,1,0,0,1-1.42,0L5.71,10.71A1,1,0,0,1,6.41,9Z"
    />
  </svg>
</template>

<style scoped lang="scss"></style>
