<script setup lang="ts">
import { ref } from 'vue'
import type { ICard } from '@/api/local'
import CardEditor from '@/components/molecules/CardEditor.vue'
import { useCards } from '@/stores/local/cards'
import CenterModalSlot from '@/components/molecules/CenterModalSlot.vue'
import ThemeActionButton from '@/components/molecules/ThemeActionButton.vue'
import { useStyle } from '@/stores/style'

const { atualStyle } = useStyle()

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
      <ThemeActionButton description="Criar um novo card">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="Outline"
          viewBox="0 0 24 24"
          width="512"
          height="512"
        >
          <path
            d="M18.656.93,6.464,13.122A4.966,4.966,0,0,0,5,16.657V18a1,1,0,0,0,1,1H7.343a4.966,4.966,0,0,0,3.535-1.464L23.07,5.344a3.125,3.125,0,0,0,0-4.414A3.194,3.194,0,0,0,18.656.93Zm3,3L9.464,16.122A3.02,3.02,0,0,1,7.343,17H7v-.343a3.02,3.02,0,0,1,.878-2.121L20.07,2.344a1.148,1.148,0,0,1,1.586,0A1.123,1.123,0,0,1,21.656,3.93Z"
          />
          <path
            d="M23,8.979a1,1,0,0,0-1,1V15H18a3,3,0,0,0-3,3v4H5a3,3,0,0,1-3-3V5A3,3,0,0,1,5,2h9.042a1,1,0,0,0,0-2H5A5.006,5.006,0,0,0,0,5V19a5.006,5.006,0,0,0,5,5H16.343a4.968,4.968,0,0,0,3.536-1.464l2.656-2.658A4.968,4.968,0,0,0,24,16.343V9.979A1,1,0,0,0,23,8.979ZM18.465,21.122a2.975,2.975,0,0,1-1.465.8V18a1,1,0,0,1,1-1h3.925a3.016,3.016,0,0,1-.8,1.464Z"
          />
        </svg>
      </ThemeActionButton>
    </template>
    <template #center-modal>
      <div class="card-create-container">
        <CardEditor :card="initialCard" @emit-card="createCard" class="card-create" />
      </div>
    </template>
  </CenterModalSlot>
</template>

<style scoped lang="scss">
.card-create-container {
  width: 400px;
  max-width: 100%;
  display: flex;
  justify-content: center;
  & .card-create {
    width: 95%;
  }
}
svg {
  fill: v-bind('atualStyle.color.text');
  height: 17px;
}
</style>
