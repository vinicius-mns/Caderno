<script setup lang="ts">
import { useWindows } from '@/stores/windows'
import CardCreateWindows from './CardCreateWindows.vue'
import CardShareWindows from './CardShareWindows.vue'
import CardViewWindows from './CardViewWindows.vue'
import ConfigWindow from './ConfigWindow.vue'
import ErrorMessageWindow from './ErrorMessageWindow.vue'
import Error_CardNoTag from './Error_CardNoTag.vue'
import TagCreateWindow from './TagCreateWindow.vue'
import TagDeleteCardWindow from './TagDeleteCardWindow.vue'
import TagDeleteWindow from './TagDeleteWindow.vue'
import TagUpdateWindow from './TagUpdateWindow.vue'
import TagsFilterWindows from './TagsFilterWindows.vue'
import TagsWindows from './TagsWindows.vue'
import TagSelectorWindows from './TagSelectorWindows.vue'
import { onMounted } from 'vue'

const windows = useWindows()

onMounted(() => {
  console.log('selecionador de tga foi montado')
})
</script>

<template>
  <div>
    <CardViewWindows />
    <CardCreateWindows v-if="windows.cardCreate.show" />
    <TagSelectorWindows v-if="windows.tagSelector.show" />
    <TagsFilterWindows />
    <TagsWindows />
    <CardShareWindows />
    <ConfigWindow />
    <TagCreateWindow />
    <TagDeleteCardWindow />
    <TagDeleteWindow />
    <TagUpdateWindow />
    <Error_CardNoTag />
    <ErrorMessageWindow />
  </div>
</template>

<style scoped lang="scss"></style>
