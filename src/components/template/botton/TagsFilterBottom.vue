<script setup lang="ts">
import CheckIco from '@/components/atoms/icons/CheckIco.vue'
import CrossIco from '@/components/atoms/icons/CrossIco.vue'
import EraserIco from '@/components/atoms/icons/EraserIco.vue'
import FilterIco from '@/components/atoms/icons/FilterIco.vue'
import PencilIco from '@/components/atoms/icons/PencilIco.vue'
import TagIco from '@/components/atoms/icons/TagIco.vue'
import ThemeH1 from '@/components/atoms/ThemeH1.vue'
import ThemeH2 from '@/components/atoms/ThemeH2.vue'
import ButtonCoinSlot from '@/components/molecules/ButtonCoinSlot.vue'
import ButtonSlot from '@/components/molecules/ButtonSlot.vue'
import TagView2 from '@/components/molecules/TagView2.vue'
import type { Itag } from '@/stores/tags/Interfaces'
import { onMounted, reactive } from 'vue'

const props = defineProps<{
  tagsTextFilter: string
  tags: Itag[]
  includeTags: Itag[]
  excludeTags: Itag[]
}>()

const emit = defineEmits<{
  (e: 'close', v: null): void
  (e: 'openTags', v: null): void
  (e: 'sendFilter', v: { includeTags: Itag[]; excludeTags: Itag[] }): void
}>()

// valores

const filter = reactive<[Itag[], Itag[]]>([[], []])

const noneTags = reactive<Itag[]>([])

// metodos

const handleNoneTags = (includeTags: Itag[], excludeTags: Itag[]) => {
  const getName = (tag: Itag) => tag[1]

  const includeTagsNameSet = new Set(includeTags.map(getName))

  const excludeTagsNameSet = new Set(excludeTags.map(getName))

  return [
    ...props.tags.filter(
      (tag) => !includeTagsNameSet.has(tag[1]) && !excludeTagsNameSet.has(tag[1])
    )
  ]
}

const handleCheckTag = (type: 'include' | 'exclude' | 'none', tag: Itag) => {
  if (type === 'none') {
    filter[0].push(tag)
    noneTags.splice(noneTags.indexOf(tag), 1)
  }

  if (type === 'include') {
    filter[1].push(tag)
    filter[0].splice(filter[0].indexOf(tag), 1)
  }

  if (type === 'exclude') {
    noneTags.push(tag)
    filter[1].splice(filter[1].indexOf(tag), 1)
  }
}

const handleClear = () => {
  filter[0] = []
  filter[1] = []
  noneTags.splice(0, noneTags.length)
  noneTags.push(...handleNoneTags(filter[0], filter[1]))
}

// emits

const sendFilter = () => {
  emit('sendFilter', {
    includeTags: filter[0],
    excludeTags: filter[1]
  })

  emit('close', null)
}

// hooks

onMounted(() => {
  const includeTags = [...props.includeTags]
  const excludeTags = [...props.excludeTags]

  filter[0] = includeTags
  filter[1] = excludeTags
  noneTags.push(...handleNoneTags(includeTags, excludeTags))
})
</script>

<template>
  <div class="tags">
    <header>
      <ThemeH1 content="Filter" />

      <ButtonCoinSlot content="Fechar" class="button-options" @click="emit('close', null)">
        <CrossIco />
      </ButtonCoinSlot>
    </header>

    <div class="tags-container">
      <ThemeH2 content="Com tags" />

      <div class="tags-area">
        <TagView2
          v-for="(tag, i) in filter[0]"
          :key="i"
          class="tag"
          :tag="tag"
          type="include"
          @click="handleCheckTag('include', tag)"
        />
      </div>

      <ThemeH2 content="Sem tags" />

      <div class="tags-area">
        <TagView2
          v-for="(tag, i) in filter[1]"
          :key="i"
          class="tag"
          :tag="tag"
          type="exclude"
          @click="handleCheckTag('exclude', tag)"
        />
      </div>

      <ThemeH2 content="Tags" />

      <div class="tags-area">
        <TagView2
          v-for="(tag, i) in noneTags"
          :key="i"
          class="tag"
          :tag="tag"
          type="none"
          @click="handleCheckTag('none', tag)"
        />
      </div>
    </div>

    <div class="options">
      <ButtonSlot
        content="Aplicar Filtro"
        border-radius="50px"
        :invert-color="true"
        @click="sendFilter"
      >
        <CheckIco />
      </ButtonSlot>

      <ButtonCoinSlot content="Limpar" @click="handleClear">
        <EraserIco />
      </ButtonCoinSlot>

      <ButtonCoinSlot content="Filter" border-color="white">
        <FilterIco />
      </ButtonCoinSlot>

      <ButtonCoinSlot content="Tags" @click="emit('openTags', null)">
        <TagIco />
      </ButtonCoinSlot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tags {
  $gap: 5px;
  height: 100%;
  width: 100%;
  overflow: hidden;
  padding: 6px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  & header {
    display: flex;
    justify-content: space-between;

    & h1 {
      margin: 8px 10px;
    }
  }

  & .tags-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    padding-bottom: 8px;
    margin: 12px 0;

    & h2 {
      margin-left: 2px;
    }

    & .tags-area {
      margin: 8px 0 24px;
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      gap: $gap;

      & .tag {
        width: calc(100% / 4 - $gap);
      }
    }
  }

  & .options {
    display: flex;
    flex-direction: row-reverse;
    gap: $gap;
  }
}
</style>
