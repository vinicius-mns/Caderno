<script setup lang="ts">
import type { ICard } from '@/api/api_local/entites/cards/CardsTypes'
import FloatModalSlot from '@/components/atoms/FloatModalSlot.vue'
import CardView from '@/components/molecules/CardView.vue'
import { ref } from 'vue'

const props = defineProps<{ allCards: ICard[]; width: string }>()

const emit = defineEmits<{ (e: 'emitCard', v: ICard): void }>()

const emitCard = (card: ICard) => emit('emitCard', card)

const floatModal = ref<InstanceType<typeof FloatModalSlot>>()
const close = () => floatModal.value?.close()

defineExpose({ close })
</script>

<template>
  <FloatModalSlot ref="floatModal">
    <template #button-slot>
      <div class="container-cards">
        <CardView
          v-for="(card, i) in props.allCards"
          :key="i"
          :card="card"
          @emit-card="emitCard"
          class="card"
        />
      </div>
    </template>
    <template #container-slot>
      <slot></slot>
    </template>
  </FloatModalSlot>
</template>

<style scoped lang="scss">
.container-cards {
  padding: 60px 0 250px 0;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  .card {
    margin: 8px;
    width: v-bind('props.width');
    max-width: 95dvw;
  }
}
</style>
