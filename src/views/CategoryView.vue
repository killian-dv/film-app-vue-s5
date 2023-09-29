<script setup>
import axios from "axios";
import { ref } from "vue";
import CardCategory from "../components/CardCategory.vue";
import { onMounted } from "vue";

let categories = ref([]);
let currentPage = ref(1);
let totalPages = ref(1);

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
</style>
