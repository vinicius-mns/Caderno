<script setup lang="ts">
import { computed } from 'vue'
import CardConfig from '@/components/organisms/CardConfig.vue'
import { useConfig } from '@/stores/config'
import PageConfig from '@/components/organisms/PageConfig.vue'
import { useStylesPage } from '@/stores/stylesPage/stylesPage'
import WindowsSlot from '@/components/molecules/WindowsSlot.vue'
import { useWindows } from '@/stores/windows'

const style = useStylesPage()

const window = useWindows()

const config = useConfig()

const cardWidth = computed(() => config.config.value.cardWidth)

const CardChangeWidth = (n: number) => {
  config.cardChengeWidth(n)
}
</script>

<template>
  <WindowsSlot v-if="window.config.show" :title="window.config.title" @close="window.config.close">
    <div class="config-container">
      <CardConfig :width="cardWidth" @emit-width="CardChangeWidth" />

      <PageConfig @emit-color="style.setColor" />
    </div>
  </WindowsSlot>
</template>

<style scoped lang="scss">
.config-container {
  width: 800px;
  max-width: 95dvw;
  max-height: 80dvh;
  padding: 15px;
  box-sizing: border-box;
  overflow-y: auto;
}
</style>
