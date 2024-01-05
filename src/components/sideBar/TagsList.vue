<script setup lang="ts">
const mockTags = [
  { img: '🌼', content: 'batata' },
  { img: '🫀', content: 'coisa' },
  { img: '🐦', content: 'passarin' },
  { img: '🤓', content: 'tudo foi penando' },
  { img: '🥰', content: 'mais um' },
  { img: '👑', content: 'mais um' },
  { img: '💙', content: 'outro' },
  { img: '🤓', content: 'quem diria' },
  { img: '⭐️', content: 'aaaaaaaaa' },
  { img: '⭐️', content: 'bbbbb' },
  { img: '🫀', content: 'cccccc' },
  { img: '👑', content: 'dddddd' },
  { img: '💙', content: 'coracao azul !!!!!!!!!!!1' }
]
</script>

<template>
  <ul class="tags-list">
    <li class="tag" v-for="(tag, i) in mockTags" :key="i" :title="tag.content">
      <button>
        <p class="ico">{{ tag.img }}</p>
        <p class="text">{{ tag.content }}</p>
      </button>
    </li>
    <li class="tag add-tag-button">
      <button>
        <p>Criar nova tag</p>
      </button>
    </li>
  </ul>
</template>

<style scoped lang="scss">
@media screen and (min-width: 769px) {
  .tags-list {
    // medidas
    width: 100%;
    height: 100%;
    // display
    display: flex;
    flex-direction: column;
    align-items: center;
    // estilo
    overflow: hidden;
    scrollbar-gutter: stable;
    background-color: white;

    &:hover {
      overflow: auto;
    }

    & .tag {
      // medidas
      width: 98%;
      height: 40px;
      margin-top: 10px;
      flex-shrink: 0;

      & button {
        // medidas
        width: 100%;
        height: 100%;
        // display
        display: flex;
        flex-direction: row;
        align-items: center;
        // estilo
        background-color: white;
        border: solid 0.5px black;
        border-radius: 50px;
        cursor: pointer;

        & .ico {
          // medidas
          font-size: 24px;
          margin-left: 12px;
        }

        & .text {
          // medidas
          margin-left: 5px;
          text-wrap: nowrap;
          // estilo
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }

    & .add-tag-button {
      & button {
        // estilo
        background-color: white;
        border: solid red 1px;
        background-color: rgba(255, 0, 0, 0.3);
        // center text
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .tags-list {
    // medidas
    width: 100%;
    height: 100%;
    // display
    display: flex;
    flex-direction: row;
    overflow: auto;
    align-items: center;
    // estilo
    background-color: white;

    & .tag {
      // medidas
      max-width: 150px;
      height: 38px;
      margin-left: 10px;
      flex-shrink: 0;
      overflow: hidden;
      // estilo
      border: solid 0.5px black;
      list-style-type: none;
      border-radius: 50px;

      & button {
        // medidas
        width: 100%;
        height: 100%;
        // display
        display: flex;
        flex-direction: row;
        align-items: center;
        // estilo
        background-color: white;
        border: none;

        & .ico {
          font-size: 24px;
          margin-left: 12px;
        }

        & .text {
          margin-left: 5px;
          margin-right: 10px;
          text-wrap: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
    & .add-tag-button {
      // medidas
      margin-right: 20dvw;
      border: solid red 1px;
      background-color: rgba(255, 0, 0, 0.3);
      // center
      display: flex;
      align-items: center;
      justify-content: center;

      & button {
        // medidas
        width: 50dvw;
        // estilo
        border: none;
        background-color: transparent;
        // center
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>
