<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { useTags } from '@/stores/tags/tags'
import { useCards } from '@/stores/cards/cards'
import type { Icard } from '@/stores/cards/Interfaces'
import WindowsSlot from '@/components/molecules/WindowsSlot.vue'
import { useWindows } from '@/stores/windows'
import FlexContainer from '@/components/atoms/FlexContainer.vue'
import PencilIco from '@/components/atoms/icons/PencilIco.vue'
import ThemeTextArea from '@/components/atoms/ThemeTextArea.vue'
import type { Itag } from '@/stores/tags/Interfaces'
import { useStylesCard } from '@/stores/stylesCard/stylesCard'
import FloatModalSlot from '@/components/atoms/FloatModalSlot.vue'
import ButtonSlot from '@/components/molecules/ButtonSlot.vue'
import TagSelectorWithList from '@/components/organisms/TagSelectorWithList.vue'

const cardStyle = useStylesCard()

const window = useWindows()

const cards = useCards()

const tags = useTags()

const allTags = computed(() => tags.tags)

const modal = ref<InstanceType<typeof FloatModalSlot>>()

const executeAndCloseModal = (callBack: () => void) => {
  callBack()

  modal.value?.close()
}

const useCard = (closeModalCallback: typeof executeAndCloseModal) => {
  const cardRef = ref<Icard>({} as Icard)

  const _closeWindows = () => window.cardEdit.close()

  const set = (card: Icard) => (cardRef.value = card)

  const setContent = (content: string) => {
    set({ ...cardRef.value, content })
  }

  const setTags = (tags: Itag[]) => {
    closeModalCallback(() => set({ ...cardRef.value, tags }))
  }

  const saveUpdate = async () => {
    try {
      await cards.update(cardRef.value)

      await cards.atualizeReactiveCards({
        includeTags: tags.includeTags,
        excludeTags: tags.excludeTags
      })

      _closeWindows()
    } catch (e) {
      e instanceof Error
        ? window.errorMessage.open(e.message)
        : window.errorMessage.open('erro inesperado')
    }
  }

  return {
    cardRef,
    set,
    setContent,
    setTags,
    saveUpdate
  }
}

const card = useCard(executeAndCloseModal)

watchEffect(() => card.set(window.cardEdit.props))
</script>

<template>
  <WindowsSlot
    v-if="window.cardEdit.show"
    :title="window.cardEdit.title"
    @close="window.cardEdit.close"
  >
    <FlexContainer class="main-container" flex-direction="column" align-items="center">
      <FlexContainer flex-direction="column" align-items="center" class="base-width">
        <TagSelectorWithList
          :all-tags="allTags"
          :tags-checked="card.cardRef.value.tags"
          @emit-selected="card.setTags"
        />

        <ThemeTextArea
          :style="cardStyle.atualStyle"
          id="card-editor"
          :content="card.cardRef.value.content"
          @emit-content="card.setContent"
        />
      </FlexContainer>

      <ButtonSlot
        content="Confirmar alteração"
        @click="card.saveUpdate"
        class="confirm-button base-width"
      >
        <PencilIco />
      </ButtonSlot>
    </FlexContainer>
  </WindowsSlot>
</template>

<style scoped lang="scss">
.main-container {
  width: 500px;
  max-width: 95dvw;
  max-height: 80dvh;
  overflow: auto;
  & .max-width {
    width: 100%;
  }
  & .base-width {
    width: calc(100% - 30px);
  }
  & .confirm-button {
    margin-top: 8px;
    margin-bottom: 10px;
  }
  & .block {
    background-color: rgba(241, 50, 50, 0.349);
    cursor: not-allowed;
  }
}
</style>
