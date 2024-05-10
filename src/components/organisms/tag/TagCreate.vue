<script setup lang="ts">
import { ref } from 'vue'
import TagEditor from '../../molecules/TagEditor.vue'
import { useTags } from '@/stores/local/tags'
import CenterModalSlot from '@/components/molecules/CenterModalSlot.vue'
import FloatModalSlot from '@/components/molecules/FloatModalSlot.vue'
import OptionButton from '@/components/molecules/OptionButton.vue'
import PencilIco from '@/components/atoms/icons/PencilIco.vue'

const tag = useTags()

const initTag = {
  emoji: '',
  content: '',
  id: ''
}

const modal = ref<InstanceType<typeof CenterModalSlot>>()

const createTag = (e: typeof initTag) => {
  tag.createOne(e)
  modal.value?.close()
}
</script>

<template>
  <FloatModalSlot ref="modal">
    <template #button-slot>
      <OptionButton content="Criar nova tag" class="create-tag">
        <PencilIco />
      </OptionButton>
    </template>
    <template #container-slot>
      <TagEditor :tag="initTag" @emit-tag="createTag" />
    </template>
  </FloatModalSlot>
</template>

<style scoped lang="scss">
.create-tag {
  width: 100%;
}
</style>
