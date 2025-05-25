<script setup lang="ts">
import { RouterView, useRoute, useRouter } from 'vue-router'
import { useStylesCard } from '@/stores/stylesCard/stylesCard'
import { computed, onMounted, onUpdated, watch } from 'vue'
import { useStylesPage } from './stores/stylesPage/stylesPage'
import ButtonSlot from './components/molecules/ButtonSlot.vue'
import ButtonCoinSlot from './components/molecules/ButtonCoinSlot.vue'
import TagIco from './components/atoms/icons/TagIco.vue'
import BackIco from './components/atoms/icons/BackIco.vue'
import BottomView from './components/views/BottomView.vue'
import { useTags } from './stores/tags/tags'

const tags = useTags()

const stylesPage = useStylesPage()

const stylesCard = useStylesCard()

const router = useRouter()

const route = useRoute()

const routeIs = (v: string) => {
  return route.path === v
}

const routerPush = (routerName: string) => {
  router.push({ name: routerName })
}

onMounted(async () => {
  tags.init()
  stylesCard.init()
  stylesPage.init()
})
</script>

<template>
  <RouterView />

  <BottomView />
</template>

<style lang="scss">
h1,
h2,
h3 {
  font-weight: 100;
}

a,
strong {
  padding: 1px 3px;
  border-radius: 4px;
  background-color: rgba(137, 137, 218, 0.5);
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

code {
  background-color: rgba(141, 141, 141, 0.432);
}
</style>
