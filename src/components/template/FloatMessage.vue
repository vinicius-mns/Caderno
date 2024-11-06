<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import ModalCard from '../atoms/ModalCard.vue'
import ThemeP from '../atoms/ThemeP.vue'
import { useFloatMessage } from '@/stores/floatMessage'

const showMessage = ref(false)

const messageRef = ref('')

const closeMessage = () => (showMessage.value = false)

const openMessage = (message: string) => {
  messageRef.value = message

  showMessage.value = true
}

const timeToClose = 1000

watchEffect(() => {
  if (showMessage.value === true) {
    setTimeout(closeMessage, timeToClose)
  }
})

defineExpose({ openMessage, timeToClose })

const floatMessage = useFloatMessage()
</script>

<template>
  <ModalCard v-if="floatMessage.show" class="message-container">
    <ThemeP :content="floatMessage.message" />
  </ModalCard>
</template>

<style scoped lang="scss">
.message-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 90%);
  opacity: 0;
  animation: intro 0.3s forwards;
}

@keyframes intro {
  to {
    opacity: 100%;
    transform: translate(-50%, 50%);
  }
}
</style>
