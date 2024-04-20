<script setup lang="ts">
import { reactive } from 'vue'
import { useStyle } from '@/stores/style'
import ThemeButton from '../../atoms/ThemeButton.vue'
import CenterModal from '../../atoms/CenterModal.vue'
import type { ICard } from '@/api/local'
import CardView from './CardView.vue'
import { useCards } from '@/stores/local/cards'

const { style } = useStyle()

const cards = useCards()

const props = defineProps<{ card: ICard }>()

const emit = defineEmits<{ (e: 'close', v: null): void }>()

const modal = reactive({
  show: false,
  open: () => (modal.show = true),
  close: () => {
    modal.show = false
    emit('close', null)
  }
})

const deleteCard = () => {
  console.log(props.card.id)
  cards.deleteOne(props.card.id)
  modal.close()
}
</script>

<template>
  <div>
    <ThemeButton @click="modal.open" class="delete">Deletar</ThemeButton>
    <CenterModal title-modal="Deletar tag" v-if="modal.show" @close="modal.close">
      <div class="confirm-delete-container">
        <CardView :card="props.card" class="card" />
        <ThemeButton @click="deleteCard" class="item delete">Deletar</ThemeButton>
      </div>
    </CenterModal>
  </div>
</template>

<style scoped lang="scss">
$buttonSize: v-bind('style.button.size');
.delete {
  width: 100%;
  background-color: rgb(255, 49, 49);
  color: white;
  &:hover {
    background-color: rgb(255, 49, 49);
  }
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
