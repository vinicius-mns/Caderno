<script setup lang="ts">
import ThemeButton from '../../atoms/ThemeButton.vue'
import type { ICard } from '@/api/local'
import CardView from './CardView.vue'
import { useCards } from '@/stores/local/cards'
import FloatModalSlot from '@/components/molecules/FloatModalSlot.vue'

const cards = useCards()

const props = defineProps<{ card: ICard }>()

const emit = defineEmits<{ (e: 'close', v: void): void }>()

const deleteCard = () => {
  cards.deleteOne(props.card.id)
  emit('close')
}
</script>

<template>
  <FloatModalSlot>
    <template #button-slot>
      <ThemeButton class="delete">Deletar</ThemeButton>
    </template>
    <template #container-slot>
      <div class="confirm-delete-container">
        <CardView :card="props.card" class="card" />
        <ThemeButton @click="deleteCard" class="item delete">Deletar</ThemeButton>
      </div>
    </template>
  </FloatModalSlot>
</template>

<style scoped lang="scss">
.delete {
  width: 100%;
  background-color: rgb(255, 49, 49);
  color: white;
}
.confirm-delete-container {
  width: 320px;
  max-height: 60dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6px;
  & .card {
    width: 96%;
    margin-top: 6px;
    overflow: auto;
  }
  & .item {
    width: 96%;
    margin-top: 6px;
    flex-shrink: 0;
  }
}
</style>
