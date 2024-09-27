<script setup lang="ts">
import WindowsSlot from '@/components/molecules/WindowsSlot.vue'
import { useWindows } from '@/stores/windows'
import ThemeP from '@/components/atoms/ThemeP.vue'

const window = useWindows()
</script>

<template>
  <WindowsSlot
    v-if="window.errorMessage.show"
    :title="window.errorMessage.title"
    @close="window.errorMessage.close"
  >
    <ThemeP :content="window.errorMessage.props" class="message" />
  </WindowsSlot>
</template>

<style scoped lang="scss">
.message {
  padding: 15px;
  font-size: 20px;
  font-weight: 100;
}
</style>
