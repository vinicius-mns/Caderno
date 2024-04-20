<!-- <script setup lang="ts">
import { computed, onMounted } from 'vue'
import ThemeIco from '../../atoms/ThemeIco.vue'
import { useConfig } from '@/stores/config'

const { config, toggleFilter } = useConfig()

const emit = defineEmits<{
  (e: 'showFilter', v: boolean): void
}>()

const show = computed(() => config.value.showFilterCards)

const toggle = () => {
  toggleFilter()
  emit('showFilter', show.value)
}

onMounted(() => emit('showFilter', show.value))
</script>

<template>
  <ThemeIco ico="📌" content="filtro" size="24px" @click="toggle" class="config" :colored="show" />
</template>

<style scoped lang="scss"></style> -->
