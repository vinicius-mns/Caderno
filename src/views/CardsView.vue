<script setup lang="ts">
import CardsPage from '@/components/template/CardsPage.vue'
import PageTemplate from '@/components/template/PageTemplate.vue'
import CardsBottom from '@/components/template/CardsBottom.vue'
import CardCreateWindow from '@/components/template/windows/CardCreateWindow.vue'
import CardUpdateWindow from '@/components/template/windows/CardUpdateWindow.vue'
import CardDeleteWindow from '@/components/template/windows/CardDeleteWindow.vue'
import TagCreateWindow from '@/components/template/windows/TagCreateWindow.vue'
import TagUpdateWindow from '@/components/template/windows/TagUpdateWindow.vue'
import TagDeleteWindow from '@/components/template/windows/TagDeleteWindow.vue'
import TagDeleteCardWindow from '@/components/template/windows/TagDeleteCardWindow.vue'
import ConfigWindow from '@/components/template/windows/ConfigWindow.vue'
import { useCards } from '@/stores/cards/cards'
import { useTags } from '@/stores/tags/tags'
import { onMounted } from 'vue'
import ErrorMessageWindow from '@/components/template/windows/ErrorMessageWindow.vue'

const cards = useCards()

const tags = useTags()

onMounted(async () => {
  await tags.init()
  await cards.init({
    includeTags: tags.getNames(tags.includeTags),
    excludeTags: tags.getNames(tags.excludeTags)
  })
})
</script>

<template>
  <PageTemplate>
    <template #main>
      <CardsPage />
    </template>
    <template #aside>
      <CardsBottom />
    </template>
    <template #windows>
      <CardCreateWindow />
      <CardUpdateWindow />
      <CardDeleteWindow />
      <TagCreateWindow />
      <TagDeleteWindow />
      <TagUpdateWindow />
      <TagDeleteCardWindow />
      <ConfigWindow />
      <ErrorMessageWindow />
    </template>
  </PageTemplate>
</template>

<style scoped lang="scss"></style>
