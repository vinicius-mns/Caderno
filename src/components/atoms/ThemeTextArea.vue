<script setup lang="ts">
import { useStyle } from '@/stores/style'
import { ref, watchEffect, onMounted } from 'vue'

const style = useStyle()

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

const autoHeight = () => {
  const myTextArea = textArea.value
  if (myTextArea) {
    const textHeight = myTextArea.scrollHeight
    const height = myTextArea.offsetHeight
    if (textHeight >= 500) {
      myTextArea.style.height = '500px'
    } else if (textHeight >= height) {
      myTextArea.style.height = `${textHeight}px`
    }
  }
}

watchEffect(() => {
  emit('emitContent', contentReactive.value)
})

defineExpose({ clear })

onMounted(() => {
  autoHeight()
  textArea.value?.focus()
})
</script>

<template>
  <textarea
    ref="textArea"
    id="textarea"
    @keydown="autoHeight"
    v-model="contentReactive"
    class="theme-textarea"
    placeholder="digite aqui"
    spellcheck="false"
  >
  </textarea>
</template>

<style scoped lang="scss">
.theme-textarea {
  width: 100%;
  border-radius: v-bind('style.atualStyle.borderRadius.one');
  resize: none;
  overflow: auto;
  outline: none;
  box-sizing: border-box;
  padding: 20px;
  color: v-bind('style.atualStyle.color.text');
  background-color: v-bind('style.atualStyle.color.three');
  border: none;
  transition: all 0.3s;
}
</style>
