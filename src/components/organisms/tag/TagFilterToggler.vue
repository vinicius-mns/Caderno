<script setup lang="ts">
import ThemeActionButton from '@/components/atoms/ThemeActionButton.vue'
import { computed } from 'vue'
import { useConfig } from '@/stores/config'

const config = useConfig()

const filter = computed(() => config.filterCardsByTag)

const click = () => config.toggleFilterByTag()
</script>

<template>
  <ThemeActionButton
    @click="click"
    ico="📌"
    description="[Activa / desativar] filtro"
    :class="filter ? 'filter' : ''"
  />
</template>

<style scoped lang="scss">
.filter {
  box-shadow: 0 0 0 2px rgb(55, 133, 55);
}
</style>
