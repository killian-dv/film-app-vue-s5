<script setup>
import { defineProps } from "vue";

defineProps({
  title: String,
});

// console.log("Title prop in CardFilm:", title);
</script>

<template>
  <h4>{{ title }}</h4>
</template>

<style scoped>
h4 {
  color: red;
}
</style>
