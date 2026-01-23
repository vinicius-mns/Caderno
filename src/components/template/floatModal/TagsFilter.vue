<script setup lang="ts">
import CheckIco from '@/components/atoms/icons/CheckIco.vue'
import CrossIco from '@/components/atoms/icons/CrossIco.vue'
import EraserIco from '@/components/atoms/icons/EraserIco.vue'
import ModalCard from '@/components/atoms/ModalCard.vue'
import ThemeH1 from '@/components/atoms/ThemeH1.vue'
import ThemeH2 from '@/components/atoms/ThemeH2.vue'
import ButtonCoinSlot from '@/components/molecules/ButtonCoinSlot.vue'
import ButtonSlot from '@/components/molecules/ButtonSlot.vue'
import TagView2 from '@/components/molecules/TagView2.vue'
import { useCardsTags } from '@/stores/cardsTags'
import type { Itag } from '@/stores/tags/Interfaces'
import { onMounted, reactive } from 'vue'

const cardTags = useCardsTags()

const props = defineProps<{
  tagsTextFilter: string
  tags: Itag[]
  includeTags: Itag[]
  excludeTags: Itag[]
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
  const addOn = {
    include: () => {
      filter[0].push(tag)
      noneTags.splice(noneTags.indexOf(tag), 1)
    },
    exclude: () => {
      filter[1].push(tag)
      filter[0].splice(filter[0].indexOf(tag), 1)
    },
    none: () => {
      noneTags.push(tag)
      filter[1].splice(filter[1].indexOf(tag), 1)
    }
  }

  if (type === 'none') addOn.include()
  if (type === 'include') addOn.exclude()
  if (type === 'exclude') addOn.none()
}

const handleClear = () => {
  filter[0] = []
  filter[1] = []
  noneTags.splice(0, noneTags.length)
  noneTags.push(...handleNoneTags(filter[0], filter[1]))
}

const setFilter = () => {
  cardTags.tag.filterCard.set({
    includeTags: filter[0],
    excludeTags: filter[1]
  })
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
  <ModalCard class="tags">
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
        @click="setFilter"
      >
        <CheckIco />
      </ButtonSlot>

      <ButtonCoinSlot content="Limpar" @click="handleClear">
        <EraserIco />
      </ButtonCoinSlot>
    </div>
  </ModalCard>
</template>

<style scoped lang="scss">
.tags {
  $gap: 5px;
  height: 62dvh;
  width: 520px;
  overflow: hidden;
  padding: 18px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  border-radius: 30px;

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
