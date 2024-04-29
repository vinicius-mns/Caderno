<script setup lang="ts">
import RangeImput from '@/components/molecules/RangeImput.vue'
import { useConfig } from '@/stores/config'
import { useStyle } from '@/stores/style'
import { computed } from 'vue'

const { style } = useStyle()

const { config, setColumns } = useConfig()

const columns = computed(() => config.value.columnsCard)

const ColumnsSet = (e: number) => setColumns(e)
</script>

<template>
  <div class="range-container">
    <RangeImput
      :title="{ visible: false, content: 'Quantidade de colunas' }"
      :limit="{ min: 1, max: 3 }"
      :init-value="columns"
      @emit-value="ColumnsSet"
      class="range"
    />
  </div>
</template>

<style scoped lang="scss">
.range-container {
  display: flex;
  justify-content: center;
  width: 100%;
  .range {
    width: 100%;
  }
}
</style>
