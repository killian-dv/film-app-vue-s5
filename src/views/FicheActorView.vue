<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import CardFilm from "../components/CardFilm.vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const actorId = route.params.id;

let actor = ref("");

onMounted(async () => {
  try {
    const responseActor = await axios.get(
      `http://127.0.0.1:8000/api/actors/${actorId}`,
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
