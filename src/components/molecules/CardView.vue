<script setup lang="ts">
import { computed, ref } from 'vue'
import CalcDate from '@/components/atoms/CalcDate.vue'
import { marked } from 'marked'
import ThemeP from '@/components/atoms/ThemeP.vue'
import FloatDescription from '@/components/atoms/FloatDescription.vue'
import { useStylesCard } from '@/stores/stylesCard/stylesCard'
import type { Icard } from '@/stores/cards/Interfaces'
import ThemeMarkown from '../atoms/ThemeMarkown.vue'

const styleCard = useStylesCard()

const props = withDefaults(
  defineProps<{
    card: Icard
    textAlign?: 'justify' | 'center' | 'start'
  }>(),
  {
    textAlign: 'justify'
  }
)

const emit = defineEmits<{ (e: 'emitCard', v: Icard): void }>()

const showOn = false

const showTags = ref(!showOn)

const showTagsOn = () => {
  if (showOn) showTags.value = true
}

const showTagsOff = () => {
  if (showOn) showTags.value = false
}

const emitCard = () => emit('emitCard', props.card)

marked.setOptions({ breaks: true })

const cardDate = computed(() => String(new Date(props.card.date).toLocaleDateString()))
</script>

<template>
  <div
    class="card-container"
    :style="styleCard.atualStyle"
    @click="emitCard"
    @mouseenter="showTagsOn"
    @mouseleave="showTagsOff"
  >
    <header>
      <div class="date" v-show="showTags">
        <FloatDescription :content="cardDate">
          <CalcDate class="date-text" :date="props.card.date" />
        </FloatDescription>
      </div>
      <div class="tags-container" v-show="showTags">
        <FloatDescription
          v-for="(tag, i) in props.card.tags"
          :content="`${tag[0]} ${tag[1]}`"
          :key="i"
        >
          <ThemeP :key="i" :content="tag[0]" class="tag" />
        </FloatDescription>
      </div>
    </header>
    <div class="markdown-container">
      <ThemeMarkown :content="props.card.content" />
      <!-- <div v-html="marked(props.card.content)"></div> -->
    </div>
  </div>
</template>

<style scoped lang="scss">
.card-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: auto;
  cursor: pointer;
  & header {
    width: 100%;
    margin-top: 8px;
    height: 20px;
    display: flex;
    align-items: center;
    & .date {
      height: 100%;
      width: 150px;
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
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
  & .markdown-container {
    text-align: v-bind('props.textAlign');
    width: 95%;
    padding: 0 10px 0 10px;
    box-sizing: border-box;
    font-size: 14px;
    overflow-wrap: break-word;
  }
}
</style>
