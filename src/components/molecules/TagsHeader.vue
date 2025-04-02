<script setup lang="ts">
import FlexContainer from '@/components/atoms/FlexContainer.vue'
import type { Itag } from '@/stores/tags/Interfaces'
import ButtonCoinSlot from '@/components/molecules/ButtonCoinSlot.vue'
import PencilIco from '../atoms/icons/PencilIco.vue'
import SearchImput from '../molecules/SearchImput.vue'
import EraserIco from '../atoms/icons/EraserIco.vue'

const props = defineProps<{
  textFilter: string
}>()

const emit = defineEmits<{
  (e: 'searchTag', v: string): void
  (e: 'clear', v: null): void
  (e: 'openCreateTag', v: null): void
}>()
</script>

<template>
  <FlexContainer class="header-container" align-items="center">
    <SearchImput
      key-id="search-tag"
      placeholder="Pesquisar tag"
      @emit-content="emit('searchTag', $event)"
      :init-content="props.textFilter"
      class="search-tag"
    />

    <ButtonCoinSlot content="Limpar filtro" class="button-eraser" @click="emit('clear', null)">
      <EraserIco />
    </ButtonCoinSlot>

    <ButtonCoinSlot content="Criar tag" @click="emit('openCreateTag', null)" :invert-color="true">
      <PencilIco />
    </ButtonCoinSlot>
  </FlexContainer>
</template>

<style scoped lang="scss">
.header-container {
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
</style>
