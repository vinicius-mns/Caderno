<script setup lang="ts">
import SearchInput from '@/components/molecules/SearchInput.vue'
import { useTags } from '@/stores/local/tags'

const tag = useTags()

const placeholder = 'Pesquisar por tag'

const searchTag = (e: string) => {
  console.log('chamado')
  console.log('content', e)
  tag.filterText(e)
}
</script>

<template>
  <SearchInput
    key-id="search-tag"
    content=""
    :placeholder="placeholder"
    @emit-content="searchTag"
  />
</template>

<style scoped lang="scss"></style>
