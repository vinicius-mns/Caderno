<script setup lang="ts">
import { useStylesPage } from '@/stores/stylesPage/stylesPage'

const stylePage = useStylesPage()

const props = withDefaults(
  defineProps<{
    content: string
    size?: string
  }>(),
  {
    size: '21px'
  }
)
</script>

<template>
  <h2 class="title-2">{{ props.content }}</h2>
</template>

<style scoped lang="scss">
.title-2 {
  color: v-bind('stylePage.atualColor.text');
  font-size: v-bind('props.size');
  margin: 0;
  padding: 0;
}
</style>
