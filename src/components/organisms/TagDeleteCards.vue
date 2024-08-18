<script setup lang="ts">
import ThemeP from '../atoms/ThemeP.vue'
import CardView from '../molecules/CardView.vue'
import ButtonOption from '../molecules/ButtonOption.vue'
import TrashIco from '../atoms/icons/TrashIco.vue'
import type { Itag } from '@/stores/tags/Interfaces'
import type { Icard } from '@/stores/cards/Interfaces'

const props = defineProps<{
  cardsToDelete: Icard[]
  tag: Itag
}>()

const emit = defineEmits<{
  (e: 'deleteCardsById', v: string[]): void
}>()

const cardsDelete = () =>
  emit(
    'deleteCardsById',
    props.cardsToDelete.map(({ id }) => id)
  )
</script>

<template>
  <div class="container">
    <div class="description">
      <ThemeP content="Deletar cards com essa tag?" class="item" />
      <span>{{ props.tag[0] }}</span>
    </div>
    <div class="container-cards">
      <CardView v-for="(card, i) in props.cardsToDelete" :key="i" :card="card" class="card" />
    </div>
    <ButtonOption content="Deletar cards" @click="cardsDelete" class="button-delete">
      <TrashIco />
    </ButtonOption>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 500px;
  max-width: 95dvw;
  max-height: 80dvh;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  box-sizing: border-box;
  & .description {
    height: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    & span {
      font-size: 28px;
      text-shadow: black 4px 4px;
    }
  }
  & .container-cards {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    overflow-x: hidden;
    & .card {
      width: 98%;
      position: relative;
      margin-bottom: 20px;
    }
  }
  & .button-delete {
    margin-top: 10px;
  }
}
</style>
