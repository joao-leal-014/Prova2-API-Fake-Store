<template>
  <div class="dashboard-container">
    <h1 class="text-center my-4">Dashboard</h1>
    <div class="row text-center overview mb-4">
      <div class="col-md-3">
        <div class="info-box">
          <p class="info-box-title">Total de Produtos</p>
          <p class="info-box-value">{{ totalProducts }}</p>
        </div>
      </div>
      <div class="col-md-3">
        <div class="info-box">
          <p class="info-box-title">Total de Categorias</p>
          <p class="info-box-value">{{ totalCategories }}</p>
        </div>
      </div>
      <div class="col-md-3">
        <div class="info-box">
          <p class="info-box-title">Total de Pedidos</p>
          <p class="info-box-value">{{ totalOrders }}</p>
        </div>
      </div>
      <div class="col-md-3">
        <div class="info-box">
          <p class="info-box-title">Total de Usuários</p>
          <p class="info-box-value">{{ totalUsers }}</p>
        </div>
      </div>
    </div>

    <!-- Botões de navegação -->
    <div class="text-center">
      <button class="btn btn-primary me-2" @click="goTo('/products')">Produtos</button>
      <button class="btn btn-primary me-2" @click="goTo('/orders')">Pedidos</button>
      <button class="btn btn-primary me-2" @click="goTo('/users')">Usuários</button>
      <button class="btn btn-danger" @click="goTo('/')">SAIR</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      totalProducts: 0,
      totalCategories: 0,
      totalOrders: 0,
      totalUsers: 0,
    };
  },
  async created() {
    const products = await axios.get('https://fakestoreapi.com/products');
    const categories = await axios.get('https://fakestoreapi.com/products/categories');
    const carts = await axios.get('https://fakestoreapi.com/carts');
    const users = await axios.get('https://fakestoreapi.com/users');

    this.totalProducts = products.data.length;
    this.totalCategories = categories.data.length;
    this.totalOrders = carts.data.length;
    this.totalUsers = users.data.length;
  },
  methods: {
    goTo(route) {
      this.$router.push(route); // Navega para a rota especificada
    },
  },
};
</script>

<style scoped>
.dashboard-container {
  font-family: Arial, sans-serif;
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #333;
}

.overview .info-box {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.overview .info-box:hover {
  transform: translateY(-5px);
}

.info-box-title {
  font-size: 1.2em;
  color: #777;
}

.info-box-value {
  font-size: 2em;
  color: #333;
}

button {
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}

.btn-primary {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-danger {
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
}

.btn-danger:hover {
  background-color: #d32f2f;
}
</style>
