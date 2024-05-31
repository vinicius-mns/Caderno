<script setup lang="ts">
import type { ICard } from '@/api/api_local/entites/cards/CardsTypes'
import type { ITag } from '@/api/api_local/entites/tags/TagsTypes'
import { computed, ref } from 'vue'
import CardListSlot from '../organisms/CardListSlot.vue'
import CardDelete from '../organisms/CardDelete.vue'
import { useCards } from '@/stores/local/cards'
import CardEditor from '../organisms/CardEditor.vue'
import ModalCard from '../atoms/ModalCard.vue'

const cards = useCards()

const props = defineProps<{
  allcards: ICard[]
  allTags: ITag[]
  width: string
}>()

const cardsReverse = computed(() => {
  const propsCards = props.allcards
  return propsCards.reverse()
})

const cardModal = ref<InstanceType<typeof CardListSlot>>()
const cardModalClose = () => cardModal.value?.close()

const cardTarget = ref({} as ICard)
const cardTargetSet = (c: ICard) => (cardTarget.value = c)

const cardUpdate = (card: ICard) => {
  cards.updateOne(card)
  cardModalClose()
}

const cardDelete = (id: string) => {
  cards.deleteOne(id)
  cardModalClose()
}
</script>

<template>
  <CardListSlot
    ref="cardModal"
    :all-cards="cardsReverse"
    @emit-card="cardTargetSet"
    class="card"
    :width="props.width"
  >
    <ModalCard class="container">
      <CardEditor
        :card="cardTarget"
        :all-tags="props.allTags"
        @emit-card="cardUpdate"
        class="card-editor"
      />
      <CardDelete :card="cardTarget" @emit-delete-id="cardDelete" class="card-delete" />
    </ModalCard>
  </CardListSlot>
</template>

<style scoped lang="scss">
$buttonH: 36px;
$margin: 8px;
.container {
  width: 320px;
  height: 45dvh;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
  & .card-editor {
    height: calc(100% - $buttonH - $margin);
  }
  & .card-delete {
    margin-top: $margin;
  }
}
</style>
