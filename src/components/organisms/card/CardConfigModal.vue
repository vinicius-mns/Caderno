<script setup lang="ts">
import CardsRange from './CardsRange.vue'
import ThemeP from '@/components/atoms/ThemeP.vue'
import DarkMode from '../config/DarkMode.vue'
import FloatModalSlot from '@/components/molecules/FloatModalSlot.vue'
import ThemeActionButton from '@/components/atoms/ThemeActionButton.vue'
</script>

<template>
  <FloatModalSlot>
    <template #button-slot>
      <ThemeActionButton description="Configuracoes" ico="⚙️" />
    </template>
    <template #container-slot>
      <div class="options-container">
        <ThemeP content="Seleciona a quantidade de colunas" />
        <CardsRange />
        <DarkMode />
      </div>
    </template>
  </FloatModalSlot>
</template>

<style scoped lang="scss">
.options-container {
  width: 200px;
  padding: 20px;
}
</style>
