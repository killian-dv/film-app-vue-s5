<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import CardActor from "../components/CardActor.vue";

let actors = ref([]);
let currentPage = ref(1);
let totalPages = ref(1);
let searchbar = ref("");
let token = ref(null); // Pour stocker le token JWT
const router = useRouter();

const fetchActors = async (page) => {
  if (searchbar.value) {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/actors?lastName=${
          searchbar.value
        }&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.token}`, // Ajoutez le token JWT aux en-têtes
          },
        }
      );
      actors.value = response.data["hydra:member"];
      totalPages.value = Math.ceil(response.data["hydra:totalItems"] / 30);
    } catch (error) {
      console.error(error);
      localStorage.removeItem("token");
      router.push({ name: "login" });
    }
  } else {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/actors?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.token}`, // Ajoutez le token JWT aux en-têtes
          },
        }
      );
      actors.value = response.data["hydra:member"];
      totalPages.value = Math.ceil(response.data["hydra:totalItems"] / 30); // 30 items per page
    } catch (error) {
      console.error(error);
    }
  }
};

const searchActors = () => {
  currentPage.value = 1; // Reset to the first page when searching
  fetchActors(currentPage.value);
};

onMounted(() => {
  fetchActors(currentPage.value);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    fetchActors(currentPage.value);
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchActors(currentPage.value);
  }
};
</script>

<template>
  <h2>Actors</h2>
  <div class="header-container">
    <div class="search-container">
      <label for="search">Search</label>
      <input
        type="text"
        id="search"
        v-model="searchbar"
        @input="searchActors"
      />
    </div>
    <RouterLink to="/actors/add">
      <button class="primary-button">Ajouter</button>
    </RouterLink>
  </div>
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

<style scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}
</style>
