<script setup lang="ts">
import { useStyle } from '@/stores/style'
import { onMounted, reactive } from 'vue'

const { style } = useStyle()

const sideW = reactive({
  closed: false,
  closeDefault: '60px',
  mobile: '60px',
  desktop: '60px',
  mobileDefault: '100%',
  desktopDefault: '360px'
})

const closeSidebar = () => {
  sideW.closed = true
  sideW.mobile = sideW.closeDefault
  sideW.desktop = sideW.closeDefault
}

const openSidebar = () => {
  sideW.closed = false
  sideW.mobile = sideW.mobileDefault
  sideW.desktop = sideW.desktopDefault
}

const toggleSidebar = () => {
  sideW.closed ? openSidebar() : closeSidebar()
}

const isMobile = () => window.innerWidth <= 768

const closeSideIfMobileDivice = () => {
  isMobile() ? closeSidebar() : openSidebar()
}

onMounted(closeSideIfMobileDivice)
</script>

<template>
  <div class="page-container">
    <div class="side focus">
      <div class="content">
        <slot name="sidebar-content"></slot>
      </div>
      <div class="actions-container">
        <div class="actions-buttons">
          <button @click="toggleSidebar" class="action-button" v-if="sideW.closed">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="Outline"
              viewBox="0 0 24 24"
              width="512"
              height="512"
              style="transform: rotate(180deg)"
            >
              <path
                d="M19,11H9l3.29-3.29a1,1,0,0,0,0-1.42,1,1,0,0,0-1.41,0l-4.29,4.3A2,2,0,0,0,6,12H6a2,2,0,0,0,.59,1.4l4.29,4.3a1,1,0,1,0,1.41-1.42L9,13H19a1,1,0,0,0,0-2Z"
              />
            </svg>
          </button>
          <button @click="toggleSidebar" class="action-button" v-else>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="Outline"
              viewBox="0 0 24 24"
              width="512"
              height="512"
            >
              <path
                d="M19,11H9l3.29-3.29a1,1,0,0,0,0-1.42,1,1,0,0,0-1.41,0l-4.29,4.3A2,2,0,0,0,6,12H6a2,2,0,0,0,.59,1.4l4.29,4.3a1,1,0,1,0,1.41-1.42L9,13H19a1,1,0,0,0,0-2Z"
              />
            </svg>
          </button>
          <slot name="action-button"></slot>
        </div>
      </div>
    </div>
    <main class="page focus">
      <slot name="page-content"></slot>
    </main>
  </div>
</template>

<style scoped lang="scss">
.focus:hover {
  z-index: 2;
}
.routerlink {
  margin: 0;
  padding: 0;
}
.config-button {
  font-size: 20px;
  filter: grayscale(100%);
  &:hover {
    filter: grayscale(0);
  }
}
.actions-container {
  width: 60px;
  height: 100%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: v-bind('style.color.background');
  & .actions-buttons {
    height: 95%;
    display: flex;
    flex-direction: column;
    & .action-button {
      width: 40px;
      margin: 10px 0 10px;
      aspect-ratio: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: v-bind('style.color.base');
      color: v-bind('style.color.text');
      border-radius: 8px;
      & svg {
        height: 22px;
        fill: v-bind('style.color.text');
      }
      border: none;
      cursor: pointer;
      &:hover {
        background-color: v-bind('style.color.highlight');
      }
    }
    @media screen and (max-width: 768px) {
      flex-direction: column-reverse;
    }
  }
}
.content {
  overflow: hidden;
  background-color: v-bind('style.color.base');
}
$sidebarWidth: v-bind('sideW.desktop');
.page-container {
  display: flex;
  & .side {
    z-index: 2;
    transition: all 0.3s;
    width: $sidebarWidth;
    height: 100dvh;
    flex-shrink: 0;
    position: sticky;
    top: 0;
    display: flex;
    & .content {
      width: calc(100% - 60px);
      height: 100%;
    }
  }
  & .page {
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: v-bind('style.color.background');
  }
}

@media screen and (max-width: 768px) {
  $sidebarWidth: v-bind('sideW.mobile');
  .page-container {
    display: flex;
    & .side {
      z-index: 2;
      transition: all 0.3s;
      width: $sidebarWidth;
      height: 100dvh;
      flex-shrink: 0;
      position: fixed;
      top: 0;
      display: flex;
      & .content {
        width: calc(100% - 60px);
        height: 100%;
      }
    }
    & .page {
      width: calc(100% - 60px);
      margin-left: 60px;
    }
  }
}
</style>
