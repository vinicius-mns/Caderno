<!-- <script setup lang="ts">
import { useStyle } from '@/stores/style'
import { onMounted } from 'vue'
import CrossIco from '@/components/atoms/icons/CrossIco.vue'
import ThemeP from '../atoms/ThemeP.vue'
import { usePanelControll } from '@/stores/panelControll'
import MinimizeIco from '@/components/atoms/icons/MinimizeIco.vue'
import BackIco from '../atoms/icons/BackIco.vue'
import MaxmizeIco from '../atoms/icons/MaxmizeIco.vue'

const {
  panel: {
    xPosition,
    yPosition,
    height,
    width,
    isMinimize,
    rotateDegX,
    rotateDegY,
    handleMinimize,
    handleMaxmize
  },
  route
} = usePanelControll()

const { atualStyle } = useStyle()

const props = defineProps<{ title: string }>()

const dragend = (e: DragEvent) => {
  xPosition.update(`${e.clientX - 25}px`)
  yPosition.update(`${e.clientY - 50}px`)
}

const perspective = (e: MouseEvent) => {
  const modalWidth = parseInt(width.value)
  const modalX = parseInt(xPosition.value)
  const modalCenter = modalX + modalWidth / 2
  const cursorX = e.clientX
  if (cursorX <= modalCenter && parseInt(rotateDegX.value) >= -3) {
    rotateDegX.update(`${parseInt(rotateDegX.value) - 1}deg`)
  }
  if (cursorX >= modalCenter && parseInt(rotateDegX.value) <= 3) {
    rotateDegX.update(`${parseInt(rotateDegX.value) + 1}deg`)
  }
  const modalHeight = window.innerHeight * (parseInt(height.value) / 100)
  const modalY = parseInt(yPosition.value) - 50
  const modalCenterY = modalY + modalHeight / 2
  const cursorY = e.clientY
  if (cursorY >= modalCenterY && parseInt(rotateDegY.value) >= -1) {
    rotateDegY.update(`${parseInt(rotateDegY.value) - 1}deg`)
  }
  if (cursorY <= modalCenterY && parseInt(rotateDegY.value) <= 1) {
    rotateDegY.update(`${parseInt(rotateDegY.value) + 1}deg`)
  }
}

onMounted(() => {
  if (isMinimize.value) {
    isMinimize.update(false)
  }
})
</script>

<template>
  <div class="modal-card-container" :draggable="true" @dragend="dragend" @mousemove="perspective">
    <div class="minimize-container" v-show="isMinimize.value" @click="handleMaxmize">
      <MaxmizeIco />
    </div>
    <div class="container-panel" v-show="!isMinimize.value">
      <header>
        <button class="button back" @click="route.backRoute">
          <BackIco />
        </button>
        <ThemeP :content="props.title" />
        <button class="button minimize" @click="handleMinimize()">
          <MinimizeIco />
        </button>
        <button class="button close" @click="route.nothing.pushRoute()">
          <CrossIco />
        </button>
      </header>
      <main>
        <slot></slot>
      </main>
      <nav>
        <slot name="nav-slot"></slot>
      </nav>
    </div>
  </div>
</template>

<style scoped lang="scss">
$borderRadius: v-bind('atualStyle.borderRadius.two');
$buttonSize: 36px;
$cardColor: v-bind('atualStyle.color.one');
$bgColor: v-bind('atualStyle.color.two');
$boxShadow: v-bind('atualStyle.boxShadow');
.minimize-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-card-container {
  position: fixed;
  width: v-bind('width.value');
  height: v-bind('height.value');
  left: v-bind('xPosition.value');
  top: v-bind('yPosition.value');
  overflow: hidden;
  background-color: v-bind('atualStyle.color.three');
  border-radius: 16px;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 8px 8px;
  border: v-bind('atualStyle.border');
  transition: all 0.3s;
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 86dvh;
    left: auto;
    top: auto;
    bottom: 0;
  }
}
.container-panel {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  & header {
    flex-shrink: 0;
    height: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: v-bind('atualStyle.color.three');
    cursor: grab;
    & .button {
      position: absolute;
      height: 30px;
      aspect-ratio: 1;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: transparent;
      border-radius: 8px;
      cursor: pointer;
    }
    & .back {
      left: 10px;
      &:hover {
        background-color: rgba(154, 224, 233, 0.521);
      }
    }
    & .minimize {
      right: 40px;
      &:hover {
        background-color: rgba(154, 224, 233, 0.521);
      }
      @media screen and (max-width: 768px) {
        display: none;
      }
    }
    & .close {
      right: 10px;
      &:hover {
        background-color: red;
      }
    }
  }
  & main {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  & nav {
    flex-shrink: 0;
    height: 58px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: v-bind('atualStyle.color.three');
    overflow-y: auto;
  }
  opacity: 0;
  margin-top: 20px;
  animation: init 0.3s forwards;
  @keyframes init {
    to {
      opacity: 100%;
      margin-top: 0;
    }
  }
}
</style> -->
