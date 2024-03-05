<script setup lang="ts">
import { reactive } from 'vue'
import FloatModal from '../molecules/FloatModal.vue'
import DarkMode from './DarkMode.vue'
import { useStyle } from '@/stores/style'

const { style } = useStyle()

const modal = reactive({
  show: false,
  open: () => (modal.show = true),
  close: () => (modal.show = false)
})

const assets = reactive({
  config: {
    title: 'Configurações',
    ico: '⚙️'
  }
})
</script>

<template>
  <div class="config-global-button" @mouseleave="modal.close">
    <FloatModal
      :ico="assets.config.ico"
      :title="assets.config.title"
      :show="modal.show"
      @open="modal.open"
      @close="modal.close"
      class="button-ico"
    >
      <div class="config-global-container">
        <div class="options-container">
          <DarkMode />
        </div>
      </div>
      <!-- <CardsFilter /> -->
    </FloatModal>
  </div>
</template>

<style scoped lang="scss">
$buttonSize: v-bind('style.button.size');
.config-global-button {
  .config-global-container {
    max-height: 50dvh;
    width: 400px;
    max-width: 80dvw;
    & .options-container {
      display: flex;
      align-items: center;
    }
  }
}
</style>
