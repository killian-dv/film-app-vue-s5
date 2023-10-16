<script setup>
import axios from "axios";
import { ref } from "vue";
import CardCategory from "../components/CardCategory.vue";
import { onMounted } from "vue";

let categories = ref([]);
let currentPage = ref(1);
let totalPages = ref(1);
let searchbar = ref("");

const fetchCategory = async (page) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/categories?page=${page}`
    );
    categories.value = response.data["hydra:member"];
    totalPages.value = Math.ceil(response.data["hydra:totalItems"] / 30); // 30 items per page
  } catch (error) {
    console.error(error);
  }
};

const searchCategories = () => {
  currentPage.value = 1; // Reset to the first page when searching
  fetchActors(currentPage.value);
};

onMounted(() => {
  fetchCategory(currentPage.value);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    fetchCategory(currentPage.value);
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchCategory(currentPage.value);
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
    <button class="primary-button">Ajouter</button>
  </div>
  <div class="container-row">
    <div v-for="(category, index) in categories" :key="index" class="card">
      <CardCategory :name="category.name" />
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
