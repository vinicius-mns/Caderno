<script setup lang="ts">
import ThemeP from '@/components/atoms/ThemeP.vue'
import ThemeRadio from '@/components/atoms/ThemeRadio.vue'
import { useStyle } from '@/stores/style'
import { reactive } from 'vue'

const { style, selecColor } = useStyle()

const colors = reactive({
  selected: style.component.bgColor,
  selectOption: (e: string) => {
    colors.selected = e
    selecColor(e)
  }
})
</script>

<template>
  <div class="select-color-container">
    <ThemeP content="Cor tema:" />
    <ThemeRadio
      @emit-selected="colors.selectOption"
      :options="style.optionsColor"
      :selected="colors.selected"
      class="colors-options"
    />
  </div>
</template>

<style scoped lang="scss">
$textColor: v-bind('style.button.textColor');
$backGroundColor: v-bind('style.button.bgColor');
$borderRadius: v-bind('style.button.borderRadius');
$padding: 10px;
.select-color-container {
  display: flex;
  flex-direction: column;
  & .colors-options {
    margin: 0;
    padding: 0;
  }
}
</style>
