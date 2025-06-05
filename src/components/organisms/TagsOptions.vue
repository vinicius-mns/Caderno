<script setup lang="ts">
import type { Itag } from '@/stores/tags/Interfaces'
import TagsConstainer2 from '@/components/molecules/TagsConstainer2.vue'
import FlexContainer from '@/components/atoms/FlexContainer.vue'
import FloatModalSlot from '@/components/atoms/FloatModalSlot.vue'
import ButtonSlot from '@/components/molecules/ButtonSlot.vue'
import ModalCard from '../atoms/ModalCard.vue'
import PencilIco from '../atoms/icons/PencilIco.vue'
import TagView2 from '../molecules/TagView2.vue'
import EraserIco from '../atoms/icons/EraserIco.vue'
import CardCrossIco from '../atoms/icons/CardCrossIco.vue'
import TrashIco from '../atoms/icons/TrashIco.vue'

const props = defineProps<{
  allTags: Itag[]
  textFilterTags: string
}>()

const emit = defineEmits<{
  (e: 'searchTag', v: string): void
  (e: 'openCreateTag', v: null): void
  (e: 'tagUpdated', v: Itag): void
  (e: 'tagToDelete', v: Itag): void
}>()
</script>

<template>
  <TagsConstainer2
    :all-tags="props.allTags"
    :text-filter="props.textFilterTags"
    @search-tag="emit('searchTag', $event)"
    @open-create-tag="emit('openCreateTag', null)"
  >
    <template #button-slot>
      <slot />
    </template>

    <template #tags-slot>
      <!-- <TagsOptions
        :tags="props.allTags"
        @tag-updated="emit('tagUpdated', $event)"
        @tag-to-delete="emit('tagToDelete', $event)"
      /> -->
      <FlexContainer flex-wrap="wrap" class="tags-container">
        <FloatModalSlot :closeOnClick="true" v-for="(tag, i) in props.allTags" :key="i" class="tag">
          <template #button-slot>
            <TagView2 :tag="tag" />
          </template>

          <template #container-slot>
            <ModalCard class="options-container" background-color="front">
              <TagView2 :tag="tag" class="tag-preview" :animation="false" />

              <ButtonSlot
                content="Editar Tag"
                border-color="transparent"
                class="button-option"
                @click="emit('tagUpdated', tag)"
              >
                <PencilIco />
              </ButtonSlot>

              <ButtonSlot
                content="Remover tag de cards"
                border-color="transparent"
                class="button-option"
              >
                <EraserIco />
              </ButtonSlot>

              <ButtonSlot
                content="Remover cards com tag"
                border-color="transparent"
                class="button-option"
              >
                <CardCrossIco />
              </ButtonSlot>

              <ButtonSlot
                content="Deletar tag"
                border-color="transparent"
                class="button-option"
                @click="emit('tagToDelete', tag)"
              >
                <TrashIco />
              </ButtonSlot>
            </ModalCard>
          </template>
        </FloatModalSlot>
      </FlexContainer>
    </template>
  </TagsConstainer2>
</template>

<style scoped lang="scss">
.tags-container {
  height: 100%;
  overflow: auto;
  overflow-x: auto;
  margin-top: 8px;

  & .tag {
    width: calc(33% - 4px - 2px);
    margin: 2px;
  }

  .tag-options-container {
    width: 260px;
    display: flex;
    flex-direction: column;
    align-items: center;

    & .tag-preview {
      margin: 10px 0;
      width: 100%;
    }

    & .button-option {
      width: 100%;
    }
  }
}
</style>
