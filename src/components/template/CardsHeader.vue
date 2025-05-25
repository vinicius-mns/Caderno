<script setup lang="ts">
import { useWindows } from '@/stores/windows'
import FlexContainer from '../atoms/FlexContainer.vue'
import TagIco from '../atoms/icons/TagIco.vue'
import ButtonSlot from '../molecules/ButtonSlot.vue'
import SearchImput from '../molecules/SearchImput.vue'
import { useStylesPage } from '@/stores/stylesPage/stylesPage'
import { useTags } from '@/stores/tags/tags'
import { useCardsTags } from '@/stores/cardsTags'
import ModalCard from '../atoms/ModalCard.vue'
import TagsFilterContainer from '../organisms/TagsFilter.vue'
import { computed } from 'vue'
import TagView2 from '../molecules/TagView2.vue'
import RangeImput from '../molecules/RangeImput.vue'
import ThemeH1 from '../atoms/ThemeH1.vue'
import ButtonCoinSlot from '../molecules/ButtonCoinSlot.vue'
import GearIco from '../atoms/icons/GearIco.vue'

const cardTags = useCardsTags()
const tags = useTags()
const stylesPage = useStylesPage()
const windows = useWindows()

const filter = computed(() => {
  const on = tags.includeTags.length > 0 || tags.excludeTags.length > 0
  const both = tags.includeTags.length > 0 && tags.excludeTags.length > 0
  return { on, both }
})

const columns = 3
</script>

<template>
  <FlexContainer class="cards-header-container" justify-content="space-between">
    <div class="item">
      <ThemeH1 content="Logo foda" />
    </div>

    <div class="item">
      <SearchImput class="search" placeholder="pesquisar" key-id="search-card" />
    </div>

    <div class="item">
      <RangeImput
        class="columns-cards-imput"
        :title="{ content: 'Colunas', visible: true }"
        :init-value="columns"
        :limit="{ min: 1, max: 6 }"
        @emit-value="() => {}"
      />

      <ButtonCoinSlot content="configurações">
        <GearIco />
      </ButtonCoinSlot>
    </div>
  </FlexContainer>
</template>

<style scoped lang="scss">
.cards-header-container {
  background-color: v-bind('stylesPage.atualColor.front');
  // background-color: red;
  position: fixed;
  top: 0;
  left: 0;
  height: 52px;
  width: 100%;
  padding: 0 88px;
  box-sizing: border-box;

  .item {
    width: 300px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    & .search {
      width: 400px;
      justify-self: center;
      // margin: 0 8px;
    }

    & .columns-cards-imput {
      width: 100%;
      margin-right: 18px;
    }
  }

  & .filter-view {
    cursor: pointer;
    padding: 4px;
    border-radius: 100px;
    margin-bottom: 4px;

    & .tag {
      margin: 0 2px;
    }

    & .line {
      background-color: v-bind('stylesPage.atualColor.text');
      opacity: 60%;
      width: 1px;
      border-radius: 10px;
      margin: 0 2px;
      height: 22px;
    }

    & .title {
      margin-left: 4px;
    }
  }
}
</style>
