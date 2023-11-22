<script setup>
import axios from "axios";
import { ref, onMounted, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import VueMultiselect from "vue-multiselect/src/Multiselect.vue";
import { defineProps } from "vue";

const props = defineProps({
  actorId: String,
});

const router = useRouter();
let actor = ref("");
const movies = ref([]);
const nationalities = ref([]);

const fields = reactive({
  firstName: "",
  lastName: "",
  nationality: "",
  movies: [],
});

const getMoviesIds = () => {
  return fields.movies.map((movie) => movie["@id"]);
};

if (props.actorId) {
  const fetchActor = async () => {
    try {
      const responseActor = await axios.get(
        `http://127.0.0.1:8000/api/actors/${props.actorId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.token}`, // Ajoutez le token JWT aux en-têtes
          },
        }
      );
      actor.value = responseActor.data;
      console.log(actor.value);
      fields.firstName = actor.value.firstName || "";
      fields.lastName = actor.value.lastName || "";
      fields.nationality = actor.value.nationality["@id"] || "";
      fields.movies = actor.value.movies || [];
    } catch (error) {
      console.error(error);
      if (error.response.data.code === 401) {
        localStorage.removeItem("token");
        router.push({ name: "login" });
      }
    }
  };
  fetchActor();
}

const fetchMovies = async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/movies`, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`, // Ajoutez le token JWT aux en-têtes
      },
    });
    movies.value = response.data["hydra:member"];
  } catch (error) {
    console.error(error);
    localStorage.removeItem("token");
    router.push({ name: "login" });
  }
};

const fetchNationalities = async () => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/nationalities`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.token}`, // Ajoutez le token JWT aux en-têtes
        },
      }
    );
    nationalities.value = response.data["hydra:member"];
  } catch (error) {
    console.error(error);
    localStorage.removeItem("token");
    router.push({ name: "login" });
  }
};

onMounted(() => {
  fetchMovies();
  fetchNationalities();
});

const sendEditActor = async () => {
  console.log(fields);
  const moviesIds = getMoviesIds();
  try {
    const response = await axios.patch(
      `http://127.0.0.1:8000/api/actors/${props.actorId}`,
      {
        firstName: fields.firstName,
        lastName: fields.lastName,
        nationality: fields.nationality,
        movies: moviesIds,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.token}`, // Ajoutez le token JWT aux en-têtes
          "Content-Type": "application/merge-patch+json",
        },
      }
    );
    console.log("Movie added successfully:", response.data);
    router.push({ name: "actors" });
  } catch (error) {
    console.error("Error adding movie:", error);
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      router.push({ name: "login" });
    }
  }
};

const sendAddActor = async () => {
  const moviesIds = getMoviesIds();
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/actors",
      {
        firstName: fields.firstName,
        lastName: fields.lastName,
        nationality: fields.nationality,
        movies: moviesIds,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.token}`, // Ajoutez le token JWT aux en-têtes
        },
      }
    );
    console.log("Movie added successfully:", response.data);
    router.push({ name: "actors" });
  } catch (error) {
    console.error("Error adding movie:", error);
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      router.push({ name: "login" });
    }
  }
};
</script>

<template>
  <div class="form-container">
    <div class="input-group">
      <label for="firstName">First Name</label>
      <input id="firstName" type="text" v-model="fields.firstName" />
    </div>
    <div class="input-group">
      <label for="lastName">Last Name</label>
      <input id="lastName" type="text" v-model="fields.lastName" />
    </div>
    <div class="input-group">
      <label for="nationality">Nationality</label>
      <select
        id="nationality"
        v-model="fields.nationality"
        v-if="nationalities"
      >
        <option value="" disabled selected>Please select nationality</option>
        <option
          v-for="(nationality, index) in nationalities"
          :key="index"
          :value="nationality['@id']"
        >
          {{ nationality.nationality }}
        </option>
      </select>
    </div>
    <div class="input-group">
      <label for="movies">Movies</label>
      <VueMultiselect
        v-if="movies"
        v-model="fields.movies"
        :options="movies"
        :multiple="true"
        :close-on-select="false"
        placehodler="Choose actors"
        :custom-label="({ title }) => title"
        track-by="@id"
      />
    </div>
    <button
      @click="sendEditActor()"
      v-if="props.actorId"
      class="primary-button"
    >
      Editer
    </button>
    <button @click="sendAddActor()" v-else class="primary-button">
      Ajouter
    </button>
  </div>
</template>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 500px;
}
.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
