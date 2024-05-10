<script setup lang="ts">
import { computed } from 'vue'
import CalcDate from '../../atoms/CalcDate.vue'
import ThemeButton from '../../atoms/ThemeButton.vue'
import { marked } from 'marked'
import type { ICard } from '@/api/api_local/entites/cards/CardsTypes'
import HorizontalCarousel from '@/components/molecules/HorizontalCarousel.vue'
import ThemeP from '@/components/atoms/ThemeP.vue'
import { useTags } from '@/stores/local/tags'
import FloatDescription from '@/components/atoms/FloatDescription.vue'
import { useCardStyle } from '@/stores/cardStyle'

const tags = useTags()

const cardStyle = useCardStyle()

const atualStyle = computed(() => cardStyle.atualCardSyle)

marked.setOptions({ breaks: true })

const props = defineProps<{ card: ICard }>()

const tagsInCard = computed(() => tags.readList(props.card.tags))

const cardDate = computed(() => String(new Date(props.card.date).toLocaleDateString()))

// const show = ref(false)

// const showOption = () => (show.value = true)

// const notShowOption = () => (show.value = false)

// const modalOptions = reactive({
//   value: false,
//   open: () => {
//     modalOptions.value = true
//   },
//   close: () => {
//     modalOptions.value = false
//   }
// })

// defineExpose({
//   notShowOption
// })
</script>

<template>
  <ThemeButton class="card" :style="atualStyle">
    <header>
      <div class="date">
        <FloatDescription :content="cardDate">
          <CalcDate class="date-text" :date="props.card.date" />
        </FloatDescription>
      </div>
      <HorizontalCarousel :range="0" :scroll-buttons="false">
        <FloatDescription
          v-for="(tag, i) in tagsInCard"
          :content="`${tag.emoji} ${tag.content}`"
          :key="i"
        >
          <ThemeP :key="i" :content="tag.emoji" class="tag" />
        </FloatDescription>
      </HorizontalCarousel>
    </header>
    <div class="card-text">
      <div v-html="marked(props.card.content)"></div>
    </div>
  </ThemeButton>
</template>

<style scoped lang="scss">
// $buttonSize: v-bind('style.button.size');
// $buttonBgColor: v-bind('style.button.bgColor');
// $buttonHoverColor: v-bind('style.button.hoverColor');
// $borderRadius: v-bind('style.button.borderRadius');
// $boxShadow: v-bind('style.boxShadow');
$margin: 5px;
.card {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: none;
  height: auto;
  & header {
    width: 100%;
    height: 26px;
    display: flex;
    align-items: center;
    background-color: transparent;
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
    & .tag {
      margin-left: $margin;
      margin-right: $margin;
    }
  }
  & .card-text {
    text-align: justify;
    width: 95%;
    margin-left: 2.5%;
    box-sizing: border-box;
    @media screen and (max-width: 768px) {
      & p {
        font-size: 16px;
      }
    }
  }
}
</style>
