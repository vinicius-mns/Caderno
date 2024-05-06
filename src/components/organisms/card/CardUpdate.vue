<script setup lang="ts">
import type { ICard } from '@/api/local'
import CardEditor from '../../molecules/CardEditor.vue'
import { useCards } from '@/stores/local/cards'
import FloatModalSlot from '@/components/molecules/FloatModalSlot.vue'
import ThemeButton from '@/components/atoms/ThemeButton.vue'

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
    <FloatModalSlot>
      <template #button-slot>
        <ThemeButton>Editar</ThemeButton>
      </template>
      <template #container-slot>
        <CardEditor :card="props.card" @emit-card="cardUpdate" />
      </template>
    </FloatModalSlot>
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
