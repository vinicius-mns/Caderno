<script setup lang="ts">
import { useStyle } from '@/stores/style'
import CrossIco from '../atoms/icons/CrossIco.vue'
import { useWindows } from '@/stores/windows'
import { onMounted, onUnmounted } from 'vue'
const style = useStyle()

const windows = useWindows()

const closeWindowEsc = (event: KeyboardEvent) => {
  event.key === 'Escape' && windows.close()
}

onMounted(() => {
  window.addEventListener('keydown', closeWindowEsc)
})

onUnmounted(() => {
  window.removeEventListener('keydown', closeWindowEsc)
})
</script>

<template>
  <div class="page">
    <main>
      <slot name="main"></slot>
    </main>
    <aside>
      <slot name="aside"></slot>
    </aside>
    <div class="glass" v-if="windows.opened">
      <div class="windows">
        <header>
          <p>{{ windows.show }}</p>
          <button class="close" @click="windows.close">
            <CrossIco />
          </button>
        </header>
        <slot name="windows"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page {
  background-color: v-bind('style.atualStyle.color.one');
  min-height: 100dvh;
  & main {
    padding-bottom: 100px;
  }
  & aside {
    position: fixed;
    width: 60%;
    bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    flex-shrink: 0;
    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }
  & .glass {
    height: 100dvh;
    width: 100dvw;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.9);
    & .windows {
      position: fixed;
      transition: all 1s;
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: v-bind('style.atualStyle.borderRadius.one');
      background-color: v-bind('style.atualStyle.color.one');
      box-shadow: rgba(0, 0, 0, 0.3) 0 0 20px 10px;
      & header {
        height: 30px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: v-bind('style.atualStyle.color.text');
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
}
@keyframes initWindows {
  to {
    opacity: 100%;
    margin-top: 0;
  }
}
</style>
