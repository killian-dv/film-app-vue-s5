<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import CardActor from "../components/CardActor.vue";
import { useRoute } from "vue-router";

const route = useRoute();
const movieId = route.params.id;

let movie = ref("");

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
};

onMounted(async () => {
  const responseMovie = await axios.get(
    `http://127.0.0.1:8000/api/movies/${movieId}`
  );
  movie.value = responseMovie.data;
});
</script>

<template>
  <div v-if="movie">
    <h1>Fiche Movie</h1>
    <h2>{{ movie.title }}</h2>
    <p>{{ movie.description }}</p>
    <p>{{ formatDate(movie.releaseDate) }}</p>
    <p>{{ movie.duration }} minutes</p>
    <p>{{ movie.category.name }}</p>
    <h4>Actors</h4>
    <div v-for="(actor, index) in movie.actors" :key="index">
      <RouterLink :to="`/actors/${actor.id}`">
        <CardActor :first-name="actor.firstName" :lastName="actor.lastName" />
      </RouterLink>
    </div>
  </div>
</template>
