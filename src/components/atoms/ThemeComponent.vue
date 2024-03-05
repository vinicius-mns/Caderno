<script lang="ts" setup>
import { useStyle } from '@/stores/style'

const { style } = useStyle()
</script>

<template>
  <div class="component-style">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.component-style {
  background-color: v-bind('style.component.bgColor');
  border-radius: 8px;
}
</style>
