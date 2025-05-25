<script setup lang="ts">
import FlexContainer from '@/components/atoms/FlexContainer.vue'
import type { Itag } from '@/stores/tags/Interfaces'
import ButtonCoinSlot from '@/components/molecules/ButtonCoinSlot.vue'
import PencilIco from '@/components/atoms/icons/PencilIco.vue'
import SearchImput from '@/components//molecules/SearchImput.vue'
import EraserIco from '@/components//atoms/icons/EraserIco.vue'
import ButtonSlot from '@/components/molecules/ButtonSlot.vue'
import CrossIco from '@/components/atoms/icons/CrossIco.vue'

const props = defineProps<{
  textFilter: string
}>()

const emit = defineEmits<{
  (e: 'searchTag', v: string): void
  (e: 'clear', v: null): void
  (e: 'openCreateTag', v: null): void
  (e: 'close', v: null): void
}>()
</script>

<template>
  <div class="header-container">
    <SearchImput
      key-id="search-tag"
      placeholder="Pesquisar tag"
      @emit-content="emit('searchTag', $event)"
      :init-content="props.textFilter"
      class="search-tag"
    />

    <ButtonSlot
      content="Criar tag"
      @click="emit('openCreateTag', null)"
      :invert-color="true"
      border-radius="50px"
    >
      <PencilIco />
    </ButtonSlot>

    <!-- <ButtonCoinSlot content="Limpar filtro" class="button-eraser" @click="emit('clear', null)">
      <EraserIco />
    </ButtonCoinSlot> -->

    <ButtonCoinSlot content="Fechar" @click="emit('close', null)">
      <CrossIco />
    </ButtonCoinSlot>
  </div>
</template>

<style scoped lang="scss">
.header-container {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 5px;

  & .search-tag {
    width: 100%;
    flex-shrink: 1;
    // margin-right: 10px;
  }

  // & .button-eraser {
  //   margin-right: 5px;
  // }
}
</style>
