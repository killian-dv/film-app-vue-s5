<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import CardActor from "../components/CardActor.vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const movieId = route.params.id;
const router = useRouter();
let movie = ref("");

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
};

onMounted(async () => {
  try {
    const responseMovie = await axios.get(
      `http://127.0.0.1:8000/api/movies/${movieId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.token}`, // Ajoutez le token JWT aux en-têtes
        },
      }
    );
    movie.value = responseMovie.data;
  } catch (error) {
    console.error(error);
    if (error.response.data.code === 401) {
      localStorage.removeItem("token");
      router.push({ name: "login" });
    }
  }
});
</script>

<template>
  <div v-if="movie">
    <div class="row">
      <h2>{{ movie.title }}</h2>
      <RouterLink :to="`/movies/${movieId}/edit`">
        <button class="primary-button">Edit</button>
      </RouterLink>
    </div>
    <p>Description : {{ movie.description }}</p>
    <p>Date : {{ formatDate(movie.releaseDate) }}</p>
    <p>Duration : {{ movie.duration }} minutes</p>
    <p>Categoy : {{ movie.category.name }}</p>
    <h3>Actors :</h3>
    <div class="container-row">
      <div v-for="(actor, index) in movie.actors" :key="index" class="card">
        <RouterLink :to="`/actors/${actor.id}`">
          <CardActor :first-name="actor.firstName" :lastName="actor.lastName" />
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
}
</style>
