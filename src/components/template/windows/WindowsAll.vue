<script setup lang="ts">
import CardCreateWindow from './CardCreateWindow.vue'
import CardDeleteWindow from './CardDeleteWindow.vue'
import CardShareWindows from './CardShareWindows.vue'
import CardUpdateWindow from './CardUpdateWindow.vue'
import ConfigWindow from './ConfigWindow.vue'
import ErrorMessageWindow from './ErrorMessageWindow.vue'
import Error_CardNoTag from './Error_CardNoTag.vue'
import TagCreateWindow from './TagCreateWindow.vue'
import TagDeleteCardWindow from './TagDeleteCardWindow.vue'
import TagDeleteWindow from './TagDeleteWindow.vue'
import TagUpdateWindow from './TagUpdateWindow.vue'
</script>

<template>
  <div>
    <CardCreateWindow />
    <CardDeleteWindow />
    <CardUpdateWindow />
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
