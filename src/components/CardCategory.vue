<script setup>
import { defineProps } from "vue";

defineProps({
  name: String,
});
</script>

<template>
  <h4>{{ name }}</h4>
</template>

<style scoped>
h4 {
  color: red;
}
</style>
