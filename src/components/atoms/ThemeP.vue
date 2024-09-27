<script setup lang="ts">
import { useStylesPage } from '@/stores/stylesPage/stylesPage'

const stylePage = useStylesPage()

const props = withDefaults(
  defineProps<{
    content: string
    size?: string
  }>(),
  {
    size: '14px'
  }
)
</script>

<template>
  <p class="paragraph">{{ props.content }}</p>
</template>

<style scoped lang="scss">
.paragraph {
  color: v-bind('stylePage.atualColor.text');
  font-size: v-bind('props.size');
  margin: 0;
  padding: 0;
}
</style>
