<script setup lang="ts">
import { marked } from 'marked'

const props = defineProps<{ content: string }>()

marked.setOptions({ breaks: true })
</script>

<template>
  <div v-html="marked(props.content)"></div>
</template>

<style scoped lang="scss"></style>
