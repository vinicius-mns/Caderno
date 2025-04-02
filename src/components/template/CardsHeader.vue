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

const cardTags = useCardsTags()
const tags = useTags()
const stylesPage = useStylesPage()
const windows = useWindows()

const filter = computed(() => {
  const on = tags.includeTags.length > 0 || tags.excludeTags.length > 0
  const both = tags.includeTags.length > 0 && tags.excludeTags.length > 0
  return { on, both }
})
</script>

<template>
  <FlexContainer
    class="cards-header-container"
    align-items="center"
    flex-direction="column"
    justify-content="center"
  >
    <FlexContainer class="top-header" align-items="center" justify-content="center">
      <FlexContainer>
        <ButtonSlot
          content="Criar Tag"
          class="button-create-tag"
          border-radius="50px"
          @click="() => windows.tagCreate.open(null)"
          :invert-color="true"
        >
          <TagIco />
        </ButtonSlot>
      </FlexContainer>

      <SearchImput class="search" placeholder="pesquisar" key-id="search-card" />

      <FlexContainer> </FlexContainer>
    </FlexContainer>

    <!-- <FlexContainer class="bottom-header" align-items="center">
    </FlexContainer> -->

    <!-- <ModalCard class="filter-view" :box-shadow="true" v-show="filter.on">
      <TagsFilterContainer
        :all-tags="tags.tags"
        :include-tags="tags.includeTags"
        :exclude-tags="tags.excludeTags"
        :text-filter-tags="tags.textFilterTags"
        @open-create-tag="windows.tagCreate.open(null)"
        @filter-emitted="cardTags.tag.filterCard.set"
        @search-tag="tags.readAllTags"
      >
        <FlexContainer align-items="center">
          <FlexContainer>
            <TagView2
              v-for="(tag, i) in tags.includeTags"
              type="include"
              class="tag"
              height="26px"
              :tag="tag"
              :content="tag[1]"
              :key="i"
              :mini="true"
            />
          </FlexContainer>

          <div class="line" v-show="filter.both"></div>

          <FlexContainer>
            <TagView2
              v-for="(tag, i) in tags.excludeTags"
              type="exclude"
              class="tag"
              height="26px"
              :tag="tag"
              :content="tag[1]"
              :key="i"
              :mini="true"
            />
          </FlexContainer>
        </FlexContainer>
      </TagsFilterContainer>
    </ModalCard> -->
  </FlexContainer>
</template>

<style scoped lang="scss">
.cards-header-container {
  background-color: v-bind('stylesPage.atualColor.front');
  // background-color: red;
  position: fixed;
  top: 0;
  left: 0;
  height: 50px;
  width: 100dvw;

  & .search {
    width: 400px;
    margin: 0 8px;
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
