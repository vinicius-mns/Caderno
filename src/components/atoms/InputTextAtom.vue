<script setup lang="ts">
import { useStyle } from '@/stores/style'
import { ref, watchEffect } from 'vue'

const { atualStyle } = useStyle()

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
$boxShadow: v-bind('atualStyle.boxShadow');
$buttonSize: 36px;
$buttonHoverColor: v-bind('atualStyle.color.three');
$buttonTextColor: v-bind('atualStyle.color.text');
$buttonBorderRadius: v-bind('atualStyle.borderRadius');
$buttonBgColor: v-bind('atualStyle.color.two');
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
