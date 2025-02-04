// <script setup lang="ts">
// import { computed, ref } from 'vue'
// import CalcDate from '@/components/atoms/CalcDate.vue'
// import { marked } from 'marked'
// import ThemeP from '@/components/atoms/ThemeP.vue'
// import FloatDescription from '@/components/atoms/FloatDescription.vue'
// import { useStylesCard } from '@/stores/stylesCard/stylesCard'
// import type { Icard } from '@/stores/cards/Interfaces'
// import ThemeMarkown from '../atoms/ThemeMarkown.vue'

// const styleCard = useStylesCard()

// const props = withDefaults(
//   defineProps<{
//     card: Icard
//     textAlign?: 'justify' | 'center' | 'start'
//   }>(),
//   {
//     textAlign: 'justify'
//   }
// )

// const emit = defineEmits<{ (e: 'emitCard', v: Icard): void }>()

// const showOn = true

// const showHeader = ref(!showOn)

// const showTagsOn = () => {
//   if (showOn) showHeader.value = true
// }

// const showTagsOff = () => {
//   if (showOn) showHeader.value = false
// }

// const emitCard = () => emit('emitCard', props.card)

// marked.setOptions({ breaks: true })

// const cardDate = computed(() => String(new Date(props.card.date).toLocaleDateString()))
// </script>

// <template>
//   <div
//     :class="['card-container', showHeader ? 'no-padding' : 'padding']"
//     :style="styleCard.atualStyle"
//     @click="emitCard"
//     @mouseenter="showTagsOn"
//     @mouseleave="showTagsOff"
//   >
//     <header :class="showHeader ? 'show-header' : 'hidden-header'">
//       <div class="date">
//         <FloatDescription :content="cardDate">
//           <CalcDate class="date-text" :date="props.card.date" />
//         </FloatDescription>
//       </div>

//       <div class="tags-container">
//         <FloatDescription
//           v-for="(tag, i) in props.card.tags"
//           :content="`${tag[0]} ${tag[1]}`"
//           :key="i"
//         >
//           <ThemeP :key="i" :content="tag[0]" class="tag" />
//         </FloatDescription>
//       </div>
//     </header>
//     <div class="markdown-container">
//       <ThemeMarkown :content="props.card.content" />
//       <!-- <div v-html="marked(props.card.content)"></div> -->
//     </div>
//   </div>
// </template>

// <style scoped lang="scss">
// .card-container {
//   width: 100%;
//   height: 100%;
//   display: flex;
//   align-items: center;
//   flex-direction: column;
//   height: auto;
//   cursor: pointer;
//   transition: all 0.3s;

//   & header {
//     width: 100%;
//     margin-top: 8px;
//     display: flex;
//     align-items: center;
//     transition: all 0.3s;

//     & .date {
//       height: 100%;
//       width: 150px;
//       font-size: 12px;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       flex-shrink: 0;
//       & .date-text {
//         width: 100%;
//         height: 100%;
//       }
//     }

//     & .tags-container {
//       display: flex;
//       width: 100%;
//       overflow: hidden;
//       & .tag {
//         cursor: pointer;
//         padding: 0 8px;
//         font-size: 13px;
//         flex-shrink: 0;
//       }
//     }
//   }

//   & .show-header {
//     height: 20px;
//   }

//   & .hidden-header {
//     height: 0;
//     overflow: hidden;
//   }

//   & .markdown-container {
//     text-align: v-bind('props.textAlign');
//     width: 95%;
//     padding: 0 10px 0 10px;
//     box-sizing: border-box;
//     font-size: 14px;
//     overflow-wrap: break-word;
//   }
// }

// .padding {
//   padding-bottom: 20px;
// }

// .no-padding {
//   padding-bottom: 0;
// }
// </style>
