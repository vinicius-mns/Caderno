<script setup lang="ts">
import { nextTick, onMounted, reactive, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    closeOnClick?: boolean
    clickStop?: boolean
    position: {
      cursorX: string
      cursorY: string
      positionX: 'left' | 'center' | 'right'
      positionY: 'top' | 'bottom'
    }
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
  cursorPosition.x = props.position.cursorX
  cursorPosition.y = props.position.cursorY
}

const cardRepositionX = () => {
  const cardWidth = card.value?.clientWidth as number

  if (props.position.positionX === 'left') {
    cursorPosition.x = props.position.cursorX
  }

  if (props.position.positionX === 'center') {
    cursorPosition.x = `${parseFloat(props.position.cursorX) - cardWidth / 2}px`
  }

  if (props.position.positionX === 'right') {
    cursorPosition.x = `${parseFloat(props.position.cursorX) - cardWidth}px`
  }
}

const cardRepositionY = () => {
  const cardHeight = card.value?.clientHeight as number

  if (props.position.positionY === 'bottom') {
    cursorPosition.y = `${parseFloat(cursorPosition.y) - cardHeight}px`
  }

  if (props.position.positionY === 'top') {
    cursorPosition.y = `${parseFloat(cursorPosition.y)}px`
  }
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
  console.log('montado')
  openCard()
})
</script>

<template>
  <div class="glass-float-card" @click="close">
    <div class="float-card" @click.stop ref="card" @click="closeIfCloseOnClick">
      <slot class="slot" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.glass-float-card {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 3;
  padding: 0;
  margin: 0;
  width: 100dvw;
  height: 100dvh;
  background-color: rgba(0, 0, 0, 0.2);
  // backdrop-filter: blur(3px);
  // background-color: rgba(1, 7, 27, 0.2);
  // -webkit-backdrop-filter: blur(3px);
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
