<script setup lang="ts">
import { computed } from 'vue'
import { useCards } from '@/stores/local/cards'
import { useTags } from '@/stores/local/tags'
import CardsWithOptions from '@/components/template/CardsWithOptions.vue'
import { useConfig } from '@/stores/config'
import ActionsContainer from '@/components/atoms/ActionsContainer.vue'
import TagsAction from '@/components/template/actions/TagsActions.vue'
import { useEmoji } from '@/stores/emojis'
import CardCreateAction from '@/components/template/actions/CardCreateAction.vue'
import FilterCardsAction from '@/components/template/actions/FilterCardsAction.vue'
import CardMenuAction from '@/components/template/actions/CardMenuAction.vue'

const tags = useTags()

const cards = useCards()

const config = useConfig()

const emojis = useEmoji()

const allEmojis = emojis.getAll()

const allcards = computed(() => cards.cards)

const allTags = computed(() => tags.tags)

const allConfig = computed(() => config.config.value)
</script>

<template>
  <div>
    <CardsWithOptions
      :all-tags="allTags"
      :allcards="allcards"
      :width="`${allConfig.cardWidth}px`"
    />
    <ActionsContainer>
      <CardMenuAction :width="allConfig.cardWidth" />
      <TagsAction :all-tags="allTags" :emojis="allEmojis" />
      <FilterCardsAction :all-tags="allTags" />
      <CardCreateAction :all-tags="allTags" :all-emojis="allEmojis" />
    </ActionsContainer>
  </div>
</template>

<style scoped lang="scss"></style>
