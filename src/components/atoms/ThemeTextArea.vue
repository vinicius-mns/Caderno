<script setup lang="ts">
import { useStyle } from '@/stores/style'
import { ref, watchEffect } from 'vue'

const { style } = useStyle()

const props = defineProps<{
  content: string
}>()

const emit = defineEmits<{
  (e: 'emitContent', vale: string): void
}>()

const contentReactive = ref(props.content)

watchEffect(() => {
  emit('emitContent', contentReactive.value)
})
</script>

<template>
  <textarea
    id="textarea"
    v-model="contentReactive"
    class="theme-textarea"
    placeholder="digite aqui"
  >
  </textarea>
</template>

<style scoped lang="scss">
$boxShadow: v-bind('style.boxShadow');
$buttonSize: v-bind('style.button.size');
$buttonHoverColor: v-bind('style.button.hoverColor');
$buttonTextColor: v-bind('style.button.textColor');
$buttonBorderRadius: v-bind('style.button.borderRadius');
$buttonBgColor: v-bind('style.button.bgColor');
.theme-textarea {
  height: 100%;
  width: 100%;
  box-shadow: $boxShadow;
  background-color: $buttonBgColor;
  border-radius: $buttonBorderRadius;
  color: $buttonTextColor;
  border: none;
  overflow: auto;
  outline: none;
  box-sizing: border-box;
  padding: 20px;
  resize: none;
  &:hover {
    background-color: $buttonHoverColor;
  }
}
</style>
