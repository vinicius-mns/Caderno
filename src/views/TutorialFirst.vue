<script setup lang="ts">
import FlexContainer from '@/components/atoms/FlexContainer.vue'
import ModalCard from '@/components/atoms/ModalCard.vue'
import ThemeButton from '@/components/atoms/ThemeButton.vue'
import ThemeH1 from '@/components/atoms/ThemeH1.vue'
import BackIco from '@/components/atoms/icons/BackIco.vue'
import SendIco from '@/components/atoms/icons/SendIco.vue'
import ButtonCoinSlot from '@/components/molecules/ButtonCoinSlot.vue'
import ButtonSlot from '@/components/molecules/ButtonSlot.vue'
import CardView from '@/components/molecules/CardView.vue'
import TagsFilterCards from '@/components/organisms/TagsFilterCards.vue'
import type { Icard } from '@/stores/cards/Interfaces'
import type { Itag } from '@/stores/tags/Interfaces'
import { ref } from 'vue'

const path = ref(8)

const nextPath = () => {
  if (path.value <= 10) path.value = path.value + 1
}

const backPath = () => {
  if (path.value >= 1) path.value = path.value - 1
}

const manyCards = () => {
  const cards: Icard[] = Array.from({ length: 100 }, (_, i) => {
    return {
      id: String(i),
      content: `Oi eu sou um postIt :) numero ${i}`,
      date: new Date(),
      tags: []
    }
  })

  return cards
}

const tags: Itag[] = [
  ['📕', 'Projeto'],
  ['⏱️', 'Urgente'],
  ['✅', 'Feito'],
  ['🗑️', 'Leixeira']
]

const cardsToFilter = () => {
  const cards: Icard[] = [
    {
      id: '',
      content: 'Fazer uma tarefa do trabalho da faculdade',
      date: new Date(),
      tags: [
        ['📕', 'Projeto'],
        ['⏱️', 'Urgente']
      ]
    },
    {
      id: '2',
      content: 'Estudar para a prova de matemática',
      date: new Date(),
      tags: [
        ['📕', 'Projeto'],
        ['⏱️', 'Urgente']
      ]
    },
    {
      id: '3',
      content: 'Enviar relatório do projeto',
      date: new Date(),
      tags: [['✅', 'Feito']]
    },
    {
      id: '4',
      content: 'Limpar a mesa',
      date: new Date(),
      tags: [['🗑️', 'Leixeira']]
    },
    {
      id: '5',
      content: 'Revisar o código do projeto',
      date: new Date(),
      tags: [
        ['📕', 'Projeto'],
        ['✅', 'Feito']
      ]
    },
    {
      id: '6',
      content: 'Preparar apresentação para a reunião',
      date: new Date(),
      tags: [
        ['📕', 'Projeto'],
        ['⏱️', 'Urgente']
      ]
    },
    {
      id: '7',
      content: 'Comprar materiais para o projeto',
      date: new Date(),
      tags: [['📕', 'Projeto']]
    },
    {
      id: '8',
      content: 'Organizar arquivos do projeto',
      date: new Date(),
      tags: [['✅', 'Feito']]
    },
    {
      id: '9',
      content: 'Descartar documentos antigos',
      date: new Date(),
      tags: [['🗑️', 'Leixeira']]
    },
    {
      id: '10',
      content: 'Planejar a próxima semana',
      date: new Date(),
      tags: [
        ['📕', 'Projeto'],
        ['⏱️', 'Urgente']
      ]
    }
  ]

  return cards
}
</script>

<template>
  <div class="page-container">
    <FlexContainer flex-direction="column" align-items="center" class="tutorial-container">
      <ThemeH1 :content="String(path)" />

      <FlexContainer v-if="path === 1 || path === 2" class="animation p-1" justify-content="center">
        <FlexContainer class="text" justify-content="center">
          <ThemeH1 content="Isso é um post it" />
        </FlexContainer>

        <FlexContainer class="card-container">
          <CardView
            class="animation card"
            v-if="path === 2"
            :card="{ id: '', content: 'Oi eu sou um postIt :)', date: new Date(), tags: [] }"
          />
        </FlexContainer>
      </FlexContainer>

      <FlexContainer v-if="path === 3 || path === 4" class="animation p-1">
        <FlexContainer class="text" justify-content="center">
          <ThemeH1 content="Isso sao varios postit" />
        </FlexContainer>

        <FlexContainer
          class="card-container"
          flex-wrap="wrap"
          justify-content="center"
          v-if="path === 4"
        >
          <CardView v-for="(card, i) in manyCards()" :key="i" class="animation card" :card="card" />
        </FlexContainer>
      </FlexContainer>

      <FlexContainer
        v-if="path === 5 || path === 6 || path === 7"
        flex-direction="column"
        align-items="center"
        justify-content="center"
        class="p-1"
      >
        <ThemeH1 content="Postit sao otimos para anotar ideias" class="animation title-b" />

        <ThemeH1
          class="animation title-b"
          content="Porem quando ha muito deles, fica dificil encontra-los"
          v-if="path === 6 || path === 7"
        />

        <ThemeH1
          content="E se pudesse-mos colocar *tags* nos postit?"
          v-if="path === 7"
          class="animation title-b"
        />
      </FlexContainer>

      <FlexContainer v-if="path === 8" class="p-2">
        <FlexContainer
          class="tags-container"
          flex-direction="column"
          align-items="center"
          justify-content="center"
        >
          <ModalCard class="modal-card">
            <TagsFilterCards :all-tags="tags" :include-tags="[]" :exclude-tags="[]" />
          </ModalCard>
        </FlexContainer>

        <FlexContainer class="cards-container" flex-wrap="wrap" justify-content="center">
          <CardView
            v-for="(card, i) in cardsToFilter()"
            :key="i"
            class="animation card"
            :card="card"
          />
        </FlexContainer>
      </FlexContainer>
    </FlexContainer>

    <FlexContainer class="bottom">
      <ButtonCoinSlot content="Voltar" @click="backPath">
        <BackIco />
      </ButtonCoinSlot>
      <ButtonSlot content="Prosseguir" @click="nextPath">
        <SendIco />
      </ButtonSlot>
    </FlexContainer>
  </div>
</template>

<style scoped lang="scss">
.page-container {
  background-color: rgb(0, 0, 0);
  height: 100dvh;
  width: 100%;

  & .tutorial-container {
    height: 100%;
    width: 100%;

    & .p-1 {
      width: 80%;

      & .text {
        width: 500px;
        flex-shrink: 0;
      }

      & h1 {
        margin-top: 20px;
        font-size: 40px;
        font-weight: 100;
      }

      & .title-b {
        padding: 30px;
      }

      & .card-container {
        overflow: auto;
        margin-top: 25px;
        max-height: 90dvh;
      }

      & .card {
        width: 400px;
        margin: 10px;
      }
    }

    & .p-2 {
      width: 80%;

      & .tags-container {
        width: 30%;
        flex-shrink: 0;

        & .modal-card {
          width: 360px;
          max-width: 95dvw;
          max-height: 60dvh;
        }
      }

      & .cards-container {
        width: 100%;

        & .card {
          width: 300px;
          margin: 10px;
          // margin: 10px;
          // flex-grow: 0;
        }
      }
    }
  }

  & .bottom {
    position: absolute;

    bottom: 8%;
    right: 11%;
  }

  & .animation {
    opacity: 0;
    // margin-bottom: 20px;
    margin-top: 20px;
    animation: initAnimation 0.5s forwards;
  }
}

@keyframes initAnimation {
  to {
    opacity: 100%;
    // margin-bottom: 0;
    margin-top: 0;
  }
}
</style>
