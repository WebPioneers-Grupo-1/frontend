<template>
  <div class="container">
    <img src="../assets/img/takelogo.png" alt="Logo de la Empresa" class="logo" />
    <h1>Galería de Autos para Alquiler</h1>
    <!-- Mensaje si no hay autos disponibles -->
    <div v-if="cars.length === 0">No hay autos disponibles para alquiler.</div>
    <div class="gallery" v-else>
      <div class="car-card" v-for="car in cars" :key="car.id">
        <img :src="car.url" alt="Imagen del auto" class="car-image" />
        <h2 class="car-name">{{ car.name }}</h2>
        <p class="car-price">Precio por Día: S/{{ car.price }}</p>
        <!-- Botón Alquilar -->
        <button class="rent-button" @click="alquilarAuto(car)">Alquilar</button>
      </div>
    </div>
    <!-- Botón para volver al menú principal -->
    <button class="back-button" @click="goToMainMenu">Volver al Menú Principal</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'GaleriaAlquileres',
  data() {
    return {
      cars: [], // Autos disponibles para alquiler
    };
  },
  async created() {
    await this.fetchAvailableCars();
  },
  methods: {
    // Cargar autos disponibles desde la base de datos
    async fetchAvailableCars() {
      try {
        const response = await axios.get('http://localhost:3000/api/rentals');
        this.cars = response.data;
      } catch (error) {
        console.error('Error al obtener autos disponibles:', error);
      }
    },
    // Función para alquilar un auto
    async alquilarAuto(car) {
      try {
        await axios.post('http://localhost:3000/api/rentals/checkout', {
          name: car.name,
          price: car.price,
          url: car.url,
        });

        // Filtrar el auto alquilado de la lista local
        this.cars = this.cars.filter((c) => c.id !== car.id);

        alert('Alquiler registrado exitosamente.');
      } catch (error) {
        console.error('Error al alquilar el auto:', error);
        alert('Hubo un problema al alquilar el auto.');
      }
    },
    goToMainMenu() {
      // Redirigir al menú principal
      this.$router.push({ name: 'MenuPrincipal' });
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
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

.back-button {
  background-color: #007bff; 
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
}

.back-button:hover {
  background-color: #0056b3; 
}

h1 {
  color: #007bff;
  margin-bottom: 20px;
}

.gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.car-card {
  border: 1px solid #007bff;
  border-radius: 8px;
  padding: 15px;
  margin: 10px;
  width: 200px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
  background-color: #fff;
}

.car-image {
  width: 100%;
  height: auto;
  border-radius: 4px;
}

.car-name {
  color: #007bff;
  margin: 10px 0;
}

.car-price {
  color: #333;
}

.rent-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 16px;
  margin-top: 10px;
}

.rent-button:hover {
  background-color: #0056b3;
}
</style>
