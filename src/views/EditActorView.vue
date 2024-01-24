<script setup>
import ActorForm from "../components/ActorForm.vue";
import { useRoute } from "vue-router";

const route = useRoute();
const actorId = route.params.id;
</script>

<template>
  <h1>Editer un Film</h1>
  <ActorForm :actorId="actorId" />
</template>
