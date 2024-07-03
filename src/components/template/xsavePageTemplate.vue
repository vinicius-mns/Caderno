<!-- <script setup lang="ts">
import { useStyle } from '@/stores/style'
import CrossIco from '../atoms/icons/CrossIco.vue'
import { useWindows } from '@/stores/windows'
import { onMounted, onUnmounted, ref } from 'vue'
import CoinButton from '../molecules/CoinButton.vue'
import AngleDownIco from '@/components/atoms/icons/AngleDownIco.vue'
import AngleUpIco from '@/components/atoms/icons/AngleUpIco.vue'

const { atualStyle } = useStyle()

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

const showSide = ref(true)
const showSideSet = (v: boolean) => (showSide.value = v)
</script>

<template>
  <div class="page">
    <main>
      <slot name="main"></slot>
    </main>
    <CoinButton description="Maximize" class="maxmize-button" @click="() => showSideSet(true)">
      <AngleUpIco />
    </CoinButton>
    <aside v-show="showSide">
      <CoinButton description="minimizar" class="close-side" @click="() => showSideSet(false)">
        <AngleDownIco />
      </CoinButton>
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
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  & aside {
    position: sticky;
    top: 0;
    flex-shrink: 0;
    height: 100dvh;
    width: 300px;
    background-color: v-bind('atualStyle.color.three');
    @media screen and (max-width: 768px) {
      position: fixed;
      height: 90dvh;
      width: 100dvw;
      bottom: 0;
      top: auto;
    }
    & .close-side {
      display: none;
      @media screen and (max-width: 768px) {
        display: block;
        position: fixed;
        right: 0;
        bottom: 90dvh;
      }
    }
  }
  & .maxmize-button {
    display: none;
    @media screen and (max-width: 768px) {
      display: block;
      position: fixed;
      bottom: 40px;
      right: 40px;
    }
  }
  & main {
    flex-grow: 1;
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
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 15px;
      box-sizing: border-box;
      border-radius: 8px;
      overflow: auto;
      background-color: v-bind('atualStyle.color.one');
      box-shadow: rgba(0, 0, 0, 0.3) 0 0 20px 10px;
      & header {
        height: 30px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: v-bind('atualStyle.color.text');
        padding: 5px 0;
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
      @media screen and (max-width: 768px) {
        transform: none;
        top: auto;
        left: 0;
        bottom: 0;
        width: 100dvw;
      }
    }
  }
}
</style> -->
