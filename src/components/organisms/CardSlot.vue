<script setup lang="ts">
import type { Icard } from '@/stores/cards/Interfaces'
import type { Itag } from '@/stores/tags/Interfaces'

import { ref } from 'vue'

import CardView from '../molecules/CardView.vue'

const props = defineProps<{ card: Icard; allTags: Itag[] }>()

const useShowButton = () => {
  const show = ref(false)

  const showOn = () => (show.value = true)

  const showOff = () => (show.value = false)

  return { show, showOn, showOff }
}

const show = useShowButton()
</script>

<template>
  <div class="card-with-options-container" @mouseenter="show.showOn()" @mouseleave="show.showOff()">
    <CardView :card="props.card" class="card" />

    <div class="slot-options" v-if="show.show.value">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card-with-options-container {
  transition: all 0.3s;
  position: relative;

  & .slot-options {
    position: absolute;
    width: 90px;
    right: 5px;
    top: 5px;
  }
}
</style>
