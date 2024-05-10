<script setup lang="ts">
import ThemeActionButton from '@/components/molecules/ThemeActionButton.vue'
import { computed } from 'vue'
import { useConfig } from '@/stores/config'
import { useStyle } from '@/stores/style'

const config = useConfig()

const { atualStyle } = useStyle()

const filter = computed(() => config.filterCardsByTag)

const click = () => config.toggleFilterByTag()
</script>

<template>
  <ThemeActionButton
    @click="click"
    description="[Activa / desativar] filtro"
    :class="filter ? 'filter' : ''"
  >
    <svg
      id="Layer_1"
      height="512"
      viewBox="0 0 24 24"
      width="512"
      xmlns="http://www.w3.org/2000/svg"
      data-name="Layer 1"
    >
      <path
        d="m14 24a1 1 0 0 1 -.6-.2l-4-3a1 1 0 0 1 -.4-.8v-5.62l-7.016-7.893a3.9 3.9 0 0 1 2.916-6.487h14.2a3.9 3.9 0 0 1 2.913 6.488l-7.013 7.892v8.62a1 1 0 0 1 -1 1zm-3-4.5 2 1.5v-7a1 1 0 0 1 .253-.664l7.268-8.177a1.9 1.9 0 0 0 -1.421-3.159h-14.2a1.9 1.9 0 0 0 -1.421 3.158l7.269 8.178a1 1 0 0 1 .252.664z"
      />
    </svg>
  </ThemeActionButton>
</template>

<style scoped lang="scss">
.filter {
  box-shadow: 0 0 0 2px rgb(55, 133, 55);
}
svg {
  height: 19px;
  fill: v-bind('atualStyle.color.text');
}
</style>
