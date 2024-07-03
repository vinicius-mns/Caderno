<script setup lang="ts">
import RangeImput from '@/components/molecules/RangeImput.vue'
import ThemeP from '@/components/atoms/ThemeP.vue'
import { useStyle } from '@/stores/style'
import CardView from '../molecules/CardView.vue'
import { useCardStyle } from '@/stores/cardStyle'
import { computed } from 'vue'
import type { ICard } from '@/api/api_local/entites/cards/CardsTypes'
import OptionContainer from '../molecules/OptionContainer.vue'
import PageStyleSelector from '../molecules/PageStyleSelector.vue'

const style = useStyle()

const cardStyle = useCardStyle()

const props = defineProps<{
  width: number
}>()

const emit = defineEmits<{
  (e: 'emitWidth', v: number): void
}>()

const allCardsStyles = computed(() => cardStyle.cardsStyle)

const mockCard: ICard = {
  content: 'mock card',
  date: new Date(),
  id: '0',
  tags: ['']
}

const setCard = (index: number) => {
  cardStyle.setCardStyle(index)
}

const stylePageSet = (index: number) => {
  style.atualStyleSet(index)
}

const emitWidth = (v: number) => emit('emitWidth', v)
</script>

<template>
  <div class="card-config-container">
    <OptionContainer title="Card">
      <OptionContainer title="Medidas">
        <div class="range-container">
          <div class="description">
            <ThemeP content="Tamanho dos cards" />
            <ThemeP :content="`${props.width}px`" class="range-value" />
          </div>
          <RangeImput
            :title="{ visible: false, content: 'Quantidade de colunas' }"
            :limit="{ min: 200, max: 860 }"
            :init-value="width"
            @emit-value="emitWidth"
            class="range"
          />
          <CardView :card="mockCard" :style="{ width: `${props.width}px`, height: '100px' }" />
        </div>
      </OptionContainer>
      <OptionContainer title="Estilo">
        <div class="card-style-selector">
          <ThemeP content="Selecionar estilo do card" />
          <div class="cards-container">
            <CardView
              v-for="(CStyle, i) in allCardsStyles"
              :class="[CStyle.name === cardStyle.atualCardSyle.name && 'card-select', 'card']"
              :card="mockCard"
              :key="i"
              :style="CStyle"
              @click="() => setCard(i)"
            />
          </div>
        </div>
      </OptionContainer>
    </OptionContainer>
    <OptionContainer title="Page">
      <OptionContainer title="Estilo">
        <PageStyleSelector @emit-style="stylePageSet" />
      </OptionContainer>
    </OptionContainer>
  </div>
</template>

<style scoped lang="scss">
.card-config-container {
  width: 800px;
  max-width: 95dvw;
  max-height: 80dvh;
  padding: 15px;
  box-sizing: border-box;
  overflow-y: auto;
}
.range-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  .range {
    width: 100%;
  }
  & .description {
    width: 100%;
    display: flex;
    justify-content: space-between;
    & .range-value {
      width: 40%;
      text-align: center;
      background-color: v-bind('style.atualStyle.color.two');
      border-radius: v-bind('style.atualStyle.borderRadius.one');
    }
  }
}
.card-style-selector {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  & .cards-container {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    & .card {
      width: 40%;
      flex-grow: 1;
    }
    & .card-select {
      position: relative;
      &::before {
        content: '';
        position: absolute;
        height: 93%;
        width: 99%;
        border-radius: 8px;
        border: solid red 4px;
      }
    }
  }
}
</style>
<!-- 

<div class="card-config-container">
  <div class="page-style">
    <ShowPageStyle />
  </div>
</div> -->
