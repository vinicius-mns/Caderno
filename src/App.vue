<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { RouterView } from 'vue-router'
import { useStyle } from './stores/style'
import { useConfig } from './stores/config'

const { defineButtonSize, style, styleDarkMode } = useStyle()

const config = useConfig()

const resizeButton = () => {
  const screen = window.innerWidth
  screen < 768 && defineButtonSize('mobile')
  screen >= 768 && defineButtonSize('desktop')
}

onMounted(() => {
  resizeButton()
  window.addEventListener('resize', resizeButton)
  styleDarkMode(config.darkmode.value)
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeButton)
})
</script>

<template>
  <RouterView />
</template>

<style lang="scss">
$especialColor: v-bind('style.component.bgColor');
$textColor: v-bind('style.button.textColor');
a,
strong {
  background-color: $especialColor;
  color: $textColor;
  padding: 3px;
  border-radius: 4px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  text-align: left;
  padding: 8px;
}
th {
  background-color: $especialColor;
  color: $textColor;
}
</style>
