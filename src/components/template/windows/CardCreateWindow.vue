<script setup lang="ts">
import { computed } from 'vue'
import CardEditor from '@/components/organisms/CardEditor.vue'
import { useTags } from '@/stores/tags/tags'
import { useCards } from '@/stores/cards/cards'
import type { Icard } from '@/stores/cards/Interfaces'
import WindowsSlot from '@/components/molecules/WindowsSlot.vue'
import { useWindows } from '@/stores/windows'

const window = useWindows()

const cards = useCards()

const tags = useTags()

const allTags = computed(() => tags.tags)

const emptyCard: Icard = { id: '', content: '', date: new Date(), tags: [] }

// const updateAllCards = async () => {
//   const getTagIds = (tag: Itag[]) => tag.map(({ id }) => id)
//   const includeTags = getTagIds(tags.includeTags)
//   const excludeTags = getTagIds(tags.excludeTags)
//   await cards.init({ includeTags, excludeTags })
// }

const cardAdd = async (card: Icard) => {
  await cards.create(card)

  await cards.atualizeReactiveCards({
    includeTags: tags.includeTags,
    excludeTags: tags.excludeTags
  })
}

const cardCreate = async (card: Icard) => {
  await cardAdd(card)
  window.cardCreate.close()
}

const openTagCreate = () => {
  window.tagCreate.open(['', ''])
}
</script>

<template>
  <WindowsSlot
    v-if="window.cardCreate.show"
    :title="window.cardCreate.title"
    @close="window.cardCreate.close"
  >
    <CardEditor
      type="create"
      :card="emptyCard"
      :all-tags="allTags"
      @create-tag="openTagCreate"
      @card-create="cardCreate"
      @card-add="cardAdd"
    />
  </WindowsSlot>
</template>

<style scoped lang="scss"></style>
