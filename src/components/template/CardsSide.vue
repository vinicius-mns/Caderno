<script setup lang="ts">
import { useTags } from '@/stores/tags/tags'
import FlexContainer from '../atoms/FlexContainer.vue'
import ThemeButton from '../atoms/ThemeButton.vue'
import SearchImput from '../molecules/SearchImput.vue'
import TagsFiltredsList from '../organisms/TagsFiltredsList.vue'
import { useStylesPage } from '@/stores/stylesPage/stylesPage'

const stylesPage = useStylesPage()

const tags = useTags()
</script>

<template>
  <FlexContainer class="cards-side-container" flex-direction="column" align-items="center">
    <ThemeButton class="button-create-card b-w"> Criar card </ThemeButton>

    <ThemeButton class="button-create-tag b-w"> Criar Tag </ThemeButton>

    <SearchImput class="b-w" placeholder="Pesquisar tag" key-id="search-tag" />
  </FlexContainer>
  <!-- <div class="cards-side-container">
    
  </div> -->
</template>

<style scoped lang="scss">
.cards-side-container {
  width: 408px;
  height: 100%;
  background-color: v-bind('stylesPage.atualColor.back');

  & .b-w {
    width: 90%;
    margin-top: 10px;
  }

  & .button-create-card {
    height: 120px;
  }

  & .button-create-tag {
    height: 90px;
  }
}
</style>
