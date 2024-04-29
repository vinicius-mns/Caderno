<script setup lang="ts">
import { reactive } from 'vue'
// import FloatModal from '../molecules/FloatModal.vue'
import { useStyle } from '@/stores/style'
// import ExportAndImportData from './ExportAndImportData.vue'
import StyleGlobal from './config/StyleGlobal.vue'

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

const borderRadius = {
  value: parseFloat(style.button.borderRadius),
  setValue: (n: number) => {
    borderRadius.value = n
    style.button.borderRadius = `${n}px`
  }
}
</script>

<template>
  <div class="config-global-button" @mouseleave="modal.close">
    <!-- <FloatModal
      :ico="assets.config.ico"
      :title="assets.config.title"
      :show="modal.show"
      @open="modal.open"
      @close="modal.close"
      class="button-ico"
    >
      <div class="config-global-container">
        <div class="options-container">
          <StyleGlobal />
        </div>
      </div>
    </FloatModal> -->
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
      flex-direction: column;
      align-items: center;
    }
  }
}
</style>
