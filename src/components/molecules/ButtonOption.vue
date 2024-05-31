<script setup lang="ts">
import ThemeP from '@/components/atoms/ThemeP.vue'
import ThemeButton from '@/components/atoms/ThemeButton.vue'

const props = defineProps<{ content: string }>()
</script>

<template>
  <ThemeButton class="option-button-container">
    <div class="option-button">
      <div class="ico">
        <slot></slot>
      </div>
      <div class="text">
        <ThemeP :content="props.content" />
      </div>
    </div>
  </ThemeButton>
</template>

<style scoped lang="scss">
.option-button-container {
  width: 100%;
  flex-shrink: 0;
  & .option-button {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    & .ico {
      flex-shrink: 0;
      height: 100%;
      width: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    & .text {
      flex-shrink: 0;
      width: calc(100% - 30px);
      height: 100%;
      display: flex;
      align-items: center;
      & p {
        padding-left: 10px;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        text-wrap: nowrap;
      }
    }
  }
}
</style>
