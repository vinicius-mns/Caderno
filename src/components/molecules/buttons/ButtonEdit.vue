<script setup lang="ts">
import PencilIco from '@/components/atoms/icons/PencilIco.vue'
import BaseButtonSlot from './BaseButtonSlot.vue'
import BaseButtonCoinSlot from './BaseButtonCoinSlot.vue'

const props = withDefaults(
  defineProps<{
    content?: string
    minimize?: boolean
  }>(),
  {
    content: 'Editar',
    minimize: false
  }
)
</script>

<template>
  <div>
    <BaseButtonSlot :content="props.content" v-if="!props.minimize">
      <PencilIco />
    </BaseButtonSlot>

    <BaseButtonCoinSlot :description="props.content" v-if="props.minimize">
      <PencilIco />
    </BaseButtonCoinSlot>
  </div>
</template>

<style scoped lang="scss"></style>
