<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import FlexContainer from '../atoms/FlexContainer.vue'
import CheckBoxBase from '../atoms/CheckBoxBase.vue'
import TagView from '../molecules/xTagView.vue'
import type { Itag } from '@/stores/tags/Interfaces'
import ButtonCoinSlot from '../molecules/ButtonCoinSlot.vue'
import SearchImput from '../molecules/SearchImput.vue'
import { useStylesPage } from '@/stores/stylesPage/stylesPage'
import FilterIco from '../atoms/icons/FilterIco.vue'
import TagIco from '../atoms/icons/TagIco.vue'

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

const useTags = () => {
  const _reativeTags = () => {
    const tags = ref<Itag[]>([])

    const set = (newTags: Itag[]) => (tags.value = newTags)

    return { tags, set }
  }

  const include = _reativeTags()
  const exclude = _reativeTags()
  const remainingTags = _reativeTags()

  const _getTagName = (tag: Itag) => tag[1]

  // const _getReminingTags = (param: {
  //   allTags: Itag[]
  //   includeTags: Itag[]
  //   excludeTags: Itag[]
  // }) => {
  //   const lastTags = param.allTags.map((tag) => {
  //     if (!includes({ tags: param.includeTags, tag })) return tag
  //     if (!includes({ tags: param.excludeTags, tag })) return tag
  //   }) as Itag[]

  //   return [...param.includeTags, ...param.excludeTags, ...lastTags]
  // }

  const includes = (param: { tags: Itag[]; tag: Itag }) => {
    return param.tags.map(_getTagName).includes(_getTagName(param.tag))
  }

  const handleAddOrRemove = (tag: Itag) => {
    const isInclude = includes({ tags: include.tags.value, tag })

    const isExclude = includes({ tags: exclude.tags.value, tag })

    const updateRemainingTags = () => {
      const remove = remainingTags.tags.value.filter(
        (t) =>
          !include.tags.value.some((tt) => tt[1] === t[1]) &&
          !exclude.tags.value.some((tt) => tt[1] === t[1])
      )

      setTimeout(() => {
        remainingTags.set([...include.tags.value, ...exclude.tags.value, ...remove])
      }, 0)
    }

    // const addRemainingTags = () => {
    //   remainingTags.set([tag, ...remainingTags.tags.value])
    // }

    const addInclude = () => {
      include.set([...include.tags.value, tag])
      exclude.set(exclude.tags.value.filter((t) => _getTagName(t) !== _getTagName(tag)))
      updateRemainingTags()
    }

    const addExclude = () => {
      exclude.set([...exclude.tags.value, tag])
      include.set(include.tags.value.filter((t) => _getTagName(t) !== _getTagName(tag)))
      updateRemainingTags()
    }

    const removeAll = () => {
      include.set(include.tags.value.filter((t) => _getTagName(t) !== _getTagName(tag)))
      exclude.set(exclude.tags.value.filter((t) => _getTagName(t) !== _getTagName(tag)))
      // addRemainingTags()
    }

    if (!isInclude && !isExclude) addInclude()
    else if (isInclude) addExclude()
    else if (isExclude) removeAll()
  }

  return {
    include,
    exclude,
    remainingTags,
    handleAddOrRemove,
    includes
  }
}

const useSlot = () => {
  const showSlot = ref(false)

  const openSlot = () => (showSlot.value = true)

  const closeSlot = () => (showSlot.value = false)

  return {
    showSlot,
    openSlot,
    closeSlot
  }
}

const slot = useSlot()

const tags = useTags()

const allTags = computed(() => props.allTags)

watch(
  allTags,
  () => {
    tags.remainingTags.set(allTags.value)
  },
  { deep: true }
)
</script>

<template>
  <FlexContainer flex-direction="column" class="cards-filter-container">
    <SearchImput
      key-id="search-tag-filter"
      placeholder="Pesquisar tag"
      class="search"
      :init-content="props.textFilterTags"
      @emit-content="(v: string) => emit('searchTag', v)"
    />

    <FlexContainer class="tag-or-filter-container">
      <!-- <RadioBase
        v-for="(route, i) in tagRoute.routes"
        radio-name="tag-or-filter"
        :key="i"
        :checked-value="tagRoute.atualRoute.value"
        :id="route"
        class="tag-or-filter"
        @select="() => tagRoute.setRoute(route)"
      >
        <ThemeP :content="route" />
      </RadioBase> -->
      <ButtonCoinSlot content="Tags" :circle="true" background-color="transparent" :border="true">
        <TagIco />
      </ButtonCoinSlot>

      <ButtonCoinSlot content="Filter" :circle="true" background-color="transparent" :border="true">
        <FilterIco />
      </ButtonCoinSlot>
    </FlexContainer>

    <FlexContainer class="tags-container" flex-direction="column">
      <FlexContainer class="tag-option-container" flex-direction="column">
        <FlexContainer flex-wrap="wrap">
          <!-- <CheckBoxBase
            v-for="(tag, i) in tags.include.tags.value"
            checkbox-name="include-tags"
            :key="i"
            :is-checked="true"
            :id="tag[1]"
            class="tag-check-button include"
            @select="() => tags.handleAddOrRemove(tag)"
          >
            <TagView :tag="tag" class="tag" />
          </CheckBoxBase> -->

          <!-- <CheckBoxBase
            v-for="(tag, i) in tags.exclude.tags.value"
            checkbox-name="exclude-tags"
            :key="i"
            :is-checked="true"
            :id="tag[1]"
            class="tag-check-button exclude"
            @select="() => tags.handleAddOrRemove(tag)"
          >
            <TagView :tag="tag" class="tag" />
          </CheckBoxBase> -->

          <CheckBoxBase
            v-for="(tag, i) in tags.remainingTags.tags.value"
            checkbox-name="remaining-tags"
            :key="i"
            :is-checked="false"
            :id="tag[1]"
            :class="[
              tags.includes({ tags: tags.include.tags.value, tag }) && 'include',
              tags.includes({ tags: tags.exclude.tags.value, tag }) && 'exclude',
              'tag-check-button'
            ]"
            @select="() => tags.handleAddOrRemove(tag)"
            @mouseenter="slot.openSlot()"
            @mouseleave="slot.closeSlot()"
          >
            <TagView :tag="tag" class="tag" />
            <div v-if="slot.showSlot.value">
              <slot></slot>
            </div>
          </CheckBoxBase>

          <!-- <FloatModalSlot>
            <template #button-slot>
              <ButtonCoinSlot content="Mais">
                <PlusIco />
              </ButtonCoinSlot>
            </template>

            <template #container-slot>
              <slot></slot>
            </template>
          </FloatModalSlot> -->
        </FlexContainer>
      </FlexContainer>
    </FlexContainer>
  </FlexContainer>
</template>

<style scoped lang="scss">
.cards-filter-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: auto;

  & .top-container {
    width: 100%;
  }

  & .search {
    margin-bottom: 5px;
  }

  & .tag-or-filter-container {
    width: 65%;

    & .tag-or-filter {
      width: calc(50% - 4px);
      height: 34px;
      border-radius: 100px;
    }
  }

  & .tags-container {
    overflow: auto;

    & hr {
      width: 0;
      margin: 10px 0;
    }

    & .tag-option-container {
      width: 100%;
      padding: 8px;
      box-sizing: border-box;

      & .title {
        margin: 0px 12px 4px;
        font-size: 20px;
      }

      & .tag-check-button {
        width: calc(33% - 8px);
        margin: 4px;
        border: solid 1px v-bind('stylesPage.atualColor.border');
        background-color: transparent;
        border-radius: 100px;
        height: 32px;
      }

      & .include {
        border-color: rgb(86, 110, 86);
        background-color: rgba(86, 140, 86, 0.2);
      }

      & .exclude {
        border-color: rgb(110, 86, 86);
        background-color: rgb(140, 86, 86, 0.2);
      }

      & .tag {
        height: 32px;
        transition: all 0.3s;

        &:hover {
          position: relative;

          // &::after {
          //   content: 'remover';
          //   position: absolute;
          //   height: 100%;
          //   width: 100%;
          //   display: flex;
          //   align-items: center;
          //   justify-content: center;
          //   background-color: rgb(90, 48, 48);
          //   color: rgb(218, 27, 27);
          //   border: solid 1px rgb(218, 27, 27);
          //   border-radius: 100px;
          // }
        }
      }

      & .add-tag-button {
        width: auto;
      }
    }
  }

  // & .bottom-container {
  //   height: 100%;
  //   overflow-y: auto;

  //   & .check-button {
  //     width: calc(33% - 4px);
  //     margin: 2px;
  //   }

  //   padding-top: 30px;
  //   opacity: 20%;
  //   animation: init 0.4s forwards;
  // }

  // & .buttons-container {
  //   margin-top: 10px;
  //   & .button-filter {
  //     flex-shrink: 1;
  //     margin-right: 10px;
  //   }
  // }
}

// @keyframes init {
//   to {
//     padding-top: 0;
//     opacity: 100%;
//   }
// }
</style>
