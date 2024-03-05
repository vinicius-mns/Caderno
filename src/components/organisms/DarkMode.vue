<script setup lang="ts">
import { useStyle } from '@/stores/style'
import { computed } from 'vue'
import SwitchButton from '../atoms/SwitchButton.vue'
import { useConfig } from '@/stores/config'

const { style } = useStyle()

const { styleDarkMode } = useStyle()

const { darkmode } = useConfig()

const value = computed(() => darkmode.value)

const toggle = () => {
  darkmode.toggle()
  styleDarkMode(value.value)
}
</script>

<template>
  <div class="dark-mode">
    <!-- <p class="text">Modo escuro:</p> -->
    <SwitchButton
      id="dark-mode-id"
      :check-value="value"
      unic-name="dark-mode"
      @emit-checked="toggle"
    />
  </div>
</template>

<style scoped lang="scss">
$text-color: v-bind('style.button.textColor');
.dark-mode {
  color: $text-color;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>
