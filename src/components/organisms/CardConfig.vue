<script setup lang="ts">
import RangeImput from '@/components/molecules/RangeImput.vue'
import ThemeP from '@/components/atoms/ThemeP.vue'
import CardView from '../molecules/CardView.vue'
import OptionContainer from '../molecules/OptionContainer.vue'
import FlexContainer from '../atoms/FlexContainer.vue'
import RadioBase from '../atoms/RadioBase.vue'
import { useStylesCard } from '@/stores/stylesCard/stylesCard'
import { useStylesPage } from '@/stores/stylesPage/stylesPage'
import type { Icard } from '@/stores/cards/Interfaces'

const stylePage = useStylesPage()

const stylesCard = useStylesCard()

const props = defineProps<{
  width: number
}>()

const emit = defineEmits<{
  (e: 'emitWidth', v: number): void
}>()

const mockCard: Icard = {
  content: 'mock card',
  date: new Date(),
  id: '0',
  tags: [['', '']]
}

const emitWidth = (v: number) => emit('emitWidth', v)
</script>

<template>
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
      <ThemeP content="Selecione um estilo do card:" :style="{ margin: '5px' }" />

      <FlexContainer flex-wrap="wrap">
        <RadioBase
          v-for="(card, i) in stylesCard.allStyles"
          radio-name="selector-card-style"
          :key="i"
          :id="card.name"
          :checked-value="stylesCard.atualStyle.name"
          :style="{ flex: '1 0 200px' }"
          @select="stylesCard.setStyle"
          class="card-view-radio-option"
        >
          <CardView
            :key="i"
            :card="{ ...mockCard, content: card.name }"
            :style="{ ...card, margin: 0, height: '100px' }"
          />
        </RadioBase>
      </FlexContainer>
    </OptionContainer>
  </OptionContainer>
</template>

<style scoped lang="scss">
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
      background-color: v-bind('stylePage.atualColor.front');
      border-radius: v-bind('stylePage.borderRadius.inside');
    }
  }
}

.card-view-radio-option {
  border: none;
  margin: 1px;
  padding: 10px;
}

// .card-style-selector {
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   & .cards-container {
//     width: 100%;
//     display: flex;
//     flex-wrap: wrap;
//     justify-content: center;
//     & .card {
//       width: 40%;
//       flex-grow: 1;
//     }
//     & .card-select {
//       position: relative;
//       &::before {
//         content: '';
//         position: absolute;
//         height: 93%;
//         width: 99%;
//         border-radius: 8px;
//         border: solid red 4px;
//       }
//     }
//   }
// }
</style>
