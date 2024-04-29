<script setup lang="ts">
import type { ICard } from '@/api/local'
import CardEditor from '../../molecules/CardEditor.vue'
import { useCards } from '@/stores/local/cards'
import CenterModal from '@/components/molecules/CenterModal.vue'

const cards = useCards()

const props = defineProps<{ card: ICard }>()

const emit = defineEmits<{ (e: 'updated', v: void): void }>()

const cardUpdate = (e: ICard) => {
  cards.updateOne(e)
  emit('updated')
}
</script>

<template>
  <div class="tag-create">
    <CenterModal button-content="Editar Card" title-modal="Editor de card">
      <CardEditor :card="props.card" @emit-card="cardUpdate" />
    </CenterModal>
  </div>
</template>

<style scoped lang="scss">
.tag-create {
  width: 100%;
  & .button {
    width: 100%;
  }
}
</style>
