<script setup lang="ts">
import FlexContainer from '@/components/atoms/FlexContainer.vue'
import CheckIco from '@/components/atoms/icons/CheckIco.vue'
import EraserIco from '@/components/atoms/icons/EraserIco.vue'
import ThemeH2 from '@/components/atoms/ThemeH2.vue'
import ButtonCoinSlot from '@/components/molecules/ButtonCoinSlot.vue'
import ButtonSlot from '@/components/molecules/ButtonSlot.vue'
import TagsHeader from '@/components/molecules/TagsHeader.vue'
import TagView2 from '@/components/molecules/TagView2.vue'
import { useStylesPage } from '@/stores/stylesPage/stylesPage'
import type { Itag } from '@/stores/tags/Interfaces'
import { useTags } from '@/stores/tags/tags'
import { useWindows } from '@/stores/windows'
import { computed, onMounted, reactive } from 'vue'
import SearchImput from '@/components/molecules/SearchImput.vue'
import ThemeH1 from '@/components/atoms/ThemeH1.vue'
import BackIco from '@/components/atoms/icons/BackIco.vue'
import CrossIco from '@/components/atoms/icons/CrossIco.vue'

const tags = useTags()

const windows = useWindows()

const stylesPage = useStylesPage()

// valores

const allTags = computed(() => tags.tags)

const selectedTags = reactive<Itag[]>([])

const notSelectedTags = computed(() => {
  return allTags.value.filter((tag) => !selectedTags.map((t) => t[1]).includes(tag[1]))
})

type tagStatus = 'selected' | 'none'

const tagsList = computed(() => {
  const selected = selectedTags.map((tag) => ({ tag, type: 'selected' as tagStatus }))
  const notSelected = notSelectedTags.value.map((tag) => ({ tag, type: 'none' as tagStatus }))

  return [...selected, ...notSelected]
})

const status = reactive({
  isModify: false,
  isEmpty: false
})

// metodos

const handlerStatus = () => {
  const initSelected = windows.tagSelector.props.selected
  const finalSelected = selectedTags

  const modify = () => {
    if (initSelected.length !== finalSelected.length) status.isModify = true
    else if (JSON.stringify(initSelected) !== JSON.stringify(finalSelected)) status.isModify = true
    else status.isModify = false
  }

  const isEmpty = () => {
    if (finalSelected.length === 0) status.isEmpty = true
    else status.isEmpty = false
  }

  modify()
  isEmpty()
}

const selectedTagsAdd = (tag: Itag) => {
  selectedTags.push(tag)
  handlerStatus()
}

const selectedTagsRemove = (tag: Itag) => {
  const index = selectedTags.findIndex((t) => t[1] === tag[1])
  selectedTags.splice(index, 1)
  handlerStatus()
}

const handleAddRemove = (tag: Itag, type: 'selected' | 'none') => {
  if (type === 'selected') selectedTagsRemove(tag)
  else selectedTagsAdd(tag)
}

const selectedTagsClear = () => {
  selectedTags.splice(0, selectedTags.length)
  handlerStatus()
}

// ciclo de vida

onMounted(() => {
  selectedTags.splice(0, selectedTags.length, ...windows.tagSelector.props.selected)
})
</script>

<template>
  <div>
    <div class="glass"></div>

    <FlexContainer class="tags-selector-container" flex-direction="column" align-items="center">
      <FlexContainer class="header-container" align-items="center" justify-content="space-between">
        <ThemeH1 content="Tag seletor" />

        <ButtonCoinSlot content="Fechar" @click="windows.tagSelector.close()">
          <CrossIco />
        </ButtonCoinSlot>
      </FlexContainer>

      <FlexContainer flex-wrap="wrap" class="tags-list-container">
        <TagView2
          v-for="(tag, i) in tagsList"
          :key="i"
          :tag="tag.tag"
          class="tag"
          :type="tag.type === 'selected' ? 'selected' : 'none'"
          @click="handleAddRemove(tag.tag, tag.type)"
        />

        <ThemeH1
          content="Nenhuma tag selecionada"
          v-show="status.isEmpty"
          :style="{ color: 'red' }"
        />
      </FlexContainer>

      <FlexContainer class="bottom-container" justify-content="end">
        <ButtonCoinSlot content="Limpar" @click="selectedTagsClear">
          <EraserIco />
        </ButtonCoinSlot>

        <ButtonSlot content="Confirmar" border-radius="50px" class="margin-left">
          <CheckIco />
        </ButtonSlot>
      </FlexContainer>
    </FlexContainer>
  </div>
</template>

<style scoped lang="scss">
.glass {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
}

.tags-selector-container {
  position: fixed;
  top: 0;
  left: 0;
  background-color: v-bind('stylesPage.atualColor.front');
  width: 500px;
  height: 100dvh;
  // padding: 15px;
  // box-sizing: border-box;

  & .header-container {
    width: 100%;
    padding: 10px 20px 20px;
    box-sizing: border-box;
    // margin: 10px 0 20px;
  }

  & .tags-list-container {
    border: solid 1px v-bind('stylesPage.atualColor.border');
    border-radius: 10px;
    margin: 0 20px 10px;
    padding: 10px;
    overflow-y: auto;
    box-sizing: border-box;

    & .tag {
      width: calc(25% - 6px);
      margin: 3px;
    }
  }

  & .bottom-container {
    width: 100%;
    padding: 0 20px;
    margin-bottom: 50px;
    box-sizing: border-box;
  }

  & .margin-left {
    margin-left: 6px;
  }
}
</style>
