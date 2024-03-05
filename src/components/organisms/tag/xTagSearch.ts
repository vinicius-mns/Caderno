// <!-- <script setup lang="ts">
// import { ref, reactive, watchEffect } from 'vue'
// // import { useStyle } from '@/stores/style'
// import { useHandleCardsTags } from '@/stores/local/handleCardsTags'
// import SearchByText from '../../molecules/SearchByText.vue'
// import type { ITag } from '@/api/local'

// // const { style } = useStyle()

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
//   <SearchByText
//     v-if="allTags.length > 10"
//     @emit-content="search.search"
//     content=""
//     placeholder="Pesquisar tag"
//     :key-id="props.searchId"
//     class="search"
//   />
// </template>

// <style scoped lang="scss"></style> -->
