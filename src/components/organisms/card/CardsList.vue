<script setup lang="ts">
import { useStyle } from '@/stores/style'
import CardWithOptions from './CardWithOptions.vue'
import { computed, reactive, watchEffect } from 'vue'
import type { ICard } from '@/api/local'
import { useHandleCardsTags } from '@/stores/local/handleCardsTags'
import { useConfig } from '@/stores/config'

const { columnsCard } = useConfig()

const cardsTags = useHandleCardsTags()

const { style } = useStyle()

const allCards = computed(() => cardsTags.cardsReactive.value)

const columnsNumber = computed(() => columnsCard.value)

const cardsInColumns = reactive({
  value: [] as ICard[][],
  update: () => {
    cardsInColumns.value = setCardsInColumns(columnsNumber.value, allCards.value)
  }
})

const setCardsInColumns = (numberOfColumns: number, cards: ICard[]) => {
  const addCardsOnColum = (colum: ICard[], columnIndex: number) => {
    for (let i = columnIndex; i < cards.length; i += numberOfColumns) {
      colum.push(cards[i])
    }
    return colum
  }
  const columnsEmpty = new Array(numberOfColumns).fill(0).map(() => [])
  const columns = columnsEmpty.map((colum, index) => addCardsOnColum(colum, index))
  return columns
}

watchEffect(() => {
  columnsCard.setColumns(columnsNumber.value)
  cardsInColumns.update()
})
</script>

<template>
  <div class="container-cards">
    <div class="container-cards-list">
      <div class="column" v-for="(column, i) in cardsInColumns.value" :key="i">
        <CardWithOptions v-for="(card, ii) in column" :key="ii" :card="card" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$buttonSize: v-bind('style.button.size');
.container-cards {
  display: flex;
  flex-direction: column;
  align-items: center;
  & .range {
    width: 50%;
  }
}
.container-cards-list {
  width: 100%;
  max-width: 1228px;
  min-height: 600px;
  display: flex;
  justify-content: space-evenly;
  @media screen and (max-width: 767px) {
    padding-top: 20px;
  }
  & .column {
    width: 95%;
    min-width: 30%;
    margin: 0.5%;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
  }
  // column-gap: 10px;
  // margin: 10px;
  // padding-right: 10px;
  // columns: 3;
  // @media screen and (min-width: 768px) and (max-width: 1022px) {
  //   columns: 2;
  // }
  // @media screen and (max-width: 767px) {
  //   columns: 1;
  // }
}
</style>
