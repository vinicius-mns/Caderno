<script setup lang="ts">
import { ref } from 'vue'
import type { ITag } from '@/api/local'
import ButtonOption from '@/components/molecules/ButtonOption.vue'
import FiltersIco from '@/components/atoms/icons/FiltersIco.vue'
import TagDoubleSectable from '@/components/molecules/TagDoubleSectable.vue'

const props = defineProps<{ allTags: ITag[] }>()

const emit = defineEmits<{
  (e: 'emitTags', v: { includeTags: string[]; excludesTags: string[] }): void
}>()

const TagsWithStatus = ref(
  props.allTags.map((tag) => ({ tag: tag, status: 'n' as 'g' | 'r' | 'n' }))
)

const includeTags = ref([] as string[])

const excludesTags = ref([] as string[])

const sendFilter = () => {
  emit('emitTags', { includeTags: includeTags.value, excludesTags: excludesTags.value })
}

const handleTags = (v: { tag: ITag; status: 'g' | 'r' | 'n' }) => {
  const TagWithStatus = TagsWithStatus.value
  const index = TagWithStatus.findIndex((tag) => tag.tag.id === v.tag.id)
  TagWithStatus[index] = v
  TagsWithStatus.value = TagWithStatus
  includeTags.value = TagWithStatus.filter((tag) => tag.status === 'g').map((tag) => tag.tag.id)
  excludesTags.value = TagWithStatus.filter((tag) => tag.status === 'r').map((tag) => tag.tag.id)
  sendFilter()
}
</script>

<template>
  <div class="tag-with-switch-list">
    <div class="tags-container">
      <TagDoubleSectable
        v-for="(tag, i) in allTags"
        :key="i"
        :tag="tag"
        class="tag"
        @emit-tag="handleTags"
      />
    </div>
    <ButtonOption class="send-filter" @click="sendFilter" content="Filtrar">
      <FiltersIco />
    </ButtonOption>
  </div>
</template>

<style scoped lang="scss">
.tag-with-switch-list {
  width: 100;
  height: 100%;
  display: flex;
  flex-direction: column;
  & .describe {
    display: flex;
    justify-content: space-evenly;
    padding: 2px;
  }
  & .tags-container {
    width: 100%;
    overflow-y: auto;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;
    justify-content: space-evenly;
    & .tag {
      width: 48%;
    }
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
