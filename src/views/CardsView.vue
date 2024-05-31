<script setup lang="ts">
import { computed, ref } from 'vue'
import { useCards } from '@/stores/local/cards'
import { useTags } from '@/stores/local/tags'
import CardsWithOptions from '@/components/template/CardsWithOptions.vue'
import { useConfig } from '@/stores/config'
import ActionsContainer from '@/components/atoms/ActionsContainer.vue'
import { useEmoji } from '@/stores/emojis'
import CardCreateWindow from '@/components/template/CardCreateWindow.vue'
import FilterCardsWindow from '@/components/template/FilterCardsWindow.vue'
import TagsWindow from '@/components/template/TagsWindow.vue'
import TagCreteWindow from '@/components/template/TagCreteWindow.vue'
import type { ITag } from '@/api/api_local/entites/tags/TagsTypes'
import TagUpdateWindow from '@/components/template/TagUpdateWindow.vue'
import CoinButton from '@/components/molecules/CoinButton.vue'
import TagIco from '@/components/atoms/icons/TagIco.vue'
import FilterIco from '@/components/atoms/icons/FilterIco.vue'
import PencilIco from '@/components/atoms/icons/PencilIco.vue'
import { useWindows } from '@/stores/windows'
import MenuIco from '@/components/atoms/icons/MenuIco.vue'
import MenuWindow from '@/components/template/MenuWindow.vue'
import TagDeleteWindow from '@/components/template/TagDeleteWindow.vue'
import TagDeleteCardsWindow from '@/components/template/TagDeleteCardsWindow.vue'

const window = useWindows()

const tags = useTags()

const cards = useCards()

const config = useConfig()

const emojis = useEmoji()

const allEmojis = emojis.getAll()

const allcards = computed(() => cards.cards)

const allTags = computed(() => tags.tags)

const allConfig = computed(() => config.config.value)

const tagTarget = ref({ id: '', content: '', emoji: '' })
const tagTargetSet = (v: ITag) => (tagTarget.value = v)
</script>

<template>
  <div class="cards-page">
    <CardsWithOptions
      :all-tags="allTags"
      :allcards="allcards"
      :width="`${allConfig.cardWidth}px`"
    />

    <ActionsContainer>
      <CoinButton description="Menu" @click="window.MenuWindow.open">
        <MenuIco />
      </CoinButton>
      <CoinButton description="Minhas tags" @click="window.tagsWindow.open">
        <TagIco />
      </CoinButton>
      <CoinButton description="Filtrar cards" @click="window.filterCardsWindow.open">
        <FilterIco />
      </CoinButton>
      <CoinButton description="Criar novo card" @click="window.CardCreateWindow.open">
        <PencilIco />
      </CoinButton>
    </ActionsContainer>

    <MenuWindow :width="allConfig.cardWidth" />

    <TagsWindow :all-tags="allTags" :tag-target="tagTarget" @emi-tag="tagTargetSet" />

    <TagDeleteCardsWindow :tag="tagTarget" />

    <FilterCardsWindow :all-tags="allTags" />

    <CardCreateWindow :all-tags="allTags" />

    <TagDeleteWindow :tag="tagTarget" />

    <TagUpdateWindow :all-emoji="allEmojis" :tag="tagTarget" />

    <TagCreteWindow :all-emoji="allEmojis" />
  </div>
</template>

<style scoped lang="scss">
.cards-page {
  width: 100%;
}
</style>
