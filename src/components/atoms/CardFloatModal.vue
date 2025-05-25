<script setup lang="ts">
import { nextTick, onMounted, reactive, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    closeOnClick?: boolean
    clickStop?: boolean
    cursorX: number
    cursorY: number
  }>(),
  {
    closeOnClick: false,
    clickStop: false
  }
)

const emit = defineEmits<{
  (e: 'close', v: null): void
}>()

const card = ref<HTMLElement>()

const cursorPosition = reactive({ x: '0px', y: '0px' })

const setCursorPostion = () => {
  cursorPosition.x = `${props.cursorX}px`
  cursorPosition.y = `${props.cursorY + 10}px`
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

    console.log(status)

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

const openCard = () => {
  setCursorPostion()

  nextTick(() => {
    cardRepositionX()
    cardRepositionY()
  })
}

const close = () => {
  emit('close', null)
}

const closeIfCloseOnClick = () => {
  props.closeOnClick && close()
}

defineExpose({
  close
})

onMounted(() => {
  openCard()
})
</script>

<template>
  <div class="glass" @click="close">
    <div class="float-card" @click.stop ref="card" @click="closeIfCloseOnClick">
      <slot class="slot" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.glass {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 3;
  padding: 0;
  margin: 0;
  width: 100dvw;
  height: 100dvh;
  backdrop-filter: blur(3px);
  background-color: rgba(1, 7, 27, 0.2);
  -webkit-backdrop-filter: blur(3px);
}

.float-card {
  position: fixed;
  opacity: 0;
  left: v-bind('cursorPosition.x');
  top: v-bind('cursorPosition.y');
  animation: initModal 0.3s forwards;
  margin-top: 20px;
}

@keyframes initModal {
  to {
    opacity: 100%;
    margin-top: 0;
  }
}
</style>
