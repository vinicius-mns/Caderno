<script setup lang="ts">
import type { ITag } from '@/api/api_local/entites/tags/TagsTypes'
import WindowModal from '../atoms/WindowModal.vue'
import { useWindows } from '@/stores/windows'
import { useCards } from '@/stores/local/cards'
import ThemeP from '../atoms/ThemeP.vue'
import CardView from '../molecules/CardView.vue'
import ButtonOption from '../molecules/ButtonOption.vue'
import TrashIco from '../atoms/icons/TrashIco.vue'
import { computed } from 'vue'
import ModalCard from '../atoms/ModalCard.vue'

const cards = useCards()

const window = useWindows()

const props = defineProps<{
  tag: ITag
}>()

const close = () => window.tagDeleteCardsWindow.close()

const cardsToDelete = computed(() => cards.filterReturn.findByTags([props.tag.id]))

const cardsDelete = () => {
  cards.cardsDeleteByTag(props.tag.id)
  close()
}
</script>

<template>
  <WindowModal title="Deletar cards" v-if="window.tagDeleteCardsWindow.value" @emit-close="close">
    <ModalCard class="modal-card">
      <ThemeP content="Deseja deletar esses cards?" class="item" />
      <div class="container-cards">
        <CardView v-for="(card, i) in cardsToDelete" :key="i" :card="card" class="card" />
      </div>
      <ButtonOption content="Deletar cards" @click="cardsDelete" class="item">
        <TrashIco />
      </ButtonOption>
    </ModalCard>
  </WindowModal>
</template>

<style scoped lang="scss">
.modal-card {
  width: 300px;
  max-height: 48dvh;
  @media screen and (max-width: 768px) {
    width: 100dvw;
  }
  & .container-cards {
    height: 370px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    overflow-x: hidden;
    & .card {
      width: 98%;
    }
  }
}
</style>
