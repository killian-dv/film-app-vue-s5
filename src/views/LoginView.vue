<script setup>
import axios from "axios";
import { onMounted } from "vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

let mail = ref("");
let password = ref("");
const router = useRouter();

onMounted(() => {
  isTokenValid();
});

const isTokenValid = () => {
  if (localStorage.getItem("token")) {
    router.push("/"); // Redirigez vers la page d'accueil si le token est valide
  }
};

const login = async () => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/auth", {
      email: mail.value,
      password: password.value,
    });
    localStorage.setItem("token", response.data.token); // Stockez le token JWT dans localStorage
    router.push("/"); // Redirigez vers la page d'accueil après la connexion réussie
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <div class="container">
    <p>You are not logged in</p>
    <h2>Login</h2>
    <form @submit.prevent="login" class="form">
      <div class="field">
        <label for="mail">Mail</label>
        <input type="text" id="mail" v-model="mail" />
      </div>
      <div class="field">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" />
      </div>
      <button type="submit" class="primary-button">Connexion</button>
    </form>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80%;
  gap: 2rem;
}
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
.field {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.5rem;
}
</style>
