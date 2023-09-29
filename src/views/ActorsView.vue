<script setup>
import axios from "axios";
import { ref } from "vue";
import CardActor from "../components/CardActor.vue";
import { onMounted } from "vue";

let actors = ref([]);
let currentPage = ref(1);
let totalPages = ref(1);

const fetchMovies = async (page) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/actors?page=${page}`
    );
    actors.value = response.data["hydra:member"];
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
  <h2>Actors</h2>
  <div class="container-row">
    <div v-for="(actor, index) in actors" :key="index" class="card">
      <RouterLink :to="`/actors/${actor.id}`">
        <CardActor :first-name="actor.firstName" :lastName="actor.lastName" />
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

<style scoped></style>
