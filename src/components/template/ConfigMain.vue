<script setup lang="ts">
import CardConfig from '@/components/organisms/CardConfig.vue'
import { useConfig } from '@/stores/config'
import PageConfig from '../organisms/PageConfig.vue'
import { useStyle } from '@/stores/style'

const style = useStyle()

const config = useConfig()

const setCardWidth = (n: number) => {
  config.cardChengeWidth(n)
}

const xxxss = (n: number) => {
  console.log('xxx', n)
  style.atualStyleSet(n)
}
</script>

<template>
  <div class="config-container">
    <header>
      <h1 class="title">Configuracao</h1>
    </header>
    <div class="page">
      <CardConfig :width="config.config.value.cardWidth" @emit-width="setCardWidth" />
      <PageConfig @emit-style="xxxss" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.config-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  & header {
    z-index: 1;
    position: sticky;
    top: 0;
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    & .title {
      color: v-bind('style.atualStyle.color.text');
      padding: 0;
      margin: 0;
    }
  }
  & .page {
    width: 100%;
    max-width: 800px;
  }
}
</style>
