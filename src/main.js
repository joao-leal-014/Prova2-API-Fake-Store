import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Certifique-se de importar o router corretamente

createApp(App)
  .use(router)  // Use o Vue Router para navegação
  .mount('#app');
