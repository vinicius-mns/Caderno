<script setup lang="ts">
import SwitchButton from '../../atoms/SwitchButton.vue'
import type { ITag } from '@/api/local'
import TagView from '../../molecules/TagView.vue'
import { reactive } from 'vue'

const props = defineProps<{
  unicName: string
  tag: ITag
  checked: boolean
}>()

const emit = defineEmits<{
  (e: 'emitTag', v: { tagId: string; checked: boolean }): void
}>()

const checked = reactive({
  value: {
    tagId: props.tag.id,
    checked: props.checked
  },
  toggle: () => (checked.value.checked = !checked.value.checked)
})

const clickInTagChecked = () => {
  checked.toggle()
  emit('emitTag', checked.value)
}
</script>

<template>
  <div class="tag-container">
    <TagView
      :class="[checked.value.checked ? 'checked' : '', 'button']"
      :tag="props.tag"
      @click="clickInTagChecked"
    />
    <SwitchButton
      @emit-checked="clickInTagChecked"
      :id="tag.id"
      :check-value="checked.value.checked"
      :unic-name="props.unicName"
      class="switch"
    />
  </div>
</template>

<style scoped lang="scss">
.tag-container {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  & .button {
    width: 100%;
    flex-shrink: 0;
    margin-bottom: 6px;
  }
  & .ent-button {
    margin-bottom: 0;
  }
  & .switch {
    opacity: 0;
    position: absolute;
    top: 2.5px;
    right: 10px;
  }
  & .checked {
    background-color: rgb(128, 184, 128);
    color: black;
  }
}
</style>
