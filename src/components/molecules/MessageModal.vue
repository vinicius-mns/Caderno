<script setup lang="ts">
import { useStylesPage } from '@/stores/stylesPage/stylesPage'
import { ref, watchEffect } from 'vue'

const stylePage = useStylesPage()

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
  background-color: v-bind('stylePage.atualColor.front');
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
