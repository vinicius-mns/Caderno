<script setup lang="ts">
import { ref } from 'vue'
import type { ICard } from '@/api/local'
import CardEditor from '@/components/molecules/CardEditor.vue'
import { useCards } from '@/stores/local/cards'
import FloatModalSlot from '@/components/molecules/FloatModalSlot.vue'
import CoinButton from '@/components/molecules/CoinButton.vue'
import PlusIco from '@/components/atoms/icons/PlusIco.vue'
import PencilIco from '@/components/atoms/icons/PencilIco.vue'

const cards = useCards()

const modal = ref<InstanceType<typeof FloatModalSlot>>()

const initialCard: ICard = {
  content: '',
  date: new Date(),
  id: '',
  tags: []
}

const createCard = (e: ICard) => {
  cards.createOne(e)
  modal.value?.close()
}
</script>

<template>
  <FloatModalSlot ref="modal">
    <template #button-slot>
      <CoinButton description="Criar card">
        <PencilIco />
      </CoinButton>
    </template>
    <template #container-slot>
      <CardEditor :card="initialCard" @emit-card="createCard" />
    </template>
  </FloatModalSlot>
</template>

<style scoped lang="scss"></style>
