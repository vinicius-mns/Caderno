<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useTags } from '@/stores/tags/tags'
import { useCards } from '@/stores/cards/cards'
import WindowsSlot from '@/components/molecules/WindowsSlot.vue'
import { useWindows } from '@/stores/windows'
import FlexContainer from '@/components/atoms/FlexContainer.vue'
import ButtonSlot from '@/components/molecules/ButtonSlot.vue'
import type { Itag } from '@/stores/tags/Interfaces'
import SearchImput from '@/components/molecules/SearchImput.vue'
import TagView2 from '@/components/molecules/TagView2.vue'
import TagOptions from '@/components/organisms/TagOptions.vue'
import SendIco from '@/components/atoms/icons/SendIco.vue'
import ButtonCoinSlot from '@/components/molecules/ButtonCoinSlot.vue'
import EraserIco from '@/components/atoms/icons/EraserIco.vue'
import SaveIco from '@/components/atoms/icons/SaveIco.vue'
import UploadIco from '@/components/atoms/icons/UploadIco.vue'
import PlusIco from '@/components/atoms/icons/PlusIco.vue'
import PencilIco from '@/components/atoms/icons/PencilIco.vue'

const window = useWindows()

const cards = useCards()

const tags = useTags()

const allTags = computed(() => tags.tags)

const includeTags = computed(() => tags.includeTags)

const excludeTags = computed(() => tags.excludeTags)

interface IFilterTag {
  tag: Itag
  type: 'include' | 'exclude' | 'none'
}

const useTagsFilter = () => {
  const tagsFilter = ref<IFilterTag[]>([])

  const update = (tags: Itag[], include: Itag[], exclude: Itag[]) => {
    const includeSet = new Set(include.map((tag) => tag[1]))
    const excludeSet = new Set(exclude.map((tag) => tag[1]))

    const tagsObj: { include: IFilterTag[]; exclude: IFilterTag[]; none: IFilterTag[] } = {
      include: [],
      exclude: [],
      none: []
    }

    for (const tag of tags) {
      if (includeSet.has(tag[1])) tagsObj.include.push({ tag, type: 'include' })
      else if (excludeSet.has(tag[1])) tagsObj.exclude.push({ tag, type: 'exclude' })
      else tagsObj.none.push({ tag, type: 'none' })
    }

    tagsFilter.value = [...tagsObj.include, ...tagsObj.exclude, ...tagsObj.none]
  }

  const clear = () => {
    tagsFilter.value = tagsFilter.value.map((tag) => ({ ...tag, type: 'none' }))
  }

  const sendTags = () => {
    const include = tagsFilter.value.filter((tag) => tag.type === 'include').map((tag) => tag.tag)
    const exclude = tagsFilter.value.filter((tag) => tag.type === 'exclude').map((tag) => tag.tag)

    return { include, exclude }
  }

  const _defineType = (tagF: IFilterTag): IFilterTag => {
    const { tag, type } = tagF

    if (type === 'include') return { tag, type: 'exclude' }
    if (type === 'exclude') return { tag, type: 'none' }
    return { tag, type: 'include' }
  }

  const _atualizeTag = (tagF: IFilterTag) => {
    tagsFilter.value = tagsFilter.value.map((t) => {
      if (t.tag[1] === tagF.tag[1]) return tagF
      return t
    })
  }

  const clickOnTagFilter = (tagF: IFilterTag) => {
    const newtagF = _defineType(tagF)
    _atualizeTag(newtagF)
  }

  return {
    tags: tagsFilter,
    update,
    clear,
    clickOnTagFilter,
    sendTags
  }
}

const tagsFilter = useTagsFilter()

const sendFilter = async () => {
  const { include, exclude } = tagsFilter.sendTags()

  await tags.setFilter({
    includeTags: include,
    excludeTags: exclude
  })

  await cards.atualizeReactiveCards({
    includeTags: include,
    excludeTags: exclude
  })
}

watch([allTags, includeTags, excludeTags], () => {
  tagsFilter.update(allTags.value, includeTags.value, excludeTags.value)
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
          v-for="(tagObj, i) in tagsFilter.tags.value"
          :key="i"
          :tag="tagObj.tag"
          :type="tagObj.type"
          class="tag-windows"
          @click="tagsFilter.clickOnTagFilter(tagObj)"
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
          @click="tagsFilter.clear()"
          background-color="front"
          class="button-margin"
        >
          <EraserIco />
        </ButtonCoinSlot>

        <ButtonSlot
          content="Aplicar filtro"
          class="button-filter"
          border-radius="50px"
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
