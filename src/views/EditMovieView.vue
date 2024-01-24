<script setup>
import MovieForm from "../components/MovieForm.vue";
import { useRoute } from "vue-router";

const route = useRoute();
const movieId = route.params.id;
</script>

<template>
  <h1>Editer un Film</h1>
  <MovieForm :movieId="movieId" />
</template>
