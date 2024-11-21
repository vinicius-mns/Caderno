<script setup lang="ts">
import type { Itag } from '@/stores/tags/Interfaces'
import FloatModalSlot from '@/components/atoms/FloatModalSlot.vue'
import ModalCard from '@/components/atoms/ModalCard.vue'
import ThemeButton from '../atoms/ThemeButton.vue'
import TagView from '../molecules/TagView.vue'
import FlexContainer from '../atoms/FlexContainer.vue'
import ButtonSlot from '../molecules/ButtonSlot.vue'
import PencilIco from '../atoms/icons/PencilIco.vue'
import EraserIco from '../atoms/icons/EraserIco.vue'
import CardCrossIco from '../atoms/icons/CardCrossIco.vue'
import TrashIco from '../atoms/icons/TrashIco.vue'
import SearchImput from '../molecules/SearchImput.vue'
import ButtonCoinSlot from '../molecules/ButtonCoinSlot.vue'
import TagIco from '../atoms/icons/TagIco.vue'

const props = defineProps<{ tags: Itag[]; textFilter: string }>()

const emit = defineEmits<{
  (e: 'updateTag', v: Itag): void
  (e: 'removeTagOnCards', v: Itag): void
  (e: 'deleteCardsWithtag', v: Itag): void
  (e: 'deleteTag', v: Itag): void
  (e: 'searchTag', v: string): void
  (e: 'openCreateTag', v: null): void
}>()

const emitUpdate = (tag: Itag) => emit('updateTag', tag)

const emitDelete = (tag: Itag) => emit('deleteTag', tag)

const emitDeleteCardsWithTag = (tag: Itag) => emit('deleteCardsWithtag', tag)

const searchTag = (v: string) => emit('searchTag', v)

const openCreateTag = () => emit('openCreateTag', null)
</script>

<template>
  <FloatModalSlot>
    <template #button-slot>
      <ButtonCoinSlot content="Tags" class="button-x">
        <TagIco />
      </ButtonCoinSlot>
    </template>

    <template #container-slot>
      <ModalCard class="tags-card">
        <FlexContainer flex-direction="column" class="tags-flex-container">
          <SearchImput
            :init-content="props.textFilter"
            @emit-content="searchTag"
            placeholder="Pesquisar tag"
            key-id="search-tag-tags"
          />

          <FlexContainer flex-wrap="wrap" class="tags-area">
            <FloatModalSlot
              class="tag-with-options-container"
              v-for="(tag, i) in props.tags"
              :key="i"
              :close-on-click="true"
            >
              <template #button-slot>
                <FlexContainer flex-wrap="wrap">
                  <ThemeButton background-color="front" class="tag">
                    <TagView :tag="tag" />
                  </ThemeButton>
                </FlexContainer>
              </template>

              <template #container-slot>
                <ModalCard class="options-container" background-color="front">
                  <TagView :tag="tag" class="tag-preview" />

                  <ButtonSlot content="Editar Tag" @click="emitUpdate(tag)">
                    <PencilIco />
                  </ButtonSlot>

                  <ButtonSlot content="Remover tag de cards">
                    <EraserIco />
                  </ButtonSlot>

                  <ButtonSlot content="Remover cards com tag" @click="emitDeleteCardsWithTag(tag)">
                    <CardCrossIco />
                  </ButtonSlot>

                  <ButtonSlot content="Deletar tag" @click="emitDelete(tag)">
                    <TrashIco />
                  </ButtonSlot>
                </ModalCard>
              </template>
            </FloatModalSlot>
          </FlexContainer>

          <ButtonSlot content="Criar tag" @click="openCreateTag">
            <PencilIco />
          </ButtonSlot>
        </FlexContainer>
      </ModalCard>
    </template>
  </FloatModalSlot>
</template>

<style scoped lang="scss">
.tags-card {
  display: flex;
  flex-direction: column;
  width: 408px;
  max-width: 95%;
  max-height: 60dvh;

  & .tags-flex-container {
    height: 100%;
    overflow: hidden;
    & .tags-area {
      height: 100%;
      width: 100%;
      overflow: auto;
      flex-shrink: 1;
      margin: 10px 0;
    }
  }

  .tag-with-options-container {
    width: calc(33% - 6px);
    margin: 3px;
    & .tag {
      width: 100%;
    }
    .options-container {
      width: 260px;
      display: flex;
      flex-direction: column;
      align-items: center;
      & .tag-preview {
        margin: 10px 0;
      }
      & span {
        font-size: 40px;
        text-shadow: 5px 2px 2px;
      }
    }
  }
}
</style>
