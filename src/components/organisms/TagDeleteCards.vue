<script setup lang="ts">
import type { ITag } from '@/api/api_local/entites/tags/TagsTypes'
import FloatModalSlot from '@/components/atoms/FloatModalSlot.vue'
import ThemeP from '@/components/atoms/ThemeP.vue'
import TrashIco from '@/components/atoms/icons/TrashIco.vue'
import ButtonOption from '@/components/molecules/ButtonOption.vue'
import CardView from '../molecules/CardView.vue'
import type { ICard } from '@/api/api_local/entites/cards/CardsTypes'

const props = defineProps<{ tag: ITag; cardsToDelete: ICard[] }>()

const emit = defineEmits<{
  (emit: 'emitDelete', v: ITag): void
}>()

const deletar = () => emit('emitDelete', props.tag)
</script>

<template>
  <FloatModalSlot>
    <template #button-slot>
      <ButtonOption content="Deletar Cards com tag">
        <TrashIco />
      </ButtonOption>
    </template>
    <template #container-slot>
      <div class="container">
        <ThemeP content="Deseja deletar esses cards?" class="item" />
        <div class="container-cards">
          <CardView v-for="(card, i) in props.cardsToDelete" :key="i" :card="card" class="card" />
        </div>
        <ButtonOption content="Deletar cards" @click="deletar" class="item">
          <TrashIco />
        </ButtonOption>
      </div>
    </template>
  </FloatModalSlot>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  & .item {
    margin: 3px;
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
