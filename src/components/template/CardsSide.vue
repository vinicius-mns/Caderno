<script setup lang="ts">
import TagWithOptionsList from '../organisms/tag/TagWithOptionsList.vue'
import TagCreate from '../organisms/tag/TagCreate.vue'
// import TagSearch from '../organisms/tag/TagSearch.vue'
import SwitchButton from '../atoms/SwitchButton.vue'
import { computed, ref } from 'vue'
import { useTags } from '@/stores/local/tags'
import TagsFilterCards from '../organisms/tag/TagsFilterCards.vue'
import { useStyle } from '@/stores/style'

const tags = useTags()

const { style } = useStyle()

const allTags = computed(() => tags.tags)

const showFilter = ref(false)

const toggle = (v: { id: string; checked: boolean }) => (showFilter.value = v.checked)
</script>

<template>
  <div class="sibebar-cards-container">
    <TagCreate class="button-margin" />
    <div class="action-button">
      <h3>Filtrar Cards</h3>
      <SwitchButton :check-value="showFilter" @emit-checked="toggle" id="f" unic-name="ff" />
    </div>
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
    color: v-bind('style.color.text');
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
