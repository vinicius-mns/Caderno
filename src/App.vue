<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useStyle } from './stores/style'
import { onMounted, onUpdated } from 'vue'

const { style } = useStyle()

const setBGColor = () => {
  document.body.style.backgroundColor = style.color.background
}

onUpdated(setBGColor)
onMounted(setBGColor)
</script>

<template>
  <RouterView />
</template>

<style lang="scss">
$especialColor: v-bind('style.color.highlight');
$textColor: v-bind('style.button.textColor');
a,
strong {
  background-color: $especialColor;
  color: $textColor;
  padding: 3px;
  border-radius: 4px;
}
table {
  // background-color: $especialColor;
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  text-align: left;
  padding: 8px;
}
th {
  color: $textColor;
}
</style>
