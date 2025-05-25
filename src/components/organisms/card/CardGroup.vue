<script setup lang="ts">
import { onMounted, ref } from 'vue'
import CardView from './CardView.vue'
import CardDelete from './CardDelete.vue'
import CardEditor from './CardEditor.vue'
import type { Icard } from '@/stores/cards/Interfaces'
import type { Itag } from '@/stores/tags/Interfaces'

const props = defineProps<{
  textFilterTags: string
  card: Icard
  tags: Itag[]
}>()

const emit = defineEmits<{
  (e: 'updatedCard', v: Icard): void
  (e: 'deleteCard', v: Icard): void
  (e: 'searchTag', v: string): void
  (e: 'clear', v: null): void
  (e: 'openCreateTag', v: null): void
}>()

type cardType = 'view' | 'editor' | 'delete'

// valores

const cardReactive = ref(props.card)

const type = ref<cardType>('view')

const cardInFocus = ref(false)

const cardR = ref<HTMLElement>()

const animationTime = '0.5s'

// metodos

const cardTypeIs = (v: cardType) => type.value === v

const cardTypeSet = (v: cardType) => (type.value = v)

const cardReactiveSet = (v: Icard) => (cardReactive.value = v)

const focusOn = (v: boolean) => {
  cardInFocus.value = v
}

const focusOff = () => {
  if (!cardTypeIs('view')) return
  focusOn(false)
}

const awaitTransition = (f: () => void) => {
  setTimeout(() => f(), parseFloat(animationTime) * 1000)
}

// emicoes

const handleUpdated = (card: Icard) => {
  cardReactiveSet(card)

  cardTypeSet('view')

  awaitTransition(() => emit('updatedCard', card))
}

const handleDelete = () => {
  cardTypeSet('view')

  awaitTransition(() => emit('deleteCard', cardReactive.value))
}

const searchTag = (tag: string) => emit('searchTag', tag)

const openCreateTag = (v: null) => emit('openCreateTag', v)

const clear = (v: null) => emit('clear', v)

// onUpdated(() => {
//   props.card.id === 'create' && cardTypeSet('create')
// })
</script>

<template>
  <div :class="cardInFocus && 'focus'" ref="cardR">
    <div @click="focusOn(true)">
      <Transition name="card-transition">
        <CardView
          v-if="cardTypeIs('view')"
          :card="cardReactive"
          :tags="props.tags"
          :text-filter-tags="props.textFilterTags"
          @open-editor="cardTypeSet('editor')"
          @open-delete="cardTypeSet('delete')"
          @click-on-card="cardTypeSet('view')"
          @tags-updated="handleUpdated"
          @search-tag="searchTag"
          @clear="clear"
          @open-create-tag="openCreateTag"
        />

        <CardEditor
          v-else-if="cardTypeIs('editor')"
          :card="cardReactive"
          :tags="props.tags"
          :text-filter-tags="props.textFilterTags"
          @cancel="cardTypeSet('view')"
          @updated-card="handleUpdated"
          @search-tag="searchTag"
          @clear="clear"
          @open-create-tag="openCreateTag"
        />

        <CardDelete
          v-else-if="cardTypeIs('delete')"
          :card="cardReactive"
          :tags="props.tags"
          @cancel="cardTypeSet('view')"
          @delete="handleDelete"
        />
      </Transition>
    </div>

    <Transition name="glass">
      <div v-if="cardInFocus" class="glass" @mouseenter="focusOff"></div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.focus {
  z-index: 1;
  position: relative;
}

.glass {
  z-index: -1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100dvw;
  height: 100dvh;
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  background-color: rgba(0, 0, 0, 0.63);
  opacity: 0.95;
}

.card-transition-enter-active,
.card-transition-leave-active {
  transition: all v-bind('animationTime');
}

.glass-enter-active,
.glass-leave-active {
  transition: all v-bind('animationTime');
}

.glass-enter-from,
.glass-leave-to {
  opacity: 0;
}

.card-transition-enter-from,
.card-transition-leave-to {
  position: absolute;
  margin-left: 50px;
  opacity: 0;
  // transform: scale(50%);
  // transform-style: preserve-3d;
  // transform: perspective(1200px) rotateX(90deg);
  // perspective: 34px;
  // rotate: 180deg;
}

// @keyframes init {
//   to {
//     background-color: v-bind('stylePage.atualColor.front');
//     backdrop-filter: blur(3px);
//     -webkit-backdrop-filter: blur(3px);
//     background-color: rgba(0, 0, 0, 0.63);
//     // opacity: 0.95;
//   }
// }
</style>
