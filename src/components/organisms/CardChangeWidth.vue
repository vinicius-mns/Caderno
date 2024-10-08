<script setup lang="ts">
import RangeImput from '@/components/molecules/RangeImput.vue'
import ThemeP from '@/components/atoms/ThemeP.vue'
import { useStylesPage } from '@/stores/stylesPage/stylesPage'

const stylePage = useStylesPage()

const props = defineProps<{
  width: number
}>()

const emit = defineEmits<{
  (e: 'emitWidth', v: number): void
}>()

const emitWidth = (v: number) => emit('emitWidth', v)
</script>

<template>
  <div class="range-container">
    <div class="description">
      <ThemeP content="Tamanho dos cards" />
      <ThemeP :content="`${props.width}px`" class="range-value" />
    </div>

    <RangeImput
      :title="{ visible: false, content: 'Quantidade de colunas' }"
      :limit="{ min: 200, max: 860 }"
      :init-value="width"
      @emit-value="emitWidth"
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
      background-color: v-bind('stylePage.atualColor.front');
      border-radius: v-bind('stylePage.borderRadius.inside');
    }
  }
}
</style>
