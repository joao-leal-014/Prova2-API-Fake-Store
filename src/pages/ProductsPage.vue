<template>
  <div class="product-container">
    <h1>Gestão de Produtos</h1>

    <!-- Botão para Adicionar Produto -->
    <div class="add-product-container">
      <button class="add-product-button" @click="openAddProductModal">Adicionar Produto</button><br><br>
    </div>

    <!-- Filtro por categoria -->
    <div class="filter-container">
      <label for="categoryFilter">Filtrar por categoria:</label>
      <select v-model="selectedCategory" @change="filterProducts" class="category-select">
        <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
      </select>
    </div>

    <!-- Filtro por preço -->
    <div class="filter-container">
      <label for="minPrice">Preço Mínimo:</label>
      <input type="number" v-model="minPrice" @change="filterProducts" class="price-filter" placeholder="Preço mínimo" />
      
      <label for="maxPrice">Preço Máximo:</label>
      <input type="number" v-model="maxPrice" @change="filterProducts" class="price-filter" placeholder="Preço máximo" />
    </div>

    <!-- Filtro por classificação -->
    <div class="filter-container">
      <label for="ratingFilter">Filtrar por classificação:</label>
      <select v-model="selectedRating" @change="filterProducts" class="rating-select">
        <option value="">Todas</option>
        <option v-for="rating in ratingOptions" :key="rating" :value="rating">{{ rating }} estrelas</option>
      </select>
    </div>

    <!-- Lista de Produtos -->
    <div class="product-grid">
      <div v-for="product in filteredProducts" :key="product.id" class="product-card">
        <img :src="product.image" alt="Produto" class="product-image" />
        <h3 class="product-title">{{ product.title }}</h3>
        <p class="product-category">{{ product.category }}</p>
        <p class="product-price">${{ product.price }}</p>
        <p class="product-rating">Classificação: {{ product.rating.rate }} ({{ product.rating.count }} avaliações)</p>
        <button class="details-button" @click="viewProductDetails(product)">Ver Detalhes</button>
        <button class="update-button" @click="openEditProductModal(product.id)">Editar</button>
        <button class="delete-button" @click="confirmDeleteProduct(product.id)">Excluir</button>
        <button class="add-cart-button" @click="addToCart(product)">Adicionar ao Carrinho</button>
      </div>
    </div>

    <!-- Modal para Adicionar/Editar Produto -->
    <div v-if="showProductModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>{{ isEditMode ? 'Editar Produto' : 'Adicionar Produto' }}</h2>
        <form @submit.prevent="isEditMode ? updateProduct() : addProduct()">
          <div>
            <label for="productTitle">Nome:</label>
            <input type="text" v-model="productForm.title" required />
          </div>
          <div>
            <label for="productCategory">Categoria:</label>
            <input type="text" v-model="productForm.category" required />
          </div>
          <div>
            <label for="productPrice">Preço:</label>
            <input type="number" v-model="productForm.price" required />
          </div>
          <div>
            <label for="productImage">Imagem (URL):</label>
            <input type="url" v-model="productForm.image" required />
          </div>
          <button type="submit">{{ isEditMode ? 'Atualizar' : 'Adicionar' }} Produto</button>
        </form>
      </div>
    </div>

    <!-- Modal de confirmação de exclusão -->
    <div v-if="showDeleteConfirmModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>Tem certeza que deseja excluir este produto?</h2>
        <button @click="deleteProduct">Sim, excluir</button>
        <button @click="closeModal">Cancelar</button>
      </div>
    </div>

    <!-- Modal de Detalhes do Produto -->
    <div v-if="showProductDetailsModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeProductDetailsModal">&times;</span>
        <h2>Detalhes do Produto</h2>
        <div class="product-details">
          <img :src="currentProduct.image" alt="Produto" class="modal-image" />
          <h3>{{ currentProduct.title }}</h3>
          <p><strong>Categoria:</strong> {{ currentProduct.category }}</p>
          <p><strong>Preço:</strong> ${{ currentProduct.price }}</p>
          <p><strong>Classificação:</strong> {{ currentProduct.rating.rate }} ({{ currentProduct.rating.count }} avaliações)</p>
          <p><strong>Descrição:</strong> {{ currentProduct.description }}</p>
        </div>
      </div>
    </div>

    <!-- Modal de Carrinho de Compras -->
    <div v-if="showCartModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeCartModal">&times;</span>
        <h2>Carrinho de Compras</h2>
        <div v-if="cart.length === 0">O carrinho está vazio.</div>
        <ul v-else>
          <li v-for="item in cart" :key="item.id">
            <p>{{ item.title }} - ${{ item.price }}</p>
            <button @click="removeFromCart(item)">Remover</button>
          </li>
        </ul>
        <p v-if="cart.length > 0">Total: ${{ totalPrice }}</p>
        <button @click="checkout">Finalizar Compra</button>
      </div>
    </div>

    <!-- Botões de navegação -->
    <div class="navigation-buttons">
      <button class="nav-button" @click="navigateTo('/home')">Voltar</button>
      <button class="nav-button" @click="navigateTo('/')">SAIR</button>
      <button class="nav-button" @click="openCartModal">Ver Carrinho</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      products: [],
      filteredProducts: [],
      categories: [],
      selectedCategory: '',
      selectedRating: '',
      ratingOptions: [1, 2, 3, 4, 5],  // Opções de classificação (1 a 5 estrelas)
      showProductModal: false,
      showDeleteConfirmModal: false,
      showProductDetailsModal: false,
      showCartModal: false,  // Estado para controlar a exibição do carrinho
      currentProduct: null,
      productForm: {
        title: '',
        category: '',
        price: null,
        image: '',
      },
      isEditMode: false,
      minPrice: null,
      maxPrice: null,
      cart: [],  // Carrinho de compras
    };
  },
  computed: {
    totalPrice() {
      return this.cart.reduce((total, item) => total + item.price, 0).toFixed(2);
    },
  },
  async created() {
    try {
      // Buscar produtos
      const response = await axios.get('https://fakestoreapi.com/products');
      this.products = response.data;
      this.filteredProducts = this.products;

      // Buscar categorias
      const categoryResponse = await axios.get('https://fakestoreapi.com/products/categories');
      this.categories = categoryResponse.data;
    } catch (error) {
      console.error("Erro ao buscar dados: ", error);
    }
  },
  methods: {
    filterProducts() {
      let filtered = this.products;

      // Filtro por categoria
      if (this.selectedCategory) {
        filtered = filtered.filter(product => product.category === this.selectedCategory);
      }

      // Filtro por preço
      if (this.minPrice !== null) {
        filtered = filtered.filter(product => product.price >= this.minPrice);
      }
      if (this.maxPrice !== null) {
        filtered = filtered.filter(product => product.price <= this.maxPrice);
      }

      // Filtro por classificação
      if (this.selectedRating) {
        filtered = filtered.filter(product => product.rating.rate >= this.selectedRating & product.rating.rate <= this.selectedRating+1);
      }

      this.filteredProducts = filtered;
    },
    openAddProductModal() {
      this.isEditMode = false;
      this.productForm = { title: '', category: '', price: null, image: '' };
      this.showProductModal = true;
    },
    openEditProductModal(productId) {
      const product = this.products.find(p => p.id === productId);
      this.productForm = { ...product };
      this.isEditMode = true;
      this.showProductModal = true;
    },
    closeModal() {
      this.showProductModal = false;
      this.showDeleteConfirmModal = false;
      this.showProductDetailsModal = false;
    },
    closeCartModal() {
      this.showCartModal = false;
    },
    openCartModal() {
      this.showCartModal = true;
    },
    addProduct() {
      const newProduct = { ...this.productForm, id: Date.now() };
      this.products.push(newProduct);
      this.filterProducts();
      this.closeModal();
    },
    updateProduct() {
      const index = this.products.findIndex(p => p.id === this.productForm.id);
      this.products[index] = { ...this.productForm };
      this.filterProducts();
      this.closeModal();
    },
    confirmDeleteProduct(productId) {
      this.showDeleteConfirmModal = true;
      this.currentProduct = this.products.find(p => p.id === productId);
    },
    deleteProduct() {
      const index = this.products.findIndex(p => p.id === this.currentProduct.id);
      this.products.splice(index, 1);
      this.filterProducts();
      this.closeModal();
    },
    viewProductDetails(product) {
      this.currentProduct = product;
      this.showProductDetailsModal = true;
    },
    closeProductDetailsModal() {
      this.showProductDetailsModal = false;
    },
    navigateTo(path) {
      this.$router.push(path);
    },
    addToCart(product) {
      this.cart.push(product);  // Adiciona o produto ao carrinho
      alert(`${product.title} foi adicionado ao carrinho!`);  // Alerta indicando que o produto foi adicionado
    },
    removeFromCart(item) {
      const index = this.cart.indexOf(item);
      if (index !== -1) {
        this.cart.splice(index, 1);
      }
    },
    checkout() {
      alert(`Compra realizada com sucesso! Total: $${this.totalPrice}`);  // Exibe o total da compra
      this.cart = [];  // Limpa o carrinho
    },

  },
};
</script>


<style scoped>
/* Estilo para o contêiner principal */
.product-container {
  width: 90%;
  margin: 0 auto;
  padding-top: 20px;
  text-align: center;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2.5em;
  margin-bottom: 20px;
  color: #333;
}

.filter-container {
  margin-bottom: 20px;
}

.category-select, 
.price-filter, 
.rating-select {
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-right: 10px;
  margin-bottom: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.category-select:focus, 
.price-filter:focus, 
.rating-select:focus {
  border-color: #007bff;
  outline: none;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.product-card {
  background-color: #ffffff; /* Nova cor de fundo */
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 15px;
  text-align: left;
  transition: transform 0.3s ease;
}

.product-card:hover {
  transform: translateY(-10px);
}

.product-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto;
}

.product-title {
  font-size: 1.3em;
  margin: 10px 0;
  color: #333;
}

.product-category,
.product-price,
.product-rating {
  font-size: 1em;
  color: #000000; /* Nova cor da letra */
  margin: 5px 0;
}

.details-button,
.delete-button,
.update-button,
.add-cart-button,
.add-product-button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
}

.update-button {
  background-color: #ff9800;
}

.details-button {
  background-color: #370feb;
}

.delete-button {
  background-color: #f44336;
}

.add-cart-button {
  background-color: #8a0a88;
}

.add-product-button:hover {
  background-color: #45a049;
}

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
  width: 500px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  text-align: left;
  position: relative;
}

.close {
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 30px;
  color: #333;
  cursor: pointer;
  padding: 5px;
}

.close:hover {
  color: #d9534f;
}

.modal-image {
  width: 60%;
  height: auto;
  border-radius: 8px;
}

.navigation-buttons {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  gap: 20px;
}

.nav-button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #f0f0f0;
  border: none;
  border-radius: 5px;
}

.nav-button:hover {
  background-color: #ddd;
}
</style>


