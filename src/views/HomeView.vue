<script setup>
import axios from "axios";
import { ref } from "vue";
import CardActor from "../components/CardActor.vue";
import CardFilm from "../components/CardFilm.vue";
import { onMounted } from "vue";

let movies = ref("");
let actors = ref("");

onMounted(async () => {
  const responseMovies = await axios.get(
    "http://127.0.0.1:8000/api/movies?page=1"
  );
  movies.value = responseMovies.data["hydra:member"];
  movies.value = movies.value.slice(0, 4);
  const responseActors = await axios.get(
    "http://127.0.0.1:8000/api/actors?page=1"
  );
  actors.value = responseActors.data["hydra:member"];
  actors.value = actors.value.slice(0, 4);
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
