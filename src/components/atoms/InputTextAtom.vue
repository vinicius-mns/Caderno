<script setup lang="ts">
import { useStyle } from '@/stores/style'
import { ref, watchEffect } from 'vue'

const { style } = useStyle()

const props = defineProps<{
  keyId: string
  content: string
  placeholder: string
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
  <input
    type="text"
    :id="keyId"
    v-model="contentReactive"
    class="content-input"
    :placeholder="props.placeholder"
  />
</template>

<style scoped lang="scss">
$boxShadow: v-bind('style.boxShadow');
$buttonSize: v-bind('style.button.size');
$buttonHoverColor: v-bind('style.button.hoverColor');
$buttonTextColor: v-bind('style.button.textColor');
$buttonBorderRadius: v-bind('style.button.borderRadius');
$buttonBgColor: v-bind('style.button.bgColor');
.content-input {
  height: $buttonSize;
  box-shadow: $boxShadow;
  background-color: $buttonBgColor;
  border-radius: $buttonBorderRadius;
  color: $buttonTextColor;
  border: none;
  overflow: hidden;
  outline: none;
  box-sizing: border-box;
  padding-left: 20px;
  padding-right: 20px;
  &:hover {
    background-color: $buttonHoverColor;
  }
}
</style>
