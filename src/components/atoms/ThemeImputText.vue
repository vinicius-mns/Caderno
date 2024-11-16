<script setup lang="ts">
import { useStylesPage } from '@/stores/stylesPage/stylesPage'
import { ref } from 'vue'

const stylePage = useStylesPage()

const props = withDefaults(
  defineProps<{
    keyId: string
    placeholder: string
    initContent?: string
  }>(),
  {
    initContent: ''
  }
)

const emit = defineEmits<{
  (e: 'emitContent', vale: string): void
  (e: 'clearContent', v: void): void
}>()

const contentReactive = ref(props.initContent)

const emitContent = () => {
  emit('emitContent', contentReactive.value)
}

const clearContent = () => {
  contentReactive.value = ''
}

defineExpose({ clearContent })
</script>

<template>
  <input
    @input="emitContent"
    autocomplete="off"
    type="text"
    :id="keyId"
    v-model="contentReactive"
    class="content-input"
    :placeholder="props.placeholder"
  />
</template>

<style scoped lang="scss">
.content-input {
  width: 100%;
  height: 36px;
  background-color: v-bind('stylePage.atualColor.front');
  border-radius: v-bind('stylePage.borderRadius.inside');
  color: v-bind('stylePage.atualColor.text');
  border: none;
  overflow: hidden;
  outline: none;
  box-sizing: border-box;
  padding-left: 20px;
  padding-right: 20px;
  font-size: 16px;
  // &:hover {
  //   background-color: v-bind('atualStyle.color.four');
  // }
}
</style>
