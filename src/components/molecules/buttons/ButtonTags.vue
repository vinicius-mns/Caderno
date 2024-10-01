<script setup lang="ts">
import BaseButtonSlot from './BaseButtonSlot.vue'
import BaseButtonCoinSlot from './BaseButtonCoinSlot.vue'
import TagIco from '@/components/atoms/icons/TagIco.vue'

const props = withDefaults(
  defineProps<{
    content?: string
    minimize?: boolean
  }>(),
  {
    content: 'Tags',
    minimize: false
  }
)
</script>

<template>
  <div>
    <BaseButtonSlot :content="props.content" v-if="!props.minimize">
      <TagIco />
    </BaseButtonSlot>

    <BaseButtonCoinSlot :description="props.content" v-if="props.minimize">
      <TagIco />
    </BaseButtonCoinSlot>
  </div>
</template>

<style scoped lang="scss"></style>
