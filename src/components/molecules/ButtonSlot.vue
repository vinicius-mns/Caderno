<script setup lang="ts">
import ThemeP from '@/components/atoms/ThemeP.vue'
import ThemeButton from '@/components/atoms/ThemeButton.vue'
import FlexContainer from '../atoms/FlexContainer.vue'

const props = withDefaults(
  defineProps<{
    content: string
    fontSize?: string
    backgroundColor?: string
    borderColor?: string
    borderRadius?: string
    invertColor?: boolean
  }>(),
  {
    backgroundColor: '',
    borderColor: '',
    borderRadius: '',
    fontSize: '14px',
    invertColor: false
  }
)
</script>

<template>
  <ThemeButton class="option-button-container" v-bind="props">
    <FlexContainer align-items="center" justify-center="center" class="teste">
      <FlexContainer class="ico" align-items="center" justify-content="center">
        <slot></slot>
      </FlexContainer>

      <FlexContainer class="text">
        <ThemeP :content="props.content" />
      </FlexContainer>
    </FlexContainer>
  </ThemeButton>
</template>

<style scoped lang="scss">
.option-button-container {
  height: 40px;
  width: fit-content;
  flex-shrink: 0;
  flex-grow: 0;
  position: relative;

  & .ico {
    flex-shrink: 0;
    margin-left: 15px;
  }

  & .text {
    flex-shrink: 0;
    width: 100%;
    margin-right: 16px;
    margin-left: 14px;

    & p {
      overflow: hidden;
      text-overflow: ellipsis;
      text-wrap: nowrap;
      font-size: v-bind('props.fontSize');
    }
  }
}
</style>
