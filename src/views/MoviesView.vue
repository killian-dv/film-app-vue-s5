<script setup>
import axios from "axios";
import { ref } from "vue";
import CardFilm from "../components/CardFilm.vue";
import { onMounted } from "vue";

let movies = ref([]);
let currentPage = ref(1);
let totalPages = ref(1);

const fetchMovies = async (page) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/movies?page=${page}`
    );
    movies.value = response.data["hydra:member"];
    totalPages.value = Math.ceil(response.data["hydra:totalItems"] / 30); // 30 items per page
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  fetchMovies(currentPage.value);
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
  <h1>Movies</h1>
  <div>
    <div v-for="(movie, index) in movies" :key="index">
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
.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

.inactive {
  opacity: 0.5;
  pointer-events: none;
}
</style>
