<template>
  <div class="container">
    <img src="../assets/img/takelogo.png" alt="Logo de la Empresa" class="logo" />
    <h1>Añadir Auto</h1>
    <form @submit.prevent="addCar">
      <div class="form-group">
        <label for="name">Nombre del Auto:</label>
        <input type="text" v-model="name" id="name" required />
      </div>
      <div class="form-group">
        <label for="price">Precio por Día:</label>
        <input type="number" v-model="price" id="price" required />
      </div>
      <div class="form-group">
        <label for="url">URL de la Imagen:</label>
        <input type="text" v-model="url" id="url" required />
      </div>
      <button type="submit" class="primary-button">Añadir Auto</button>
      <button type="button" @click="goToMenu" class="secondary-button">Volver al Menú</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success">{{ successMessage }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AnadirAutos',
  data() {
    return {
      name: '',
      price: '',
      url: '',
      errorMessage: '',
      successMessage: '',
    };
  },
  methods: {
    async addCar() {
      this.errorMessage = '';
      this.successMessage = '';

      // Validate that all fields are filled
      if (!this.name || !this.price || !this.url) {
        this.errorMessage = 'Todos los campos son obligatorios.';
        return;
      }

      try {
        // Send data to the backend
        const response = await axios.post('http://localhost:3000/api/rentals', {
          name: this.name,
          price: this.price,
          url: this.url,
        });
        this.successMessage = response.data.message;
        this.clearFields();
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message;
        } else {
          this.errorMessage = 'Error de conexión con el servidor.';
        }
      }
    },
    clearFields() {
      this.name = '';
      this.price = '';
      this.url = '';
    },
    goToMenu() {
      this.$router.push('/menu-principal');
    },
  },
};
</script>


<style scoped>
.container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.logo {
  width: 100%;
  max-width: 200px;
  margin-bottom: 20px;
}

h1 {
  color: #007bff;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  color: #333;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #007bff;
  border-radius: 4px;
  margin-top: 5px;
}

.primary-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px;
}

.primary-button:hover {
  background-color: #0056b3;
}

.secondary-button {
  background-color: #6c757d;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px;
}

.secondary-button:hover {
  background-color: #5a6268;
}

.error {
  color: red;
  font-size: 0.9em;
  margin-top: 10px;
}

.success {
  color: green;
  font-size: 0.9em;
  margin-top: 10px;
}
</style>

