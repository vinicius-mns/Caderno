<script setup lang="ts">
import FlexContainer from '@/components/atoms/FlexContainer.vue'
import ModalCard from '@/components/atoms/ModalCard.vue'
import ThemeMarkown from '@/components/atoms/ThemeMarkown.vue'
import BackIco from '@/components/atoms/icons/BackIco.vue'
import SendIco from '@/components/atoms/icons/SendIco.vue'
import ButtonCoinSlot from '@/components/molecules/ButtonCoinSlot.vue'
import ButtonSlot from '@/components/molecules/ButtonSlot.vue'
import CardView from '@/components/molecules/CardView.vue'
import TagView from '@/components/molecules/TagView.vue'
import TagsFilterCards from '@/components/organisms/TagsFilterCards.vue'
import TagsFiltredsList from '@/components/organisms/TagsFiltredsList.vue'
import router from '@/router'
import type { Icard } from '@/stores/cards/Interfaces'
import { useStylesPage } from '@/stores/stylesPage/stylesPage'
import type { Itag } from '@/stores/tags/Interfaces'
import { useTutorial } from '@/stores/tutorial/tutorial'
import { ref } from 'vue'
import clickOnFilter from '@/components/atoms/videos/click-on-filter.gif'

const stylesPage = useStylesPage()

const { diaryFilter, projectFilter } = useTutorial()

const path = ref(10)

const nextPath = () => {
  if (path.value < 14) path.value = path.value + 1
}

const backPath = () => {
  if (path.value >= 1) path.value = path.value - 1
}

const pathIn = (start: number, end: number) => path.value >= start && path.value <= end

const newCard = (card: { id?: string; content?: string; date?: Date | string; tags?: Itag[] }) => {
  return {
    id: card.id ? card.id : '0',
    content: card.content ? card.content : 'null',
    date: card.date ? card.date : new Date(),
    tags: card.tags ? card.tags : []
  }
}

const manyCards = () => {
  const cards: Icard[] = Array.from({ length: 100 }, (_, i) => {
    return newCard({ id: String(i), content: `### Oi! Eu sou um Post-it! 😊 ${i}` })
  })

  return cards
}

const textClickOnFilter = `

&nbsp;


**Clique no filtro** para selecionar as tags que deseja filtrar

**Com tag**: Mostra os cards que **possuem a tag**

**Sem tag**: Mostra os cards que **não possuem a tag**
`

const textExempleFilter = `
## Exemplo de filtro:

**Com tag** marque: [Projeto], [Urgente]

**Sem tag** marque: [Feito]

Com isso, você verá todos os **projetos urgentes** que **não foram feitos**

Isso te ajudará a visualizar apenas os projetos importantes nos quais você deve focar
`

const textIntro = `
# Tutorial! 🎉 

### 👉 Clique no botão inferior esquerdo a baixo para **prosseguir**!  

### 🔙 Ou, se você quiser voltar, é só clicar na setinha ao lado!

---

Divirta-se navegando! 😄✨
`

const pushCards = () => router.push('/cards')
</script>

<template>
  <div class="page-container">
    <FlexContainer flex-direction="column" align-items="center" class="tutorial-container">
      <ThemeMarkown :content="`## ${String(path)}`" />
      <CardView
        v-if="pathIn(0, 0)"
        :card="newCard({ content: textIntro })"
        class="card-init animation"
        text-align="start"
      />

      <FlexContainer v-if="pathIn(1, 1)" class="animation p-1" justify-content="center">
        <FlexContainer class="text" justify-content="center">
          <ThemeMarkown content="# Isso é um Post-it" />
        </FlexContainer>

        <FlexContainer class="card-container">
          <CardView
            class="animation card"
            :card="newCard({ content: '## Oi, eu sou um Post-it 😄' })"
          />
        </FlexContainer>
      </FlexContainer>

      <FlexContainer v-if="pathIn(2, 3)" class="animation p-1">
        <FlexContainer class="text" justify-content="center">
          <ThemeMarkown content="# Isto são vários Post-its" />
        </FlexContainer>

        <FlexContainer
          class="card-container"
          flex-wrap="wrap"
          justify-content="center"
          v-if="pathIn(3, 3)"
        >
          <CardView v-for="(card, i) in manyCards()" :key="i" class="animation card" :card="card" />
        </FlexContainer>
      </FlexContainer>

      <FlexContainer
        v-if="pathIn(4, 6)"
        flex-direction="column"
        align-items="center"
        justify-content="center"
        class="p-1"
      >
        <ThemeMarkown
          content="# Post-its são ótimos para anotar ideias"
          class="animation title-b"
        />

        <ThemeMarkown
          class="animation title-b"
          content="# Porém, quando há muitos deles, fica difícil encontrá-los"
          v-if="pathIn(5, 6)"
        />

        <ThemeMarkown
          content="# E se pudéssemos colocar **tags** nos Post-its?"
          v-if="pathIn(6, 6)"
          class="animation title-b"
        />
      </FlexContainer>

      <FlexContainer v-if="pathIn(7, 11)" class="template-tag-and-cards">
        <header v-if="pathIn(9, 11)">
          <ThemeMarkown content="Filtro ativo" class="p" />

          <TagsFiltredsList
            :include-tags="projectFilter.filter.include"
            :exclude-tags="projectFilter.filter.exclude"
            @include-tag-remove="projectFilter.handleFilter('include').remove"
            @exclude-tag-remove="projectFilter.handleFilter('exclude').remove"
          />
        </header>

        <div class="tags-container">
          <FlexContainer
            flex-direction="column"
            align-items="center"
            v-if="pathIn(7, 8)"
            class="animation"
          >
            <ThemeMarkown content="# Tags" />

            <FlexContainer flex-direction="column" align-items="center">
              <TagView v-for="(tag, i) in projectFilter.tags" :key="i" :tag="tag" />
            </FlexContainer>
          </FlexContainer>

          <FlexContainer
            v-if="pathIn(9, 11)"
            align-items="center"
            flex-direction="column"
            class="animation"
          >
            <ThemeMarkown content="## Fitrar cards pelas tags" />

            <ModalCard class="modal-card">
              <TagsFilterCards
                :all-tags="projectFilter.tags"
                :include-tags="projectFilter.filter.include"
                :exclude-tags="projectFilter.filter.exclude"
                @include-tag-add="projectFilter.handleFilter('include').add"
                @include-tag-remove="projectFilter.handleFilter('include').remove"
                @exclude-tag-add="projectFilter.handleFilter('exclude').add"
                @exclude-tag-remove="projectFilter.handleFilter('exclude').remove"
                @clean-all="projectFilter.handleFilter('include').clear()"
              />
            </ModalCard>

            <ThemeMarkown :content="textClickOnFilter" v-if="pathIn(10, 10)" class="animation" />

            <ThemeMarkown :content="textExempleFilter" v-if="pathIn(11, 11)" class="animation" />

            <img :src="clickOnFilter" alt="tutorial click no filtro" v-if="pathIn(10, 11)" />
          </FlexContainer>
        </div>

        <FlexContainer
          flex-direction="column"
          align-items="center"
          class="cards-container"
          v-if="pathIn(8, 11)"
        >
          <ThemeMarkown content="# Cards" />

          <FlexContainer flex-wrap="wrap" justify-content="center">
            <CardView
              v-for="(card, i) in projectFilter.cards"
              :key="i"
              class="animation card"
              :card="card"
            />
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>

      <FlexContainer v-if="pathIn(12, 13)" class="animation" flex-direction="column">
        <ThemeMarkown content="## Gostaria de ver outros exemplos ou começar você mesmo?" />

        <FlexContainer v-if="pathIn(13, 13)" class="animation" flex-direction="column">
          <ButtonSlot
            content="Ver exemplos"
            :border="true"
            class="button-color margir-top"
            @click="nextPath()"
            >📝</ButtonSlot
          >

          <ButtonSlot
            content="Fazer eu mesmo"
            :border="true"
            class="button-color margin-top"
            @click="pushCards()"
            >😎</ButtonSlot
          >
        </FlexContainer>
      </FlexContainer>

      <FlexContainer v-if="pathIn(14, 14)" class="template-tag-and-cards">
        <header>
          <ThemeMarkown content="Filtro ativo" class="p" />

          <TagsFiltredsList
            :include-tags="diaryFilter.filter.include"
            :exclude-tags="diaryFilter.filter.exclude"
            @include-tag-remove="diaryFilter.handleFilter('include').remove"
            @exclude-tag-remove="diaryFilter.handleFilter('exclude').remove"
          />
        </header>

        <div class="tags-container">
          <FlexContainer align-items="center" flex-direction="column" class="animation">
            <ThemeMarkown content="## Fitrar cards pelas tags" />

            <ModalCard class="modal-card">
              <TagsFilterCards
                :all-tags="diaryFilter.tags"
                :include-tags="diaryFilter.filter.include"
                :exclude-tags="diaryFilter.filter.exclude"
                @include-tag-add="diaryFilter.handleFilter('include').add"
                @include-tag-remove="diaryFilter.handleFilter('include').remove"
                @exclude-tag-add="diaryFilter.handleFilter('exclude').add"
                @exclude-tag-remove="diaryFilter.handleFilter('exclude').remove"
                @clean-all="diaryFilter.handleFilter('include').clear()"
              />
            </ModalCard>
          </FlexContainer>
        </div>

        <FlexContainer flex-direction="column" align-items="center" class="cards-container">
          <ThemeMarkown content="# Cards" />

          <FlexContainer flex-wrap="wrap" justify-content="center">
            <CardView
              v-for="(card, i) in diaryFilter.cards"
              :key="i"
              class="animation card"
              :card="card"
            />
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
    </FlexContainer>

    <FlexContainer class="bottom" v-if="pathIn(0, 12) || pathIn(14, 15)">
      <ButtonCoinSlot content="Voltar" @click="backPath()">
        <BackIco />
      </ButtonCoinSlot>
      <ButtonSlot content="Prosseguir" @click="nextPath" class="button-color">
        <SendIco />
      </ButtonSlot>
    </FlexContainer>
  </div>
</template>

<style scoped lang="scss">
.page-container {
  background-color: v-bind('stylesPage.atualColor.front');
  height: 100dvh;
  width: 100%;

  color: v-bind('stylesPage.atualColor.text');

  & .tutorial-container {
    height: 100%;
    width: 100%;

    & .card-init {
      position: fixed;
      top: calc(50% - 195px);
      left: calc(50% - 250px);
      width: 500px;
    }

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

    & .template-tag-and-cards {
      width: 80%;
      height: 100%;
      margin-top: 60px;

      & header {
        display: flex;
        align-items: center;
        position: fixed;
        top: 30px;
        left: 0;
        height: 40px;
        width: 80%;
        margin-left: 10%;

        & .p {
          flex-shrink: 0;
        }
      }

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
          margin-right: 10px;
          margin-bottom: 10px;
        }
      }
    }

    & .margin-top {
      margin-top: 8px;
    }
  }
  & .button-color {
    background-color: v-bind('stylesPage.atualColor.hover');
    width: fit-content;
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
