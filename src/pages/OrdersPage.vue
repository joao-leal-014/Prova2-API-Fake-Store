<template>
  <div class="order-management">
    <h1>Gestão de Pedidos</h1>
    
    <!-- Tabela de Pedidos -->
    <div class="order-list">
      <div v-for="order in orders" :key="order.id" class="order-card">
        <div class="order-info">
          <h3>Pedido #{{ order.id }}</h3>
          <p><strong>Data:</strong> {{ new Date(order.date).toLocaleDateString() }}</p>
          <p><strong>Valor Total:</strong> R$ {{ order.total }}</p>
          <p><strong>Status:</strong> {{ order.status }}</p>
        </div>
        <div class="order-actions">
          <button @click="viewOrderDetails(order.id)" class="action-btn">Ver Detalhes</button>
        </div>
      </div>
    </div>

    <!-- Modal de Detalhes do Pedido -->
<div v-if="showModal" class="modal">
  <div class="modal-content">
    <!-- Botão de Fechar Modal (X) -->
    <span class="close" @click="closeModal">&times;</span>
    
    <h2>Detalhes do Pedido #{{ currentOrder.id }}</h2>
    <p><strong>Data:</strong> {{ new Date(currentOrder.date).toLocaleDateString() }}</p>
    <p><strong>Status:</strong> 
      <select v-model="currentOrder.status" @change="updateOrderStatus">
        <option value="pending">Pendente</option>
        <option value="completed">Completo</option>
        <option value="shipped">Enviado</option>
      </select>
    </p>
    <h3>Produtos do Pedido</h3>
    <table>
      <thead>
        <tr>
          <th>Produto</th>
          <th>Quantidade</th>
          <th>Preço</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in currentOrder.items" :key="item.productId">
          <td>{{ item.productName }}</td>
          <td>{{ item.quantity }}</td>
          <td>R$ {{ item.price }}</td>
          <td>R$ {{ item.price * item.quantity }}</td>
        </tr>
      </tbody>
    </table>
    <p><strong>Total:</strong> R$ {{ currentOrder.total }}</p>
  </div>
</div>


    <!-- Botões de navegação -->
    <div class="navigation-buttons">
      <button @click="navigateTo('/home')">Voltar</button>
      <button @click="navigateTo('/')">SAIR</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      orders: [],
      showModal: false,
      currentOrder: null,
    };
  },
  async created() {
    try {
      const response = await axios.get('https://fakestoreapi.com/carts');
      this.orders = response.data;
    } catch (error) {
      console.error("Erro ao buscar dados: ", error);
    }
  },
  methods: {
    viewOrderDetails(id) {
      this.currentOrder = this.orders.find(order => order.id === id);
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.currentOrder = null;
    },
    updateOrderStatus() {
      alert(`Status do pedido #${this.currentOrder.id} atualizado para: ${this.currentOrder.status}`);
    },
    navigateTo(route) {
      this.$router.push(route);
    },
  },
};
</script>

<style scoped>
h1 {
  color: #f0f0f0;
}

/* Estilo para o container principal */
.order-management {
  font-family: Arial, sans-serif;
  padding: 20px;
  background-color: #8a2323;
}

/* Lista de pedidos */
.order-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.order-card {
  background-color: #ffffff; /* Nova cor de fundo para bom contraste */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  margin: 15px;
  padding: 15px;
  text-align: center;
}

.order-info {
  margin-bottom: 20px;
  color: #000000; /* Cor das letras para melhor legibilidade */
}

.order-actions {
  margin-top: 10px;
}

.action-btn {
  background-color: #007BFF;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.action-btn:hover {
  background-color: #0056b3;
}

/* Estilo para o modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 600px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
}

/* Botão de fechar */
.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 30px;
  color: #333;
  cursor: pointer;
  padding: 5px;
}

.close:hover {
  color: #d9534f;
}

/* Outros estilos do modal */
.modal-content h2 {
  margin-top: 0;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}

.close {
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 24px;
  cursor: pointer;
}

/* Estilo dos botões de navegação */
.navigation-buttons {
  margin-top: 30px;
  display: flex;
  justify-content: space-around;
}

.navigation-buttons button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
}

.navigation-buttons button:hover {
  background-color: #f0f0f0;
}
</style>
