<script setup lang="ts">
import { useStyle } from '@/stores/style'
import { reactive } from 'vue'
import SwitchButton from '../atoms/SwitchButton.vue'

const { style } = useStyle()

const { darkMode } = useStyle()

const darkModeR = reactive({
  ico: {
    value: '🌚',
    true: '🌚',
    false: '🌝'
  },
  value: true,
  toggle: (v: { checked: boolean }) => {
    darkModeR.value = v.checked
    darkModeR.ico.value = darkModeR.ico[String(v.checked) as 'true' | 'false']
    darkMode(!darkModeR.value)
  }
})
</script>

<template>
  <div class="dark-mode">
    <p class="text">Modo escuro:</p>
    <SwitchButton
      id="dark-mode-id"
      :check-value="darkModeR.value"
      unic-name="dark-mode"
      :ico="darkModeR.ico.value"
      @emit-checked="darkModeR.toggle"
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
