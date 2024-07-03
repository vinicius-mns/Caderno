<!-- <script setup lang="ts">
import { usePanelControll } from '@/stores/panelControll'
import CardChangeWidth from '../organisms/CardChangeWidth.vue'
import { useConfig } from '@/stores/config'

const panelControll = usePanelControll()
const config = useConfig()

const props = defineProps<{ cardWidth: number }>()
</script>

<template>
  <div class="container">
    <CardChangeWidth :width="props.cardWidth" @emit-width="config.cardChengeWidth" />
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  padding: 15px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
</style> -->
