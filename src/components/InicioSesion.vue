<template>
  <div class="container">
    <img src="../assets/img/takelogo.png" alt="Logo de la Empresa" class="logo" />
    <h1>Iniciar Sesión</h1>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">Correo Electrónico:</label>
        <input type="email" v-model="email" id="email" required />
        <span v-if="emailError" class="error">{{ emailError }}</span>
      </div>
      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input type="password" v-model="password" id="password" required />
        <span v-if="passwordError" class="error">{{ passwordError }}</span>
      </div>
      <button type="submit" class="primary-button" :disabled="loading">{{ loading ? 'Cargando...' : 'Iniciar Sesión' }}</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success">{{ successMessage }}</p>
    <p>¿No tienes una cuenta? <router-link to="/registro" class="link">Regístrate aquí</router-link></p>
  </div>
</template>

<script>
export default {
  name: 'InicioSesion',
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
      successMessage: '',
      loading: false,
      emailError: '',
      passwordError: '',
    };
  },
  methods: {
    validateInput() {
      this.emailError = '';
      this.passwordError = '';

      // Validar el correo electrónico
      if (!this.email) {
        this.emailError = 'El correo electrónico es obligatorio.';
      } else if (!this.validateEmail(this.email)) {
        this.emailError = 'El formato del correo electrónico es inválido.';
      }

      // Validar la contraseña
      if (!this.password) {
        this.passwordError = 'La contraseña es obligatoria.';
      }

      return !this.emailError && !this.passwordError; // Retorna verdadero si no hay errores
    },

    async login() {
      this.errorMessage = ''; // Resetear mensaje de error
      this.successMessage = ''; // Resetear mensaje de éxito
      this.loading = true; // Activar estado de carga

      if (!this.validateInput()) {
        this.loading = false; // Desactivar carga si hay errores
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/login', { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            correo: this.email,
            contrasena: this.password,
          }),
        });

        // Manejar la respuesta
        if (!response.ok) {
          const errorData = await response.json();
          this.errorMessage = errorData.message || 'Hubo un problema con el inicio de sesión.';
          this.loading = false; // Desactivar carga
          return;
        }

        const user = await response.json(); // Suponiendo que el backend devuelve el usuario
        localStorage.setItem('currentUser', JSON.stringify(user)); // Almacena el usuario en localStorage
        this.successMessage = 'Inicio de sesión exitoso. Redirigiendo...';
        setTimeout(() => {
          this.$router.push({ name: 'MenuPrincipal' }); // Redirige al menú principal
        }, 1000); // Añadir un pequeño retraso para que el mensaje de éxito sea visible

      } catch (error) {
        this.errorMessage = 'Error en la conexión con el servidor: ' + error.message;
      } finally {
        this.loading = false; // Asegurarse de desactivar carga en cualquier caso
      }
    },

    validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
      return re.test(email);
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
  color: #007bff; /* Azul */
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

.error {
  color: red;
  font-size: 0.9em;
  margin-top: 10px;
}

.link {
  color: #007bff; 
  text-decoration: none;
}

.link:hover {
  text-decoration: underline; 
}
</style>
