<script setup lang="ts">
import { useStyle } from '@/stores/style'
import CardView from '../../molecules/CardView.vue'
import { computed, reactive } from 'vue'
import MoreOptions from '../../molecules/MoreOptions.vue'
import type { ICard } from '@/api/local'
import CardDelete from './CardDelete.vue'
import CardUpdate from './CardUpdate.vue'
import { useHandleCardsTags } from '@/stores/local/handleCardsTags'
import TagWithSwitchList from '../tag/TagWithSwitchList.vue'

const { style } = useStyle()

const cardsTags = useHandleCardsTags()

const props = defineProps<{ card: ICard }>()

const cardsWithTag = computed(() => cardsTags.cardsReactive.withTagsObject([props.card])[0])

const options = reactive({
  show: false,
  open: () => (options.show = true),
  close: () => (options.show = false)
})
</script>

<template>
  <div class="card" @mouseenter="options.open" @mouseleave="options.close">
    <CardView :card="cardsWithTag" />
    <MoreOptions class="more-options" v-if="options.show" :visible="true">
      <div class="options-container">
        <TagWithSwitchList
          :card="props.card"
          class="tags-switch"
          unic-name="tags-switch-card-options"
          :emit-tags="false"
        />
        <CardUpdate class="option-button" :card="props.card" @close="options.close" />
        <CardDelete class="option-button" :card="props.card" @close="options.close" />
      </div>
    </MoreOptions>
  </div>
</template>

<style scoped lang="scss">
$buttonSize: v-bind('style.button.size');
$margin: 10px;
.card {
  position: relative;
  width: 100%;
  margin-bottom: calc($margin / 2);
  border-radius: 8px;
  position: relative;
  & .more-options {
    position: absolute;
    top: $margin;
    right: $margin;
    height: $buttonSize;
    aspect-ratio: 1;
    & .options-container {
      width: 280px;
      height: 48dvh;
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow: auto;
      & .option-button {
        width: 95%;
        margin-top: 8px;
        // margin-bottom: 8px;
      }
      & .tags-switch {
        margin-top: 0;
        width: 96%;
        // background-color: red;
      }
    }
  }
}
</style>
