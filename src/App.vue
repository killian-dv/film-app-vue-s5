<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/movies">Movies</RouterLink>
    <RouterLink to="/actors">Actors</RouterLink>
  </header>

  <RouterView />
</template>

<style scoped></style>
