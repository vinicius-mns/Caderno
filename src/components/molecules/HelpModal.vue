<script setup lang="ts">
import FloatDescription from '../atoms/FloatDescription.vue'
import FloatModalSlot from '../atoms/FloatModalSlot.vue'
import ThemeButton from '../atoms/ThemeButton.vue'
import QuestionIco from '@/components/atoms/icons/QuestionIco.vue'
</script>

<template>
  <FloatModalSlot>
    <template #button-slot>
      <FloatDescription content="Ajuda">
        <ThemeButton class="help-button"><QuestionIco /></ThemeButton>
      </FloatDescription>
    </template>
    <template #container-slot>
      <div class="help-container">
        <slot></slot>
      </div>
    </template>
  </FloatModalSlot>
</template>

<style scoped lang="scss">
.help-container {
  width: 230px;
}
.help-button {
  height: 30px;
  width: 30px;
  right: 0;
  top: 0;
  background-color: transparent;
}
</style>
