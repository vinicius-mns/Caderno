<script setup lang="ts">
import { useTags } from '@/stores/tags/tags'
import FlexContainer from '../atoms/FlexContainer.vue'
import ThemeButton from '../atoms/ThemeButton.vue'
import SearchImput from '../molecules/SearchImput.vue'
import TagsFiltredsList from '../organisms/TagsFiltredsList.vue'
import { useStylesPage } from '@/stores/stylesPage/stylesPage'
import TagsFilterCards from '../organisms/TagsFilterCards.vue'
import TagsFilter from '../organisms/TagsFilter.vue'
import TagFilter from '../organisms/TagFilter.vue'
import type { Itag } from '@/stores/tags/Interfaces'
import { computed } from 'vue'
import { useCards } from '@/stores/cards/cards'
import FloatModalSlot from '../atoms/FloatModalSlot.vue'
import ButtonCoinSlot from '../molecules/ButtonCoinSlot.vue'
import PlusIco from '../atoms/icons/PlusIco.vue'
import TagOptions from '../organisms/TagOptions.vue'
import { useWindows } from '@/stores/windows'
import ButtonSlot from '../molecules/ButtonSlot.vue'
import TagIco from '../atoms/icons/TagIco.vue'
import EraserIco from '../atoms/icons/EraserIco.vue'
import CheckIco from '../atoms/icons/CheckIco.vue'
import type { Icard } from '@/stores/cards/Interfaces'

const stylesPage = useStylesPage()

const tags = useTags()

const cards = useCards()

const windows = useWindows()

const cardEmpty: Icard = {
  id: '',
  content: '',
  date: new Date(),
  tags: []
}

const remainingTags = computed(() => {
  const includedTagNames = new Set(tags.includeTags.map((t) => t[1]))
  const excludedTagNames = new Set(tags.excludeTags.map((t) => t[1]))

  const remaining = tags.tags.filter(
    (tag) => !includedTagNames.has(tag[1]) && !excludedTagNames.has(tag[1])
  )

  const mergeType = (tag: Itag, type: 'include' | 'exclude' | 'none') => {
    return { tag, type }
  }

  const includeAndType = tags.includeTags.map((tag) => mergeType(tag, 'include'))
  const excludeAndType = tags.excludeTags.map((tag) => mergeType(tag, 'exclude'))
  const noneAndType = remaining.map((tag) => mergeType(tag, 'none'))

  return [...includeAndType, ...excludeAndType, ...noneAndType]
})

const setTagsFilter = async (v: { tag: Itag; type: string }) => {
  const _tags = {
    include: tags.includeTags,
    exclude: tags.excludeTags,
    add: (type: 'include' | 'exclude', t: Itag) => {
      _tags[type] = [t, ..._tags[type]]
    },
    remove: (type: 'include' | 'exclude', t: Itag) => {
      _tags[type] = _tags[type].filter((tag) => tag[1] !== t[1])
    }
  }

  if (v.type === 'include') {
    _tags.add('include', v.tag)
    _tags.remove('exclude', v.tag)
  }

  if (v.type === 'exclude') {
    _tags.add('exclude', v.tag)
    _tags.remove('include', v.tag)
  }

  if (v.type === 'none') {
    _tags.remove('exclude', v.tag)
    _tags.remove('include', v.tag)
  }

  await tags.setFilter({
    includeTags: _tags.include,
    excludeTags: _tags.exclude
  })

  await cards.atualizeReactiveCards({
    includeTags: _tags.include,
    excludeTags: _tags.exclude
  })
}
</script>

<template>
  <FlexContainer class="cards-side-container" flex-direction="column" align-items="center">
    <hr />

    <ButtonSlot
      content="Criar card"
      class="button-create-card button-g"
      @click="() => windows.cardCreate.open(cardEmpty)"
    >
      <PlusIco />
    </ButtonSlot>

    <!-- <hr /> -->

    <ButtonSlot
      content="Criar Tag"
      class="button-create-tag button-g"
      @click="() => windows.tagCreate.open(null)"
    >
      <TagIco />
    </ButtonSlot>

    <FlexContainer class="tags-header" justify-content="end">
      <SearchImput class="search-tag" placeholder="Pesquisar tag" key-id="search-tag" />

      <ButtonSlot content="Aplicar filtro" class="button-filter" :border="true">
        <CheckIco />
      </ButtonSlot>

      <ButtonCoinSlot content="Limpar filtros" :circle="true" :border="true">
        <EraserIco />
      </ButtonCoinSlot>
    </FlexContainer>

    <FlexContainer class="tags-list" flex-wrap="wrap">
      <TagFilter
        v-for="(tag, i) in remainingTags"
        class="tag"
        :key="i"
        :tag="tag.tag"
        :type="tag.type"
        @emit-tag-type="setTagsFilter"
      >
        <FloatModalSlot>
          <template #button-slot>
            <ButtonCoinSlot content="Mais" :border="true" :circle="true" size="30px">
              <PlusIco />
            </ButtonCoinSlot>
          </template>

          <template #container-slot>
            <TagOptions
              :tag="tag.tag"
              @open-update-tag="windows.tagEditor.open"
              @open-delete-tag="windows.tagDelete.open"
            />
          </template>
        </FloatModalSlot>
      </TagFilter>
    </FlexContainer>

    <!-- <TagsFilterCards
      :all-tags="tags.tags"
      :include-tags="tags.includeTags"
      :exclude-tags="tags.excludeTags"
      :text-filter-tags="tags.textFilterTags"
    >
      <button>xx</button>
    </TagsFilterCards> -->
  </FlexContainer>
</template>

<style scoped lang="scss">
.cards-side-container {
  width: 100%;
  height: 100%;
  padding: 15px;
  box-sizing: border-box;

  & .button-g {
    border-radius: 32px;
    background-color: v-bind('stylesPage.atualColor.front');
    border: solid 1px rgba(119, 211, 206, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  & .button-create-card {
    height: 80px;
    width: 100%;
    border-radius: 10px;
  }

  & .button-create-tag {
    // height: 50px;
    width: 100%;
    margin: 10px 0;
  }

  & .tags-header {
    width: 100%;
    margin: 10px 0;

    & .search-tag {
      border-radius: 100px;
      width: 100%;
      flex-shrink: 1;
      margin-right: 5px;
    }

    & .button-filter {
      width: auto;
      border-radius: 100px;
      margin-right: 5px;
    }
  }

  & .tags-list {
    width: 100%;
    box-sizing: border-box;
    // padding-top: 10px;
    // padding-left: 20px;

    & .tag {
      width: 100%;
      margin: 2px;
      width: calc(33.3% - 4px);
    }
  }
}
</style>
