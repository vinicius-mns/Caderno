<script setup lang="ts">
import { computed, onUpdated, reactive } from 'vue'
import { useTags } from '@/stores/tags/tags'
import WindowsSlot from '@/components/molecules/WindowsSlot.vue'
import { useWindows } from '@/stores/windows'
import FlexContainer from '@/components/atoms/FlexContainer.vue'
import ButtonSlot from '@/components/molecules/ButtonSlot.vue'
import type { Itag } from '@/stores/tags/Interfaces'
import SearchImput from '@/components/molecules/SearchImput.vue'
import TagView2 from '@/components/molecules/TagView2.vue'
import SendIco from '@/components/atoms/icons/SendIco.vue'
import ButtonCoinSlot from '@/components/molecules/ButtonCoinSlot.vue'
import EraserIco from '@/components/atoms/icons/EraserIco.vue'
import SaveIco from '@/components/atoms/icons/SaveIco.vue'
import UploadIco from '@/components/atoms/icons/UploadIco.vue'
import PencilIco from '@/components/atoms/icons/PencilIco.vue'
import { useCardsTags } from '@/stores/cardsTags'

const window = useWindows()

const cardsTags = useCardsTags()

const tags = useTags()

interface IFilterTag {
  tag: Itag
  type: 'include' | 'exclude' | 'none'
}

// renderizacao das tags

const filterTags = reactive({
  includeTags: [] as Itag[],
  excludeTags: [] as Itag[]
})

const includetagsSetNames = computed(() => new Set(tags.getNames(filterTags.includeTags)))
const excluTagsSetNames = computed(() => new Set(tags.getNames(filterTags.excludeTags)))

const allTags = computed<IFilterTag[]>(() => {
  return tags.tags.map((tag) => {
    const tagName = tag[1]

    if (includetagsSetNames.value.has(tagName)) return { tag, type: 'include' }
    if (excluTagsSetNames.value.has(tagName)) return { tag, type: 'exclude' }
    return { tag, type: 'none' }
  })
})

// lidando com manipulacao do filtro

const handleTagsFilter = (
  tag: Itag,
  type: 'includeTags' | 'excludeTags',
  action: 'add' | 'remove'
) => {
  const execute = {
    add: (tag: Itag) => {
      filterTags[type] = [...filterTags[type], tag]
    },
    remove: (tag: Itag) => {
      filterTags[type] = filterTags[type].filter((t) => t[1] !== tag[1])
    }
  }

  return execute[action](tag)
}

const clickOnTag = (tagF: IFilterTag) => {
  switch (tagF.type) {
    case 'none':
      handleTagsFilter(tagF.tag, 'includeTags', 'add')
      break
    case 'include':
      handleTagsFilter(tagF.tag, 'includeTags', 'remove')
      handleTagsFilter(tagF.tag, 'excludeTags', 'add')
      break
    case 'exclude':
      handleTagsFilter(tagF.tag, 'excludeTags', 'remove')
      break
  }
}

const clearFilter = () => {
  filterTags.includeTags = []
  filterTags.excludeTags = []
}

// indicador de alteracoes

const blinkButton = computed(() => {
  const atualFilter = JSON.stringify({
    includeTags: filterTags.includeTags,
    excludeTags: filterTags.excludeTags
  })

  const dbFilter = JSON.stringify({
    includeTags: tags.includeTags,
    excludeTags: tags.excludeTags
  })

  return atualFilter !== dbFilter
})

// enviando filtro

const sendFilter = () => {
  cardsTags.tag.filterCard.set(filterTags)
}

onUpdated(() => {
  filterTags.includeTags = tags.includeTags
  filterTags.excludeTags = tags.excludeTags
})
</script>

<template>
  <WindowsSlot
    v-if="window.filterCardsByTags.show"
    :title="window.filterCardsByTags.title"
    @close="window.filterCardsByTags.close"
  >
    <FlexContainer class="tags-windows-container" flex-direction="column">
      <FlexContainer class="controls" flex-direction="row" align-items="center">
        <SearchImput
          class="search-tags-filter"
          placeholder="Pesquisar tag"
          key-id="search-tag"
          @emit-content="tags.readAllTags"
        />

        <ButtonSlot
          @click="window.tagCreate.open(null)"
          content="Criar tag"
          :invert-color="true"
          class="button-create-tag"
          border-radius="50px"
        >
          <PencilIco />
        </ButtonSlot>
      </FlexContainer>

      <FlexContainer class="main-tags" flex-wrap="wrap" align-items="center">
        <TagView2
          v-for="(tag, i) in allTags"
          :key="i"
          :tag="tag.tag"
          :type="tag.type"
          class="tag-windows"
          @click="clickOnTag(tag)"
        />
      </FlexContainer>

      <FlexContainer class="footer" justify-content="end">
        <ButtonCoinSlot
          content="Salvar filtro"
          @click="() => {}"
          background-color="front"
          class="button-margin"
        >
          <SaveIco />
        </ButtonCoinSlot>

        <ButtonCoinSlot
          content="Carregar"
          @click="() => {}"
          background-color="front"
          class="button-margin"
        >
          <UploadIco />
        </ButtonCoinSlot>

        <div class="button-margin" />

        <ButtonCoinSlot
          content="Limpar filtro"
          @click="clearFilter()"
          background-color="front"
          class="button-margin"
        >
          <EraserIco />
        </ButtonCoinSlot>

        <ButtonSlot
          content="Aplicar filtro"
          class="button-filter"
          border-radius="50px"
          :blink="blinkButton"
          @click="sendFilter"
        >
          <SendIco />
        </ButtonSlot>
      </FlexContainer>
    </FlexContainer>
  </WindowsSlot>
</template>

<style scoped lang="scss">
.tags-windows-container {
  width: 95dvw;
  max-width: 644px;
  max-height: 68dvh;
  box-sizing: border-box;
  padding: 0 15px;
  overflow: hidden;

  & .main-tags {
    box-sizing: border-box;
    overflow-y: auto;

    & .tag-windows {
      margin: 2px;
      flex-grow: 1;
      width: 116px;
    }
  }

  & .controls {
    width: 100%;
    padding: 0 2px;
    box-sizing: border-box;
    margin-bottom: 8px;
    // margin: 0 0 8px 2px;

    & .search-tags-filter {
      width: 300px;
      width: 100%;
      flex-shrink: 1;
    }

    & .button-create-tag {
      margin-left: 6px;
      padding: 0 8px;
    }
  }

  & .footer {
    margin: 15px 0;

    width: 100%;

    & .button-margin {
      margin-right: 6px;
    }

    & .button-filter {
      width: auto;
      padding: 0 8px;
    }
  }
}
</style>
