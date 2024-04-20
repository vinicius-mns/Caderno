<script setup lang="ts">
import { useStyle } from '@/stores/style'
import SwitchButton from '../../atoms/SwitchButton.vue'
// import ThemeP from '@/components/atoms/ThemeP.vue'
import OptionInLine from '@/components/molecules/OptionInLine.vue'

const { style, toggleDarkMode } = useStyle()
</script>

<template>
  <OptionInLine content="Modo escuro">
    <SwitchButton
      id="dark-mode-id"
      :check-value="style.darkmode"
      unic-name="dark-mode"
      @emit-checked="toggleDarkMode"
    />
  </OptionInLine>
  <!-- <div class="dark-mode">
    <p class="text">Modo escuro:</p>
    <ThemeP content="Modo escuro:" />
    <SwitchButton
      id="dark-mode-id"
      :check-value="style.darkmode"
      unic-name="dark-mode"
      @emit-checked="toggleDarkMode"
    />
  </div> -->
</template>

<style scoped lang="scss">
// $text-color: v-bind('style.button.textColor');
// .dark-mode {
//   color: $text-color;
//   width: 100%;
//   height: 40px;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
// }
</style>
