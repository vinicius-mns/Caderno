<script setup lang="ts">
import { ref } from 'vue'
import TagEditor from '../../molecules/TagEditor.vue'
import { useTags } from '@/stores/local/tags'
import CenterModal from '@/components/molecules/CenterModal.vue'
import CenterModalSlot from '@/components/molecules/CenterModalSlot.vue'
import ThemeActionButton from '@/components/molecules/ThemeActionButton.vue'
import ThemeButton from '@/components/atoms/ThemeButton.vue'

const tag = useTags()

const props = withDefaults(
  defineProps<{
    large?: boolean
  }>(),
  {
    large: false
  }
)

const initTag = {
  emoji: '',
  content: '',
  id: ''
}

const centerModal = ref<InstanceType<typeof CenterModal>>()

const createTag = (e: typeof initTag) => {
  tag.createOne(e)
  centerModal.value?.toggleVisible()
}
</script>

<template>
  <CenterModalSlot title-modal="Criar nova tag">
    <template #button-modal>
      <ThemeButton v-if="props.large" class="large">Criar nova tag 🏷️</ThemeButton>
      <ThemeActionButton description="Criar nova tag" ico="🏷️" v-else />
    </template>
    <template #center-modal>
      <TagEditor :tag="initTag" @emit-tag="createTag" />
    </template>
  </CenterModalSlot>
</template>

<style scoped lang="scss">
.large {
  width: 100%;
}
</style>
