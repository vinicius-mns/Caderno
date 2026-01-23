<script setup lang="ts">
import { useCards } from '@/stores/cards/cards'
import type { Icard } from '@/stores/cards/Interfaces'
import { useTags } from '@/stores/tags/tags'
import { computed, onMounted, onUpdated, ref, watch, watchEffect } from 'vue'
import CardView from '../template/card/CardView.vue'
import { useStylesPage } from '@/stores/stylesPage/stylesPage'
import SearchImput from '../molecules/SearchImput.vue'
import ButtonCoinSlot from '../molecules/ButtonCoinSlot.vue'
import FilterIco from '../atoms/icons/FilterIco.vue'
import TagView2 from '../molecules/TagView2.vue'
import ButtonSlot from '../molecules/ButtonSlot.vue'
import ThemeH1 from '../atoms/ThemeH1.vue'
import RangeImput from '../molecules/RangeImput.vue'
import NewFloatModal from '../molecules/NewFloatModal.vue'
import { useFloatModal } from '@/stores/floatModal'

const stylesPage = useStylesPage()
const cards = useCards()
const tags = useTags()
const floatModal = useFloatModal()

const tagsFilterModalOpen = () => {
  floatModal.tagsFilter.open(null, document.getElementById('tags-filter-button')!)
}

const columns = ref(4)

const cardsInColumns = computed(() => {
  const cardsList = [...cards.cards].reverse()

  const cardInColumns = Array.from({ length: columns.value }, () => []) as Icard[][]

  for (let i = 0; i < cardsList.length; i += 1) {
    const indexColumn = i % columns.value
    cardInColumns[indexColumn].push(cardsList[i])
  }

  return cardInColumns
})

const setColumns = (value: number) => {
  columns.value = value
}

onMounted(async () => {
  await tags.init()

  await cards.atualizeReactiveCards({
    includeTags: tags.includeTags,
    excludeTags: tags.excludeTags
  })

  if (window.innerWidth <= 768) {
    columns.value = 1
  }
})
</script>

<template>
  <div class="cards-page-container">
    <header class="header-cards">
      <ThemeH1 content="Cards" />

      <SearchImput class="search" placeholder="pesquisar" key-id="search-card" />

      <RangeImput
        class="columns-cards"
        :title="{ content: 'Colunas', visible: true }"
        :init-value="columns"
        :limit="{ min: 1, max: 6 }"
        @emit-value="setColumns"
      />
    </header>

    <div class="current-filter">
      <ButtonSlot
        content="Filtro"
        border-radius="50px"
        id="tags-filter-button"
        :invert-color="true"
        @click="tagsFilterModalOpen"
      >
        <FilterIco />
      </ButtonSlot>
      <!-- <NewFloatModal>
        <template #button-slot>
        </template>

        <template #container-slot>
          <div class="red"></div>
        </template>
      </NewFloatModal> -->

      <TagView2
        class="tag"
        v-for="(tag, i) in tags.includeTags"
        :key="i"
        :tag="tag"
        type="include"
      />

      <TagView2
        class="tag"
        v-for="(tag, i) in tags.excludeTags"
        :key="i"
        :tag="tag"
        type="exclude"
      />
    </div>

    <div class="cards-container">
      <div class="column" v-for="(column, i) in cardsInColumns" :key="i">
        <!-- <div class="fake-card" v-for="(card, ii) in column" :key="ii" /> -->
        <CardView class="card" v-for="(card, ii) in column" :key="ii" :card="card" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.cards-page-container {
  $gap: 14px;
  background-color: v-bind('stylesPage.atualColor.front');
  width: 100dvw;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  // overflow-y: auto;
  // overflow-x: hidden;

  & .header-cards {
    width: calc(100% - 210px);
    min-height: 40px;
    padding: 20px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;

    & h1 {
      width: 300px;
      text-align: center;
    }

    & .search {
      width: 300px;
      height: 40px;
    }

    & .columns-cards {
      width: 300px;
    }

    @media screen and (max-width: 768px) {
      justify-content: center;

      & h1,
      .columns-cards {
        display: none;
      }
    }
  }

  & .current-filter {
    width: calc(100% - 200px);
    padding: 10px 0;
    box-sizing: border-box;
    display: flex;
    overflow: hidden;
    align-items: center;
    gap: 8px;

    & .red {
      width: 400px;
      height: 500px;
      background-color: red;
    }

    @media screen and (max-width: 768px) {
      width: calc(100% - 40px);
    }
  }

  & .cards-container {
    width: 100%;
    height: 100%;
    padding: 20px 110px 200px;
    box-sizing: border-box;
    display: flex;
    gap: $gap;
    overflow: auto;

    & .column {
      width: calc(100% / v-bind('columns'));
      height: max-content;
      display: flex;
      flex-direction: column;
      gap: $gap;

      & .card {
        width: 100%;
        flex-shrink: 1;
      }
    }

    @media screen and (max-width: 768px) {
      padding: 20px 20px 200px;
    }
  }
}
</style>
