// <!-- <script setup lang="ts">
// import { ref, reactive, watchEffect } from 'vue'
// import { useStyle } from '@/stores/style'
// import { useHandleCardsTags } from '@/stores/local/handleCardsTags'
// import SearchByText from '../../molecules/SearchByText.vue'
// import type { ITag } from '@/api/local'

// const { style } = useStyle()

// const handleCardsTags = useHandleCardsTags()

// const props = defineProps<{ searchId: string }>()

// const emit = defineEmits<{
//   (e: 'emitTags', v: ITag[]): void
// }>()

// const allTags = ref(handleCardsTags.tagsReactive.value)

// const search = reactive({
//   tags: allTags.value,
//   search: (e: string) => {
//     const lower = (x: string) => x.toLocaleLowerCase()
//     const filtred = allTags.value.filter((tag) => lower(tag.content).includes(lower(e)))
//     search.tags = filtred
//     emit('emitTags', search.tags)
//   }
// })

// watchEffect(() => {
//   allTags.value = handleCardsTags.tagsReactive.value
//   emit('emitTags', allTags.value)
// })
// </script>

// <template>
//   <div class="container-tags">
//     <SearchByText
//       v-if="allTags.length > 10"
//       @emit-content="search.search"
//       content=""
//       placeholder="Pesquisar tag"
//       :key-id="props.searchId"
//       class="search"
//     />
//     <div class="list-of-tags">
//       <slot></slot>
//     </div>
//   </div>
// </template>

// <style scoped lang="scss">
// $buttonSize: v-bind('style.button.size');
// $margin: 0px;
// .container-tags {
//   width: 100%;
//   box-sizing: border-box;
//   padding: $margin;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   overflow: hidden;
//   & .list-of-tags {
//     background-color: red;
//     width: 100%;
//     // display: flex;
//     flex-direction: row;
//     overflow: auto;
//     //   width: 100%;
//     //   height: 100%;
//     //   padding: $margin;
//     //   box-sizing: border-box;
//     //   overflow: auto;
//     //   @media screen and (min-width: 768px) {
//     //     overflow: hidden;
//     //     scrollbar-gutter: stable;
//     //     &:hover {
//     //       overflow-y: scroll;
//     //     }
//     //   }
//   }
//   & .search {
//     width: 100%;
//   }
// }
// </style> -->
