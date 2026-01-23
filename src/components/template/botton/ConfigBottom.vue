<script setup lang="ts">
import FlexContainer from '@/components/atoms/FlexContainer.vue'
import FloatModalSlot from '@/components/atoms/FloatModalSlot.vue'
import CrossIco from '@/components/atoms/icons/CrossIco.vue'
import FilterIco from '@/components/atoms/icons/FilterIco.vue'
import GearIco from '@/components/atoms/icons/GearIco.vue'
import PencilIco from '@/components/atoms/icons/PencilIco.vue'
import PlusIco from '@/components/atoms/icons/PlusIco.vue'
import TagIco from '@/components/atoms/icons/TagIco.vue'
import ModalCard from '@/components/atoms/ModalCard.vue'
import ButtonCoinSlot from '@/components/molecules/ButtonCoinSlot.vue'
import ButtonSlot from '@/components/molecules/ButtonSlot.vue'
import CardConfig from '@/components/organisms/CardConfig.vue'
import PageConfig from '@/components/organisms/PageConfig.vue'

const emit = defineEmits<{
  (e: 'close', v: null): void
}>()
</script>

<template>
  <div class="config-bottom">
    <header>
      <ButtonCoinSlot content="Fechar" @click="emit('close', null)" :circle="true">
        <CrossIco />
      </ButtonCoinSlot>
    </header>

    <CardConfig :width="400" />

    <PageConfig />
  </div>
</template>

<style scoped lang="scss">
.config-bottom {
  display: flex;
  flex-direction: column;
}
</style>
