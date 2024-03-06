<script setup lang="ts">
import ThemeRange from '@/components/atoms/ThemeRange.vue'
import { useConfig } from '@/stores/config'
import { useStyle } from '@/stores/style'
import { reactive } from 'vue'

const { style } = useStyle()

const { columnsCard } = useConfig()

const columns = reactive({
  value: columnsCard.value,
  set: (e: number) => columnsCard.setColumns(e)
})
</script>

<template>
  <div class="range-container">
    <ThemeRange :init-value="columns.value" @emit-value="columns.set" class="range" />
  </div>
</template>

<style scoped lang="scss">
.range-container {
  background-color: v-bind('style.page.bgColor');
  display: flex;
  justify-content: center;
  width: 50%;
  border-radius: 30px;
  .range {
    width: 100%;
  }
}
</style>
