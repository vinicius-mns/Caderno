<script setup lang="ts">
import { useStylesPage } from '@/stores/stylesPage/stylesPage'
import { ref, onMounted } from 'vue'

const style = useStylesPage()

const props = withDefaults(
  defineProps<{
    content: string
    maxHeightPx?: number
    id: string
  }>(),
  {
    maxHeightPx: 500
  }
)

const emit = defineEmits<{
  (e: 'emitContent', vale: string): void
}>()

const textArea = ref<HTMLElement>()

const contentReactive = ref(props.content)

const clear = () => {
  contentReactive.value = ''
}

const sendContent = () => {
  emit('emitContent', contentReactive.value)
}

const autoHeight = () => {
  const myTextArea = textArea.value

  if (myTextArea) {
    const textHeight = myTextArea.scrollHeight

    const height = myTextArea.offsetHeight

    if (textHeight >= props.maxHeightPx) {
      myTextArea.style.height = `${props.maxHeightPx}px`
    } else if (textHeight >= height) {
      myTextArea.style.height = `${textHeight}px`
    }
  }
}

const clicked = () => {
  sendContent()
  autoHeight()
}

defineExpose({ clear })

onMounted(() => {
  console.log('chamado')
  autoHeight()

  textArea.value?.focus()
})
</script>

<template>
  <textarea
    ref="textArea"
    :id="props.id"
    @input="clicked"
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
  border-radius: v-bind('style.borderRadius.inside');
  resize: none;
  overflow: auto;
  outline: none;
  padding: 20px;
  color: v-bind('style.atualColor.text');
  background-color: v-bind('style.atualColor.front');
  border: none;
  transition: all 0.3s;
  box-sizing: border-box;
  font-size: 16px;
}
</style>
