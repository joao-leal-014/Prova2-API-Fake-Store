import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../pages/LoginPage.vue';
import ProductsPage from '../pages/ProductsPage.vue';
import OrdersPage from '../pages/OrdersPage.vue';
import UsersPage from '../pages/UsersPage.vue';
import HomePage from '@/pages/HomePage.vue';

const routes = [
  // Página de Login
  { path: '/', component: LoginPage },

  // Página principal (Produtos) - só acessível se autenticado
  { 
    path: '/home', 
    component: HomePage, 
    meta: { requiresAuth: true } 
  },

  // Outras páginas protegidas
  { 
    path: '/products', 
    component: ProductsPage, 
    meta: { requiresAuth: true } 
  },
  { 
    path: '/orders', 
    component: OrdersPage, 
    meta: { requiresAuth: true } 
  },
  { 
    path: '/users', 
    component: UsersPage, 
    meta: { requiresAuth: true } 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token'); // Verifica o token no localStorage

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login'); // Redireciona para a página de login
  } else {
    next(); // Permite o acesso à rota
  }
});

export default router;
