<script setup lang="ts">
import TagDelete from '@/components/organisms/TagDelete.vue'
import { useTags } from '@/stores/tags/tags'
import { useCards } from '@/stores/cards/cards'
import type { Itag } from '@/stores/tags/Interfaces'
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

const tagDelete = async (tag: Itag) => {
  await tags.deletedTag(tag[1])

  await cards.atualizeReactiveCards({
    includeTags: tags.includeTags,
    excludeTags: tags.excludeTags
  })

  window.tagDelete.close()
}
</script>

<template>
  <WindowsSlot
    v-if="window.tagDelete.show"
    :title="window.tagDelete.title"
    @close="window.tagDelete.close"
  >
    <TagDelete :tag="window.tagDelete.props" @emit-delete="tagDelete" />
  </WindowsSlot>
</template>

<style scoped lang="scss"></style>
