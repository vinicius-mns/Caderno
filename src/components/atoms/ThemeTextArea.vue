<script setup lang="ts">
import { useStyle } from '@/stores/style'
import { ref, watchEffect, onMounted } from 'vue'

const { atualStyle } = useStyle()

const props = defineProps<{
  content: string
}>()

const emit = defineEmits<{
  (e: 'emitContent', vale: string): void
}>()

const textArea = ref<HTMLElement>()

const contentReactive = ref(props.content)

const clear = () => {
  contentReactive.value = ''
}

watchEffect(() => {
  emit('emitContent', contentReactive.value)
})

defineExpose({ clear })

onMounted(() => textArea.value?.focus())
</script>

<template>
  <textarea
    ref="textArea"
    id="textarea"
    v-model="contentReactive"
    class="theme-textarea"
    placeholder="digite aqui"
  >
  </textarea>
</template>

<style scoped lang="scss">
$boxShadow: v-bind('atualStyle.boxShadow');
$buttonSize: 36px;
$buttonHoverColor: v-bind('atualStyle.color.three');
$buttonTextColor: v-bind('atualStyle.color.text');
$buttonBorderRadius: v-bind('atualStyle.borderRadius');
$buttonBgColor: v-bind('atualStyle.color.two');
.theme-textarea {
  // height: 100%;
  width: 100%;
  background-color: transparent;
  border-radius: 8px;
  border: v-bind('atualStyle.border');
  color: $buttonTextColor;
  overflow: auto;
  outline: none;
  box-sizing: border-box;
  padding: 20px;
  resize: none;
}
</style>
