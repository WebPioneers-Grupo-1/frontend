<template>
  <div class="container">
    <h1>Autos Alquilados</h1>
    <div v-if="loading">
      <p>Cargando autos alquilados...</p>
    </div>
    <div v-else-if="rentedCars.length === 0">
      <p>No hay autos alquilados.</p>
    </div>
    <div v-else class="gallery">
      <div class="car-card" v-for="car in rentedCars" :key="car.id">
        <img :src="car.url" alt="Auto" class="car-image" />
        <h2 class="car-name">{{ car.name }}</h2>
        <p class="car-price">Precio: S/{{ car.price }}</p>
        <button class="cancel-button" @click="cancelRental(car)">Cancelar Alquiler</button>
      </div>
    </div>
    <button class="back-button" @click="goToMainMenu">Volver al Menú Principal</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      rentedCars: [], // Autos alquilados
      loading: true, // Estado de carga
    };
  },
  async created() {
    await this.fetchRentedCars();
  },
  methods: {
    // Cargar autos alquilados desde la base de datos
    async fetchRentedCars() {
      try {
        const response = await axios.get('http://localhost:3000/api/rented-cars');
        this.rentedCars = response.data;
      } catch (error) {
        console.error('Error al obtener autos alquilados:', error);
        alert('Error al cargar los autos alquilados. Por favor, intenta de nuevo más tarde.');
      } finally {
        this.loading = false;
      }
    },
    // Función para cancelar un alquiler
    async cancelRental(car) {
      const confirmCancel = confirm(`¿Estás seguro de que deseas cancelar el alquiler del auto ${car.name}?`);
      if (confirmCancel) {
        try {
          await axios.delete('http://localhost:3000/api/rentals/checkout', {
            data: { name: car.name }, // Enviar el nombre del auto para cancelarlo
          });

          // Filtrar el auto cancelado de la lista local
          this.rentedCars = this.rentedCars.filter((c) => c.id !== car.id);
          alert('Alquiler cancelado exitosamente.');
        } catch (error) {
          console.error('Error al cancelar el alquiler:', error);
          alert('Error al cancelar el alquiler. Por favor, intenta de nuevo más tarde.');
        }
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

.cancel-button {
  background-color: #ff4c4c;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.cancel-button:hover {
  background-color: #ff1a1a;
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
</style>

