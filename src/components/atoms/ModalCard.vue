<script setup lang="ts">
import { useStyle } from '@/stores/style'

const { atualStyle } = useStyle()
</script>

<template>
  <div class="modal-card-container">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
$borderRadius: v-bind('atualStyle.borderRadius.two');
$buttonSize: 36px;
$cardColor: v-bind('atualStyle.color.one');
$bgColor: v-bind('atualStyle.color.four');
$boxShadow: v-bind('atualStyle.boxShadow');
.modal-card-container {
  padding: 10px;
  box-sizing: border-box;
  border-radius: $borderRadius;
  background-color: $bgColor;
  box-shadow: $boxShadow;
  border: v-bind('atualStyle.border');
}
</style>
