<script setup lang="ts">
import FlexContainer from '@/components/atoms/FlexContainer.vue'
import ButtonCoinSlot from '../molecules/ButtonCoinSlot.vue'
import PlusIco from '../atoms/icons/PlusIco.vue'
import ButtonSlot from '../molecules/ButtonSlot.vue'
import PencilIco from '../atoms/icons/PencilIco.vue'
import { useStylesPage } from '@/stores/stylesPage/stylesPage'
import TagIco from '../atoms/icons/TagIco.vue'
import { useWindows } from '@/stores/windows'
import FilterIco from '../atoms/icons/FilterIco.vue'

const stylesPage = useStylesPage()

const windows = useWindows()
</script>

<template>
  <FlexContainer class="bottom-container" align-items="center" justify-content="center">
    <ButtonCoinSlot
      content="Tags"
      size="62px"
      :border="true"
      class="button-coin"
      @click="windows.tags.open(null)"
    >
      <TagIco size="30px" />
    </ButtonCoinSlot>

    <ButtonCoinSlot
      content="Filtrar"
      size="62px"
      :border="true"
      class="button-coin"
      @click="windows.filterCardsByTags.open(null)"
    >
      <FilterIco size="30px" />
    </ButtonCoinSlot>

    <ButtonCoinSlot content="Criar card" size="62px" :border="true" class="button-coin">
      <PlusIco />
    </ButtonCoinSlot>

    <ButtonCoinSlot content="Criar card" size="62px" :border="true" class="button-coin">
      <PlusIco />
    </ButtonCoinSlot>
  </FlexContainer>
</template>

<style scoped lang="scss">
.bottom-container {
  position: fixed;
  bottom: 0;
  width: 100dvw;
  height: 80px;

  & .button-coin {
    margin: 0 4px;
  }
}
</style>
