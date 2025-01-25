<script setup lang="ts">
import FlexContainer from '@/components/atoms/FlexContainer.vue'
import ButtonCoinSlot from '../molecules/ButtonCoinSlot.vue'
import ButtonSlot from '../molecules/ButtonSlot.vue'
import PencilIco from '../atoms/icons/PencilIco.vue'
import TagIco from '../atoms/icons/TagIco.vue'
import { useWindows } from '@/stores/windows'
import FilterIco from '../atoms/icons/FilterIco.vue'
import ModalCard from '../atoms/ModalCard.vue'
import CardTypes from '../organisms/CardTypes.vue'
import { ref } from 'vue'
import { useTags } from '@/stores/tags/tags'
import { useCards } from '@/stores/cards/cards'
import type { Icard } from '@/stores/cards/Interfaces'
import { useFloatMessage } from '@/stores/floatMessage'

const tags = useTags()

const cards = useCards()

const windows = useWindows()

const floatMessage = useFloatMessage()

const windowsHandleError = (error: unknown) => {
  error instanceof Error
    ? windows.errorMessage.open(error.message)
    : windows.errorMessage.open('erro inesperado')
}

const cardsUpdateReactive = async () => {
  try {
    await cards.atualizeReactiveCards({
      includeTags: tags.includeTags,
      excludeTags: tags.excludeTags
    })
  } catch (e) {
    windowsHandleError(e)
  }
}

const cardCreate = {
  show: ref(false),
  showSet: (v: boolean) => (cardCreate.show.value = v),
  create: async (cardParam: Icard) => {
    try {
      await cards.create(cardParam)

      await cardsUpdateReactive()

      cardCreate.showSet(false)

      floatMessage.openMessage(floatMessage.messages.cardCreateSucess)
    } catch (e) {
      windowsHandleError(e)
    }
  }
}
</script>

<template>
  <FlexContainer class="bottom-container" align-items="center" flex-direction="column">
    <ModalCard
      v-if="cardCreate.show.value"
      class="modal-create-card"
      :box-shadow="true"
      :intro-animation="true"
    >
      <CardTypes
        class="card"
        type="create"
        :card-props="null"
        :all-tags="tags.tags"
        @create-card="cardCreate.create"
        @cancel-card="cardCreate.showSet(false)"
        @tag-create-open="windows.tagCreate.open"
      />
    </ModalCard>

    <ModalCard class="bottom-card" :box-shadow="true">
      <FlexContainer>
        <ButtonSlot
          border-radius="50px"
          class="button-create-card button-margin"
          content="Criar card"
          @click="cardCreate.showSet(true)"
          :invert-color="true"
        >
          <PencilIco />
        </ButtonSlot>

        <ButtonCoinSlot
          content="Tags"
          :border="true"
          class="button-margin"
          @click="windows.tags.open(null)"
        >
          <TagIco />
        </ButtonCoinSlot>

        <ButtonCoinSlot
          content="Filtrar"
          :border="true"
          class="button-margin"
          @click="windows.filterCardsByTags.open(null)"
        >
          <FilterIco />
        </ButtonCoinSlot>
      </FlexContainer>
    </ModalCard>
  </FlexContainer>
</template>

<style scoped lang="scss">
.bottom-container {
  position: fixed;
  width: 100%;
  bottom: 22px;

  & .modal-create-card {
    width: 500px;
    max-height: 90dvh;

    & .card {
      width: 100%;
    }
  }

  & .bottom-card {
    padding: 8px;
    border-radius: 100px;
    margin-top: 12px;

    & .button-margin {
      margin: 0 4px;
    }

    & .button-create-card {
      width: 180px;
      justify-content: center;
    }
  }
}
</style>
