<script setup lang="ts">
import RangeImput from '@/components/molecules/RangeImput.vue'
import { useConfig } from '@/stores/config'
import { computed } from 'vue'
import ThemeP from '@/components/atoms/ThemeP.vue'
import { useStyle } from '@/stores/style'

const { config, cardChengeWidth } = useConfig()

const { atualStyle } = useStyle()

const range = computed(() => config.value.cardWidth)

const setRange = (e: number) => cardChengeWidth(e)
</script>

<template>
  <div class="range-container">
    <div class="description">
      <ThemeP content="Tamanho dos cards" />
      <ThemeP :content="`${range}px`" class="range-value" />
    </div>
    <RangeImput
      :title="{ visible: false, content: 'Quantidade de colunas' }"
      :limit="{ min: 200, max: 860 }"
      :init-value="range"
      @emit-value="setRange"
      class="range"
    />
  </div>
</template>

<style scoped lang="scss">
.range-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  .range {
    width: 100%;
  }
  & .description {
    width: 100%;
    display: flex;
    justify-content: space-between;
    & .range-value {
      width: 40%;
      text-align: center;
      background-color: v-bind('atualStyle.color.two');
      border-radius: v-bind('atualStyle.borderRadius.one');
    }
  }
}
</style>
