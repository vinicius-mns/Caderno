<script setup lang="ts">
import RangeImput from '@/components/molecules/RangeImput.vue'
import { useStyle } from '@/stores/style'
import { reactive } from 'vue'

const { style, setBoxShadown } = useStyle()

const boxShadown = reactive({
  value: parseInt(style.boxShadow.split(' ')[3]),
  setValue: (v: number) => {
    boxShadown.value = v
    setBoxShadown({ border: v })
  }
})
</script>

<template>
  <RangeImput
    :limit="{ min: 0, max: 10 }"
    :init-value="boxShadown.value"
    @emit-value="boxShadown.setValue"
    :title="{ content: 'Borda:', visible: true }"
  />
</template>

<style scoped lang="scss"></style>
