<script setup>
import { defineProps } from "vue";

defineProps({
  title: String,
  image: String,
});
</script>

<template>
  <div
    :style="{
      backgroundImage: `url(${image})`,
      backgroundSize: 'cover',
      height: '200px',
      width: '100px',
    }"
  >
    <h4>{{ title }}</h4>
  </div>
</template>

<style scoped>
h4 {
  color: white;
}
</style>
