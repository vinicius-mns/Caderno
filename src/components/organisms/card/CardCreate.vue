<script setup lang="ts">
import { ref } from 'vue'
import type { ICard } from '@/api/local'
import CardEditor from '@/components/molecules/CardEditor.vue'
import { useCards } from '@/stores/local/cards'
import CenterModalSlot from '@/components/molecules/CenterModalSlot.vue'
import ThemeActionButton from '@/components/molecules/ThemeActionButton.vue'

const cards = useCards()

const centerModal = ref<InstanceType<typeof CenterModalSlot>>()

const initialCard: ICard = {
  content: '',
  date: new Date(),
  id: '',
  tags: []
}

const createCard = (e: ICard) => {
  cards.createOne(e)
  centerModal.value?.close()
}
</script>

<template>
  <CenterModalSlot title-modal="Criar novo card" class="container-create-card" ref="centerModal">
    <template #button-modal>
      <ThemeActionButton ico="✍️" description="Criar um novo card" />
    </template>
    <template #center-modal>
      <CardEditor :card="initialCard" @emit-card="createCard" />
    </template>
  </CenterModalSlot>
</template>

<style scoped lang="scss"></style>
