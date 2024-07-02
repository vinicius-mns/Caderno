<script setup lang="ts">
import { useStyle } from '@/stores/style'
import { ref, watchEffect } from 'vue'

const { atualStyle } = useStyle()

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
}>()

const contentReactive = ref(props.initContent)

watchEffect(() => {
  emit('emitContent', contentReactive.value)
})
</script>

<template>
  <input
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
  box-shadow: v-bind('atualStyle.boxShadow');
  background-color: v-bind('atualStyle.color.three');
  border-radius: v-bind('atualStyle.borderRadius.one');
  color: v-bind('atualStyle.color.text');
  border: none;
  overflow: hidden;
  outline: none;
  box-sizing: border-box;
  padding-left: 20px;
  padding-right: 20px;
  font-size: 16px;
  &:hover {
    background-color: v-bind('atualStyle.color.four');
  }
}
</style>
