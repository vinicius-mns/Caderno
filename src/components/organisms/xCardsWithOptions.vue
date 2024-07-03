<script setup lang="ts">
import type { ICard } from '@/api/api_local/entites/cards/CardsTypes'
import { computed, ref } from 'vue'
import ModalCard from '../atoms/ModalCard.vue'
import FloatModalSlot from '../atoms/FloatModalSlot.vue'
import CardView from '../molecules/CardView.vue'
import FloatDescription from '../atoms/FloatDescription.vue'
import TrashIco from '../atoms/icons/TrashIco.vue'
import ShareIco from '../atoms/icons/ShareIco.vue'
import PencilIco from '../atoms/icons/PencilIco.vue'
import ThemeP from '../atoms/ThemeP.vue'
import MaxmizeIco from '../atoms/icons/MaxmizeIco.vue'
import type { ITag } from '@/api/local'
import TagSelectable from '../molecules/TagSelectable.vue'
import ButtonOption from '../molecules/ButtonOption.vue'
import CheckIco from '../atoms/icons/CheckIco.vue'

const props = defineProps<{
  allCards: ICard[]
  allTags: ITag[]
  width: string
}>()

const emit = defineEmits<{
  (e: 'updatedTags', v: ICard): void
  (e: 'update', v: ICard): void
  (e: 'delete', v: ICard): void
  (e: 'share', v: ICard): void
  (e: 'expand', v: ICard): void
}>()

const floatModal = ref<InstanceType<typeof FloatModalSlot>>()
const floatModalClose = (emitFunction: () => void) => {
  emitFunction()
  floatModal.value?.close()
}

const cardsReverse = computed(() => {
  const propsCards = props.allCards
  return propsCards.reverse()
})

const cardTarget = ref<ICard>({ content: 'not found', date: new Date(), id: '404', tags: [''] })
const cardTargetDate = ref(new Date().toLocaleDateString())

const cardTargetSet = (card: ICard) => {
  cardTarget.value = card
  cardTargetDate.value = String(new Date(card.date).toLocaleDateString())
}

const tagAlreadyChecked = (id: string) => cardTarget.value.tags.includes(id)

const handleCardTagCheck = (tagCheck: { tag: ITag; check: boolean }) => {
  const addCheckTagId = (tag: ITag) => {
    const newTags = [...cardTarget.value.tags, tag.id]
    cardTarget.value = { ...cardTarget.value, tags: newTags }
  }
  const removeCheckTagId = (tag: ITag) => {
    const atualCheckedTagIds = cardTarget.value.tags
    const newTags = atualCheckedTagIds.filter((id) => id !== tag.id)
    cardTarget.value = { ...cardTarget.value, tags: newTags }
  }
  tagCheck.check ? addCheckTagId(tagCheck.tag) : removeCheckTagId(tagCheck.tag)
}

const emitUpdatedTags = () => floatModalClose(() => emit('updatedTags', cardTarget.value))
const emitUpdate = () => floatModalClose(() => emit('update', cardTarget.value))
const emitDelete = () => floatModalClose(() => emit('delete', cardTarget.value))
const emitShare = () => emit('share', cardTarget.value)
const emitExpand = () => emit('expand', cardTarget.value)
</script>

<template>
  <FloatModalSlot ref="floatModal">
    <template #button-slot>
      <div class="cards-container">
        <CardView
          v-for="(card, i) in cardsReverse"
          :key="i"
          :card="card"
          class="card"
          @emit-card="cardTargetSet"
        />
      </div>
    </template>
    <template #container-slot>
      <ModalCard class="container-float">
        <header>
          <ThemeP :content="cardTargetDate" />
          <div class="actions">
            <FloatDescription content="Tela cheia" @click="emitExpand" class="action-button">
              <MaxmizeIco />
            </FloatDescription>
            <FloatDescription content="Compartilhar" @click="emitShare" class="action-button">
              <ShareIco />
            </FloatDescription>
            <FloatDescription content="Editar" @click="emitUpdate" class="action-button">
              <PencilIco />
            </FloatDescription>
            <FloatDescription content="Deletar" @click="emitDelete" class="action-button">
              <TrashIco />
            </FloatDescription>
          </div>
        </header>
        <div class="container-tag-checked">
          <div class="tags-section">
            <TagSelectable
              v-for="(tag, i) in props.allTags"
              :key="i"
              :checked="tagAlreadyChecked(tag.id)"
              :tag="tag"
              @emit-tag="handleCardTagCheck"
              class="tag"
            />
          </div>
          <ButtonOption content="Confirmar" @click="emitUpdatedTags" class="button-update-tags">
            <CheckIco />
          </ButtonOption>
        </div>
      </ModalCard>
    </template>
  </FloatModalSlot>
</template>

<style scoped lang="scss">
.cards-container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  .card {
    width: v-bind('props.width');
    max-width: 95dvw;
  }
}
.container-float {
  width: 330px;
  max-width: 95dvw;
  // max-height: 45dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  & header {
    width: 95%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  & .actions {
    display: flex;
    & .action-button {
      border: none;
      background-color: transparent;
      height: 34px;
      width: 34px;
      margin: 0 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      cursor: pointer;
      &:hover {
        background-color: rgba(109, 109, 109, 0.4);
      }
    }
  }
  & .container-tag-checked {
    width: 100%;
    height: 100%;
    display: flex;
    overflow: hidden;
    flex-direction: column;
    padding: 5px;
    box-sizing: border-box;
    & .tags-section {
      overflow-y: hidden;
      height: 100%;
      width: 100%;
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-evenly;
      overflow-y: auto;
      & .tag {
        width: 48%;
        margin: 10px;
      }
    }
    & .button-update-tags {
      margin-top: 5px;
    }
  }
}
</style>
