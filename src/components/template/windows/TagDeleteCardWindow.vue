<script setup lang="ts">
import { useCards } from '@/stores/cards/cards'
import TagDeleteCards from '@/components/organisms/TagDeleteCards.vue'
import WindowsSlot from '@/components/molecules/WindowsSlot.vue'
import { useWindows } from '@/stores/windows'
import { computed, ref, watch } from 'vue'
import type { Icard } from '@/stores/cards/Interfaces'
import { useTags } from '@/stores/tags/tags'

const window = useWindows()
const cards = useCards()
const tags = useTags()

const cardsRef = ref<Icard[]>([])

const tag = computed(() => window.tagDeleteCard.props)

const updateReactivecards = () => {
  cards.atualizeReactiveCards({
    includeTags: tags.includeTags,
    excludeTags: tags.excludeTags
  })
}

const deleteCardsById = async () => {
  const promises = cardsRef.value.map((card) => cards.deleteCard(card.id))

  await Promise.all(promises)

  window.tagDeleteCard.close()

  updateReactivecards()
}

watch(tag, async () => {
  const tagName = tag.value[1]

  if (tagName !== '') {
    const cardsFind = await cards.read({
      includeTags: [tagName],
      excludeTags: [],
      content: ''
    })

    cardsRef.value = cardsFind
  }
})
</script>

<template>
  <WindowsSlot
    v-if="window.tagDeleteCard.show"
    :title="window.tagDeleteCard.title"
    @close="window.tagDeleteCard.close"
  >
    <TagDeleteCards :cards-to-delete="cardsRef" :tag="tag" @delete-cards-by-id="deleteCardsById" />
  </WindowsSlot>
</template>

<style scoped lang="scss"></style>
