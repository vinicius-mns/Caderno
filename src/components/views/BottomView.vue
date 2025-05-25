<script setup lang="ts">
import ModalCard from '../atoms/ModalCard.vue'
import { useTags } from '@/stores/tags/tags'
import { onMounted, ref, watch, type Component } from 'vue'
import NavBottom from '../template/botton/NavBottom.vue'
import CardCreateBottom from '../template/botton/CardCreateBottom.vue'
import TagsBottom from '../template/botton/TagsBottom.vue'
import TagsFilterBottom from '../template/botton/TagsFilterBottom.vue'
import { useCardsTags } from '@/stores/cardsTags'
import type { Itag } from '@/stores/tags/Interfaces'
import TagEditorBottom from '../template/botton/TagEditorBottom.vue'
import { useEmoji } from '@/stores/emojis'
import ConfigBottom from '../template/botton/ConfigBottom.vue'

const tags = useTags()
const emojis = useEmoji()
const cardTags = useCardsTags()

type View = 'nav' | 'cardCreate' | 'tagsBottom' | 'filter' | 'tagUpdate' | 'config'

const view = ref<View>('nav')

const currentSize = ref({
  width: '281.58px',
  height: '58px'
})

// A vírgula após <T,> é um truque válido em TypeScript que evita conflito de parsing com JSX/HTML.
const mountComponent = <T,>(v: {
  component: Component
  props: () => T
  width: string
  height: string
}) => {
  return v
}

const components = {
  nav: mountComponent<InstanceType<typeof NavBottom>['$props']>({
    component: NavBottom,
    props: () => ({}),
    width: '281.58px',
    height: '58px'
  }),
  cardCreate: mountComponent<InstanceType<typeof CardCreateBottom>['$props']>({
    component: CardCreateBottom,
    props: () => ({
      allTags: tags.tags,
      globalTags: tags.includeTags
    }),
    width: '500px',
    height: '55dvh'
  }),
  tagsBottom: mountComponent<InstanceType<typeof TagsBottom>['$props']>({
    component: TagsBottom,
    props: () => ({
      tags: tags.tags,
      tagsTextFilter: ''
    }),
    width: '500px',
    height: '50dvh'
  }),
  filter: mountComponent<InstanceType<typeof TagsFilterBottom>['$props']>({
    component: TagsFilterBottom,
    props: () => ({
      tagsTextFilter: '',
      tags: tags.tags,
      includeTags: tags.includeTags,
      excludeTags: tags.excludeTags
    }),
    width: '580px',
    height: '64dvh'
  }),
  tagUpdate: mountComponent<InstanceType<typeof TagEditorBottom>['$props']>({
    component: TagEditorBottom,
    props: () => ({
      tag: ['', ''] as Itag,
      emojis: emojis.allEmojis
    }),
    width: '500px',
    height: '55dvh'
  }),
  config: mountComponent<InstanceType<typeof ConfigBottom>['$props']>({
    component: ConfigBottom,
    props: () => ({}),
    width: '540px',
    height: '65dvh'
  })
}

const openUpdateTag = (tag: Itag) => {
  components.tagUpdate.props = () => ({ tag, emojis: emojis.allEmojis })
  setView('tagUpdate')
}

const setView = (param: View) => (view.value = param)

const filterCardsByTags = (p: { includeTags: Itag[]; excludeTags: Itag[] }) => {
  cardTags.tag.filterCard.set(p)
}

watch(
  () => view.value,
  () => {
    currentSize.value = components[view.value as View]
  }
)

onMounted(() => {
  const screen = window.innerWidth
  if (screen < 768) {
    Object.entries(components).forEach(([key, component]) => {
      if (key !== 'nav') component.width = 'calc(100dvw - 16px)'
    })
  }
})
</script>

<template>
  <div class="bottom-container">
    <ModalCard class="bottom" :box-shadow="true">
      <component
        :is="components[view].component"
        v-bind="components[view].props()"
        @close="setView('nav')"
        @openCardCreate="setView('cardCreate')"
        @openFilter="setView('filter')"
        @openTags="setView('tagsBottom')"
        @openConfig="setView('config')"
        @openTagUpdate="openUpdateTag"
        @sendFilter="filterCardsByTags"
      />
    </ModalCard>
  </div>
</template>

<style scoped lang="scss">
.bottom-container {
  position: fixed;
  bottom: 15px;
  transition: all 0.3s;

  width: 100dvw;
  height: auto;
  min-height: 20px;

  display: flex;
  justify-content: center;

  & .bottom {
    transition: all 0.3s;
    height: v-bind('currentSize.height');
    width: v-bind('currentSize.width');
    // min-height: 40px;
    // min-width: 200px;
    padding: 8px;
    border-radius: 30px;

    .buttons-container {
      display: flex;
      gap: 8px;
    }
  }
}
</style>
