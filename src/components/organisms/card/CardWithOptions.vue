<script setup lang="ts">
import { useStyle } from '@/stores/style'
// import CardView from '../../molecules/CardView.vue'
import { reactive, ref } from 'vue'
import MoreOptions from '../../molecules/MoreOptions.vue'
import type { ICard } from '@/api/local'
import CardDelete from './CardDelete.vue'
import CardUpdate from './CardUpdate.vue'
// import { useHandleCardsTags } from '@/stores/local/handleCardsTags'
import TagWithSwitchList from '../tag/TagWithSwitchList.vue'
// import { useTags } from '@/stores/local/tags'
import { useCards } from '@/stores/local/cards'
import ThemeButton from '@/components/atoms/ThemeButton.vue'
import CardView from './CardView.vue'

const { style } = useStyle()

// const cardsTags = useHandleCardsTags()

// const tags = useTags()

const cards = useCards()

const props = defineProps<{ card: ICard }>()

// const tagsInCard = computed(() => tags.readList(props.card.tags))

// const tagsInCard = computed(() => props.card.tags.map((tagId) => tags.readOne(tagId)))

// const cardsWithTag = computed(() => cardsTags.cardsReactive.withTagsObject([props.card])[0])

const options = reactive({
  show: false,
  open: () => (options.show = true),
  close: () => (options.show = false)
})

const tagIds = ref([''])

const showConfirmChanges = ref(false)

const closeOptionsModal = () => {
  tagIds.value = ['']
  options.show = false
  showConfirmChanges.value = false
}

const openOptionsModal = () => {
  tagIds.value = ['']
  showConfirmChanges.value = false
  options.show = true
}

const emitTags = (tagIdsP: string[]) => {
  tagIds.value = tagIdsP
  showConfirmChanges.value = true
}

const confirmnChanges = () => {
  cards.updateOne({ ...props.card, tags: tagIds.value })
  options.close()
}
</script>

<template>
  <div class="card" @mouseenter="openOptionsModal" @mouseleave="closeOptionsModal">
    <CardView :card="props.card" />
    <MoreOptions
      class="more-options"
      v-if="options.show"
      :visible="true"
      @close="closeOptionsModal"
    >
      <div class="options-container">
        <TagWithSwitchList
          :checkeds="props.card.tags"
          class="tags-switch"
          unic-name="tags-switch-card-options"
          @emit-tags="emitTags"
          direction="column"
        />
        <CardUpdate
          class="option-button"
          :card="props.card"
          @close="options.close"
          v-if="!showConfirmChanges"
        />
        <ThemeButton @click="confirmnChanges" class="option-button confirm-changes" v-else>
          Confirmar Alterações
        </ThemeButton>
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
  margin-bottom: $margin;
  padding: $margin;
  position: relative;
  box-sizing: border-box;
  @media screen and (max-width: 768px) {
    margin-bottom: 0;
    padding: 0;
    padding-top: calc($margin / 2);
  }
  & .more-options {
    position: absolute;
    top: calc($margin * 2);
    right: calc($margin * 2);
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
        flex-shrink: 0;
        width: 95%;
        margin-top: 8px;
      }
      & .tags-switch {
        margin-top: 0;
        width: 96%;
      }
    }
  }
  & .confirm-changes {
    background-color: rgb(116, 116, 255);
  }
}
</style>
