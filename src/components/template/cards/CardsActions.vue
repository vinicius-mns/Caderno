<script setup lang="ts">
import CardConfigModal from '@/components/organisms/card/CardConfigModal.vue'
import CardCreate from '@/components/organisms/card/CardCreate.vue'
import TagCreate from '@/components/organisms/tag/TagCreate.vue'
import TagFilterToggler from '@/components/organisms/tag/TagFilterToggler.vue'
</script>

<template>
  <div class="container">
    <CardCreate type="action-button" class="button" />
    <TagCreate class="button" />
    <TagFilterToggler class="button" />
    <CardConfigModal class="button" />
  </div>
</template>

<style scoped lang="scss">
$butonSize: 40px;
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  & .button {
    margin-bottom: 8px;
  }
}
</style>
