<script setup lang="ts">
import { computed } from 'vue'
import FlexContainer from '@/components/atoms/FlexContainer.vue'
import type { Itag } from '@/stores/tags/Interfaces'
import FloatModalSlot from '@/components/atoms/FloatModalSlot.vue'
import ButtonCoinSlot from '@/components/molecules/ButtonCoinSlot.vue'
import ButtonSlot from '@/components/molecules/ButtonSlot.vue'
import ModalCard from '../atoms/ModalCard.vue'
import ThemeP from '../atoms/ThemeP.vue'
import PencilIco from '../atoms/icons/PencilIco.vue'
import SearchImput from '../molecules/SearchImput.vue'
import EraserIco from '../atoms/icons/EraserIco.vue'

const props = defineProps<{
  allTags: Itag[]
  textFilter: string
}>()

const emit = defineEmits<{
  (e: 'searchTag', v: string): void
  (e: 'openCreateTag', v: null): void
}>()

const isEmptyTags = computed(() => props.allTags.length <= 0)

const searchTag = (v: string) => {
  emit('searchTag', v)
}

const openCreateTag = () => {
  emit('openCreateTag', null)
}
</script>

<template>
  <FloatModalSlot>
    <template #button-slot>
      <slot name="button-slot" />
    </template>

    <template #container-slot>
      <ModalCard class="modal-card-tags" background-color="front">
        <FlexContainer class="header-container" align-items="center">
          <SearchImput
            key-id="search-tag"
            placeholder="Pesquisar tag"
            @emit-content="searchTag"
            :init-content="props.textFilter"
            class="search-tag"
          />

          <ButtonCoinSlot content="Limpar filtro" class="button-eraser">
            <EraserIco />
          </ButtonCoinSlot>

          <ButtonCoinSlot content="Criar tag" @click="openCreateTag" :invert-color="true">
            <PencilIco />
          </ButtonCoinSlot>
        </FlexContainer>

        <slot name="tags-slot" />

        <ThemeP
          content="Nenhuma tag encontrada 😢"
          size="20px"
          class="no-tag-tittle"
          v-if="isEmptyTags"
        />

        <ButtonSlot
          v-if="isEmptyTags"
          border-radius="50px"
          content="Criar tag"
          :invert-color="true"
          @click="openCreateTag"
        >
          <PencilIco />
        </ButtonSlot>
      </ModalCard>
    </template>
  </FloatModalSlot>
</template>

<style scoped lang="scss">
.modal-card-tags {
  display: flex;
  flex-direction: column;
  width: 408px;
  max-width: 95dvw;
  max-height: 50dvh;

  & .header-container {
    width: 100%;

    & .search-tag {
      width: 100%;
      flex-shrink: 1;
      margin-right: 10px;
    }

    & .button-eraser {
      margin-right: 5px;
    }
  }

  & .no-tag-tittle {
    margin: 10px;
  }
}
</style>
