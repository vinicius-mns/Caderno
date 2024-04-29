<script setup lang="ts">
import { useStyle } from '@/stores/style'
// import CardView from '../../molecules/CardView.vue'
import { reactive, ref } from 'vue'
// import MoreOptions from '../../molecules/MoreOptions.vue'
import type { ICard } from '@/api/local'
import CardDelete from './CardDelete.vue'
import CardUpdate from './CardUpdate.vue'
// import { useHandleCardsTags } from '@/stores/local/handleCardsTags'
import TagWithSwitchList from '../tag/TagWithSwitchList.vue'
// import { useTags } from '@/stores/local/tags'
import { useCards } from '@/stores/local/cards'
import ThemeButton from '@/components/atoms/ThemeButton.vue'
import CardView from './CardView.vue'
import CardsRange from './CardsRange.vue'
import CenterModal from '@/components/molecules/CenterModal.vue'
import ThemeP from '@/components/atoms/ThemeP.vue'
import FloatDescription from '@/components/molecules/FloatDescription.vue'
import FloatModal from '@/components/molecules/FloatModal.vue'
import DarkMode from '../config/DarkMode.vue'

const { style } = useStyle()
</script>

<template>
  <FloatModal button-content="⚙️" class="button-card-config">
    <div class="options-container">
      <ThemeP content="Seleciona a quantidade de colunas" />
      <CardsRange />
      <ThemeP content="Ativar modo escuro" />
      <DarkMode />
    </div>
  </FloatModal>
  <!-- <CenterModal button-content="⚙️" title-modal="Editar de cards" class="button-card-config">
    </CenterModal> -->
</template>

<style scoped lang="scss">
.button-card-config {
  height: 40px;
  & .options-container {
    width: 200px;
    padding: 20px;
  }
}
</style>
