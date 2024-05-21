<script setup lang="ts">
import type { ICard } from '@/api/api_local/entites/cards/CardsTypes'
import type { ITag } from '@/api/api_local/entites/tags/TagsTypes'
import { computed, ref } from 'vue'
import CardListSlot from '../organisms/CardListSlot.vue'
import CardDelete from '../organisms/CardDelete.vue'
import { useCards } from '@/stores/local/cards'
import CardEditor from '../organisms/CardEditor.vue'

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
    <div class="container">
      <CardEditor
        :card="cardTarget"
        :all-tags="props.allTags"
        @emit-card="cardUpdate"
        class="card-editor"
      />
      <CardDelete :card="cardTarget" @emit-delete-id="cardDelete" class="card-delete" />
    </div>
  </CardListSlot>
</template>

<style scoped lang="scss">
$buttonH: 36px;
$margin: 8px;
.container {
  width: 100%;
  height: 45dvh;
  & .card-editor {
    height: calc(100% - $buttonH - $margin);
  }
  & .card-delete {
    margin-top: $margin;
  }
}
</style>

<!-- <template>
  <CardListSlot
    ref="cardModal"
    :all-cards="cardsReverse"
    @emit-card="cardTargetSet"
    class="card"
    :width="props.width"
  >
    <div class="container">
      <FloatModalSlot>
        <template #button-slot>
          <ButtonOption content="Editar">
            <PencilIco />
          </ButtonOption>
        </template>
        <template #container-slot>
          <div class="container">
            <CardEditor :card="cardTarget" :all-tags="props.allTags" @emit-card="cardUpdate" />
          </div>
        </template>
      </FloatModalSlot>
      <CardDelete :card="cardTarget" @emit-delete-id="cardDelete" />
    </div>
  </CardListSlot>
</template> -->
