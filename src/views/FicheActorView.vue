<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import CardFilm from "../components/CardFilm.vue";
import { useRoute } from "vue-router";

const route = useRoute();
const actorId = route.params.id;

let actor = ref("");

onMounted(async () => {
  const responseActor = await axios.get(
    `http://127.0.0.1:8000/api/actors/${actorId}`
  );
  actor.value = responseActor.data;
});
</script>

<template>
  <div v-if="actor">
    <h2>{{ actor.firstName }} {{ actor.lastName }}</h2>
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
