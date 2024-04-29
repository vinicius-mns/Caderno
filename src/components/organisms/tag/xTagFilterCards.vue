<!-- <script setup lang="ts">
import ThemeP from '@/components/atoms/ThemeP.vue'
import { useStyle } from '@/stores/style'
import ThemeButton from '@/components/atoms/ThemeButton.vue'
import { ref } from 'vue'
import { useCards } from '@/stores/local/cards'
import TagSwitchDoubleList from './TagSwitchDoubleList.vue'
import FloatDescription from '@/components/molecules/FloatDescription.vue'

const { style } = useStyle()

const cards = useCards()

const includeTags = ref([] as string[])

const excludeTags = ref([] as string[])

const handle = (v: { l: string[]; r: string[] }) => {
  excludeTags.value = v.l
  includeTags.value = v.r
}

const filter = () => {
  cards.filterIncludeTag(includeTags.value)
  cards.filterExcludeTags(excludeTags.value)
}
</script>

<template>
  <div class="tag-filter-cards">
    <h3>Filtrar cards</h3>
    <TagSwitchDoubleList
      unic-name="include-tags"
      :checkeds="[]"
      direction="column"
      @emit-tags="handle"
      class="list-tags"
    />
    <ThemeButton class="send" @click="filter">Filtrar</ThemeButton>
  </div>
</template>

<style scoped lang="scss">
.tag-filter-cards {
  width: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  padding: 8px;
  box-sizing: border-box;
  h3 {
    color: v-bind('style.color.text');
  }
  & .send {
    padding: 10px;
    margin: 0 8px 0 8px;
    background-color: rgb(90, 90, 133);
  }
}
</style> -->
