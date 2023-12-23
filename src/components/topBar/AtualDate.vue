<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const date = ref(new Date())

watchEffect(() => {
  setInterval(() => {
    date.value = new Date()
  }, 1000)
})
</script>

<template>
  <div class="date">
    <p>{{ date.getHours() }}</p>
    :
    <p>{{ date.getMinutes().toString().padStart(2, '0') }}</p>
    :
    <p>{{ date.getSeconds() }}</p>
  </div>
</template>

<style scoped lang="scss">
.date {
  // medidas
  width: 100%;
  height: 100%;
  // display
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>
