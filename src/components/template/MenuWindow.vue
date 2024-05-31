<script setup lang="ts">
import CardChangeWidth from '@/components/organisms/CardChangeWidth.vue'
import { useConfig } from '@/stores/config'
import WindowModal from '../atoms/WindowModal.vue'
import { useWindows } from '@/stores/windows'
import ModalCard from '../atoms/ModalCard.vue'

const config = useConfig()

const windows = useWindows()

const props = defineProps<{
  width: number
}>()

const close = () => windows.MenuWindow.close()

const cardWidthSet = (v: number) => {
  config.cardChengeWidth(v)
}
</script>

<template>
  <WindowModal title="Menu" @emit-close="close" v-if="windows.MenuWindow.value">
    <ModalCard class="container">
      <CardChangeWidth :width="props.width" @emit-width="cardWidthSet" />
    </ModalCard>
  </WindowModal>
</template>

<style scoped lang="scss">
.container {
  width: 300px;
  @media screen and (max-width: 768px) {
    width: 100dvw;
  }
}
</style>
