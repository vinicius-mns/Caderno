<script setup lang="ts">
import FlexContainer from '@/components/atoms/FlexContainer.vue'
import CrossIco from '@/components/atoms/icons/CrossIco.vue'
import LockIco from '@/components/atoms/icons/LockIco.vue'
import UnlockIco from '@/components/atoms/icons/UnlockIco.vue'
import ButtonCoinSlot from '@/components/molecules/ButtonCoinSlot.vue'
import CardTypes from '@/components/organisms/CardTypes.vue'
import { useCards } from '@/stores/cards/cards'
import type { Icard } from '@/stores/cards/Interfaces'
import { useCardsTags } from '@/stores/cardsTags'
import { useTags } from '@/stores/tags/tags'
import { useWindows } from '@/stores/windows'
import { computed, reactive, ref } from 'vue'

const windows = useWindows()

const tags = useTags()

const cards = useCards()

const card = computed(() => windows.cardView.props)

const cardsTags = useCardsTags()

const useCardPerspective = () => {
  const props = reactive({
    lock: true,
    axle: {
      x: '0deg',
      y: '0deg'
    },
    size: 6,
    jump: 1
  })

  const cursorX = ref(0)
  const cursorY = ref(0)

  const lockSet = () => {
    props.lock = !props.lock
    props.axle.x = '0deg'
    props.axle.y = '0deg'
  }

  const handdleRotate = (rotate: number, position: 'x' | 'y') => {
    if (rotate >= props.size || rotate <= -props.size) return
    props.axle[position] = `${rotate}deg`
  }

  const move = (cursor: MouseEvent) => {
    if (props.lock) return

    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2

    const execute = {
      x: () => {
        if (cursor.clientX < centerX) {
          handdleRotate(parseInt(props.axle.x) + props.jump, 'x')
        }
        if (cursor.clientX > centerX) {
          handdleRotate(parseInt(props.axle.x) - props.jump, 'x')
        }

        cursorX.value = cursor.clientX
      },
      y: () => {
        if (cursor.clientY < centerY) {
          handdleRotate(parseInt(props.axle.y) - props.jump, 'y')
        }
        if (cursor.clientY > centerY) {
          handdleRotate(parseInt(props.axle.y) + props.jump, 'y')
        }

        cursorY.value = cursor.clientY
      }
    }

    execute['x']()
    execute['y']()
  }

  return { props, lockSet, move }
}

const cardPerspective = useCardPerspective()

const openOptions = () => {
  if (!cardPerspective.props.lock) cardPerspective.lockSet()
}

const windowsHandleError = (error: unknown) => {
  error instanceof Error
    ? windows.errorMessage.open(error.message)
    : windows.errorMessage.open('erro inesperado')
}

const cardsUpdateReactive = async () => {
  await cards.atualizeReactiveCards({
    includeTags: tags.includeTags,
    excludeTags: tags.excludeTags
  })
}

const cardUpdate = async (card: Icard) => {
  try {
    await cards.update(card)
    await cardsUpdateReactive()
  } catch (e) {
    windowsHandleError(e)
  }
}

const cardDelete = async (card: Icard) => {
  try {
    await cards.deleteCard(card.id)
    await cardsUpdateReactive()
  } catch (e) {
    windowsHandleError(e)
  }
}
</script>

<template>
  <FlexContainer
    class="main-container"
    align-items="center"
    justify-content="center"
    v-if="windows.cardView.show"
  >
    <FlexContainer
      :class="['card-with-close', !cardPerspective.props.lock && 'perspectiveCard']"
      ref="cardWithClose"
      flex-direction="column"
      align-items="center"
      @mousemove="cardPerspective.move"
    >
      <FlexContainer class="header" align-items="center" justify-content="end">
        <ButtonCoinSlot content="Destravar card" @click="cardPerspective.lockSet">
          <LockIco v-if="cardPerspective.props.lock" />
          <UnlockIco v-if="!cardPerspective.props.lock" />
        </ButtonCoinSlot>

        <ButtonCoinSlot
          content="Fechar"
          @click="windows.cardView.close"
          background-color="red"
          border-color="red"
          class="button-header"
        >
          <CrossIco />
        </ButtonCoinSlot>
      </FlexContainer>

      <FlexContainer class="card-container" flex-direction="column">
        <CardTypes
          :card-props="card"
          :all-tags="tags.tags"
          font-size="large"
          class="card"
          type="view"
          :search-tag="tags.textFilterTags"
          @read-tags-by-name="tags.readAllTags"
          @emit-open-options="openOptions"
          @update-card="cardUpdate"
          @delete-card="cardDelete"
          @share-card="cardsTags.card.share"
        />
      </FlexContainer>
    </FlexContainer>
  </FlexContainer>
</template>

<style scoped lang="scss">
.main-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100dvw;
  height: 100dvh;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);

  & .card-with-close {
    & .header {
      width: calc(100% - 8px);

      & .button-header {
        margin-left: 8px;
      }
    }

    & .card-container {
      margin: 4px;
      max-height: calc(90dvh - 80px);
      max-width: 95dvw;
      overflow-y: auto;
      overflow-x: hidden;

      & .card {
        margin: 4px;
        width: 600px;
        max-width: calc(95dvw - 8px);
      }
    }

    margin-top: 48px;
    opacity: 0;
    animation: intro-animation 0.3s forwards;
  }
}

.perspectiveCard {
  transition: all 0.3s ease-out;
  transform-style: preserve-3d;
  transform: perspective(1200px) rotateX(v-bind('cardPerspective.props.axle.y'))
    rotateY(v-bind('cardPerspective.props.axle.x'));
}

@keyframes intro-animation {
  to {
    margin-top: 8px;
    opacity: 100%;
  }
}
</style>
