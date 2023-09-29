<script setup>
import { defineProps } from "vue";

defineProps({
  title: String,
});
</script>

<template>
  <h4>{{ title }}</h4>
</template>

<style scoped>
h4 {
  color: red;
}
</style>
