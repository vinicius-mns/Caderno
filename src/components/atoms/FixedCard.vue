<script setup lang="ts">
import { useStyle } from '@/stores/style'
import { ref } from 'vue'

const { style } = useStyle()

const props = defineProps<{
  cursorPosition: { x: string; y: string }
}>()

const x = ref(props.cursorPosition.x)
const y = ref(props.cursorPosition.y)
</script>

<template>
  <div class="float-card" @click.stop>
    <slot class="slot"></slot>
  </div>
</template>

<style scoped lang="scss">
$buttonSize: v-bind('style.button.size');
$cardColor: v-bind('style.component.bgColor');
$buttonColor: v-bind('style.button.bgColor');
$boxShadow: v-bind('style.boxShadow');
.float-card {
  z-index: 1;
  position: fixed;
  padding: 10px;
  left: v-bind(x);
  top: v-bind(y);
  border-radius: 8px;
  background-color: $cardColor;
  box-shadow: $boxShadow;
  // @media screen and (max-width: 768px) {
  //   left: calc(v-bind(x) - 200px);
  // }
}
</style>
