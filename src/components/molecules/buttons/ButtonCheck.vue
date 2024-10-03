<script setup lang="ts">
import BaseButtonSlot from './BaseButtonSlot.vue'
import BaseButtonCoinSlot from './BaseButtonCoinSlot.vue'
import CheckIco from '@/components/atoms/icons/CheckIco.vue'

const props = withDefaults(
  defineProps<{
    content?: string
    minimize?: boolean
    visible?: boolean
  }>(),
  {
    content: 'Confirmar',
    minimize: false,
    visible: false
  }
)
</script>

<template>
  <div>
    <BaseButtonSlot :content="props.content" v-if="!props.minimize" :visible="props.visible">
      <CheckIco />
    </BaseButtonSlot>

    <BaseButtonCoinSlot :description="props.content" v-if="props.minimize">
      <CheckIco />
    </BaseButtonCoinSlot>
  </div>
</template>

<style scoped lang="scss"></style>
