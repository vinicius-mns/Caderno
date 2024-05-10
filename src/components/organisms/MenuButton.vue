<script setup lang="ts">
import { useStyle } from '@/stores/style'
import MenuIco from '../atoms/icons/MenuIco.vue'
import CoinButton from '../molecules/CoinButton.vue'
import FloatModalSlot from '../molecules/FloatModalSlot.vue'
import CardChangeWidth from './card/CardChangeWidth.vue'
import CardStyleSelector from './card/CardStyleSelector.vue'

const { atualStyle } = useStyle()
</script>

<template>
  <FloatModalSlot ref="modal" class="container-selectemoji">
    <template #button-slot>
      <CoinButton description="Menu">
        <MenuIco />
      </CoinButton>
    </template>
    <template #container-slot>
      <div class="menu-container">
        <CardChangeWidth />
        <hr />
        <CardStyleSelector />
      </div>
    </template>
  </FloatModalSlot>
</template>

<style scoped lang="scss">
.menu-container {
  width: 300px;
  height: 48dvh;
  padding: 10px;
  box-sizing: border-box;
  & hr {
    box-shadow: none;
    // border-style: none;
    // border-color: ;
    border: v-bind('atualStyle.border');
    background-color: red;
  }
}
</style>
