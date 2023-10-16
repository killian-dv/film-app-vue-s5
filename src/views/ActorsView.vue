<script setup>
import axios from "axios";
import { ref } from "vue";
import CardActor from "../components/CardActor.vue";
import { onMounted } from "vue";

let actors = ref([]);
let currentPage = ref(1);
let totalPages = ref(1);
let searchbar = ref("");
let token = ref(null); // Pour stocker le token JWT

const fetchActors = async (page) => {
  if (searchbar.value) {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/actors?lastName=${searchbar.value}&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token.value}`, // Ajoutez le token JWT aux en-têtes
          },
        }
      );
      actors.value = response.data["hydra:member"];
      totalPages.value = Math.ceil(response.data["hydra:totalItems"] / 30);
    } catch (error) {
      console.error(error);
    }
  } else {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/actors?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token.value}`, // Ajoutez le token JWT aux en-têtes
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
  getJwtToken(); // Obtenez le token JWT au chargement de la page
});

const getJwtToken = async () => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/auth", {
      email: "user@mail.com",
      password: "password",
    });
    token.value = response.data.token; // Stockez le token JWT
    fetchActors(currentPage.value); // Appelez fetchActors après avoir obtenu le token
  } catch (error) {
    console.error(error);
  }
};

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
    <button class="primary-button">Ajouter</button>
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
