<script setup lang="ts">
import FlexContainer from '@/components/atoms/FlexContainer.vue'
import CheckIco from '@/components/atoms/icons/CheckIco.vue'
import CrossIco from '@/components/atoms/icons/CrossIco.vue'
import LockIco from '@/components/atoms/icons/LockIco.vue'
import PencilIco from '@/components/atoms/icons/PencilIco.vue'
import ShareIco from '@/components/atoms/icons/ShareIco.vue'
import TrashIco from '@/components/atoms/icons/TrashIco.vue'
import UnlockIco from '@/components/atoms/icons/UnlockIco.vue'
import ThemeButtonClose from '@/components/atoms/ThemeButtonClose.vue'
import ThemeMarkown from '@/components/atoms/ThemeMarkown.vue'
import ThemeTextArea from '@/components/atoms/ThemeTextArea.vue'
import ButtonCoinSlot from '@/components/molecules/ButtonCoinSlot.vue'
import ButtonSlot from '@/components/molecules/ButtonSlot.vue'
import CardView from '@/components/molecules/CardView.vue'
import SearchImput from '@/components/molecules/SearchImput.vue'
import TagView2 from '@/components/molecules/TagView2.vue'
import WindowsSlot from '@/components/molecules/WindowsSlot.vue'
import CardEditor from '@/components/organisms/CardEditor.vue'
import type { ICardType } from '@/components/organisms/CardTypes.vue'
import CardTypes from '@/components/organisms/CardTypes.vue'
import { useCards } from '@/stores/cards/cards'
import { useStylesCard } from '@/stores/stylesCard/stylesCard'
import { useStylesPage } from '@/stores/stylesPage/stylesPage'
import type { Itag } from '@/stores/tags/Interfaces'
import { useTags } from '@/stores/tags/tags'
import { useWindows } from '@/stores/windows'
import { computed, ref } from 'vue'

const stylesPage = useStylesPage()

const cardStyle = useStylesCard()

const windows = useWindows()

const tags = useTags()

const cards = useCards()

const allTags = computed(() => tags.tags)

const card = computed(() => windows.cardView.props)

const tagsInCard = computed(() => windows.cardView.props.tags)

const useCardPerspective = () => {
  const lock = ref(true)
  const xRotate = ref('0deg')
  const yRotate = ref('0deg')

  const cursorX = ref(0)
  const cursorY = ref(0)

  const lockSet = () => {
    lock.value = !lock.value

    xRotate.value = '0deg'

    yRotate.value = '0deg'
  }

  const handdleRotate = (rotante: number, position: 'x' | 'y') => {
    const size = 5

    if (position === 'x') {
      xRotate.value = `${rotante}deg`
      if (rotante >= size) xRotate.value = `${size}deg`
      if (rotante <= -size) xRotate.value = `${-size}deg`
    }

    if (position === 'y') {
      yRotate.value = `${rotante}deg`
      if (rotante >= size) yRotate.value = `${size}deg`
      if (rotante <= -size) yRotate.value = `${-size}deg`
    }
  }

  const move = (cursor: MouseEvent, position: 'x' | 'y') => {
    if (position === 'x') {
      if (cursor.clientX < cursorX.value) {
        handdleRotate(parseInt(xRotate.value) + 1, 'x')
      }
      if (cursor.clientX > cursorX.value) {
        handdleRotate(parseInt(xRotate.value) - 1, 'x')
      }

      cursorX.value = cursor.clientX
    }

    if (position === 'y') {
      if (cursor.clientY < cursorY.value) {
        handdleRotate(parseInt(yRotate.value) - 1, 'y')
      }
      if (cursor.clientY > cursorY.value) {
        handdleRotate(parseInt(yRotate.value) + 1, 'y')
      }

      cursorY.value = cursor.clientY
    }
  }

  const moveCard = (cursor: MouseEvent) => {
    if (!lock.value) {
      move(cursor, 'x')
      move(cursor, 'y')
    }
  }

  return { x: xRotate, y: yRotate, lock, lockSet, moveCard }
}

const cardPerspective = useCardPerspective()

const openOptions = () => {
  if (!cardPerspective.lock.value) cardPerspective.lockSet()
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
      :class="['card-with-close', !cardPerspective.lock.value && 'perspectiveCard']"
      ref="cardWithClose"
      flex-direction="column"
      align-items="center"
      @mousemove="cardPerspective.moveCard"
    >
      <FlexContainer class="header" align-items="center" justify-content="end">
        <ButtonCoinSlot content="Destravar card" @click="cardPerspective.lockSet">
          <LockIco v-if="cardPerspective.lock.value" />
          <UnlockIco v-if="!cardPerspective.lock.value" />
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
          @emit-open-options="openOptions"
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
      max-height: calc(40dvw - 40px);
      overflow-y: auto;
      overflow-x: hidden;

      & .card {
        margin: 4px;
        width: 100%;
        width: 600px;
      }
    }

    margin-top: 48px;
    opacity: 0;
    animation: intro-animation 0.3s forwards;
  }
}

.perspectiveCard {
  transition: all 0.3s;
  transform-style: preserve-3d;
  transform: perspective(1200px) rotateX(v-bind('cardPerspective.y.value'))
    rotateY(v-bind('cardPerspective.x.value'));
}

@keyframes intro-animation {
  to {
    margin-top: 8px;
    opacity: 100%;
  }
}
</style>
