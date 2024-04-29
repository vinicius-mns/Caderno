<script setup lang="ts">
import { useStyle } from '@/stores/style'
import ThemeButton from '../../atoms/ThemeButton.vue'
import type { ICard } from '@/api/local'
import CardView from './CardView.vue'
import { useCards } from '@/stores/local/cards'
import FloatModal from '@/components/molecules/FloatModal.vue'

const { style } = useStyle()

const cards = useCards()

const props = defineProps<{ card: ICard }>()

const emit = defineEmits<{ (e: 'close', v: void): void }>()

const deleteCard = () => {
  cards.deleteOne(props.card.id)
  emit('close')
}
</script>

<template>
  <FloatModal button-content="Deletar" button-color="red" class="delete">
    <div class="confirm-delete-container">
      <CardView :card="props.card" class="card" />
      <ThemeButton @click="deleteCard" class="item delete">Deletar</ThemeButton>
    </div>
  </FloatModal>
</template>

<style scoped lang="scss">
$buttonSize: v-bind('style.button.size');
.delete {
  width: 100%;
  height: $buttonSize;
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
