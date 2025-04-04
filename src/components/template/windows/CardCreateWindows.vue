<script setup lang="ts">
import { computed, nextTick, onMounted, reactive, ref, watch, watchEffect } from 'vue'
import { useTags } from '@/stores/tags/tags'
import { useCards } from '@/stores/cards/cards'
import WindowsSlot from '@/components/molecules/WindowsSlot.vue'
import { useWindows } from '@/stores/windows'
import FlexContainer from '@/components/atoms/FlexContainer.vue'
import ButtonSlot from '@/components/molecules/ButtonSlot.vue'
import SaveIco from '@/components/atoms/icons/SaveIco.vue'
import ThemeTextArea from '@/components/atoms/ThemeTextArea.vue'
import type { Icard } from '@/stores/cards/Interfaces'
import ThemeP from '@/components/atoms/ThemeP.vue'
import ThemeMarkown from '@/components/atoms/ThemeMarkown.vue'
import { useStylesCard } from '@/stores/stylesCard/stylesCard'
import PlusIco from '@/components/atoms/icons/PlusIco.vue'
import ButtonCoinSlot from '@/components/molecules/ButtonCoinSlot.vue'
import CrossIco from '@/components/atoms/icons/CrossIco.vue'
import EraserIco from '@/components/atoms/icons/EraserIco.vue'
import CheckIco from '@/components/atoms/icons/CheckIco.vue'
import CardCreate from '@/components/organisms/card/CardCreate.vue'
import type { Itag } from '@/stores/tags/Interfaces'
import TagView2 from '@/components/molecules/TagView2.vue'
import TagSelector from '@/components/organisms/tag/TagSelector.vue'
import TagIco from '@/components/atoms/icons/TagIco.vue'
import { useStylesPage } from '@/stores/stylesPage/stylesPage'

const stylesPage = useStylesPage()
const styleCard = useStylesCard()
const window = useWindows()
const cards = useCards()
const tags = useTags()

interface ISimpleCard {
  id: number
  content: string
  tags: Itag[]
  type: 'card' | 'add-button'
}

// valores

const showOptions = ref(false)

const tagsSelected = reactive<Itag[]>([])

const emptyCard = (type?: 'card' | 'add-button'): ISimpleCard => ({
  id: new Date().getTime(),
  content: '',
  tags: tagsSelected,
  type: type ? type : 'card'
})

const cardList = reactive<ISimpleCard[]>([emptyCard('add-button')])

const columns = 4

const cardColumns = computed(() => {
  const cardInColumns = Array.from({ length: columns }, () => []) as ISimpleCard[][]

  for (let i = 0; i < cardList.length; i += 1) {
    const indexColumn = i % columns
    cardInColumns[indexColumn].push(cardList[i])
  }

  return cardInColumns
})

// metodos

const showOptionsOn = () => (showOptions.value = true)

const showOptionsOff = () => (showOptions.value = false)

const pushCard = () => {
  cardList.pop()
  cardList.push(emptyCard())
  cardList.push(emptyCard('add-button'))
}

const removeCard = (id: number) => {
  const index = cardList.findIndex((card) => card.id === id)

  cardList.splice(index, 1)

  const save = [...cardList]

  cardList.length = 0

  nextTick(() => cardList.push(...save))
}

const setCardContent = (v: string, id: number) => {
  const index = cardList.findIndex((card) => card.id === id)
  cardList[index] = { ...cardList[index], content: v }
}

const setCardTags = (v: Itag[], id: number) => {
  const index = cardList.findIndex((card) => card.id === id)
  cardList[index] = { ...cardList[index], tags: v }
}

const setTagsSelected = (tags: Itag[]) => {
  tagsSelected.length = 0
  tagsSelected.push(...tags)
}

// ciclo de vida

watchEffect(() => {
  setTagsSelected(tags.includeTags)
})

onMounted(() => {
  console.log('montado')
  if (cardList.length <= 1) pushCard()
})
</script>

<template>
  <WindowsSlot :title="window.cardCreate.title" @close="window.cardCreate.close">
    <FlexContainer class="window-create-card" flex-direction="column">
      <FlexContainer class="left-header">
        <TagSelector
          text-filter-tags=""
          :all-tags="tags.tags"
          :tags-checked="tagsSelected"
          @tags-updated="setTagsSelected"
        >
          <ButtonSlot class="tag" content="Selecionar tags" border-radius="50px">
            <TagIco />
          </ButtonSlot>
        </TagSelector>

        <TagView2 v-for="(tag, i) in tagsSelected" :tag="tag" :key="i" class="tag" />
      </FlexContainer>

      <FlexContainer class="cards-list">
        <FlexContainer
          class="column-cards"
          v-for="(column, index) in cardColumns"
          :key="index"
          flex-direction="column"
        >
          <FlexContainer
            v-for="(card, i) in column"
            :key="i"
            class="card-container"
            flex-direction="column"
            align-items="center"
            justify-content="center"
            @mouseenter="showOptionsOn"
            @mouseleave="showOptionsOff"
          >
            <button
              class="button-add"
              content="Adicionar"
              @click="pushCard"
              v-if="card.type === 'add-button'"
            >
              <PlusIco />
            </button>

            <CardCreate
              v-else
              :id="card.id"
              :content="card.content"
              :tags="tags.tags"
              :checked-tags="card.tags"
              @emit-content="setCardContent($event, card.id)"
              @emit-tags="setCardTags($event, card.id)"
              @remove="removeCard"
            />
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>

      <!-- <FlexContainer class="right">
        <FlexContainer class="right-container"> </FlexContainer>

        <FlexContainer class="right-main">
          <TagSelector text-filter-tags="" :all-tags="tags.tags" :tags-checked="tagsSelected" />
        </FlexContainer>
      </FlexContainer> -->
    </FlexContainer>
  </WindowsSlot>
</template>

<style scoped lang="scss">
.window-create-card {
  width: 95dvw;
  height: calc(95dvh - 50px);
  padding: 2px 25px;
  box-sizing: border-box;

  & .left-header {
    width: 100%;
    height: 60px;
    box-sizing: border-box;
    border-radius: 60px;
    align-items: center;

    & .tag {
      margin: 2px;
    }
  }

  & .cards-list {
    width: 100%;
    overflow-y: auto;

    & .column-cards {
      width: 0;
      flex-grow: 1;

      & .card-container {
        // background-color: v-bind('stylesPage.atualColor.border');
        padding: 5px;
        border-radius: 8px;
        margin: 5px;

        & .options {
          width: 100%;
          margin-top: 5px;

          & .button-margin {
            margin-right: 5px;
          }
        }
      }

      & .button-add {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 80px;
        width: 100%;
        border-radius: 8px;
        background-color: rgba(124, 124, 124, 0.1);
        border: none;
        cursor: pointer;
      }
    }
  }

  // & .right {
  //   width: 40%;
  //   // background-color: red;
  //   padding: 10px 52px;
  //   box-sizing: border-box;

  //   & .right-main {
  //     overflow-y: auto;
  //     width: 100%;
  //   }
  // }
}
</style>
