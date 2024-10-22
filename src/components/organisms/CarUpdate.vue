<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { useTags } from '@/stores/tags/tags'
import type { Icard } from '@/stores/cards/Interfaces'
import FlexContainer from '@/components/atoms/FlexContainer.vue'
import PencilIco from '@/components/atoms/icons/PencilIco.vue'
import ThemeTextArea from '@/components/atoms/ThemeTextArea.vue'
import type { Itag } from '@/stores/tags/Interfaces'
import { useStylesCard } from '@/stores/stylesCard/stylesCard'
import ButtonSlot from '@/components/molecules/ButtonSlot.vue'
import TagSelectorWithList from '@/components/organisms/TagSelectorWithList.vue'
import { useStylesPage } from '@/stores/stylesPage/stylesPage'
import ButtonCoinSlot from '../molecules/ButtonCoinSlot.vue'
import CrossIco from '../atoms/icons/CrossIco.vue'

const cardStyle = useStylesCard()

const pageStyle = useStylesPage()

const tags = useTags()

const props = defineProps<{ cardP: Icard }>()

const emit = defineEmits<{
  (e: 'emitCard', v: Icard): void
  (e: 'emitCancel', v: Icard): void
}>()

const allTags = computed(() => tags.tags)

const useCard = () => {
  const cardRef = ref<Icard>({} as Icard)

  const setCard = (card: Icard) => (cardRef.value = card)

  const setCardContent = (content: string) => setCard({ ...cardRef.value, content })

  const setCardTags = (tags: Itag[]) => setCard({ ...cardRef.value, tags })

  return {
    cardRef,
    setCard,
    setCardContent,
    setCardTags
  }
}

const card = useCard()

const emitCard = () => emit('emitCard', card.cardRef.value)

const emitCancel = () => emit('emitCancel', card.cardRef.value)

watchEffect(() => card.setCard(props.cardP))
</script>

<template>
  <FlexContainer class="main-container" flex-direction="column" align-items="center">
    <FlexContainer flex-direction="column" align-items="center" class="base-width">
      <TagSelectorWithList
        :all-tags="allTags"
        :tags-checked="card.cardRef.value.tags"
        @emit-selected="card.setCardTags"
      />

      <ThemeTextArea
        :style="cardStyle.atualStyle"
        id="card-editor"
        :content="card.cardRef.value.content"
        @emit-content="card.setCardContent"
      />
    </FlexContainer>

    <FlexContainer align-items="center" class="buttons-container base-width">
      <ButtonSlot
        content="Confirmar alteração"
        @click="emitCard()"
        class="confirm-button"
        :reverse-color="true"
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
  border: solid 1px v-bind('pageStyle.atualColor.border');
  box-sizing: border-box;
  max-height: 80dvh;
  overflow: auto;
  border-radius: 8px;
  padding: 5px;

  & .base-width {
    width: 100%;
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

  animation: init 0.5s forwards;
  opacity: 0%;
  margin-top: 100px;
}

@keyframes init {
  to {
    opacity: 100%;
    margin-top: 0;
  }
}
</style>
