<script setup lang="ts">
import BaseButtonSlot from './BaseButtonSlot.vue'
import BaseButtonCoinSlot from './BaseButtonCoinSlot.vue'
import ShareIco from '@/components/atoms/icons/ShareIco.vue'

const props = withDefaults(
  defineProps<{
    content?: string
    minimize?: boolean
  }>(),
  {
    content: 'Compartilhar',
    minimize: false
  }
)
</script>

<template>
  <div>
    <BaseButtonSlot :content="props.content" v-if="!props.minimize">
      <ShareIco />
    </BaseButtonSlot>

    <BaseButtonCoinSlot :description="props.content" v-if="props.minimize">
      <ShareIco />
    </BaseButtonCoinSlot>
  </div>
</template>

<style scoped lang="scss"></style>
