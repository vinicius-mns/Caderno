<script setup lang="ts">
import type { ICard } from '@/api/api_local/entites/cards/CardsTypes'
import type { ITag } from '@/api/api_local/entites/tags/TagsTypes'
import { useWindows } from '@/stores/windows'
import CardView from '../molecules/CardView.vue'
import { computed } from 'vue'
import PlusIco from '../atoms/icons/PlusIco.vue'
import FloatDescription from '../atoms/FloatDescription.vue'

const window = useWindows()

const props = defineProps<{
  allcards: ICard[]
  allTags: ITag[]
  width: string
}>()

const cardUpdate = (c: ICard) => window.open.cardUpdate(c)

const cardsReverse = computed(() => {
  const propsCards = props.allcards
  return propsCards.reverse()
})
</script>

<template>
  <div class="container-cards">
    <FloatDescription content="Criar card">
      <button class="button-create card" @click="window.open.cardCreate">
        <PlusIco />
      </button>
    </FloatDescription>
    <CardView
      v-for="(card, i) in cardsReverse"
      :key="i"
      :card="card"
      :with="props.width"
      class="card"
      @emit-card="cardUpdate"
    />
  </div>
</template>

<style scoped lang="scss">
.container-cards {
  padding-top: 50px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  & .card {
    width: v-bind('props.width');
    max-width: 95dvw;
  }
  & .button-create {
    height: 90px;
    margin: 5px;
    border-radius: 8px;
    border: dashed 1.5px white;
    background-color: rgba(122, 122, 122, 0.459);
    opacity: 30%;
    outline: none;
    cursor: pointer;
    &:hover {
      opacity: 50%;
    }
    transition: all 0.3s;
  }
}
</style>
