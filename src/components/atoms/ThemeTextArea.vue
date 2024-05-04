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

const clear = () => {
  contentReactive.value = ''
}

watchEffect(() => {
  emit('emitContent', contentReactive.value)
})

defineExpose({ clear })
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
  // height: 100%;
  width: 100%;
  background-color: transparent;
  border-radius: 8px;
  border: solid rgba(131, 131, 131, 0.5) 0.5px;
  color: $buttonTextColor;
  overflow: auto;
  outline: none;
  box-sizing: border-box;
  padding: 20px;
  resize: none;
}
</style>
