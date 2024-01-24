<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import CardCategory from "../components/CardCategory.vue";

let categories = ref([]);
let currentPage = ref(1);
let totalPages = ref(1);
let searchbar = ref("");
const router = useRouter();
let token = ref(null); // Pour stocker le token JWT

const fetchCategories = async (page) => {
  if (searchbar.value) {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/categories?name=${searchbar.value}&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.token}`, // Ajoutez le token JWT aux en-têtes
          },
        }
      );
      categories.value = response.data["hydra:member"];
      totalPages.value = Math.ceil(response.data["hydra:totalItems"] / 30);
    } catch (error) {
      console.error(error);
      localStorage.removeItem("token");
      router.push({ name: "login" });
    }
  } else {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/categories?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.token}`, // Ajoutez le token JWT aux en-têtes
          },
        }
      );
      categories.value = response.data["hydra:member"];
      totalPages.value = Math.ceil(response.data["hydra:totalItems"] / 30); // 30 items per page
    } catch (error) {
      console.error(error);
      localStorage.removeItem("token");
      router.push({ name: "login" });
    }
  }
};

const searchCategories = () => {
  currentPage.value = 1; // Reset to the first page when searching
  fetchCategories(currentPage.value);
};

onMounted(() => {
  fetchCategories(currentPage.value);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    fetchCategories(currentPage.value);
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchCategories(currentPage.value);
  }
};
</script>

<template>
  <h2>Categories</h2>
  <div class="header-container">
    <div class="search-container">
      <label for="search">Search</label>
      <input
        type="text"
        id="search"
        v-model="searchbar"
        @input="searchCategories"
      />
    </div>
    <RouterLink :to="`/categories/add`">
      <button class="primary-button">Ajouter</button>
    </RouterLink>
  </div>
  <div class="container-row">
    <div v-for="(category, index) in categories" :key="index" class="card">
      <RouterLink :to="`/categories/${category.id}`">
        <CardCategory :name="category.name" />
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
