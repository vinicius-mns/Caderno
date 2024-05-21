<script setup lang="ts">
import FloatModalSlot from '@/components/atoms/FloatModalSlot.vue'
import ButtonOption from '@/components/molecules/ButtonOption.vue'

const props = defineProps<{ contentButton: string }>()
</script>

<template>
  <FloatModalSlot>
    <template #button-slot>
      <ButtonOption :content="props.contentButton">
        <slot name="ico-button-slot"></slot>
      </ButtonOption>
    </template>
    <template #container-slot>
      <slot></slot>
    </template>
  </FloatModalSlot>
</template>

<style scoped lang="scss"></style>
