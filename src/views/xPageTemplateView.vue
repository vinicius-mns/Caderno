<!-- <script setup lang="ts">
import CardsList from '@/components/template/CardsList.vue'
import PageTemplate from '@/components/template/PageTemplate.vue'
import TagsList from '@/components/template/TagsList.vue'
import { useConfig } from '@/stores/config'
import { useCards } from '@/stores/local/cards'
import { useTags } from '@/stores/local/tags'
import { usePanelControll } from '@/stores/panelControll'
import { computed } from 'vue'
import PanelControllSide from '@/components/template/PanelControllSide.vue'
import CardCreate from '@/components/template/CardCreate.vue'
import FilterCardsWindow from '@/components/template/FilterCardsWindow.vue'
import WindownsTemplate from '@/components/template/WindownsTemplate.vue'
import TagDeleteWindow from '@/components/template/TagDeleteWindow.vue'
import CardsSide from '@/components/template/CardsSide.vue'
import CardsWindows from '@/components/template/CardsWindows.vue'
import { useEmoji } from '@/stores/emojis'

const cards = useCards()

const tags = useTags()

const options = useConfig()

const emojis = useEmoji()

const allEmojis = emojis.getAll()

const allCards = computed(() => cards.cards)

const allTags = computed(() => tags.tags)

const cardWindth = computed(() => options.config.value.cardWidth)
</script>

<template>
  <PageTemplate>
    <template #main>
      <CardsList :allcards="allCards" :all-tags="allTags" :width="`${cardWindth}px`" />
    </template>
    <template #aside>
      <CardsSide :all-tags="allTags" />
    </template>
    <template #windows>
      <CardsWindows :all-tags="allTags" :all-emojis="allEmojis" />
    </template>
  </PageTemplate>
</template>

<style scoped lang="scss"></style> -->
