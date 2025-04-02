<!-- <script setup lang="ts">
import { computed, onMounted, onUpdated, reactive } from 'vue'
import FlexContainer from '@/components/atoms/FlexContainer.vue'
import type { Itag } from '@/stores/tags/Interfaces'
import TagView2 from '../molecules/TagView2.vue'
import ButtonSlot from './ButtonSlot.vue'
import CheckIco from '../atoms/icons/CheckIco.vue'

const props = defineProps<{
  tags: Itag[]
  includeTags: Itag[]
  excludeTags: Itag[]
}>()

const emit = defineEmits<{
  (e: 'filterEmitted', v: { includeTags: Itag[]; excludeTags: Itag[] }): void
}>()

// renderizacao das tags

interface IFilterTag {
  tag: Itag
  type: 'include' | 'exclude' | 'none'
}

const tagsFiltred = reactive({
  includeTags: [] as Itag[],
  excludeTags: [] as Itag[]
})

const tagsClassify = computed<IFilterTag[]>(() => {
  return props.tags.map((tag) => {
    const tagName = tag[1]

    if (includetagsSetNames.value.has(tagName)) return { tag, type: 'include' }
    if (excluTagsSetNames.value.has(tagName)) return { tag, type: 'exclude' }
    return { tag, type: 'none' }
  })
})

// lidando com manipulacao do filtro

const updatetagsFiltred = (includeTags: Itag[], excludeTags: Itag[]) => {
  tagsFiltred.includeTags = includeTags
  tagsFiltred.excludeTags = excludeTags
}

const getNames = (tags: Itag[]) => tags.map((t) => t[1])

const includetagsSetNames = computed(() => new Set(getNames(tagsFiltred.includeTags)))
const excluTagsSetNames = computed(() => new Set(getNames(tagsFiltred.excludeTags)))

const handleTagsFilter = (
  tag: Itag,
  type: 'includeTags' | 'excludeTags',
  action: 'add' | 'remove'
) => {
  const execute = {
    add: (tag: Itag) => {
      tagsFiltred[type] = [...tagsFiltred[type], tag]
    },
    remove: (tag: Itag) => {
      tagsFiltred[type] = tagsFiltred[type].filter((t) => t[1] !== tag[1])
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

// emicoes

const emitFilter = () => {
  emit('filterEmitted', {
    includeTags: tagsFiltred.includeTags,
    excludeTags: tagsFiltred.excludeTags
  })
}

// lidando com atualizacoes

const showButtonClass = computed<'unlocked' | 'locked'>(() => {
  const sizeInclude = props.includeTags.length !== tagsFiltred.includeTags.length

  if (sizeInclude) return 'unlocked'

  const sizeExclude = props.excludeTags.length !== tagsFiltred.excludeTags.length

  if (sizeExclude) return 'unlocked'

  const currTagsInclideSort = [...props.includeTags].sort()
  const newTagsInclideSort = [...tagsFiltred.includeTags].sort()

  if (JSON.stringify(currTagsInclideSort) !== JSON.stringify(newTagsInclideSort)) return 'unlocked'

  const currTagsExcludeSort = [...props.excludeTags].sort()
  const newTagsExcludeSort = [...tagsFiltred.excludeTags].sort()

  if (JSON.stringify(currTagsExcludeSort) !== JSON.stringify(newTagsExcludeSort)) return 'unlocked'

  return 'locked'
})

onUpdated(() => {
  updatetagsFiltred(props.includeTags, props.excludeTags)
})

onMounted(() => {
  updatetagsFiltred(props.includeTags, props.excludeTags)
})
</script>

<template>
  <FlexContainer flex-wrap="wrap" class="tags-container">
    <TagView2
      v-for="(tag, i) in tagsClassify"
      :key="i"
      :tag="tag.tag"
      :type="tag.type"
      class="tag"
      @click="clickOnTag(tag)"
    />

    <ButtonSlot
      content="Confirmar alterações"
      :class="[showButtonClass, 'button-confim']"
      :invert-color="true"
      :blink="true"
      border-radius="50px"
      @click="emitFilter"
    >
      <CheckIco />
    </ButtonSlot>
  </FlexContainer>
</template>

<style scoped lang="scss">
.tags-container {
  height: 100%;
  overflow: auto;
  overflow-x: auto;
  margin-top: 8px;
  padding-bottom: 40px;

  & .tag {
    width: calc(33% - 4px - 2px);
    margin: 2px;
  }

  & .button-confim {
    position: absolute;
    width: fit-content;
    bottom: 18px;
    right: 30px;
  }

  & .locked {
    cursor: not-allowed;
    height: 0;
    border: none;
  }

  & .unlocked {
    margin-top: 8px;
  }
}
</style> -->
