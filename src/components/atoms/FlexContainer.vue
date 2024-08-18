<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    flexDirection?: 'row' | 'column' | 'row-reverse'
    flexWrap?: 'wrap' | 'nowrap'
    justifyContent?: 'flex-start' | 'space-evenly' | 'space-between' | 'center' | 'end'
    alignItems?: 'stretch' | 'start' | 'end' | 'center'
  }>(),
  {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  }
)
</script>

<template>
  <div class="container-base">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.container-base {
  display: flex;
  flex-direction: v-bind('props.flexDirection');
  flex-wrap: v-bind('props.flexWrap');
  justify-content: v-bind('props.justifyContent');
  align-items: v-bind('props.alignItems');
}
</style>
