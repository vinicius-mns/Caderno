<script setup lang="ts">
import RangeImput from '@/components/molecules/RangeImput.vue'
import { useStyle } from '@/stores/style'
import { reactive } from 'vue'

const { style, setBorderRadius } = useStyle()

const borderRadius = reactive({
  value: parseFloat(style.button.borderRadius),
  setValue: (v: number) => {
    borderRadius.value = v
    setBorderRadius(v)
  }
})
</script>

<template>
  <RangeImput
    :limit="{ min: 1, max: 20 }"
    :init-value="borderRadius.value"
    @emit-value="borderRadius.setValue"
    :title="{ content: 'Arredondar bordas', visible: true }"
  />
</template>

<style scoped lang="scss"></style>
