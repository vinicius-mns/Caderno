<script setup lang="ts">
import FlexContainer from '@/components/atoms/FlexContainer.vue'
import CardsMain from '@/components/template/CardsMain.vue'
import CardsSide from '@/components/template/CardsSide.vue'
import CardsTop from '@/components/template/CadsTop.vue'
import PageTemplate from '@/components/template/PageTemplate.vue'
import WindowsAll from '@/components/template/windows/WindowsAll.vue'
import { useCards } from '@/stores/cards/cards'
import { useTags } from '@/stores/tags/tags'
import { onMounted } from 'vue'

const cards = useCards()

const tags = useTags()

onMounted(async () => {
  await tags.init()

  await cards.atualizeReactiveCards({
    includeTags: tags.includeTags,
    excludeTags: tags.excludeTags
  })
})
</script>

<template>
  <PageTemplate>
    <template #header>
      <CardsTop />
    </template>
    <template #side>
      <CardsSide />
    </template>
    <template #page>
      <CardsMain />
    </template>
  </PageTemplate>

  <WindowsAll />
</template>

<style scoped lang="scss"></style>
