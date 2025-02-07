<script setup lang="ts">
import { ref } from 'vue'
import FlexContainer from '../atoms/FlexContainer.vue'
import ThemeP from '../atoms/ThemeP.vue'
import CheckBoxBase from '../atoms/CheckBoxBase.vue'
import EraserIco from '../atoms/icons/EraserIco.vue'
import RadioBase from '../atoms/RadioBase.vue'
import type { Itag } from '@/stores/tags/Interfaces'
import ButtonSlot from '../molecules/ButtonSlot.vue'
import SendIco from '../atoms/icons/SendIco.vue'
import ButtonCoinSlot from '../molecules/ButtonCoinSlot.vue'
import SearchImput from '../molecules/SearchImput.vue'
import FloatModalSlot from '../atoms/FloatModalSlot.vue'
import FilterIco from '../atoms/icons/FilterIco.vue'
import ModalCard from '../atoms/ModalCard.vue'
import { useStylesPage } from '@/stores/stylesPage/stylesPage'
import TagView2 from '../molecules/TagView2.vue'
const stylesPage = useStylesPage()

const props = defineProps<{
  allTags: Itag[]
  includeTags: Itag[]
  excludeTags: Itag[]
  textFilterTags: string
}>()

const emit = defineEmits<{
  (e: 'emitFilter', v: { include: Itag[]; exclude: Itag[] }): void
  (e: 'clearFilter', v: null): void
  (e: 'searchTag', v: string): void
}>()

type FilterType = 'include' | 'exclude'

const include = ref<Itag[]>(props.includeTags)
const exclude = ref<Itag[]>(props.excludeTags)

const isChecked = (tag: Itag, type: FilterType) => {
  if (type === 'include') {
    return include.value.map((t) => t[1]).includes(tag[1])
  }

  if (type === 'exclude') {
    return exclude.value.map((t) => t[1]).includes(tag[1])
  }

  return false
}

const addTag = (tag: Itag, type: FilterType) => {
  if (type === 'include') {
    include.value = [...include.value, tag]
    exclude.value = exclude.value.filter((t) => t[1] !== tag[1])
  }

  if (type === 'exclude') {
    exclude.value = [...exclude.value, tag]
    include.value = include.value.filter((t) => t[1] !== tag[1])
  }
}

const removeTag = (tag: Itag, type: FilterType) => {
  if (type === 'include') {
    include.value = include.value.filter((t) => t[1] !== tag[1])
  }

  if (type === 'exclude') {
    exclude.value = exclude.value.filter((t) => t[1] !== tag[1])
  }
}

const handleAddOrRemove = (tag: Itag, type: FilterType) => {
  if (type === 'include') {
    if (isChecked(tag, 'include')) removeTag(tag, 'include')
    else addTag(tag, 'include')
  }

  if (type === 'exclude') {
    if (isChecked(tag, 'exclude')) removeTag(tag, 'exclude')
    else addTag(tag, 'exclude')
  }
}

const clear = () => {
  include.value = []
  exclude.value = []
}

type TagRouteOptions = 'Com tag' | 'Sem tag'

const useTagRoute = () => {
  const atualRoute = ref<TagRouteOptions>('Com tag')

  const is = (v: TagRouteOptions) => v === atualRoute.value

  const routes: TagRouteOptions[] = ['Com tag', 'Sem tag']

  const setRoute = (v: TagRouteOptions) => (atualRoute.value = v)

  return {
    atualRoute,
    routes,
    is,
    setRoute
  }
}

const tagRoute = useTagRoute()

const emitFilter = () => emit('emitFilter', { include: include.value, exclude: exclude.value })

const clearFilter = () => {
  clear()
  emit('clearFilter', null)
}
</script>

<template>
  <FloatModalSlot>
    <template #button-slot>
      <ButtonCoinSlot
        content="Filter"
        class="filter-button"
        background-color="transparent"
        :border="true"
        :circle="true"
      >
        <FilterIco />
      </ButtonCoinSlot>
    </template>

    <template #container-slot>
      <ModalCard class="modal-container" background-color="front">
        <SearchImput
          key-id="search-tag-filter"
          placeholder="Pesquisar tag"
          class="search"
          :init-content="props.textFilterTags"
          @emit-content="(v: string) => emit('searchTag', v)"
        />

        <FlexContainer class="top-container">
          <RadioBase
            v-for="(routeTag, i) in tagRoute.routes"
            radio-name="filter-tags"
            :key="i"
            :checked-value="tagRoute.atualRoute.value"
            :id="routeTag"
            class="radio-button"
            @select="tagRoute.setRoute(routeTag)"
          >
            <ThemeP :content="routeTag" />
          </RadioBase>
        </FlexContainer>

        <FlexContainer v-if="tagRoute.is('Com tag')" flex-wrap="wrap" class="tags-container">
          <CheckBoxBase
            v-for="(tag, i) in include.values"
            checkbox-name="include-tags"
            :key="i"
            :is-checked="isChecked(tag, 'include')"
            :id="tag[1]"
            :class="[isChecked(tag, 'include') && 'include', 'tag']"
            @select="() => handleAddOrRemove(tag, 'include')"
          >
            <TagView2 :tag="tag" />
          </CheckBoxBase>

          <CheckBoxBase
            v-for="(tag, i) in props.allTags"
            checkbox-name="include-tags"
            :key="i"
            :is-checked="isChecked(tag, 'include')"
            :id="tag[1]"
            :class="[isChecked(tag, 'include') && 'include', 'tag']"
            @select="() => handleAddOrRemove(tag, 'include')"
          >
            <TagView2 :tag="tag" />
          </CheckBoxBase>
        </FlexContainer>

        <FlexContainer v-if="tagRoute.is('Sem tag')" flex-wrap="wrap" class="tags-container">
          <CheckBoxBase
            v-for="(tag, i) in props.allTags"
            checkbox-name="include-tags"
            :key="i"
            :is-checked="isChecked(tag, 'exclude')"
            :id="tag[1]"
            :class="[isChecked(tag, 'exclude') && 'exclude', 'tag']"
            @select="() => handleAddOrRemove(tag, 'exclude')"
          >
            <TagView2 :tag="tag" />
          </CheckBoxBase>
        </FlexContainer>

        <FlexContainer class="buttons-container">
          <ButtonSlot content="Aplicar filtro" class="button-filter" @click="emitFilter">
            <SendIco />
          </ButtonSlot>

          <ButtonCoinSlot
            content="Limpar filtro"
            class="button-eraser"
            @click="clearFilter()"
            :circle="true"
            :border="true"
          >
            <EraserIco />
          </ButtonCoinSlot>
        </FlexContainer>
      </ModalCard>
    </template>
  </FloatModalSlot>
</template>

<style scoped lang="scss">
$border-radius: 100px;

.modal-container {
  width: 410px;
  max-width: 95dvh;
  max-height: 60dvh;
  display: flex;
  flex-direction: column;

  & .search {
    margin-bottom: 5px;
    border-radius: $border-radius;
  }

  & .radio-button {
    width: calc(30% - 4px);
    margin-right: 10px;
    margin-top: 5px;
    height: 36px;
    // margin: 4px 0;
    border-radius: $border-radius;
  }

  & .tags-container {
    height: 100%;
    overflow-y: auto;
    padding: 10px;
    // padding-top: 30px;
    // opacity: 20%;
    // animation: init 0.4s forwards;
    & .tag {
      border-radius: $border-radius;
      width: calc(33% - 4px);
      margin: 2px;
      border: solid 1px v-bind('stylesPage.atualColor.border');
    }

    & .include {
      border-color: rgb(86, 110, 86);
      background-color: rgba(86, 140, 86, 0.2);
    }

    & .exclude {
      border-color: rgb(110, 86, 86);
      background-color: rgb(140, 86, 86, 0.2);
    }
  }

  & .buttons-container {
    margin-top: 10px;

    & .button-filter {
      flex-shrink: 1;
      margin-right: 10px;
      border-radius: $border-radius;
      border: 1px solid v-bind('stylesPage.atualColor.border');
    }
  }
}

// .cards-filter-container {
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   overflow: hidden;

//   & .top-container {
//     width: 100%;
//   }

//   & .search {
//     margin-bottom: 5px;
//   }

//   & .tags-container {
//     height: 100%;
//     overflow-y: auto;

//     // & .check-button {
//     //   width: calc(33% - 4px);
//     //   margin: 2px;
//     // }

//     padding-top: 30px;
//     opacity: 20%;
//     animation: init 0.4s forwards;
//   }

//   & .buttons-container {
//     margin-top: 10px;
//     & .button-filter {
//       flex-shrink: 1;
//       margin-right: 10px;
//     }
//   }
// }

// @keyframes init {
//   to {
//     padding-top: 0;
//     opacity: 100%;
//   }
// }
</style>
