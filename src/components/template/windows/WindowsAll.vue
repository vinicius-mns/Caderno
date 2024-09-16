<script setup lang="ts">
import CardCreateWindow from './CardCreateWindow.vue'
import CardDeleteWindow from './CardDeleteWindow.vue'
import CardUpdateWindow from './CardUpdateWindow.vue'
import ConfigWindow from './ConfigWindow.vue'
import ErrorMessageWindow from './ErrorMessageWindow.vue'
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
    <ConfigWindow />
    <ErrorMessageWindow />
    <TagCreateWindow />
    <TagDeleteCardWindow />
    <TagDeleteWindow />
    <TagUpdateWindow />
  </div>
</template>

<style scoped lang="scss"></style>
