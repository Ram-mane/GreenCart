import api from './api';

export const productService = {
  // Get all products with filters
  getProducts: (params = {}) => {
    return api.get('/products', { params });
  },

  // Get single product by ID
  getProduct: (id) => {
    return api.get(`/products/${id}`);
  },

  // Create new product
  createProduct: (productData) => {
    return api.post('/products', productData);
  },

  // Update product
  updateProduct: (id, productData) => {
    return api.put(`/products/${id}`, productData);
  },

  // Delete product
  deleteProduct: (id) => {
    return api.delete(`/products/${id}`);
  },
};

export const userService = {
  // Get all users
  getUsers: (params = {}) => {
    return api.get('/users', { params });
  },

  // Get single user by ID
  getUser: (id) => {
    return api.get(`/users/${id}`);
  },

  // Create new user
  createUser: (userData) => {
    return api.post('/users', userData);
  },

  // Update user
  updateUser: (id, userData) => {
    return api.put(`/users/${id}`, userData);
  },

  // Delete user
  deleteUser: (id) => {
    return api.delete(`/users/${id}`);
  },
};

export const healthService = {
  // Check API health
  getHealth: () => {
    return api.get('/health');
  },
};