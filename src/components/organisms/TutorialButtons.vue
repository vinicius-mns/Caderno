<script setup lang="ts">
import ThemeButton from '../atoms/ThemeButton.vue'
import FlexContainer from '../atoms/FlexContainer.vue'
import ButtonCoinSlot from '../molecules/ButtonCoinSlot.vue'
import PlusIco from '../atoms/icons/PlusIco.vue'
import ThemeP from '../atoms/ThemeP.vue'
import type { Icard } from '@/stores/cards/Interfaces'
import CardView from '../molecules/CardView.vue'
import { useStylesPage } from '@/stores/stylesPage/stylesPage'

const stylesPage = useStylesPage()

const cards: Icard[] = [
  {
    id: '0xx24dssc',
    content: 'Esse é um exemplo de card criado',
    date: new Date(),
    tags: [
      ['📖', 'Exemplo de emoji'],
      ['🌟', 'Pode se criar varios emojis'],
      ['🏆', 'Adiciona-los e remove-los dos cards']
    ]
  },
  {
    id: '0xx24dssc',
    content: 'Voce pode clicar no canto do card para `Editar-lo`',
    date: new Date(),
    tags: [
      ['📖', 'Exemplo de emoji'],
      ['🌟', 'Pode se criar varios emojis']
    ]
  },
  {
    id: '0xx24dssc',
    content: 'Voce pode clicar no canto do card para `Remover` ou `Adicionar` tags rapidamente',
    date: new Date(),
    tags: [
      ['📖', 'Exemplo de emoji'],
      ['🏆', 'Adiciona-los e remove-los dos cards']
    ]
  },
  {
    id: '0xx24dssc',
    content:
      'O texto do card é escrito em `Markdown`, pode encontrar mais sobre isso [clicando aqui](https://docs.pipz.com/central-de-ajuda/learning-center/guia-basico-de-markdown#open) ',
    date: new Date(),
    tags: [
      ['📖', 'Exemplo de emoji'],
      ['🏆', 'Adiciona-los e remove-los dos cards']
    ]
  }
]
</script>

<template>
  <FlexContainer flex-direction="column" align-items="center">
    <FlexContainer class="main-container" align-items="center" flex-direction="column">
      <ThemeButton class="button-x">Crie tags</ThemeButton>

      <div class="vertical"></div>

      <FlexContainer align-items="center" class="xx margin-top">
        <ButtonCoinSlot content="">
          <PlusIco />
        </ButtonCoinSlot>

        <ThemeP content="Utilize as tags criadas" />
      </FlexContainer>

      <div class="vertical"></div>

      <ThemeButton class="button-x b-card">Crie cards com tags</ThemeButton>

      <div class="vertical"></div>

      <div class="vertical"></div>

      <div class="horizontal"></div>

      <FlexContainer align-items="center" class="margin-top">
        <FlexContainer flex-direction="column" align-items="center">
          <div class="vertical"></div>

          <div class="vertical"></div>

          <ThemeButton class="button-x b-card">Filtre cards utilizando tags</ThemeButton>
        </FlexContainer>

        <FlexContainer flex-direction="column" align-items="center">
          <div class="vertical"></div>

          <div class="vertical"></div>

          <ThemeButton class="button-x b-card">delete cards utilizando tags</ThemeButton>
        </FlexContainer>
      </FlexContainer>
    </FlexContainer>

    <FlexContainer class="cards-container" flex-wrap="wrap" justify-content="center">
      <CardView v-for="(card, i) in cards" :card="card" class="card" :key="i" />
    </FlexContainer>
  </FlexContainer>
</template>

<style scoped lang="scss">
.main-container {
  opacity: 50%;
  height: 100%;
  width: 100%;

  & .button-x {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    width: 150px;
    padding: 10px;
    margin: 5px;
    border: solid 1px v-bind('stylesPage.atualColor.text');
  }

  & .b-card {
    width: 230px;
  }

  & .vertical {
    background-color: v-bind('stylesPage.atualColor.text');
    height: 50px;
    width: 1px;
  }

  & .horizontal {
    width: 241px;
    background-color: v-bind('stylesPage.atualColor.text');
    height: 1px;
  }

  & .xx {
    transform: translateX(calc(50% - 20px));
  }
}

.cards-container {
  width: 60%;
  margin-top: 20px;
  & .card {
    margin: 10px;
    width: 480px;
  }
}
</style>
