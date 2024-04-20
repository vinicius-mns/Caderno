<script setup lang="ts">
import { useCards } from '@/stores/local/cards'
import SearchInput from '@/components/molecules/SearchInput.vue'

const cards = useCards()

const filterCardsText = (e: string) => cards.filterText(e)
</script>

<template>
  <SearchInput
    key-id="filter-card-text"
    :content="''"
    @emit-content="filterCardsText"
    placeholder="procurar por"
  />
</template>

<style scoped lang="scss"></style>
