<script setup lang="ts">
import { computed } from 'vue'
import { useTags } from '@/stores/tags/tags'
import { useCards } from '@/stores/cards/cards'
import WindowsSlot from '@/components/molecules/WindowsSlot.vue'
import { useWindows } from '@/stores/windows'
import FlexContainer from '@/components/atoms/FlexContainer.vue'
import ButtonSlot from '@/components/molecules/ButtonSlot.vue'
import CardView from '@/components/molecules/CardView.vue'
import SaveIco from '@/components/atoms/icons/SaveIco.vue'

const window = useWindows()

const cards = useCards()

const tags = useTags()

const card = computed(() => window.cardShare.props)

const cardsUpdateReactive = async () => {
  await cards.atualizeReactiveCards({
    includeTags: tags.includeTags,
    excludeTags: tags.excludeTags
  })
}

const createEmptyTags = async () => {
  const cardTags = card.value.tags
  const alltagNames = tags.tags.map((t) => t[1])

  const emptyTags = cardTags.filter((t) => !alltagNames.includes(t[1]))

  if (emptyTags) {
    const objectEmptytags = emptyTags.map((t) => ({ emoji: t[0], name: t[1] }))

    await tags.createManyTags(objectEmptytags)
  }
}

const createCard = async () => {
  await cards.create(card.value)
  await cardsUpdateReactive()
}

const saveCardAndTags = async () => {
  await createEmptyTags()
  await createCard()
  window.cardShare.close()
}
</script>

<template>
  <WindowsSlot
    v-if="window.cardShare.show"
    :title="window.cardShare.title"
    @close="window.cardShare.close"
  >
    <FlexContainer class="main-container" flex-direction="column" align-items="center">
      <FlexContainer class="max-w scroll" flex-direction="column" align-items="center">
        <CardView :card="card" class="card" />
      </FlexContainer>

      <ButtonSlot content="Salvar" class="button" @click="saveCardAndTags">
        <SaveIco />
      </ButtonSlot>
    </FlexContainer>
  </WindowsSlot>
</template>

<style scoped lang="scss">
.main-container {
  width: 500px;
  max-width: 95dvw;
  max-height: 80dvh;
  overflow: hidden;
  padding: 15px;
  box-sizing: border-box;

  & .max-w {
    width: 100%;
  }

  & .scroll {
    overflow-y: auto;
  }

  & .card {
    width: calc(100% - 15px);
  }

  & .button {
    width: calc(100% - 15px);
    margin-top: 15px;
  }
}
</style>
