<script setup>
import { RouterLink, RouterView, useRoute } from "vue-router";
const route = useRoute();
</script>

<template>
  <header>
    <RouterLink to="/" :class="{ active: route.path === '/' }">Home</RouterLink>
    <RouterLink to="/movies" :class="{ active: route.path === '/movies' }"
      >Movies</RouterLink
    >
    <RouterLink to="/actors" :class="{ active: route.path === '/actors' }"
      >Actors</RouterLink
    >
    <RouterLink
      to="/categories"
      :class="{ active: route.path === '/categories' }"
      >Categories</RouterLink
    >
  </header>

  <RouterView />
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1rem;
}
header a {
  text-decoration: none;
  color: white;
  font-size: 20px;
}
header a.active {
  color: #e50914;
}
header a:hover {
  text-decoration: underline;
}
</style>
