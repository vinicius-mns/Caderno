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

// const updateAllCards = async () => {
//   const getTagIds = (tag: Itag[]) => tag.map(({ id }) => id)
//   const includeTags = getTagIds(tags.includeTags)
//   const excludeTags = getTagIds(tags.excludeTags)
//   await cards.init({ includeTags, excludeTags })
// }

const cardUpdate = async (card: Icard) => {
  await cards.update(card)

  await cards.atualizeReactiveCards({
    includeTags: tags.includeTags,
    excludeTags: tags.excludeTags
  })

  window.cardEdit.close()
}

const openCardDelete = (card: Icard) => {
  window.cardEdit.close()
  window.cardDelete.open(card)
}
</script>

<template>
  <WindowsSlot
    v-if="window.cardEdit.show"
    :title="window.cardEdit.title"
    @close="window.cardEdit.close"
  >
    <CardEditor
      type="editor"
      :card="window.cardEdit.props"
      :all-tags="allTags"
      @card-update="cardUpdate"
      @card-delete="openCardDelete"
    />
  </WindowsSlot>
</template>

<style scoped lang="scss"></style>
