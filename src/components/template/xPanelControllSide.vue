<!-- <script setup lang="ts">
import { usePanelControll } from '@/stores/panelControll'
import CoinButton from '../molecules/CoinButton.vue'
import MenuIco from '../atoms/icons/MenuIco.vue'
import TagIco from '../atoms/icons/TagIco.vue'
import FilterIco from '../atoms/icons/FilterIco.vue'
import PencilIco from '../atoms/icons/PencilIco.vue'
import ModalCard from '../atoms/ModalCard.vue'

const panelControll = usePanelControll()
</script>

<template>
  <div class="panel-side">
    <main>
      <slot></slot>
    </main>
    <nav>
      <CoinButton description="Menu">
        <MenuIco />
      </CoinButton>
      <CoinButton description="Minhas tags" @click="panelControll.route.tags.pushRoute">
        <TagIco />
      </CoinButton>
      <CoinButton
        description="Filtrar cards"
        @click="panelControll.route.filterCardsByTags.pushRoute()"
      >
        <FilterIco />
      </CoinButton>
      <CoinButton description="Criar novo card" @click="panelControll.route.cardCreate.pushRoute()">
        <PencilIco />
      </CoinButton>
    </nav>
  </div>
</template>

<style scoped lang="scss">
.panel-side {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  & main {
    flex-grow: 1;
    overflow: auto;
  }
  nav {
    flex-shrink: 0;
    display: flex;
    justify-content: space-evenly;
  }
}
</style> -->
