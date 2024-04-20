<script setup lang="ts">
import { useHandleCardsTags } from '@/stores/local/handleCardsTags'
import ThemeButton from '../atoms/ThemeButton.vue'
import ThemeTextArea from '../atoms/ThemeTextArea.vue'
import { reactive } from 'vue'

const handleCardsTags = useHandleCardsTags()

const content = reactive({
  value: '',
  setContent: (v: string) => (content.value = v)
})

const exportData = () => {
  const data = handleCardsTags.exportData()
  content.setContent(data)
  console.log(data)
}

const importData = () => {
  const data = handleCardsTags.importData(content.value)
  console.log(data)
}
</script>

<template>
  <div>
    <ThemeButton @click="exportData">Export Data</ThemeButton>
    <ThemeTextArea :content="content.value" @emit-content="content.setContent" />
    <ThemeButton @click="importData">Import Data</ThemeButton>
  </div>
</template>

<style scoped lang="scss"></style>
@/stores/local/xhandleCardsTags