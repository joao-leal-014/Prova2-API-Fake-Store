<template>
  <div class="login-container">
    <h1 class="text-center mb-4">Login</h1>
    <form @submit.prevent="login" class="text-center">
      <div class="mb-3">
        <input 
          v-model="email" 
          type="email" 
          placeholder="Digite seu e-mail" 
          class="form-control" 
          required 
        />
      </div>
      <div class="mb-3">
        <input 
          v-model="password" 
          type="password" 
          placeholder="Digite sua senha" 
          class="form-control" 
          required 
        />
      </div>
      <button type="submit" class="btn btn-primary w-100">Entrar</button>
    </form>
    <div v-if="errorMessage" class="error mt-3">{{ errorMessage }}</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    async login() {
      try {
        // Faz uma requisição para pegar a lista de usuários
        const response = await axios.get('https://fakestoreapi.com/users');
        const users = response.data;

        // Verifica se o usuário existe com o e-mail fornecido
        const user = users.find(user => user.email.toLowerCase() === this.email.toLowerCase());

        if (user) {
          // Verifica se a senha informada corresponde à senha do usuário
          if (this.password === user.password) {
            // Se a senha for válida, gera um token fictício
            const fakeToken = 'fake-jwt-token-123456'; // Token fictício

            // Armazena o token no localStorage
            localStorage.setItem('token', fakeToken);

            // Redireciona para a página inicial (home)
            this.$router.push('/home');
          } else {
            this.errorMessage = 'Senha inválida. Tente novamente.';
          }
        } else {
          this.errorMessage = 'E-mail não encontrado. Tente novamente.';
        }
      } catch (error) {
        this.errorMessage = 'Erro ao autenticar. Tente novamente mais tarde.';
      }
    },
  },
};
</script>


<style scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 30px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

h1 {
  font-size: 2em;
  margin-bottom: 20px;
  color: #333;
}

input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1em;
}

input:focus {
  border-color: #007bff;
  outline: none;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}

.error {
  color: red;
  font-size: 14px;
  margin-top: 10px;
}
</style>
