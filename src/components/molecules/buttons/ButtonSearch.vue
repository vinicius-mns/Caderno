<script setup lang="ts">
import BaseButtonSlot from './BaseButtonSlot.vue'
import BaseButtonCoinSlot from './BaseButtonCoinSlot.vue'
import SearchIco from '@/components/atoms/icons/SearchIco.vue'

const props = withDefaults(
  defineProps<{
    content?: string
    minimize?: boolean
  }>(),
  {
    content: 'Procurar',
    minimize: false
  }
)
</script>

<template>
  <div>
    <BaseButtonSlot :content="props.content" v-if="!props.minimize">
      <SearchIco />
    </BaseButtonSlot>

    <BaseButtonCoinSlot :description="props.content" v-if="props.minimize">
      <SearchIco />
    </BaseButtonCoinSlot>
  </div>
</template>

<style scoped lang="scss"></style>
