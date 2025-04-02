<script setup lang="ts">
import { computed, ref } from 'vue'
import { useTags } from '@/stores/tags/tags'
import { useCards } from '@/stores/cards/cards'
import WindowsSlot from '@/components/molecules/WindowsSlot.vue'
import { useWindows } from '@/stores/windows'
import FlexContainer from '@/components/atoms/FlexContainer.vue'
import ButtonSlot from '@/components/molecules/ButtonSlot.vue'
import SaveIco from '@/components/atoms/icons/SaveIco.vue'
import ThemeTextArea from '@/components/atoms/ThemeTextArea.vue'
import type { Icard } from '@/stores/cards/Interfaces'
import ThemeP from '@/components/atoms/ThemeP.vue'

const window = useWindows()
const cards = useCards()
const tags = useTags()

const cardArray = computed(() => {
  const card: Icard = {
    content: 'texto texto lalala sei la alguma coisa teste meme piada mijo',
    date: new Date(),
    id: '',
    tags: tags.includeTags
  }
  return [card, card, card, card]
})

const cardList = ref<string[]>([])

const splitByMultipleNewlines = (text: string) => {
  return text.split(/\n{3,}/)
}

const trimSections = (sections: string[]) => {
  return sections.map((section) => section.trim())
}

const filterEmptySections = (sections: string[]) => {
  return sections.filter((section) => section !== '')
}

const parseTextSections = (text: string) => {
  const splitSections = splitByMultipleNewlines(text)
  const trimmedSections = trimSections(splitSections)
  const filteredSections = filterEmptySections(trimmedSections)
  return filteredSections
}

const printText = (t: string) => {
  // console.log('quebrou a linha?', t.includes('\n'))
  // console.log(t)
  const xxx = parseTextSections(t)
  cardList.value = xxx
}
</script>

<template>
  <WindowsSlot
    v-if="window.cardCreate.show"
    :title="window.cardCreate.title"
    @close="window.cardCreate.close"
  >
    <FlexContainer class="window-create-card">
      <FlexContainer class="left" flex-direction="column" align-items="center">
        <ThemeTextArea
          class="text-area-create-card"
          id="card-create"
          content=""
          @emit-content="printText"
          @keydown="() => {}"
        />
      </FlexContainer>

      <FlexContainer class="right">
        <div class="card-simple" v-for="(card, i) in cardList" :key="i">
          <ThemeP :content="card" />
        </div>
      </FlexContainer>
    </FlexContainer>
  </WindowsSlot>
</template>

<style scoped lang="scss">
.window-create-card {
  width: 95dvw;
  height: calc(95dvh - 50px);

  & .left {
    flex-shrink: 0;
    width: 40%;
    height: 100%;
    // background-color: blue;

    & .text-area-create-card {
      margin-top: 20px;
      width: 80%;
      height: 100%;

      border: solid 1px white;
    }
  }

  & .right {
    width: 100%;
    height: 100%;

    & .card-simple {
      background-color: red;
      border-radius: 8px;
      margin: 8px;
      width: 250px;
      height: fit-content;

      & p {
        margin: 8px;
      }
    }
    // background-color: red;
  }
}
</style>
