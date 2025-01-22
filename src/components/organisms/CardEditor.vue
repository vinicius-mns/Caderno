<script setup lang="ts">
import { computed, ref } from 'vue'
import { useTags } from '@/stores/tags/tags'
import type { Icard } from '@/stores/cards/Interfaces'
import FlexContainer from '@/components/atoms/FlexContainer.vue'
import PencilIco from '@/components/atoms/icons/PencilIco.vue'
import ThemeTextArea from '@/components/atoms/ThemeTextArea.vue'
import type { Itag } from '@/stores/tags/Interfaces'
import { useStylesCard } from '@/stores/stylesCard/stylesCard'
import ButtonSlot from '@/components/molecules/ButtonSlot.vue'
import TagSelectorWithList from '@/components/organisms/TagSelector.vue'
import ButtonCoinSlot from '../molecules/ButtonCoinSlot.vue'
import CrossIco from '../atoms/icons/CrossIco.vue'
import TagView from '../molecules/TagView.vue'
import { useStylesPage } from '@/stores/stylesPage/stylesPage'

const cardStyle = useStylesCard()

const stylesPage = useStylesPage()

const tags = useTags()

const props = defineProps<{ cardP: Icard; idTextImput: string; textFilterTags: string }>()

const emit = defineEmits<{
  (e: 'emitCard', v: Icard): void
  (e: 'emitCancel', v: Icard): void
  (e: 'sendCard', v: Icard): void
  (e: 'openCreateTag', v: null): void
}>()

const allTags = computed(() => tags.tags)

const useCard = (e: typeof emit) => {
  const cardRef = ref<Icard>(props.cardP)

  const setCard = (card: Icard) => {
    cardRef.value = card

    e('emitCard', card)
  }

  const setCardContent = (content: string) => setCard({ ...cardRef.value, content })

  const setCardTags = (tags: Itag[]) => setCard({ ...cardRef.value, tags })

  return {
    cardRef,
    setCard,
    setCardContent,
    setCardTags
  }
}

const card = useCard(emit)

const sendCard = () => emit('sendCard', card.cardRef.value)

const emitCancel = () => emit('emitCancel', card.cardRef.value)
</script>

<template>
  <FlexContainer class="main-container" flex-direction="column" align-items="center">
    <FlexContainer flex-direction="column" align-items="center" class="base-width">
      <FlexContainer class="top-container" align-items="center">
        <FlexContainer class="tags-selector-container">
          <TagSelectorWithList
            :text-filter="props.textFilterTags"
            :all-tags="allTags"
            :tags-checked="card.cardRef.value.tags"
            :coin-button="false"
            @emit-selected="card.setCardTags"
            @open-create-tag="emit('openCreateTag', null)"
            class="tag-selector"
          />
        </FlexContainer>

        <FlexContainer class="tags-container" align-items="center">
          <TagView
            v-for="(tag, i) in card.cardRef.value.tags"
            :key="i"
            :tag="tag"
            class="tag"
            :mini-tag="true"
          />
        </FlexContainer>

        <!-- <TagSelectorWithList
          :text-filter="props.textFilterTags"
          :all-tags="allTags"
          :tags-checked="card.cardRef.value.tags"
          :coin-button="false"
          @emit-selected="card.setCardTags"
          class="tag-selector"
        />

        <FlexContainer class="tags-container">
          <TagView v-for="(tag, i) in card.cardRef.value.tags" :key="i" :tag="tag" class="tag" />
        </FlexContainer> -->
      </FlexContainer>

      <ThemeTextArea
        class="textarea"
        :style="cardStyle.atualStyle"
        :id="props.idTextImput"
        :content="card.cardRef.value.content"
        @emit-content="card.setCardContent"
      />
    </FlexContainer>

    <FlexContainer align-items="center" class="buttons-container base-width">
      <ButtonSlot
        content="Confirmar alteração"
        @click="sendCard()"
        class="confirm-button"
        :border="true"
      >
        <PencilIco />
      </ButtonSlot>

      <ButtonCoinSlot content="Cancelar" class="cancel-button" @click="emitCancel()">
        <CrossIco />
      </ButtonCoinSlot>
    </FlexContainer>
  </FlexContainer>
</template>

<style scoped lang="scss">
.main-container {
  max-height: 80dvh;
  overflow: auto;
  position: relative;
  box-sizing: border-box;
  padding: 10px;
  border-radius: v-bind('stylesPage.borderRadius.outside');
  border: solid 1px v-bind('stylesPage.atualColor.border');
  // background-color: v-bind('stylesPage.atualColor.hover');

  & .base-width {
    width: 100%;
  }

  & .top-container {
    width: 100%;
    margin-bottom: 8px;
    height: 40px;

    & .tags-selector-container {
      width: auto;
      height: 100%;
      flex-shrink: 0;
    }

    & .tags-container {
      overflow-x: hidden;
      width: 100%;
      height: 100%;

      & .tag {
        width: auto;
      }
    }
  }

  & .textarea {
    background-color: v-bind('stylesPage.atualColor.front');
    border: solid 1px red;
  }

  & .buttons-container {
    margin-top: 8px;

    & .confirm-button {
      flex-shrink: 1;
      margin-right: 8px;
    }

    & .cancel-button {
      flex-shrink: 1;
    }
  }
}
</style>
