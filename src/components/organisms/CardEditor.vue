<script setup lang="ts">
import type { Icard } from '@/stores/cards/Interfaces'
import FlexContainer from '@/components/atoms/FlexContainer.vue'
import CheckIco from '@/components/atoms/icons/CheckIco.vue'
import CrossIco from '@/components/atoms/icons/CrossIco.vue'
import PencilIco from '@/components/atoms/icons/PencilIco.vue'
import ShareIco from '@/components/atoms/icons/ShareIco.vue'
import TrashIco from '@/components/atoms/icons/TrashIco.vue'
import { useStylesCard } from '@/stores/stylesCard/stylesCard'
import ThemeTextArea from '@/components/atoms/ThemeTextArea.vue'
import ButtonSlot from '@/components/molecules/ButtonSlot.vue'
import CardView from '@/components/molecules/CardView.vue'
import { nextTick, ref } from 'vue'
import ThemeH1 from '../atoms/ThemeH1.vue'
import ButtonCoinSlot from '../molecules/ButtonCoinSlot.vue'
import TagSelector from '@/components/molecules/TagSelector.vue'
import type { Itag } from '@/stores/tags/Interfaces'
import FloatModalSlot from '../atoms/FloatModalSlot.vue'
import PlusIco from '../atoms/icons/PlusIco.vue'
import ModalCard from '../atoms/ModalCard.vue'
import { v4 as uuid } from 'uuid'
import TagIco from '../atoms/icons/TagIco.vue'
import TagsSelectable from '../molecules/TagsSelectable.vue'
import TagsConstainer2 from '../molecules/tagsConstainer2.vue'

const cardStyle = useStylesCard()

const props = withDefaults(
  defineProps<{
    card: Icard
    allTags: Itag[]
    searchTag: string
    fontSize?: string
    type: 'create' | 'update'
  }>(),
  {
    fontSize: ''
  }
)

const emit = defineEmits<{
  (e: 'updatedCard', v: Icard): void
  (e: 'cancelCard', v: Icard): void
  (e: 'tagCreateOpen', v: null): void
  (e: 'tagReadByName', v: string): void
}>()

const useCardReative = () => {
  const cardEmpty: Icard = {
    id: uuid(),
    content: '',
    date: new Date(),
    tags: []
  }

  const card = ref<Icard>(props.card || cardEmpty)

  const cardSet = (newCard: Icard) => {
    card.value = newCard
  }

  return { card, set: cardSet }
}

const useButtonMoreOptions = () => {
  const show = ref(false)

  const open = () => (show.value = true)

  const close = () => (show.value = false)

  return { show, open, close }
}

// const cardReative = useCardReative()

const cardEditor = useCardReative()

const buttonMoreOptions = useButtonMoreOptions()

const cardCancel = () => {
  emit('cancelCard', props.card || cardEditor.card.value)
}

const sendCard = () => {
  emit('updatedCard', cardEditor.card.value)
}

const sendTags = (tags: Itag[]) => {
  cardEditor.set({ ...cardEditor.card.value, tags })

  nextTick(sendCard)
}

const handleSendCard = (e: KeyboardEvent) => {
  if (e.ctrlKey && e.key === 'Enter') sendCard()
}
</script>

<template>
  <FlexContainer
    class="card-type-container"
    flex-direction="column"
    @mouseenter="buttonMoreOptions.open()"
    @mouseleave="buttonMoreOptions.close()"
  >
    <ThemeH1 v-if="props.type === 'create'" class="title" content="Criando card..." />

    <ThemeH1 v-if="props.type === 'update'" class="title" content="Editando card..." />

    <ThemeTextArea
      class="card text-area"
      :id="cardEditor.card.value.id"
      :content="cardEditor.card.value.content"
      :max-height-px="426"
      :style="cardStyle.atualStyle"
      @emit-content="cardEditor.set({ ...cardEditor.card.value, content: $event })"
      @keydown="handleSendCard"
    />

    <FlexContainer class="footer">
      <FlexContainer class="options">
        <TagSelector
          class="button-option tag-selector-button"
          :all-tags="props.allTags"
          :tags-checked="cardEditor.card.value.tags"
          border-radius="50px"
          :text-filter="props.searchTag"
          @search-tag="emit('tagReadByName', $event)"
          @emit-selected="sendTags"
          @open-create-tag="emit('tagCreateOpen', null)"
        />

        <ButtonCoinSlot
          content="Confirmar"
          class="button-option"
          border-radius="50px"
          @click="sendCard()"
        >
          <CheckIco />
        </ButtonCoinSlot>

        <ButtonCoinSlot
          content="Cancelar"
          border-radius="50px"
          class="button-option"
          @click="cardCancel()"
        >
          <CrossIco />
        </ButtonCoinSlot>
      </FlexContainer>

      <FlexContainer class="tags-container" flex-wrap="wrap">
        <span class="tag" v-for="(tag, i) in cardEditor.card.value.tags" :key="i">{{
          tag[0]
        }}</span>
      </FlexContainer>
    </FlexContainer>
  </FlexContainer>
</template>

<style scoped lang="scss">
.card-type-container {
  // margin-bottom: 18px;
  position: relative;

  & .more-options-container {
    & .button-more-options {
      position: absolute;
      right: 10px;
      top: 10px;
    }

    & .card-options {
      width: 200px;
      height: fit-content;

      & .button-option {
        width: 100%;
      }
    }
  }

  & .title {
    width: 100%;
    margin-left: 20px;
  }

  & .card {
    cursor: pointer;
    width: 100%;
  }

  & .text-area {
    cursor: text;
  }

  & .footer {
    width: 100%;

    & .tags-container {
      margin-top: 6px;
      word-wrap: wrap;

      & .tag {
        margin: 4px;
      }
    }

    & .options {
      position: sticky;
      z-index: 1;
      bottom: 0;
      margin-top: 6px;

      & .button-option {
        width: auto;
        margin-right: 8px;
      }
    }
  }
}
</style>
