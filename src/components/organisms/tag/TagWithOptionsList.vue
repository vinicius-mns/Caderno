<script setup lang="ts">
import TagWithOptions from './TagWithOptions.vue'
import FloatModalSlot from '@/components/molecules/FloatModalSlot.vue'
import CoinButton from '@/components/molecules/CoinButton.vue'
import TagIco from '@/components/atoms/icons/TagIco.vue'
import { useTags } from '@/stores/local/tags'
import { computed } from 'vue'
import TagCreate from './TagCreate.vue'

const tags = useTags()

const allTags = computed(() => tags.tags)
</script>

<template>
  <FloatModalSlot>
    <template #button-slot>
      <CoinButton description="Tags">
        <TagIco />
      </CoinButton>
    </template>
    <template #container-slot>
      <div class="container-cards-options">
        <div class="cards-options-list">
          <TagWithOptions v-for="(tag, i) in allTags" :key="i" :tag="tag" />
        </div>
        <TagCreate />
      </div>
    </template>
  </FloatModalSlot>
</template>

<style scoped lang="scss">
.container-cards-options {
  width: 260px;
  height: 48dvh;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  .cards-options-list {
    width: 100%;
    height: calc(48dvh - 38px);
    margin-bottom: 10px;
    overflow: auto;
  }
}
</style>
