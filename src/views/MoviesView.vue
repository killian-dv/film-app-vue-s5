<script setup>
import axios from "axios";
import { ref, watch } from "vue";
import CardFilm from "../components/CardFilm.vue";
import { onMounted } from "vue";

let movies = ref([]);
let currentPage = ref(1);
let totalPages = ref(1);
let searchbar = ref("");
let token = ref(null); // Pour stocker le token JWT

const fetchMovies = async (page) => {
  if (searchbar.value) {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/movies?title=${searchbar.value}&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token.value}`, // Ajoutez le token JWT aux en-têtes
          },
        }
      );
      movies.value = response.data["hydra:member"];
      totalPages.value = Math.ceil(response.data["hydra:totalItems"] / 30);
    } catch (error) {
      console.error(error);
    }
  } else {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/movies?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token.value}`, // Ajoutez le token JWT aux en-têtes
          },
        }
      );
      movies.value = response.data["hydra:member"];
      totalPages.value = Math.ceil(response.data["hydra:totalItems"] / 30);
    } catch (error) {
      console.error(error);
    }
  }
};

const searchMovies = () => {
  currentPage.value = 1; // Reset to the first page when searching
  fetchMovies(currentPage.value);
};

const getJwtToken = async () => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/auth", {
      email: "user@mail.com",
      password: "password",
    });
    token.value = response.data.token; // Stockez le token JWT
    fetchMovies(currentPage.value); // Appelez fetchMovies après avoir obtenu le token
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getJwtToken(); // Obtenez le token JWT au chargement de la page
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    fetchMovies(currentPage.value);
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchMovies(currentPage.value);
  }
};
</script>

<template>
  <h2>Movies</h2>
  <div class="header-container">
    <div class="search-container">
      <label for="search">Search</label>
      <input
        type="text"
        id="search"
        v-model="searchbar"
        @input="searchMovies"
      />
    </div>
    <RouterLink to="/movies/add">
      <button class="primary-button">Ajouter</button>
    </RouterLink>
  </div>

  <div class="container-row">
    <div v-for="(movie, index) in movies" :key="index" class="card">
      <RouterLink :to="`/movies/${movie.id}`">
        <CardFilm :title="movie.title" />
      </RouterLink>
    </div>
  </div>

  <div class="pagination">
    <button @click="prevPage" :class="{ inactive: currentPage === 1 }">
      Previous
    </button>
    <span>Page {{ currentPage }} of {{ totalPages }}</span>
    <button @click="nextPage" :class="{ inactive: currentPage === totalPages }">
      Next
    </button>
  </div>
</template>

<style scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}
</style>
