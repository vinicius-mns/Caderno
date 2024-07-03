<script setup lang="ts">
import type { ICard } from '@/api/api_local/entites/cards/CardsTypes'
import ThemeP from '@/components/atoms/ThemeP.vue'
import TrashIco from '@/components/atoms/icons/TrashIco.vue'
import ButtonOption from '@/components/molecules/ButtonOption.vue'
import CardView from '@/components/molecules/CardView.vue'

const props = defineProps<{
  card: ICard
}>()

const emit = defineEmits<{
  (e: 'emitDeleteId', v: string): void
}>()

const cardDelete = () => emit('emitDeleteId', props.card.id)
</script>

<template>
  <div class="container">
    <ThemeP class="text" content="Deseja deletar esse card?" />
    <div class="card-section">
      <CardView :card="props.card" class="card" />
    </div>
    <ButtonOption content="Deletar" @click="cardDelete" class="delete-button">
      <TrashIco />
    </ButtonOption>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 500px;
  max-width: 95dvw;
  height: 100%;
  max-height: 80dvh;
  display: flex;
  flex-direction: column;
  padding: 15px;
  box-sizing: border-box;
  & .text {
    margin-bottom: 10px;
  }
  & .card-section {
    height: 100%;
    overflow-y: auto;
    & .card {
      margin: 0;
    }
  }
  & .delete-button {
    margin-top: 10px;
  }
}
</style>
