<script setup lang="ts">
import { reactive } from 'vue'
import { useStyle } from '@/stores/style'
import ThemeButton from '../../atoms/ThemeButton.vue'
// import CenterModal from '../../atoms/CenterModal.vue'
import { type ITag } from '@/api/local'
import CardView from '../card/CardView.vue'
import TagView from '../../molecules/TagView.vue'
import { useTags } from '@/stores/local/tags'
import { useCards } from '@/stores/local/cards'
import FloatModal from '@/components/molecules/FloatModal.vue'

const { style } = useStyle()

const tags = useTags()

const cards = useCards()

const props = defineProps<{ tag: ITag }>()

const emit = defineEmits<{ (e: 'close', v: void): void }>()

const cardsWithTag = () => {
  const allCards = cards.cards
  const tagIdsList = [props.tag.id]
  return cards.filterReturn.findByTags(allCards, tagIdsList)
}

const deleteTag = () => {
  tags.deleteOne(props.tag.id)
  cards.removeTagOnCard(props.tag.id)
  emit('close')
}
</script>

<template>
  <FloatModal button-content="Deletar Tag" class="delete" button-color="rgb(255, 49, 49)">
    <div class="confirm-delete-container">
      <TagView class="item" :tag="props.tag" />
      <div class="card-section item">
        <CardView v-for="(card, i) in cardsWithTag()" :key="i" :card="card" class="card item" />
      </div>
      <ThemeButton @click="deleteTag" class="item delete">Deletar</ThemeButton>
    </div>
  </FloatModal>
</template>

<style scoped lang="scss">
$buttonSize: v-bind('style.button.size');
.delete {
  height: $buttonSize;
  border-radius: 6px;
  width: 100%;
  background-color: rgb(255, 49, 49);
  color: white;
  &:hover {
    background-color: rgb(255, 49, 49);
  }
}
.confirm-delete-container {
  width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6px;
  & .item {
    width: 96%;
    margin-top: 6px;
  }
  & .card-section {
    max-height: 250px;
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    & .card {
      margin-top: 5px;
      flex-shrink: 0;
    }
  }
}
</style>
