<script setup lang="ts">
import CrossIco from '@/components/atoms/icons/CrossIco.vue'
import FilterIco from '@/components/atoms/icons/FilterIco.vue'
import PencilIco from '@/components/atoms/icons/PencilIco.vue'
import TagIco from '@/components/atoms/icons/TagIco.vue'
import ThemeH1 from '@/components/atoms/ThemeH1.vue'
import ButtonCoinSlot from '@/components/molecules/ButtonCoinSlot.vue'
import ButtonSlot from '@/components/molecules/ButtonSlot.vue'
import TagView2 from '@/components/molecules/TagView2.vue'
import TagOptions from '@/components/organisms/TagOptions.vue'
import { useFloatModal } from '@/stores/floatModal'
import type { Itag } from '@/stores/tags/Interfaces'

const floatModal = useFloatModal()

const props = defineProps<{
  tagsTextFilter: string
  tags: Itag[]
}>()

const emit = defineEmits<{
  (e: 'close', v: null): void
  (e: 'openFilter', v: null): void
  (e: 'openTagCreate', v: null): void
  (e: 'openTagUpdate', v: Itag): void
  (e: 'openTagDelete', v: Itag): void
}>()

const openTagOptions = (tag: Itag, id: number) => {
  floatModal.tagOptions.open(tag, document.getElementById(`tag-${id}`)!)
}
</script>

<template>
  <div class="tags">
    <header>
      <ThemeH1 content="Tags" />

      <ButtonCoinSlot content="Fechar" class="button-options" @click="emit('close', null)">
        <CrossIco />
      </ButtonCoinSlot>
    </header>

    <div class="tags-area">
      <TagView2
        v-for="(tag, i) in props.tags"
        :key="i"
        :tag="tag"
        :id="`tag-${i}`"
        class="tag"
        @click="openTagOptions(tag, i)"
      />
      <!-- <TagOptions
        v-for="(tag, i) in props.tags"
        :key="i"
        class="tag"
        :tag="tag"
        @open-update-tag="emit('openTagUpdate', tag)"
        @open-delete-tag="emit('openTagDelete', tag)"
      /> -->
    </div>

    <div class="options">
      <ButtonSlot
        content="Criar tag"
        border-radius="50px"
        :invert-color="true"
        @click="emit('openTagCreate', null)"
      >
        <PencilIco />
      </ButtonSlot>

      <ButtonCoinSlot content="Filter" @click="emit('openFilter', null)">
        <FilterIco />
      </ButtonCoinSlot>

      <ButtonCoinSlot content="Tags" border-color="white">
        <TagIco />
      </ButtonCoinSlot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tags {
  $gap: 5px;
  height: 100%;
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

  & .tags-area {
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: $gap;
    margin: 12px 0;
    padding-bottom: 8px;
    overflow-y: auto;

    & .tag {
      width: calc(100% / 4 - $gap);
    }
  }

  & .options {
    display: flex;
    flex-direction: row-reverse;
    gap: $gap;
  }
}
</style>
