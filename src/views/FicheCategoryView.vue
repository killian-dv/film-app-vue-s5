<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const categoryId = route.params.id;

let category = ref("");

onMounted(async () => {
  try {
    const responseCategory = await axios.get(
      `http://127.0.0.1:8000/api/categories/${categoryId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.token}`, // Ajoutez le token JWT aux en-têtes
        },
      }
    );
    category.value = responseCategory.data;
  } catch (error) {
    console.error(error);
    if (error.response.data.code === 401) {
      localStorage.removeItem("token");
      router.push({ name: "login" });
    }
  }
});

const deleteCategory = async () => {
  try {
    await axios.delete(`http://127.0.0.1:8000/api/categories/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`, // Ajoutez le token JWT aux en-têtes
      },
    });
    router.push({ name: "categories" });
  } catch (error) {
    console.error(error);
    if (error.response.data.code === 401) {
      localStorage.removeItem("token");
      router.push({ name: "login" });
    }
  }
};
</script>

<template>
  <div v-if="category">
    <div class="row">
      <h2>{{ category.name }}</h2>
      <div class="row">
        <RouterLink :to="`/categories/${categoryId}/edit`">
          <button class="primary-button">Edit</button>
        </RouterLink>
        <button class="primary-button" @click="deleteCategory()">Delete</button>
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
  gap: 1rem;
}
</style>
