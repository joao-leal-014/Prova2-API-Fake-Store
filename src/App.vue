<template>
  <div id="app">
    <!-- Exibe o cabeçalho somente se o usuário estiver logado -->
    <Header v-if="isAuthenticated" /> <!-- Cabeçalho, apenas quando autenticado -->
    
    <router-view />  <!-- Renderiza a página ativa (Login, Produtos, etc.) -->
  </div>
</template>

<script>
// Importando o componente de cabeçalho
import index from './router/index.js';
import { computed } from 'vue';

export default {
  name: 'App',
  router: {
    index,
  },
  setup() {
    // Verifica se o usuário está autenticado com base no token no localStorage
    const isAuthenticated = computed(() => {
      return !!localStorage.getItem('token');
    });

    return { isAuthenticated };
  },
};
</script>

<style>
/* Estilos globais podem ser definidos aqui */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
