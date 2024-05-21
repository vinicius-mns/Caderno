<script setup lang="ts">
import FloatModalSlot from '@/components/atoms/FloatModalSlot.vue'
import CoinButton from '@/components/molecules/CoinButton.vue'
import MenuIco from '@/components/atoms/icons/MenuIco.vue'
import CardChangeWidth from '@/components/organisms/CardChangeWidth.vue'
import { useConfig } from '@/stores/config'

const config = useConfig()

const props = defineProps<{
  width: number
}>()

// const floatModal = ref<InstanceType<typeof FloatModalSlot>>()
// const floatModalClose = () => floatModal.value?.close()

const cardWidthSet = (v: number) => {
  config.cardChengeWidth(v)
}
</script>

<template>
  <FloatModalSlot ref="floatModal">
    <template #button-slot>
      <CoinButton description="Menu"><MenuIco /></CoinButton>
    </template>
    <template #container-slot>
      <div class="container">
        <CardChangeWidth :width="props.width" @emit-width="cardWidthSet" />
      </div>
    </template>
  </FloatModalSlot>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
}
</style>
