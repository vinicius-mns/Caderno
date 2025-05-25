<script setup lang="ts">
import FlexContainer from '@/components/atoms/FlexContainer.vue'
import CrossIco from '@/components/atoms/icons/CrossIco.vue'
import PencilIco from '@/components/atoms/icons/PencilIco.vue'
import PlusIco from '@/components/atoms/icons/PlusIco.vue'
import TagIco from '@/components/atoms/icons/TagIco.vue'
import ThemeH1 from '@/components/atoms/ThemeH1.vue'
import ButtonCoinSlot from '@/components/molecules/ButtonCoinSlot.vue'
import ButtonSlot from '@/components/molecules/ButtonSlot.vue'
import TagView2 from '@/components/molecules/TagView2.vue'
import CardCreate from '@/components/organisms/card/CardCreate.vue'
import TagSelector from '@/components/organisms/tag/TagSelector.vue'
import type { Icard } from '@/stores/cards/Interfaces'
import { useCardsTags } from '@/stores/cardsTags'
import type { Itag } from '@/stores/tags/Interfaces'
import { useTags } from '@/stores/tags/tags'
import { useWindows } from '@/stores/windows'
import { computed, nextTick, onMounted, reactive, ref, watchEffect } from 'vue'

// const stylesPage = useStylesPage()
// const window = useWindows()
// const cardTags = useCardsTags()
// const tags = useTags()

// interface ISimpleCard {
//   id: number
//   content: string
//   tags: Itag[]
//   type: 'card' | 'add-button'
// }

const props = defineProps<{
  allTags: Itag[]
  globalTags: Itag[]
}>()

const emit = defineEmits<{
  (e: 'close', v: null): void
}>()

// valores
const globalTagsRef = reactive([...props.globalTags])

const emptyCard = (): Icard => ({
  id: new Date().getTime().toString(),
  content: '',
  date: new Date(),
  tags: [...globalTagsRef]
})

const cards = reactive<Icard[]>([emptyCard()])

// metodos

const handleCard = (card: Icard, metod: 'add' | 'remove') => {
  const cardFound = cards.findIndex((c) => c.id === card.id)

  if (metod === 'add') {
    cards.push(card)
  }

  if (metod === 'remove') {
    cards.splice(cardFound, 1)

    const cardsUpdated = [...cards]

    cards.length = 0

    nextTick(() => cards.push(...cardsUpdated))
  }
}

const handleContent = (card: Icard, content: string) => {
  const cardFound = cards.findIndex((c) => c.id === card.id)

  cards[cardFound].content = content
}

const handleTags = (card: Icard, tags: Itag[]) => {
  const cardFound = cards.findIndex((c) => c.id === card.id)

  cards[cardFound].tags = tags
}

const setGlobalTags = (tags: Itag[]) => {
  globalTagsRef.length = 0
  globalTagsRef.push(...tags)
}

const createAllCards = () => {
  console.log('create all cards', cards)
}

const emitClose = () => emit('close', null)

// ciclo de vida

// watchEffect(() => {
//   setTagsSelected(tags.includeTags)
// })
</script>

<template>
  <div class="create-card-bottom-container">
    <header>
      <ThemeH1 content="Criar card" class="title" />

      <ButtonCoinSlot content="Fechar" class="button-options" @click="emitClose">
        <CrossIco />
      </ButtonCoinSlot>
    </header>

    <div class="global-tags">
      <TagSelector
        text-filter-tags=""
        :all-tags="props.allTags"
        :tags-checked="globalTagsRef"
        @tags-updated="setGlobalTags"
      >
        <ButtonSlot content="Tags Globais" border-radius="50px">
          <TagIco />
        </ButtonSlot>
      </TagSelector>

      <TagView2 v-for="(tag, i) in globalTagsRef" :key="i" :tag="tag" class="tag" :mini="true" />
    </div>

    <div class="cards-list">
      <CardCreate
        v-for="(card, i) in cards"
        class="card"
        :key="i"
        :card="card"
        :id="card.id"
        :content="card.content"
        :tags="props.allTags"
        :checked-tags="card.tags"
        @emit-tags="handleTags(card, $event)"
        @remove="handleCard(card, 'remove')"
        @emit-content="handleContent(card, $event)"
      />

      <ButtonSlot content="Adicionar" @click="handleCard(emptyCard(), 'add')" border-radius="50px">
        <PlusIco />
      </ButtonSlot>
    </div>

    <ButtonSlot
      class="button-create-all"
      content="Criar todos"
      border-radius="50px"
      :invert-color="true"
      @click="createAllCards"
    >
      <PencilIco />
    </ButtonSlot>
  </div>
</template>

<style scoped lang="scss">
.create-card-bottom-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 4px;
  box-sizing: border-box;

  & header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    // margin-top: 10px;

    & h1 {
      margin-left: 10px;
    }
  }

  & .global-tags {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    & p {
      font-size: 1px;
    }
  }

  & .cards-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 8px;
    margin: 10px 0;
    height: 100%;

    & .card {
      margin-bottom: 22px;
    }
  }

  & .button-create-all {
    // width: 100%;
    align-self: flex-end;
  }

  // .window-create-card {
  //   position: fixed;
  //   top: 0;
  //   left: 0;
  //   width: 100dvw;
  //   height: 100dvh;
  //   padding: 26px 100px 0;
  //   box-sizing: border-box;

  //   & .margin-left {
  //     margin-left: 10px;
  //   }

  //   & .title {
  //     font-size: 50px;
  //     font-weight: 100;
  //   }

  //   & .columns-selector {
  //     width: 300px;
  //   }

  //   & .margin-text {
  //     margin: 20px 10px 10px;
  //   }

  //   & .tags-list {
  //     width: 100%;
  //     box-sizing: border-box;
  //     border-radius: 60px;
  //     align-items: center;

  //     & .button-tag {
  //       height: 34px;
  //     }

  //     & .tag {
  //       margin: 6px;
  //     }
  //   }

  //   & .cards-list {
  //     width: 100%;
  //     height: 100%;
  //     overflow-y: auto;
  //     display: flex;
  //     flex-direction: column;
  //     align-items: center;
  //     background-color: red;

  //     & .column-cards {
  //       width: 0;
  //       flex-grow: 1;
  //       height: fit-content;
  //       padding-bottom: 200px;

  //       & .card-container {
  //         // background-color: v-bind('stylesPage.atualColor.border');
  //         padding: 5px;
  //         border-radius: 8px;
  //         margin: 5px;

  //         & .options {
  //           width: 100%;
  //           margin-top: 5px;

  //           & .button-margin {
  //             margin-right: 5px;
  //           }
  //         }
  //       }

  //       & .button-add {
  //         align-self: start;
  //         display: flex;
  //         align-items: center;
  //         justify-content: center;
  //         height: 80px;
  //         aspect-ratio: 1;
  //         // width: 100%;
  //         border-radius: 50%;
  //         background-color: rgba(124, 124, 124, 0.1);
  //         border: none;
  //         cursor: pointer;
  //       }
  //     }
  //   }
  // }
}
</style>
