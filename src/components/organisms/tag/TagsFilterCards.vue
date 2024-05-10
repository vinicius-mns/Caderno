<script setup lang="ts">
import { computed, ref } from 'vue'
import TagSwitchDouble from './TagSwitchDouble.vue'
import { useCards } from '@/stores/local/cards'
import { useTags } from '@/stores/local/tags'
import CoinButton from '@/components/molecules/CoinButton.vue'
import FloatModalSlot from '@/components/molecules/FloatModalSlot.vue'
import ThemeP from '@/components/atoms/ThemeP.vue'
import type { ITag } from '@/api/local'
import FilterIco from '@/components/atoms/icons/FilterIco.vue'
import OptionButton from '@/components/molecules/OptionButton.vue'
import FiltersIco from '@/components/atoms/icons/FiltersIco.vue'

const cards = useCards()

const tags = useTags()

const allTags = computed(() => {
  return tags.tags.map((tag) => ({ tag: tag, status: 'n' as 'l' | 'r' | undefined }))
})

const reactiveTags = ref(allTags.value)

const includeTags = ref([] as string[])

const excludesTags = ref([] as string[])

const handleTags = (v: { tag: ITag; status: 'l' | 'r' | undefined }) => {
  const tagsList = reactiveTags.value
  const index = tagsList.findIndex((tag) => tag.tag.id === v.tag.id)
  tagsList[index] = v
  reactiveTags.value = tagsList
  includeTags.value = tagsList.filter((tag) => tag.status === 'r').map((tag) => tag.tag.id)
  excludesTags.value = tagsList.filter((tag) => tag.status === 'l').map((tag) => tag.tag.id)
}

const sendFilter = () => {
  cards.filterIncludeTag(includeTags.value)
  cards.filterExcludeTags(excludesTags.value)
}
</script>

<template>
  <FloatModalSlot>
    <template #button-slot>
      <CoinButton description="Filtrar cards por tags">
        <FilterIco />
      </CoinButton>
    </template>
    <template #container-slot>
      <div class="tag-with-switch-list">
        <div class="tags-container">
          <div class="context">
            <ThemeP content="Sem Tag" class="r" />
            <ThemeP content="Com Tag" class="g" />
          </div>
          <TagSwitchDouble
            v-for="(tag, i) in reactiveTags"
            :key="i"
            :tag="tag.tag"
            :status="tag.status"
            @emit-tag="handleTags"
            class="tag"
          />
        </div>
        <OptionButton class="send-filter" @click="sendFilter" content="Filtrar">
          <FiltersIco />
        </OptionButton>
      </div>
    </template>
  </FloatModalSlot>
</template>

<style scoped lang="scss">
.tag-with-switch-list {
  width: 100%;
  min-width: 260px;
  height: 48dvh;
  padding: 10px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  & .tags-container {
    width: 100%;
    height: calc(48dvh - 38px);
    overflow: auto;
    margin-bottom: 10px;
    & .context {
      width: 100%;
      display: flex;
      justify-content: space-evenly;
      padding: 10px;
      box-sizing: border-box;
      & .r {
        color: red;
      }
      & .g {
        color: rgb(128, 184, 128);
      }
    }
  }
  & .send-filter {
    width: 100%;
  }
}
</style>
