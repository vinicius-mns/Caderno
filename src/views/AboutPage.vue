<script setup lang="ts">
import ThemeButton from '@/components/atoms/ThemeButton.vue'
import { useStylesPage } from '@/stores/stylesPage/stylesPage'

const stylePage = useStylesPage()
</script>

<template>
  <div class="page-about-container">
    <div class="section">
      <h1 id="what-is">O que é o Site? 🤔</h1>
      <p>
        O Site é o seu espaço digital pessoal para
        <strong>organizar ideias, tarefas e projetos</strong> de maneira visual e intuitiva. Com um
        sistema flexível de cartões e tags, você tem a liberdade de criar, categorizar e encontrar
        suas anotações com facilidade e estilo.
      </p>
      <p>
        Imagine um lugar onde suas ideias podem voar livremente, onde cada projeto ganha cor e cada
        tarefa se torna um jogo. Esse lugar é o Site, seu assistente pessoal de organização que
        transforma o caos em harmonia com cartões e tags personalizáveis.
      </p>
    </div>
    <div class="section">
      <h1 id="what-for">Para que serve? 🎯</h1>
      <p>
        Seja para planejar seu dia,
        <strong>gerenciar projetos complexos ou simplesmente guardar pensamentos</strong>
        aleatórios, o Site é a ferramenta perfeita. Use-o para dar vida às suas ideias, manter o
        foco nas suas metas e desfrutar da satisfação de ver seu progresso.
      </p>
      <p>
        Planeje seu dia com alegria, gerencie seus projetos com confiança e armazene seus
        pensamentos mais brilhantes com facilidade. O Site Site é mais do que um site; é um
        companheiro que acompanha cada passo do seu caminho rumo ao sucesso e à realização pessoal.
      </p>
    </div>
    <div class="section">
      <h1 id="how-to-use">Como usar? ✍️</h1>
      <p>
        Comece criando cartões para representar suas ideias ou tarefas. Em seguida, personalize-os
        com tags-emojis que dão vida e contexto.
        <strong>Organize-os de forma que façam sentido para você</strong> e filtre com base em tags
        ou texto para encontrar exatamente o que precisa, quando precisa.
      </p>
      <ul>
        <li>
          Crie Cartões: Dê asas à <strong>criatividade</strong> e crie cartões para tudo o que
          importa.
        </li>
        <li>
          Personalize com Tags: Marque seus cartões com tags-emojis expressivos para
          <strong>destacar prioridades e categorias.</strong>
        </li>
        <li>
          <strong>Filtre e Encontre:</strong> Use o poder das tags e da busca por texto para navegar
          pelo seu universo de ideias com a velocidade da luz.
        </li>
      </ul>
    </div>
    <div class="section">
      <h1 id="why-use">Por que usar o Site? 💡</h1>
      <p>
        Com o Site, você tem uma ferramenta poderosa que se adapta ao seu fluxo de trabalho. É
        simples, é visual e é divertido.
        <strong>Transforme a complexidade do dia a dia em simplicidade</strong>
        elegante e eficaz.
      </p>
      <p>
        Porque cada grande ideia merece um palco à altura. Com o Site, você tem um espaço infinito
        para explorar possibilidades, fazer conexões e ver suas ideias crescerem. É intuitivo, é
        dinâmico, é divertido – é a ferramenta que faltava para você brilhar.
      </p>
    </div>
    <div class="section">
      <h1 id="where-data-goes">Onde meus são dados salvos? 🔒</h1>
      <p>
        Sua privacidade é nossa prioridade. Todos os seus cartões e tags são
        <strong>armazenados com segurança no Local Storage do seu dispositivo</strong>, garantindo
        que suas informações estejam sempre acessíveis e protegidas.
      </p>
      <p>
        Com o Site, seus dados são tão seus quanto suas ideias. Tudo é armazenado com segurança no
        Local Storage do seu dispositivo, garantindo que você seja o único maestro da sua sinfonia
        de informações.
      </p>
    </div>
    <RouterLink to="/cards" class="link">
      <ThemeButton class="button">Comece agora</ThemeButton>
    </RouterLink>
  </div>
</template>

<style scoped lang="scss">
.page-about-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: v-bind('stylePage.atualColor.back');
  color: v-bind('stylePage.atualColor.text');
  padding-bottom: 80px;
  & h1 {
    // font-size: 2.5rem;
    margin-bottom: 5px;
  }
  & p {
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 10px;
    max-width: 700px;
    text-align: justify;
    strong {
      font-weight: 600;
      background-color: transparent;
      color: #f1ce02;
      padding: 3px 6px;
      border-radius: 4px;
    }
  }
  li {
    margin: 12px;
    & strong {
      color: #f1ce02;
      background-color: transparent;
    }
  }
  .section {
    width: 80%;
    @media screen and (max-width: 768px) {
      width: 100%;
    }
    padding-bottom: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    & h1 {
      padding-top: 40px;
    }
  }
  & .link {
    background-color: transparent;
    width: 50%;
    @media screen and (max-width: 768px) {
      width: 90%;
    }
    margin-top: 20px;
    & .button {
      width: 100%;
      height: 60px;
      font-size: 24px;
    }
  }
}
.nav-about-container {
  width: 100%;
  // flex-shrink: 0;
  // overflow: hidden;
  // & .link-x {
  //   background-color: v-bind('atualStyle.color.two');
  //   height: 50px;
  //   width: 100%;
  //   padding: 0;
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   text-decoration: none;
  //   & button {
  //     background-color: rgb(120, 120, 168);
  //     font-size: 16px;
  //     height: 40px;
  //     width: 80%;
  //   }
  // }
  & ul {
    width: 100%;
    flex-shrink: 0;
    overflow: hidden;
    list-style: none;
    margin-top: 80px;
    & li {
      margin: 40px 0 40px 0;
      a {
        text-decoration: none;
        text-wrap: nowrap;
        background-color: transparent;
      }
      & :hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
