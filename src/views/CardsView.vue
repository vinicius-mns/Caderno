<script setup lang="ts">
import CardsTop from '@/components/template/CadsTop.vue'
import CardsBottom from '@/components/template/CardsBottom.vue'
import CardsMain from '@/components/template/CardsMain.vue'
import WindowsAll from '@/components/template/windows/WindowsAll.vue'
import { useCards } from '@/stores/cards/cards'
import { useTags } from '@/stores/tags/tags'
import { onMounted } from 'vue'

const cards = useCards()

const tags = useTags()

onMounted(async () => {
  await tags.init()
  await cards.init({
    includeTags: tags.getNames(tags.includeTags),
    excludeTags: tags.getNames(tags.excludeTags)
  })
})
</script>

<template>
  <div>
    <CardsMain />
    <CardsTop />
    <CardsBottom />
    <WindowsAll />
  </div>
</template>

<style scoped lang="scss"></style>
