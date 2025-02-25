<script setup lang="ts">
import { useStylesPage } from '@/stores/stylesPage/stylesPage'
import { nextTick, reactive, ref } from 'vue'

const stylePage = useStylesPage()

const props = withDefaults(
  defineProps<{
    closeOnClick?: boolean
  }>(),
  {
    closeOnClick: false
  }
)

const emit = defineEmits<{
  (e: 'open', v: void): void
  (e: 'close', v: void): void
}>()

const card = ref<HTMLElement>()

const showFlotModal = ref(false)

const open = () => {
  showFlotModal.value = true
  emit('open')
}

const close = () => {
  showFlotModal.value = false
  emit('close')
}

const toggleShowModal = () => (showFlotModal.value = !showFlotModal.value)

const cursorPosition = reactive({ x: '0px', y: '0px' })

const setCursorPostion = (e: MouseEvent) => {
  cursorPosition.x = `${e.clientX}px`
  cursorPosition.y = `${e.clientY + 10}px`
}

const cardRepositionX = () => {
  const cardWidth = card.value?.clientWidth as number
  const windowWidth = window.innerWidth
  const xPosition = parseInt(cursorPosition.x)

  const cardStatus = (): 'inLeft' | 'InRight' | 'IsLarge' | 'normal' => {
    if (cardWidth > windowWidth / 1.11) return 'IsLarge'
    if (xPosition + cardWidth / 2 >= windowWidth) return 'InRight'
    if (xPosition - cardWidth / 2 <= 0) return 'inLeft'
    return 'normal'
  }

  const toLeft = () => {
    cursorPosition.x = `${xPosition - cardWidth}px`
  }

  const toCenter = () => {
    cursorPosition.x = `${windowWidth / 2 - cardWidth / 2}px`
  }

  const upOnCursor = () => {
    cursorPosition.x = `${xPosition - cardWidth / 2}px`
  }

  const execute = () => {
    const status = cardStatus()

    if (status === 'IsLarge') toCenter()
    if (status === 'InRight') toLeft()
    if (status === 'normal') upOnCursor()
    if (status === 'inLeft') return
  }

  return execute()
}

const cardRepositionY = () => {
  const cardHeight = card.value?.clientHeight as number
  const cardInBottonSide = parseInt(cursorPosition.y) > window.innerHeight / 2
  const cardTranslateToTop = `${parseInt(cursorPosition.y) - cardHeight - 20}px`

  if (cardInBottonSide) cursorPosition.y = cardTranslateToTop
}

const openCard = (e: MouseEvent) => {
  setCursorPostion(e)
  toggleShowModal()
  nextTick(() => {
    cardRepositionX()
    cardRepositionY()
  })
}

const closeIfCloseOnClick = () => {
  props.closeOnClick && close()
}

defineExpose({
  open,
  close
})
</script>

<template>
  <div class="container-float-modal">
    <div class="button-slot" @click="openCard">
      <slot name="button-slot"></slot>
    </div>

    <div class="glass" v-if="showFlotModal" @click="close">
      <div class="float-card" @click.stop ref="card" @click="closeIfCloseOnClick">
        <slot class="slot" name="container-slot"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container-float-modal {
  & .glass {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 3;
    padding: 0;
    margin: 0;
    width: 100dvw;
    height: 100dvh;
    // border-radius: 16px;
    // backdrop-filter: blur(3px);
    // background-color: rgba(1, 7, 27, 0.2);
    // -webkit-backdrop-filter: blur(3px);
  }

  & .float-card {
    position: fixed;
    opacity: 0;
    left: v-bind('cursorPosition.x');
    top: v-bind('cursorPosition.y');
    animation: initModal 0.3s forwards;
    margin-top: 20px;
    border-radius: v-bind('stylePage.borderRadius.outside');
    box-shadow:
      rgba(17, 17, 26, 0.5) 0px 4px 16px,
      rgba(17, 17, 26, 0.2) 0px 8px 32px;
  }
}
@keyframes initModal {
  to {
    opacity: 100%;
    margin-top: 0;
  }
}
</style>
