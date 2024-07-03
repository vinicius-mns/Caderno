<script setup lang="ts">
import { useStyle } from '@/stores/style'

const style = useStyle()

const props = defineProps<{ content: string }>()
</script>

<template>
  <p class="paragraph">{{ props.content }}</p>
</template>

<style scoped lang="scss">
.paragraph {
  color: v-bind('style.atualStyle.color.text');
  margin: 0;
  padding: 0;
}
</style>
