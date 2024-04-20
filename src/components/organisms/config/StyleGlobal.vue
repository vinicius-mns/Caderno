<script setup lang="ts">
import DarkMode from './DarkMode.vue'
import { useStyle } from '@/stores/style'
import { reactive } from 'vue'
import SelecColor from './SelecColor.vue'
import BorderRadius from './BorderRadius.vue'
import BoxShadown from './BoxShadown.vue'
import SelectColorBorder from './selectColorBorder.vue'

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
  <div class="style-config-container">
    <h2>Estilo</h2>
    <div class="option-container">
      <DarkMode />
    </div>
    <div class="option-container">
      <BorderRadius />
    </div>
    <div class="option-container">
      <SelecColor />
    </div>
    <div class="option-container">
      <BoxShadown />
    </div>
    <div class="option-container">
      <SelectColorBorder />
    </div>
  </div>
</template>

<style scoped lang="scss">
$textColor: v-bind('style.button.textColor');
$backGroundColor: v-bind('style.button.bgColor');
$borderRadius: v-bind('style.button.borderRadius');
$padding: 10px;
.style-config-container {
  color: $textColor;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: $backGroundColor;
  border-radius: $borderRadius;
  box-sizing: border-box;
  padding: $padding;
  margin: $padding;
  & .option-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: $padding;
    // background-color: blue;
  }
  & p,
  h2 {
    margin: 4px;
    padding: 0;
  }
}
</style>
