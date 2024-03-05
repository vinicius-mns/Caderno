<script setup lang="ts">
import ThemeRange from '@/components/atoms/ThemeRange.vue'
import { useConfig } from '@/stores/config'
import { reactive } from 'vue'

const { columnsCard } = useConfig()

const columns = reactive({
  value: columnsCard.value,
  set: (e: number) => columnsCard.setColumns(e)
})
</script>

<template>
  <ThemeRange :init-value="columns.value" @emit-value="columns.set" class="range" />
</template>

<style scoped lang="scss">
.range {
  width: 50%;
}
</style>
