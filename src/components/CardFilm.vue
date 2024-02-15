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
      backgroundPosition: 'center',
      height: '200px',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }"
  >
    <h4>{{ title }}</h4>
  </div>
</template>

<style scoped>
h4 {
  color: white;
  text-align: center;
  text-shadow: 2px 2px 4px #000000;
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
