import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Asegúrate de que la ruta es correcta

createApp(App)
  .use(router) // Usa el router aquí
  .mount('#app');
