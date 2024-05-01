<script setup lang="ts">
import CardsRange from './CardsRange.vue'
import ThemeP from '@/components/atoms/ThemeP.vue'
import DarkMode from '../config/DarkMode.vue'
import FloatModalSlot from '@/components/molecules/FloatModalSlot.vue'
import ThemeActionButton from '@/components/molecules/ThemeActionButton.vue'
import { useStyle } from '@/stores/style'

const { style } = useStyle()
</script>

<template>
  <FloatModalSlot>
    <template #button-slot>
      <ThemeActionButton description="Configuracoes">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          id="Capa_1"
          x="0px"
          y="0px"
          viewBox="0 0 512 512"
          style="enable-background: new 0 0 512 512"
          xml:space="preserve"
          width="512"
          height="512"
        >
          <g>
            <path
              d="M480,224H32c-17.673,0-32,14.327-32,32s14.327,32,32,32h448c17.673,0,32-14.327,32-32S497.673,224,480,224z"
            />
            <path
              d="M32,138.667h448c17.673,0,32-14.327,32-32s-14.327-32-32-32H32c-17.673,0-32,14.327-32,32S14.327,138.667,32,138.667z"
            />
            <path
              d="M480,373.333H32c-17.673,0-32,14.327-32,32s14.327,32,32,32h448c17.673,0,32-14.327,32-32S497.673,373.333,480,373.333z"
            />
          </g>
        </svg>
      </ThemeActionButton>
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
svg {
  fill: v-bind('style.color.text');
  width: 16px;
}
</style>
