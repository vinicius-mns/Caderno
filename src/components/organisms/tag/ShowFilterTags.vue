<script setup lang="ts">
import { reactive } from 'vue'
import ThemeIco from '../../atoms/ThemeIco.vue'
import { useConfig } from '@/stores/config'

const config = useConfig()

const filter = reactive({
  value: config.showFilterCards.value,
  toggle: () => {
    config.showFilterCards.setValue()
    filter.value = config.showFilterCards.value
  }
})
</script>

<template>
  <ThemeIco
    ico="📌"
    content="filtro"
    size="24px"
    @click="filter.toggle"
    class="config"
    :colored="filter.value"
  />
</template>

<style scoped lang="scss"></style>
