<!-- <script setup lang="ts">
import { useStyle } from '@/stores/style'
import { ref } from 'vue'
import CalcDate from '../atoms/CalcDate.vue'
import ThemeButton from '../atoms/ThemeButton.vue'
import ListOf from '../atoms/ListOf.vue'
import { marked } from 'marked'
import type { ICard } from '@/api/api_local/entites/cards/CardsTypes'
import type { ITag } from '@/api/api_local/entites/tags/TagsTypes'

const { style } = useStyle()

marked.setOptions({ breaks: true })

const props = defineProps<{ card: ICard; tags: ITag[] }>()

const show = ref(false)

const showOption = () => (show.value = true)
const notShowOption = () => (show.value = false)

defineExpose({
  notShowOption
})
</script>

<template>
  <ThemeButton class="card" @mouseenter="showOption" @mouseleave="notShowOption">
    <header>
      <div class="date">
        <CalcDate class="date-text" :date="props.card.date" />
      </div>
      <ListOf
        class="tags"
        :list="props.tags.map((tag) => ({ content: tag.emoji, title: tag.content }))"
      />
    </header>
    <div class="card-text">
      <div v-html="marked(props.card.content)"></div>
    </div>
  </ThemeButton>
</template>

<style scoped lang="scss">
$buttonSize: v-bind('style.button.size');
$buttonBgColor: v-bind('style.button.bgColor');
$buttonHoverColor: v-bind('style.button.hoverColor');
$borderRadius: v-bind('style.button.borderRadius');
$boxShadow: v-bind('style.boxShadow');
.card {
  display: flex;
  flex-direction: column;
  box-shadow: none;
  height: auto;
  border-radius: $borderRadius;
  box-shadow: $boxShadow;
  & header {
    width: 100%;
    height: calc($buttonSize / 1.3);
    display: flex;
    align-items: center;
    & .date {
      width: 35%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      & .date-text {
        width: 100%;
        height: 100%;
      }
    }
    & .tags {
      width: 65%;
      height: 100%;
    }
  }
  & .card-text {
    text-align: justify;
    width: 95%;
    margin-left: 2.5%;
    box-sizing: border-box;
    border-radius: $borderRadius;
    @media screen and (max-width: 768px) {
      & p {
        font-size: 16px;
      }
    }
  }
}
</style> -->
