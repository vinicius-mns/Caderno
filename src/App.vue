<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useStylesCard } from '@/stores/stylesCard/stylesCard'
import { onMounted } from 'vue'
import { useStylesPage } from './stores/stylesPage/stylesPage'

const stylesPage = useStylesPage()

const stylesCard = useStylesCard()

onMounted(async () => {
  stylesCard.init()
  stylesPage.init()
})
</script>

<template>
  <RouterView />
</template>

<style lang="scss">
h1,
h2,
h3 {
  font-weight: 100;
}
a,
strong {
  padding: 3px;
  border-radius: 4px;
}
table {
  // background-color: v-bind('atualStyle.color.text');
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  text-align: left;
  padding: 8px;
}
hr {
  border: solid 1px v-bind('stylesPage.atualColor.border');
}
svg {
  fill: v-bind('stylesPage.atualColor.text');
  height: 18px;
  width: 18px;
  flex-shrink: 0;
}
</style>
