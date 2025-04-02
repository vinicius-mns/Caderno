<script setup lang="ts">
import type { Icard } from '@/stores/cards/Interfaces'
import FlexContainer from '@/components/atoms/FlexContainer.vue'
import CheckIco from '@/components/atoms/icons/CheckIco.vue'
import CrossIco from '@/components/atoms/icons/CrossIco.vue'
import { useStylesCard } from '@/stores/stylesCard/stylesCard'
import ThemeTextArea from '@/components/atoms/ThemeTextArea.vue'
import ButtonSlot from '@/components/molecules/ButtonSlot.vue'
import { nextTick, ref } from 'vue'
import ButtonCoinSlot from '@/components/molecules/ButtonCoinSlot.vue'
import type { Itag } from '@/stores/tags/Interfaces'
import TagIco from '@/components/atoms/icons/TagIco.vue'
import TagsSelectable from './partials/TagsSelectable.vue'

const cardStyle = useStylesCard()

export type ICardType = 'create' | 'editor' | 'view' | 'delete'

const props = defineProps<{
  card: Icard
  tags: Itag[]
  textFilterTags: string
}>()

const emit = defineEmits<{
  (e: 'updatedCard', v: Icard): void
  (e: 'cancel', v: null): void
  (e: 'searchTag', v: string): void
  (e: 'openCreateTag', v: null): void
  (e: 'clear', v: null): void
}>()

// valores

const cardContent = ref(props.card.content)

const cardTags = ref(props.card.tags)

// metodos

const cardContentSet = (newContent: string) => {
  cardContent.value = newContent
}

const cardTagsSet = (newTags: Itag[]) => {
  cardTags.value = newTags
}

const cancel = () => emit('cancel', null)

const handleSendCard = (e: KeyboardEvent) => {
  if (e.ctrlKey && e.key === 'Enter') updatedCard()
}

const handleSendTags = (tags: Itag[]) => {
  cardTagsSet(tags)

  const isEmptyContent = cardContent.value.length <= 0
  const isSameContent = cardContent.value === props.card.content

  if (isEmptyContent || isSameContent) return

  nextTick(updatedCard)
}

// emicoes

const updatedCard = () => {
  emit('updatedCard', {
    ...props.card,
    content: cardContent.value,
    tags: cardTags.value
  })
}

const searchTag = (tag: string) => emit('searchTag', tag)

const openCreateTag = (v: null) => emit('openCreateTag', v)

const clear = (v: null) => emit('clear', v)
</script>

<template>
  <FlexContainer class="card-type-container" flex-direction="column">
    <ThemeTextArea
      class="card text-area"
      :id="props.card.id"
      :content="cardContent"
      :max-height-px="426"
      :style="cardStyle.atualStyle"
      @emit-content="cardContentSet"
      @keydown="handleSendCard"
    />

    <FlexContainer class="footer">
      <FlexContainer class="options">
        <TagsSelectable
          :all-tags="props.tags"
          :tags-checked="props.card.tags"
          :text-filter-tags="props.textFilterTags"
          @tags-updated="handleSendTags"
          @search-tag="searchTag"
          @open-create-tag="openCreateTag"
          @clear="clear"
        >
          <ButtonSlot
            class="button-option"
            content="Selecionar tags"
            border-radius="50px"
            :invert-color="true"
          >
            <TagIco />
          </ButtonSlot>
        </TagsSelectable>

        <ButtonCoinSlot
          content="Confirmar"
          class="button-option"
          border-radius="50px"
          @click="updatedCard"
          :invert-color="true"
        >
          <CheckIco />
        </ButtonCoinSlot>
      </FlexContainer>

      <FlexContainer class="tags-container" flex-wrap="wrap">
        <span class="tag" v-for="(tag, i) in cardTags" :key="i">{{ tag[0] }}</span>
      </FlexContainer>
    </FlexContainer>
  </FlexContainer>
</template>

<style scoped lang="scss">
.card-type-container {
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
