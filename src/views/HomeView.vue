<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import CardActor from "../components/CardActor.vue";
import CardFilm from "../components/CardFilm.vue";

let movies = ref("");
let actors = ref("");
let token = ref(null); // Pour stocker le token JWT
const router = useRouter();

const fetchMoviesAndActors = async () => {
  try {
    // Récupérez les films avec authentification
    const responseMovies = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/api/movies?page=1`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      }
    );
    movies.value = responseMovies.data["hydra:member"];
    movies.value = movies.value.slice(0, 4);

    // Récupérez les acteurs avec authentification
    const responseActors = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/api/actors?page=1`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      }
    );
    actors.value = responseActors.data["hydra:member"];
    actors.value = actors.value.slice(0, 4);
  } catch (error) {
    console.error(error);
    localStorage.removeItem("token");
    router.push({ name: "login" });
  }
};

onMounted(() => {
  fetchMoviesAndActors(); // Obtenez les films et les acteurs avec authentification au chargement de la page
});
</script>

<template>
  <h2>Our selection</h2>
  <h3>Movies</h3>
  <div class="container-row">
    <div v-for="(movie, index) in movies" :key="index" class="card">
      <RouterLink :to="`/movies/${movie.id}`">
        <CardFilm :title="movie.title" />
      </RouterLink>
    </div>
  </div>

  <h3>Actors</h3>
  <div class="container-row">
    <div v-for="(actor, index) in actors" :key="index" class="card">
      <RouterLink :to="`/actors/${actor.id}`">
        <CardActor
          :first-name="actor.firstName"
          :lastName="actor.lastName"
          v-if="index < 4"
        />
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.container-row {
  margin-bottom: 2rem;
}
</style>
