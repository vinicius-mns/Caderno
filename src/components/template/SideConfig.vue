<script setup lang="ts">
import ThemeButton from '../atoms/ThemeButton.vue'
// import TagCreate from '../organisms/tag/TagCreate.vue'
// import ConfigGlobal from '../organisms/ConfigGlobal.vue'
// import ShowFilterCards from '../organisms/tag/ShowFilterTags.vue'
// import CardsFilter from '../organisms/card/CardsFilter.vue'
// import { reactive } from 'vue'
</script>

<template>
  <div class="sibebar-cards-container">
    <RouterLink to="/cards">
      <ThemeButton> Voltar para cards </ThemeButton>
    </RouterLink>
  </div>
</template>

<style scoped lang="scss">
.sibebar-cards-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
