<script setup lang="ts">
import { ref } from 'vue'
import FlexContainer from '../atoms/FlexContainer.vue'
import ThemeP from '../atoms/ThemeP.vue'
import CheckBoxBase from '../atoms/CheckBoxBase.vue'
import TagView from '../molecules/TagView.vue'
import ButtonOption from '../molecules/ButtonOption.vue'
import EraserIco from '../atoms/icons/EraserIco.vue'
import RadioBase from '../atoms/RadioBase.vue'
import type { Itag } from '@/stores/tags/Interfaces'

const props = defineProps<{
  allTags: Itag[]
  includeTags: Itag[]
  excludeTags: Itag[]
}>()

const emit = defineEmits<{
  (e: 'includeTagAdd', v: string): void
  (e: 'includeTagRemove', v: string): void
  (e: 'excludeTagAdd', v: string): void
  (e: 'excludeTagRemove', v: string): void
  (e: 'cleanAll', v: void): void
}>()

const tagsTypeAtualRoute = ref('Com tag')
const tagsTypeRoutes = ['Com tag', 'Sem tag']

const setTagTypeRoute = (v: string) => (tagsTypeAtualRoute.value = v)

const isChecked = (type: 'includeTags' | 'excludeTags', name: string) => {
  return props[type].map((tag) => tag[1]).includes(name)
}

const handleIncludeTag = (name: string) => {
  if (isChecked('includeTags', name)) emit('includeTagRemove', name)
  else emit('includeTagAdd', name)
}

const handleExcludeTag = (name: string) => {
  if (isChecked('excludeTags', name)) emit('excludeTagRemove', name)
  else emit('excludeTagAdd', name)
}

const emitCleanAll = () => emit('cleanAll')
</script>

<template>
  <FlexContainer flex-direction="column" :style="{ height: '100%' }">
    <FlexContainer justify-content="space-between" :style="{ width: '100%' }">
      <RadioBase
        v-for="(option, i) in tagsTypeRoutes"
        radio-name="filter-tags"
        :key="i"
        :checked-value="tagsTypeAtualRoute"
        :id="option"
        :style="{ width: 'calc(50% - 4px)', height: '36px', margin: '4px 0' }"
        @select="setTagTypeRoute"
      >
        <ThemeP :content="option" />
      </RadioBase>
    </FlexContainer>
    <FlexContainer
      v-if="tagsTypeAtualRoute === 'Com tag'"
      flex-wrap="wrap"
      :style="{ overflow: 'auto' }"
    >
      <CheckBoxBase
        v-for="(tag, i) in props.allTags"
        checkbox-name="include-tags"
        :key="i"
        :is-checked="isChecked('includeTags', tag[1])"
        :id="tag[1]"
        class="check-button"
        @select="() => handleIncludeTag(tag[1])"
      >
        <TagView :tag="tag" />
      </CheckBoxBase>
    </FlexContainer>
    <FlexContainer
      v-if="tagsTypeAtualRoute === 'Sem tag'"
      flex-wrap="wrap"
      :style="{ overflow: 'auto' }"
    >
      <CheckBoxBase
        v-for="(tag, i) in props.allTags"
        checkbox-name="include-tags"
        :key="i"
        :is-checked="isChecked('excludeTags', tag[1])"
        :id="tag[1]"
        class="check-button"
        @select="() => handleExcludeTag(tag[1])"
      >
        <TagView :tag="tag" />
      </CheckBoxBase>
    </FlexContainer>
    <ButtonOption
      :visible="true"
      content="Limpar filtro"
      :style="{ 'margin-top': '5px' }"
      @click="emitCleanAll"
    >
      <EraserIco />
    </ButtonOption>
  </FlexContainer>
</template>

<style scoped lang="scss">
.check-button {
  width: calc(50% - 4px);
  margin: 2px;
}
</style>
