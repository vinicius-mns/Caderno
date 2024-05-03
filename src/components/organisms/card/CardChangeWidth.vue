<script setup lang="ts">
import RangeImput from '@/components/molecules/RangeImput.vue'
import { useConfig } from '@/stores/config'
import { computed } from 'vue'

const { config, cardChengeWidth } = useConfig()

const columns = computed(() => config.value.columnsCard)

const ColumnsSet = (e: number) => cardChengeWidth(e)
</script>

<template>
  <div class="range-container">
    <RangeImput
      :title="{ visible: false, content: 'Quantidade de colunas' }"
      :limit="{ min: 200, max: 860 }"
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
