<script setup lang="ts">
import { useTags } from '@/stores/tags/tags'
import { useCards } from '@/stores/cards/cards'
import TagDeleteCards from '@/components/organisms/TagDeleteCards.vue'
import WindowsSlot from '@/components/molecules/WindowsSlot.vue'
import { useWindows } from '@/stores/windows'

const window = useWindows()

const cards = useCards()

const tags = useTags()

// const updateAllCards = async () => {
//   const getTagIds = (tag: Itag[]) => tag.map(({ id }) => id)
//   const includeTags = getTagIds(tags.includeTags)
//   const excludeTags = getTagIds(tags.excludeTags)
//   await cards.init({ includeTags, excludeTags })
// }

const deleteCardsById = async (cardIds: string[]) => {
  //tomara que eu lembre de melhorar essa funcao:
  // ela faz varias chamadas a api, mas da para melhorar para do 1 chamada
  // so preciso criar a funcao na api
  cardIds.forEach(async (id) => {
    await cards.deleteCard(id)
  })

  await cards.atualizeReactiveCards({
    includeTags: tags.includeTags,
    excludeTags: tags.excludeTags
  })

  window.tagDeleteCard.close()
}
</script>

<template>
  <WindowsSlot
    v-if="window.tagDeleteCard.show"
    :title="window.tagDeleteCard.title"
    @close="window.tagDeleteCard.close"
  >
    <TagDeleteCards
      :cards-to-delete="window.tagDeleteCard.props.cards"
      :tag="window.tagDeleteCard.props.tag"
      @delete-cards-by-id="deleteCardsById"
    />
  </WindowsSlot>
</template>

<style scoped lang="scss"></style>
