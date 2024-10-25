<template>
  <div class="container">
    <img src="../assets/img/takelogo.png" alt="Logo de la Empresa" class="logo" />
    <h1>Registro</h1>
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="email">Correo Electrónico:</label>
        <input type="email" v-model="email" id="email" required />
      </div>
      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input type="password" v-model="password" id="password" required />
        <small>La contraseña debe tener al menos 6 caracteres.</small>
      </div>
      <button type="submit" class="primary-button">Registrar</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success">{{ successMessage }}</p>
    <p>¿Ya tienes una cuenta? <router-link to="/" class="link">Inicia sesión aquí</router-link></p>
  </div>
</template>

<script>
export default {
  name: 'RegistroSesion',
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
      successMessage: '',
    };
  },
  methods: {
    async register() {
      this.errorMessage = ''; 
      this.successMessage = '';

      // Validar que los campos no estén vacíos
      if (!this.email || !this.password) {
        this.errorMessage = 'El correo y la contraseña son obligatorios.';
        return;
      }

      // Validar el formato del correo electrónico
      if (!this.validateEmail(this.email)) {
        this.errorMessage = 'El formato del correo electrónico es inválido.';
        return;
      }

      // Validar la contraseña (mínimo 6 caracteres)
      if (this.password.length < 6) {
        this.errorMessage = 'La contraseña debe tener al menos 6 caracteres.';
        return;
      }

      try {
        // Cambia la URL a la que apunta tu backend
        const response = await fetch('http://localhost:5000/api/registro', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            correo: this.email, // Asegúrate de que esto coincida
            contrasena: this.password, // Asegúrate de que esto coincida
          }),
        });

        // Manejar la respuesta
        if (!response.ok) {
          const errorData = await response.json();
          this.errorMessage = errorData.message || 'Hubo un problema con el registro.';
          return;
        }

        // Si el registro es exitoso
        this.successMessage = 'Registro exitoso. Puedes iniciar sesión ahora.';
        this.$router.push({ name: 'MenuPrincipal' }); // Redirige al menú principal

      } catch (error) {
        this.errorMessage = 'Error en la conexión con el servidor: ' + error.message;
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
  
  .success {
    color: green; 
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
  
  
