<script setup lang="ts">
import CardsPage from '@/components/template/CardsPage.vue'
import PageTemplate from '@/components/template/PageTemplate.vue'
import { useConfig } from '@/stores/config'
import { useCards } from '@/stores/local/cards'
import { useTags } from '@/stores/local/tags'
import { computed } from 'vue'
import CardsWindows from '@/components/template/CardsWindows.vue'
import { useEmoji } from '@/stores/emojis'
import CardsBottom from '@/components/template/CardsBottom.vue'

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
      <CardsPage :allcards="allCards" :all-tags="allTags" :width="`${cardWindth}px`" />
    </template>
    <template #aside>
      <CardsBottom :all-tags="allTags" />
    </template>
    <template #windows>
      <CardsWindows :all-tags="allTags" :all-emojis="allEmojis" :cardWidth="cardWindth" />
    </template>
  </PageTemplate>
</template>

<style scoped lang="scss"></style>
