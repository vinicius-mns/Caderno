<script setup lang="ts">
import ActionsContainer from '@/components/atoms/ActionsContainer.vue'
import MenuButton from '@/components/organisms/MenuButton.vue'
import CardCreate from '@/components/organisms/card/CardCreate.vue'
import TagWithOptionsList from '@/components/organisms/tag/TagWithOptionsList.vue'
import TagsFilterCards from '@/components/organisms/tag/TagsFilterCards.vue'
</script>

<template>
  <ActionsContainer>
    <MenuButton />
    <TagWithOptionsList />
    <TagsFilterCards />
    <CardCreate />
  </ActionsContainer>
</template>

<style scoped lang="scss"></style>
