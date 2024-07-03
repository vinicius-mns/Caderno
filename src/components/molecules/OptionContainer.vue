<script setup lang="ts">
import CaretIco from '@/components/atoms/icons/CaretIco.vue'
import { useStyle } from '@/stores/style'
import { ref } from 'vue'

const style = useStyle()

const props = defineProps<{
  title: string
}>()

const showOption = ref(false)
const showOptionToggle = () => (showOption.value = !showOption.value)
</script>

<template>
  <div class="option-container">
    <button class="title" @click="showOptionToggle">
      <CaretIco direction="down" v-if="showOption" />
      <CaretIco direction="right" v-else />
      <h2>{{ props.title }}</h2>
    </button>
    <div class="option" v-show="showOption">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.option-container {
  margin-left: 20px;
  box-sizing: border-box;
  width: calc(100% - 20px);
  & .title {
    cursor: pointer;
    display: flex;
    align-items: center;
    border: none;
    background-color: transparent;
    & h2 {
      margin-left: 5px;
      font-weight: 100;
      color: v-bind('style.atualStyle.color.text');
    }
  }
  & .option {
    width: 100%;
  }
}
</style>
