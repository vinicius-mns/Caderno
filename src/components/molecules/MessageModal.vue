<script setup lang="ts">
import { useStyle } from '@/stores/style'
import { ref, watchEffect } from 'vue'

const { atualStyle } = useStyle()

const showMessage = ref(false)
const closeMessage = () => (showMessage.value = false)
const openMessage = () => (showMessage.value = true)

defineExpose({
  closeMessage,
  openMessage
})

watchEffect(() => {
  if (showMessage.value === true) {
    setTimeout(closeMessage, 1000)
  }
})
</script>

<template>
  <div class="container-message" v-if="showMessage">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.container-message {
  background-color: v-bind('atualStyle.color.two');
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: calc(50% - 30px);
  left: calc(50% - 140px);
  width: 280px;
  height: 60px;
  transform: translateY(50px);
  opacity: 0%;
  animation: intro 0.3s forwards;
}
@keyframes intro {
  to {
    opacity: 100%;
    transform: translate(0);
  }
}
</style>
