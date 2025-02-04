<script setup lang="ts">
import { computed } from 'vue'
import CalcDate from '@/components/atoms/CalcDate.vue'
import { marked } from 'marked'
import ThemeP from '@/components/atoms/ThemeP.vue'
import FloatDescription from '@/components/atoms/FloatDescription.vue'
import { useStylesCard } from '@/stores/stylesCard/stylesCard'
import type { Icard } from '@/stores/cards/Interfaces'
import ThemeMarkown from '../atoms/ThemeMarkown.vue'
import FlexContainer from '../atoms/FlexContainer.vue'

const styleCard = useStylesCard()

const props = withDefaults(
  defineProps<{
    card: Icard
    textAlign?: 'justify' | 'center' | 'start'
    fontSize?: string
  }>(),
  {
    fontSize: '14px',
    textAlign: 'justify'
  }
)

const emit = defineEmits<{ (e: 'emitCard', v: Icard): void }>()

const emitCard = () => emit('emitCard', props.card)

marked.setOptions({ breaks: true })

const cardDate = computed(() => String(new Date(props.card.date).toLocaleDateString()))
</script>

<template>
  <FlexContainer
    class="card-container"
    @click="emitCard"
    flex-direction="column"
    align-items="center"
    :style="styleCard.atualStyle"
  >
    <header class="showHeader">
      <FloatDescription :content="cardDate">
        <CalcDate class="date-text" :date="props.card.date" />
      </FloatDescription>

      <FlexContainer class="tags-container">
        <FloatDescription
          v-for="(tag, i) in props.card.tags"
          :content="`${tag[0]} ${tag[1]}`"
          :key="i"
        >
          <ThemeP :key="i" :content="tag[0]" class="tag" />
        </FloatDescription>
      </FlexContainer>
    </header>

    <div class="markdown-container">
      <ThemeMarkown :content="props.card.content" />
    </div>
  </FlexContainer>
</template>

<style scoped lang="scss">
.card-container {
  width: 100%;
  height: 100%;
  height: auto;
  transition: all 0.3s;

  & header {
    width: 100%;
    box-sizing: border-box;
    padding: 6px 20px 0;
    display: flex;
    align-items: center;
    transition: all 0.3s;
    margin-top: 8px;

    & .date-text {
      width: max-content;
      font-size: 12px;
      flex-shrink: 0;
      padding: 0;
      margin: 0 10px 0 0;
    }

    & .tags-container {
      display: flex;
      width: 100%;
      overflow: hidden;

      & .tag {
        cursor: pointer;
        padding: 0 2px;
        font-size: 12px;
        flex-shrink: 0;
        // filter: grayscale(100%);

        &:hover {
          filter: grayscale(0);
        }
      }
    }
  }

  & .markdown-container {
    font-size: v-bind('props.fontSize');
    text-align: v-bind('props.textAlign');
    width: 100%;
    padding: 0 20px 4px;
    box-sizing: border-box;
    overflow-wrap: break-word;
  }
}
</style>
