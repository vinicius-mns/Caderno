<script setup lang="ts">
import { useStylesPage } from '@/stores/stylesPage/stylesPage'
import { reactive } from 'vue'

const stylePage = useStylesPage()

const props = withDefaults(
  defineProps<{
    ico?: string
    unicName: string
    id: string
    checkValue: boolean
  }>(),
  { ico: '' }
)

const emit = defineEmits<{
  (e: 'emitChecked', v: { id: string; checked: boolean }): void
}>()

const checked = reactive({
  value: {
    id: props.id,
    checked: props.checkValue
  },
  toggle: () => (checked.value.checked = !checked.value.checked)
})

const emitChecked = () => {
  checked.toggle()
  emit('emitChecked', checked.value)
}
</script>

<template>
  <div class="switch">
    <input type="checkbox" :id="`${props.unicName}-${props.id}`" :value="checked" />
    <label :for="`${props.unicName}-${props.id}`" @click="emitChecked">
      <div :class="[props.checkValue ? 'on' : 'off', 'ball']">{{ props.ico }}</div>
    </label>
  </div>
</template>

<style scoped lang="scss">
$buttonSize: calc(36px - 10px);
$margin: 5px;
$borderRadius: v-bind('stylePage.borderRadius.inside');
.switch {
  height: $buttonSize;
  display: flex;
  & input[type='checkbox'] {
    height: 0;
    width: 0;
    visibility: hidden;
  }
  & label {
    position: relative;
    width: calc(($buttonSize * 2 + $margin));
    height: $buttonSize;
    background: rgba(120, 120, 120, 0.5);
    display: block;
    border-radius: 50px;
    cursor: pointer;
  }
  & .ball {
    position: absolute;
    height: calc($buttonSize - $margin);
    font-size: calc($buttonSize - $margin * 2);
    aspect-ratio: 1;
    left: $margin;
    top: calc($margin / 2);
    background: white;
    border-radius: 50%;
    transition: 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  // & input:checked + label {
  //   background: rgb(58, 121, 58);
  // }
  & .on {
    left: calc(100% - 5px);
    transform: translateX(-100%);
  }
}
</style>
