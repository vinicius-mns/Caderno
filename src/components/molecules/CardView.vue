<script setup lang="ts">
import { computed } from 'vue'
import CalcDate from '@/components/atoms/CalcDate.vue'
import { marked } from 'marked'
import type { ICard } from '@/api/api_local/entites/cards/CardsTypes'
import ThemeP from '@/components/atoms/ThemeP.vue'
import { useTags } from '@/stores/local/tags'
import FloatDescription from '@/components/atoms/FloatDescription.vue'
import { useCardStyle } from '@/stores/cardStyle'

const tags = useTags()

const cardStyle = useCardStyle()

const props = defineProps<{ card: ICard }>()

const emit = defineEmits<{ (e: 'emitCard', v: ICard): void }>()

const emitCard = () => emit('emitCard', props.card)

const atualCardStyle = computed(() => cardStyle.atualCardSyle)

marked.setOptions({ breaks: true })

const tagsInCard = computed(() => tags.getTagsById(props.card.tags))

const cardDate = computed(() => String(new Date(props.card.date).toLocaleDateString()))
</script>

<template>
  <div class="card-container" :style="atualCardStyle" @click="emitCard">
    <header>
      <div class="date">
        <FloatDescription :content="cardDate">
          <CalcDate class="date-text" :date="props.card.date" />
        </FloatDescription>
      </div>
      <div class="tags-container">
        <FloatDescription
          v-for="(tag, i) in tagsInCard"
          :content="`${tag.emoji} ${tag.content}`"
          :key="i"
        >
          <ThemeP :key="i" :content="tag.emoji" class="tag" />
        </FloatDescription>
      </div>
    </header>
    <div class="card-text">
      <div v-html="marked(props.card.content)"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$margin: 5px;
.card-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: auto;
  margin: $margin;
  cursor: pointer;
  & header {
    width: 95%;
    padding-top: 8px;
    height: 20px;
    display: flex;
    align-items: center;
    & .date {
      font-size: 12px;
      width: 140px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      & .date-text {
        width: 100%;
        height: 100%;
      }
    }
    & .tags-container {
      display: flex;
      width: 100%;
      overflow: hidden;
      & .tag {
        cursor: pointer;
        padding: 0 8px;
        font-size: 13px;
        flex-shrink: 0;
      }
    }
  }
  & .card-text {
    text-align: justify;
    width: 95%;
    padding: 0 10px 0 10px;
    box-sizing: border-box;
    font-size: 14px;
  }
}
</style>
