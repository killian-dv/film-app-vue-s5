<script setup>
import { defineProps } from "vue";

defineProps({
  firstName: String,
  lastName: String,
});
</script>

<template>
  <h4>{{ firstName }} {{ lastName }}</h4>
</template>

<style scoped>
h4 {
  color: red;
}
</style>
