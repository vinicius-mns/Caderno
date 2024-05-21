<!-- <script setup lang="ts">
import OptionInLine from '@/components/molecules/OptionInLine.vue'
import HorizontalCarousel from '@/components/molecules/HorizontalCarousel.vue'
import TagWithSwitchList from '../tag/TagWithSwitchList.vue'
import { useCards } from '@/stores/local/cards'
import SearchInput from '@/components/molecules/SearchInput.vue'

const cards = useCards()

const filterCardsIncludeTags = (tagIds: string[]) => cards.filterIncludeTag(tagIds)

const filterCardsExcludeTags = (tagIds: string[]) => cards.filterExcludeTags(tagIds)

// const allCards = reactive({
//   value: cards.cards.value,
//   setValue: (nv: ICard[]) => (allCards.value = nv)
// })

// const filterEveryInclude = reactive({
//   value: allCards,
//   setValue: (tagIds: string[]) => {
//     const filtred = cards.filterEveryInclude(allCards, tagIds)
//     filterEveryInclude.value = filtred
//   }
// })

// const filterEveryIncludeValue = computed(() => filterEveryInclude.value)

// const filterSomeExclude = reactive({
//   value: filterEveryIncludeValue.value,
//   setValue: (tagIds: string[]) => {
//     const filtred = cards.filterSomeExclude(filterSomeExclude.value, tagIds)
//     filterSomeExclude.value = filtred
//   }
// })

// const everyInclude = ref(allCards)

// const someExclude = computed(() => everyInclude.value)

// const filterByTags = (tagIds: string[], type: 'include' | 'exclude') => {
//   const execute = {
//     include: () => (everyInclude.value = cards.filterEveryInclude(allCards, tagIds)),
//     exclude: () => cards.filterSomeExclude(everyInclude.value, tagIds)
//   }
//   console.log('clicado')
//   execute[type]()
//   cards.updateReactiveCards(someExclude.value)
// }

// const filtredCards = reactive({
//   value: allCards,
//   setValue: (updatedCards: ICard[]) => {
//     filtredCards.value = updatedCards
//     cards.updateReactiveCards(filtredCards.value)
//   }
// })

// const filterByTagInclude = (tagsId: string[]) => {
//   const filtred = cards.findByTags(allCards, tagsId, 'every', 'include')
//   console.log('filtred-include', filtred)
//   filtredCards.setValue(filtred)
// }

// const filterByTagExclude = (tagsId: string[]) => {
//   const filtred = cards.findByTags(filtredCards.value, tagsId, 'some', 'exclude')
//   filtredCards.setValue(filtred)
// }

// const includeTags = {
//   value: [] as string[],
//   setValue: (tagIds: string[]) => (includeTags.value = tagIds)
// }

// const excludeTags = {
//   value: [] as string[],
//   setValue: (tagIds: string[]) => (excludeTags.value = tagIds)
// }

// const filterByTags = (props: {
//   tagIds?: string[]
//   type?: 'include' | 'exclude'
//   cardsList?: ICard[]
// }) => {
//   const { tagIds, type, cardsList } = props
//   const ids = !tagIds ? [] : tagIds
//   const ca = !cardsList || cardsList.length < 1 ? allCards.value : cardsList
//   const execute = {
//     include: () => includeTags.setValue(ids),
//     exclude: () => excludeTags.setValue(ids)
//   }
//   if (type) execute[type]()
//   const cardsIncludeTags = cards.filterEveryInclude(ca, includeTags.value)
//   const cardsExcludeTags = cards.filterSomeExclude(cardsIncludeTags, excludeTags.value)
//   cards.updateReactiveCards(cardsExcludeTags)
// }

// watchEffect(() => {
//   const updateCards = cards.cards.value
//   filterByTags({ cardsList: updateCards })
// })

// watchEffect(() => {
//   cards.filterText(text.value)
// })

const filterCardsText = (e: string) => cards.filterText(e)

const range = window.innerWidth / 2
</script>

<template>
  <div>
    <SearchInput
      key-id="filter-text-card"
      :content="''"
      @emit-content="filterCardsText"
      placeholder="pesquisa"
    />
    <OptionInLine content="tags:">
      <HorizontalCarousel :range="range" :scroll-buttons="true">
        <TagWithSwitchList
          direction="row"
          :checkeds="[]"
          unic-name="cards-filter-include"
          @emit-tags="filterCardsIncludeTags"
        />
      </HorizontalCarousel>
    </OptionInLine>
    <OptionInLine content="sem tags:">
      <HorizontalCarousel :range="range" :scroll-buttons="true">
        <TagWithSwitchList
          direction="row"
          :checkeds="[]"
          unic-name="cards-filter-exclude"
          @emit-tags="filterCardsExcludeTags"
        />
      </HorizontalCarousel>
    </OptionInLine>
  </div>
</template>

<style scoped lang="scss"></style> -->
