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

const cardStyle = useStylesCard()

const tags = useTags()

const props = defineProps<{ cardP: Icard; idTextImput: string; textFilterTags: string }>()

const emit = defineEmits<{
  (e: 'emitCard', v: Icard): void
  (e: 'emitCancel', v: Icard): void
  (e: 'sendCard', v: Icard): void
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
      <FlexContainer class="top-container">
        <TagSelectorWithList
          :text-filter="props.textFilterTags"
          :all-tags="allTags"
          :tags-checked="card.cardRef.value.tags"
          @emit-selected="card.setCardTags"
        />
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
        :reverse-color="true"
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

  & .base-width {
    width: 100%;
  }

  & .top-container {
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
}
</style>
