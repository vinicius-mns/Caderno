<script setup lang="ts">
import CrossIco from '../atoms/icons/CrossIco.vue'
import { onMounted, onUnmounted } from 'vue'
import ThemeP from '../atoms/ThemeP.vue'
import ModalCard from '../atoms/ModalCard.vue'
import FlexContainer from '../atoms/FlexContainer.vue'

const props = defineProps<{
  title: string
}>()

const emit = defineEmits<{
  (e: 'close', v: void): void
}>()

const emitClose = () => emit('close')

const closeWindowEsc = (event: KeyboardEvent) => {
  event.key === 'Escape' && emitClose()
}

onMounted(() => {
  window.addEventListener('keydown', closeWindowEsc)
})

onUnmounted(() => {
  window.removeEventListener('keydown', closeWindowEsc)
})
</script>

<template>
  <div class="glass">
    <ModalCard class="windows">
      <FlexContainer align-items="center" flex-direction="column">
        <header>
          <ThemeP :content="props.title" />
          <button class="close" @click="emitClose">
            <CrossIco />
          </button>
        </header>
        <slot></slot>
      </FlexContainer>
    </ModalCard>
  </div>
</template>

<style scoped lang="scss">
.glass {
  height: 100dvh;
  width: 100dvw;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  & .windows {
    padding: 0;
    position: fixed;
    transition: all 0.3s;
    // display: flex;
    // flex-direction: column;
    // align-items: center;
    // border-radius: v-bind('stylePage.borderRadius.outside');
    // background-color: v-bind('stylePage.atualColor.back');
    // border: solid 1px v-bind('stylePage.atualColor.border');
    & header {
      height: 30px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 15px;
      & .close {
        position: absolute;
        right: 20px;
        height: 30px;
        aspect-ratio: 1;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: transparent;
        color: white;
        border-radius: 8px;
        cursor: pointer;
        &:hover {
          background-color: red;
        }
      }
    }
    opacity: 0;
    margin-top: 50px;
    animation: initWindows 0.3s forwards;
  }
}
@keyframes initWindows {
  to {
    opacity: 100%;
    margin-top: 0;
  }
}
</style>
