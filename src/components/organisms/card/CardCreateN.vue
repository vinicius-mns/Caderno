<script setup lang="ts">
import { ref } from 'vue'
import type { ICard } from '@/api/local'
import CardEditor from '@/components/molecules/CardEditor.vue'
import { useCards } from '@/stores/local/cards'
import CenterModalSlot from '@/components/molecules/CenterModalSlot.vue'
import ThemeActionButton from '@/components/molecules/ThemeActionButton.vue'
import { useStyle } from '@/stores/style'

const { style } = useStyle()

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
  <div class="card-create-container">
    <CardEditor :card="initialCard" @emit-card="createCard" />
  </div>
</template>

<style scoped lang="scss">
.card-create-container {
  width: 400px;
  background-color: v-bind('style.color.background');
  position: fixed;
  bottom: 80px;
  right: 80px;
  @media screen and (max-width: 768px) {
    width: calc(100% - 60px);
    right: 0;
    bottom: 0;
  }
}
</style>
