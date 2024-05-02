<script setup lang="ts">
import { ref } from 'vue'
import TagEditor from '../../molecules/TagEditor.vue'
import { useTags } from '@/stores/local/tags'
import CenterModalSlot from '@/components/molecules/CenterModalSlot.vue'
import ThemeActionButton from '@/components/molecules/ThemeActionButton.vue'
import ThemeButton from '@/components/atoms/ThemeButton.vue'
import { useStyle } from '@/stores/style'

const tag = useTags()

const { style } = useStyle()

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

const centerModal = ref<InstanceType<typeof CenterModalSlot>>()

const createTag = (e: typeof initTag) => {
  tag.createOne(e)
  centerModal.value?.close()
}
</script>

<template>
  <CenterModalSlot title-modal="Criar nova tag" ref="centerModal">
    <template #button-modal>
      <ThemeButton v-if="props.large" class="large">Criar nova tag 🏷️</ThemeButton>
      <ThemeActionButton description="Criar nova tag" v-else>
        <svg
          id="Layer_1"
          height="512"
          viewBox="0 0 24 24"
          width="512"
          xmlns="http://www.w3.org/2000/svg"
          data-name="Layer 1"
        >
          <path
            d="m12 0a12 12 0 1 0 12 12 12.013 12.013 0 0 0 -12-12zm0 22a10 10 0 1 1 10-10 10.011 10.011 0 0 1 -10 10zm5-10a1 1 0 0 1 -1 1h-3v3a1 1 0 0 1 -2 0v-3h-3a1 1 0 0 1 0-2h3v-3a1 1 0 0 1 2 0v3h3a1 1 0 0 1 1 1z"
          />
        </svg>
      </ThemeActionButton>
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
svg {
  height: 19px;
  fill: v-bind('style.color.text');
}
</style>
