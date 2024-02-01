<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const logout = () => {
  console.log("logout");
  localStorage.removeItem("token");
  router.push("/login"); // Redirigez vers la page de connexion après la déconnexion
};
</script>

<template>
  <div class="container">
    <p>You are logged in</p>
    <RouterLink to="/account/edit">
      <button class="primary-button">Edit profil</button>
    </RouterLink>

    <button @click="logout" class="primary-button">Log out</button>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 2rem;
}
</style>
