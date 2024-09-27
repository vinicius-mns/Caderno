<!-- <script setup lang="ts">
import { useStylesPage } from '@/stores/stylesPage/stylesPage'
import { ref, watchEffect } from 'vue'
import AngleLeftIco from '../atoms/icons/AngleLeftIco.vue'
import CoinButton from '../molecules/CoinButton.vue'
import FlexContainer from '../atoms/FlexContainer.vue'
import AngleRight from '../atoms/icons/AngleRight.vue'

const stylePage = useStylesPage()

const sideMax = ref('280px')
const sideMin = ref('60px')

const sidebarOpen = ref(true)

const openSidebar = () => (sidebarOpen.value = true)

const closeSidebar = () => (sidebarOpen.value = false)

watchEffect(() => {
  if (sidebarOpen.value) {
    sideMax.value = '280px'
    sideMin.value = '0px'
  }
  if (!sidebarOpen.value) {
    sideMax.value = '0px'
    sideMin.value = '60px'
  }
})
</script>

<template>
  <div class="page">
    <main>
      <slot name="main"></slot>
    </main>
    <aside :style="{ width: sideMax }" :class="[sidebarOpen ? '' : 'invisible']">
      <FlexContainer
        align-items="center"
        justify-content="end"
        :style="{ height: '40px', width: '100%' }"
      >
        <CoinButton
          @click="closeSidebar"
          description="Fechar"
          :border="false"
          size="30px"
          :style="{ 'margin-right': '10px' }"
        >
          <AngleLeftIco />
        </CoinButton>
      </FlexContainer>
      <slot name="sibedar-full"></slot>
    </aside>

    <aside :style="{ width: sideMin }" :class="[sidebarOpen ? 'invisible' : '']">
      <FlexContainer
        align-items="center"
        justify-content="center"
        :style="{ height: '40px', width: '100%' }"
      >
        <CoinButton @click="openSidebar" description="Abrir" :border="false" size="30px">
          <AngleRight />
        </CoinButton>
      </FlexContainer>
      <slot name="sidebar-mini"></slot>
    </aside>
    <div :style="{ 'z-index': '1' }">
      <slot name="windows"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page {
  background-color: v-bind('stylePage.atualColor.front');
  min-height: 100dvh;
  display: flex;
  flex-direction: row-reverse;
  & main {
    width: 100%;
  }
  & aside {
    overflow: hidden;
    transition: all 0.3s;
    position: sticky;
    top: 0;
    height: 100dvh;
    background-color: v-bind('stylePage.atualColor.back');
    border-right: solid 1px v-bind('stylePage.atualColor.border');
    flex-shrink: 0;
  }
  & .invisible {
    opacity: 0;
  }
}
</style> -->
