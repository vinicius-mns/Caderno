<script setup lang="ts">
import TrashIco from '@/components/atoms/icons/TrashIco.vue'
import BaseButtonSlot from './BaseButtonSlot.vue'
import BaseButtonCoinSlot from './BaseButtonCoinSlot.vue'

const props = withDefaults(
  defineProps<{
    content?: string
    minimize?: boolean
  }>(),
  {
    content: 'Deletar',
    minimize: false
  }
)
</script>

<template>
  <div>
    <BaseButtonSlot :content="props.content" v-if="!props.minimize">
      <TrashIco />
    </BaseButtonSlot>

    <BaseButtonCoinSlot :description="props.content" v-if="props.minimize">
      <TrashIco />
    </BaseButtonCoinSlot>
  </div>
</template>

<style scoped lang="scss"></style>
