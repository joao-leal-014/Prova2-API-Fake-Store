<template>
  <div class="user-management container">
    <h1 class="text-center mb-4">Gestão de Usuários</h1>
    <div class="search-container mb-4 text-center">
      <input v-model="searchQuery" @input="searchUsers" placeholder="Pesquisar por nome ou e-mail" class="form-control search-input" />
    </div>

    <div class="user-list row">
      <div v-for="user in filteredUsers" :key="user.id" class="col-md-4 col-lg-3 mb-4">
        <div class="user-card card h-100">
          <div class="user-image-container text-center mt-4">
            <img :src="user.image" alt="Imagem do usuário" class="user-image card-img-top rounded-circle" />
          </div>
          <div class="card-body text-center">
            <h5 class="card-title">{{ user.name }}</h5>
            <p class="card-text"><strong>E-mail:</strong> {{ user.email }}</p>
            <p class="card-text"><strong>Cidade:</strong> {{ user.address.city }}</p>
          </div>
          <div class="card-footer text-center">
            <button @click="viewUserDetails(user.id)" class="btn btn-primary me-2">Detalhes</button>
            <button @click="editUser(user.id)" class="btn btn-warning me-2">Editar</button>
            <button @click="deleteUser(user.id)" class="btn btn-danger">Excluir</button>
          </div>
        </div>
      </div>
    </div>

    <div class="text-center">
      <button @click="addUser" class="btn btn-success mb-4">Adicionar Novo Usuário</button>
    </div>

    <!-- Botões de navegação -->
    <div class="navigation-buttons text-center mt-4">
      <button @click="navigateTo('/home')" class="btn btn-secondary me-2">Voltar</button>
      <button @click="navigateTo('/')" class="btn btn-danger">SAIR</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      users: [],
      filteredUsers: [],
      searchQuery: '',
      newUser: { name: '', email: '', address: { city: '' }, image: '' },
    };
  },
  async created() {
    try {
      const response = await axios.get('https://fakestoreapi.com/users');
      this.users = response.data;
      // Adicionando imagens para cada usuário
      this.users = this.users.map(user => ({
        ...user,
        image: `https://randomuser.me/api/portraits/men/${user.id}.jpg` // Exemplo de imagem associada ao usuário
      }));
      this.filteredUsers = this.users;
    } catch (error) {
      console.error("Erro ao buscar usuários: ", error);
    }
  },
  methods: {
    searchUsers() {
      this.filteredUsers = this.users.filter(user => {
        const name = typeof user.name === 'string' ? user.name.toLowerCase() : ''; // Verifica se 'name' é uma string
        const email = typeof user.email === 'string' ? user.email.toLowerCase() : ''; // Verifica se 'email' é uma string
        return (
          name.includes(this.searchQuery.toLowerCase()) ||
          email.includes(this.searchQuery.toLowerCase())
        );
      });
    },
    viewUserDetails(id) {
      const user = this.users.find(u => u.id === id);
      if (user) {
        alert(`Detalhes do usuário: \nNome de Usuario: ${user.username}\nE-mail: ${user.email}\nCidade: ${user.address.city}`);
      }
    },
    editUser(id) {
      const user = this.users.find(u => u.id === id);
      if (user) {
        this.newUser = { ...user };  // Preenche o formulário com os dados do usuário
        alert(`Editando: ${user.name}`);
      }
    },
    async deleteUser(id) {
      try {
        const userIndex = this.users.findIndex(u => u.id === id);
        if (userIndex !== -1) {
          this.users.splice(userIndex, 1); // Remove o usuário da lista local
          this.filteredUsers = [...this.users]; // Atualiza a lista filtrada
          await axios.delete(`https://fakestoreapi.com/users/${id}`);
          alert('Usuário excluído com sucesso.');
        }
      } catch (error) {
        console.error('Erro ao excluir o usuário:', error);
        alert('Erro ao excluir o usuário.');
      }
    },
    async addUser() {
      try {
        const newUser = { ...this.newUser };
        const response = await axios.post('https://fakestoreapi.com/users', newUser);
        this.users.push(response.data);
        this.filteredUsers = [...this.users];
        this.newUser = { name: '', email: '', address: { city: '' }, image: '' }; // Limpa os campos do formulário
        alert('Novo usuário adicionado com sucesso!');
      } catch (error) {
        console.error('Erro ao adicionar usuário:', error);
        alert('Erro ao adicionar o usuário.');
      }
    },
    navigateTo(route) {
      this.$router.push(route); // Navegar para a rota especificada
    },
  },
};
</script>

<style scoped>
/* Estilo geral do container */
.user-management {
  font-family: Arial, sans-serif;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
}

/* Estilo do campo de pesquisa */
.search-container .search-input {
  width: 50%;
  padding: 10px;
  font-size: 16px;
  border-radius: 20px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.search-input:focus {
  border-color: #007bff;
  outline: none;
}

/* Lista de usuários */
.user-list {
  display: flex;
  flex-wrap: wrap;
}

.user-card {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 10px;
  text-align: center;
  transition: transform 0.2s ease-in-out;
}

.user-card:hover {
  transform: translateY(-10px);
}

.user-image-container {
  margin: 15px;
}

.user-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
}

.card-body .card-title {
  font-size: 18px;
  margin: 10px 0;
  color: #333;
}

.card-body .card-text {
  font-size: 14px;
  color: #555;
}

.card-footer .btn {
  margin: 5px;
}

/* Estilo do botão de adicionar usuário */
.add-user-btn {
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
}

.add-user-btn:hover {
  background-color: #218838;
}

/* Estilo dos botões de navegação */
.navigation-buttons .btn {
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
}

.navigation-buttons .btn:hover {
  background-color: #f0f0f0;
}
</style>
