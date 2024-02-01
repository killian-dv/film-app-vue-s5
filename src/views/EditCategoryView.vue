<script setup>
import { useRoute } from "vue-router";
import CategoryForm from "../components/CategoryForm.vue";

const route = useRoute();
const categoryId = route.params.id;
</script>

<template>
  <h1>Editer une catégorie</h1>
  <CategoryForm :categoryId="categoryId" />
</template>
