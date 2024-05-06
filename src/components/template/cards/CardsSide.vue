<script setup lang="ts">
import TagWithOptionsList from '../../organisms/tag/TagWithOptionsList.vue'
import TagCreate from '../../organisms/tag/TagCreate.vue'
// import TagSearch from '../organisms/tag/TagSearch.vue'
import SwitchButton from '../../atoms/SwitchButton.vue'
import { computed, ref } from 'vue'
import { useTags } from '@/stores/local/tags'
import TagsFilterCards from '../../organisms/tag/TagsFilterCards.vue'
import { useStyle } from '@/stores/style'
import { useConfig } from '@/stores/config'

const tags = useTags()

const { atualStyle } = useStyle()

const config = useConfig()

const allTags = computed(() => tags.tags)

const showFilter = computed(() => config.filterCardsByTag)
</script>

<template>
  <div class="sibebar-cards-container">
    <div class="container" v-show="!showFilter">
      <h3>Tags</h3>
      <TagWithOptionsList :all-tags="allTags" />
    </div>
    <div class="container" v-show="showFilter">
      <h3>Filtrar cards</h3>
      <TagsFilterCards direction="column" :all-tags="allTags" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.sibebar-cards-container {
  & h3 {
    color: v-bind('atualStyle.color.text');
  }
  .action-button {
    display: flex;
    height: 20px;
    align-items: center;
    justify-content: space-evenly;
  }
  & .container {
    padding: 12px;
  }
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  & .button-margin {
    padding: 10px;
    box-sizing: border-box;
  }
}
</style>
