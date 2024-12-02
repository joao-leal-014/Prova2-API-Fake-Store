import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    products: [],
    users: [],
    orders: [],
    categories: [],
    token: localStorage.getItem('token') || '',
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    setUsers(state, users) {
      state.users = users;
    },
    setOrders(state, orders) {
      state.orders = orders;
    },
    setCategories(state, categories) {
      state.categories = categories;
    },
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      const response = await axios.get('https://fakestoreapi.com/products');
      commit('setProducts', response.data);
    },
    async fetchUsers({ commit }) {
      const response = await axios.get('https://fakestoreapi.com/users');
      commit('setUsers', response.data);
    },
    async fetchOrders({ commit }) {
      const response = await axios.get('https://fakestoreapi.com/carts');
      commit('setOrders', response.data);
    },
    async fetchCategories({ commit }) {
      const response = await axios.get('https://fakestoreapi.com/products/categories');
      commit('setCategories', response.data);
    },
    login({ commit }, token) {
      commit('setToken', token);
      localStorage.setItem('token', token);
    },
    logout({ commit }) {
      commit('setToken', '');
      localStorage.removeItem('token');
    },
  },
  getters: {
    isAuthenticated: state => !!state.token,
  },
});
