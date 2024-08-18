<script setup lang="ts">
import CardDelete from '@/components/organisms/CardDelete.vue'
import { useTags } from '@/stores/tags/tags'
import { useCards } from '@/stores/cards/cards'
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

const cardDelete = async (cardId: string) => {
  await cards.deleteCard(cardId)

  await cards.atualizeReactiveCards({
    includeTags: tags.includeTags,
    excludeTags: tags.excludeTags
  })

  window.cardDelete.close()
}
</script>

<template>
  <WindowsSlot
    v-if="window.cardDelete.show"
    :title="window.cardDelete.title"
    @close="window.cardDelete.close"
  >
    <CardDelete :card="window.cardDelete.props" @emit-delete-id="cardDelete" />
  </WindowsSlot>
</template>

<style scoped lang="scss"></style>
