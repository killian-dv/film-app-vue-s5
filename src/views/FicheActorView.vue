<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import CardFilm from "../components/CardFilm.vue";

const route = useRoute();
const router = useRouter();
const actorId = route.params.id;

let actor = ref("");

onMounted(async () => {
  try {
    const responseActor = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/api/actors/${actorId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.token}`, // Ajoutez le token JWT aux en-têtes
        },
      }
    );
    actor.value = responseActor.data;
  } catch (error) {
    console.error(error);
    if (error.response.data.code === 401) {
      localStorage.removeItem("token");
      router.push({ name: "login" });
    }
  }
});

const deleteActor = async () => {
  try {
    await axios.delete(
      `${import.meta.env.VITE_API_BASE_URL}/api/actors/${actorId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.token}`, // Ajoutez le token JWT aux en-têtes
        },
      }
    );
    router.push({ name: "actors" });
  } catch (error) {
    console.error(error);
    if (error.response.data.code === 401) {
      localStorage.removeItem("token");
      router.push({ name: "login" });
    }
  }
};
</script>

<template>
  <div v-if="actor">
    <div class="row">
      <h2>{{ actor.firstName }} {{ actor.lastName }}</h2>
      <div class="row">
        <RouterLink :to="`/actors/${actorId}/edit`">
          <button class="primary-button">Edit</button>
        </RouterLink>
        <button class="primary-button" @click="deleteActor">Delete</button>
      </div>
    </div>
    <p>Nationality : {{ actor.nationality.nationality }}</p>
    <h3>Movies :</h3>
    <div class="container-row">
      <div v-for="(movie, index) in actor.movies" :key="index" class="card">
        <RouterLink :to="`/movies/${movie.id}`">
          <CardFilm :title="movie.title" />
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.row {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  height: min-content;
  gap: 1rem;
}
</style>
