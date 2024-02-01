<script setup>
import axios from "axios";
import { defineProps, onMounted, reactive, ref } from "vue";
import VueMultiselect from "vue-multiselect/src/Multiselect.vue";
import { useRouter } from "vue-router";

const props = defineProps({
  movieId: String,
});

const router = useRouter();
let movie = ref("");

if (props.movieId) {
  const fetchMovie = async () => {
    try {
      const responseMovie = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/movies/${props.movieId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.token}`, // Ajoutez le token JWT aux en-têtes
          },
        }
      );
      movie.value = responseMovie.data;
      console.log(movie.value);
      fields.title = movie.value.title || "";
      fields.description = movie.value.description || "";
      fields.releaseDate = movie.value.releaseDate.slice(0, 10) || "";
      fields.duration = movie.value.duration || "";
      fields.category = movie.value.category["@id"] || "";
      fields.actors = movie.value.actors || [];
      fields.image = movie.value.imageName || "";
    } catch (error) {
      console.error(error);
      if (error.response.data.code === 401) {
        localStorage.removeItem("token");
        router.push({ name: "login" });
      }
    }
  };
  fetchMovie();
}

const fields = reactive({
  title: "",
  description: "",
  releaseDate: "",
  duration: "",
  category: "",
  actors: [],
  image: "",
});

const categories = ref([]);
const actors = ref([]);

const fetchCategories = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/api/categories`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.token}`, // Ajoutez le token JWT aux en-têtes
        },
      }
    );
    categories.value = response.data["hydra:member"];
  } catch (error) {
    console.error(error);
    localStorage.removeItem("token");
    router.push({ name: "login" });
  }
};

const fetchActors = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/api/actors`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.token}`, // Ajoutez le token JWT aux en-têtes
        },
      }
    );
    actors.value = response.data["hydra:member"];
  } catch (error) {
    console.error(error);
    localStorage.removeItem("token");
    router.push({ name: "login" });
  }
};

onMounted(() => {
  fetchCategories();
  fetchActors();
});

const getActorIds = () => {
  return fields.actors.map((actor) => actor["@id"]);
};

const onFileChange = (event) => {
  fields.image = event.target.files[0];
};

const sendEditMovie = async () => {
  console.log(fields);
  const actorIds = getActorIds();
  try {
    let data = new FormData();
    data.append("title", fields.title);
    data.append("description", fields.description);
    data.append("releaseDate", fields.releaseDate);
    data.append("duration", fields.duration);
    data.append("category", fields.category);
    data.append("actors", actorIds);
    data.append("imageFile", fields.image);
    const response = await axios.patch(
      `${import.meta.env.VITE_API_BASE_URL}/api/movies/${props.movieId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.token}`, // Ajoutez le token JWT aux en-têtes
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("Movie added successfully:", response.data);
    router.push({ name: "movies" });
  } catch (error) {
    console.error("Error adding movie:", error);
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      router.push({ name: "login" });
    }
  }
};

const sendAddMovie = async () => {
  console.log(fields);
  const actorIds = getActorIds();
  try {
    let data = new FormData();
    data.append("title", fields.title);
    data.append("description", fields.description);
    data.append("releaseDate", fields.releaseDate);
    data.append("duration", fields.duration);
    data.append("category", fields.category);
    data.append("actors", actorIds);
    data.append("imageFile", fields.image);
    console.log(fields.image);
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/movies`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.token}`, // Ajoutez le token JWT aux en-têtes
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("Movie added successfully:", response.data);
    router.push({ name: "movies" });
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
      <label for="title">Title</label>
      <input id="title" type="text" v-model="fields.title" />
    </div>
    <div class="input-group">
      <label for="description">Description</label>
      <textarea id="description" v-model="fields.description"></textarea>
    </div>
    <div class="input-group">
      <label for="date">Date</label>
      <input id="date" type="date" v-model="fields.releaseDate" />
    </div>
    <div class="input-group">
      <label for="duration">Duration in minutes</label>
      <input id="duration" type="number" v-model="fields.duration" />
    </div>
    <div class="input-group">
      <label for="category">Category</label>
      <select id="category" v-model="fields.category" v-if="categories">
        <option value="" disabled selected>Please select category</option>
        <option
          v-for="(category, index) in categories"
          :key="index"
          :value="category['@id']"
        >
          {{ category.name }}
        </option>
      </select>
    </div>
    <div class="input-group">
      <label for="image">Image</label>
      <input id="image" type="file" v-on:change="onFileChange" />
    </div>
    <div class="input-group">
      <label for="actors">Actors</label>
      <VueMultiselect
        v-if="actors"
        v-model="fields.actors"
        :options="actors"
        :multiple="true"
        :close-on-select="false"
        placehodler="Choose actors"
        :custom-label="({ firstName, lastName }) => firstName + ' ' + lastName"
        track-by="@id"
      />
    </div>
    <button
      @click="sendEditMovie()"
      v-if="props.movieId"
      class="primary-button"
    >
      Editer
    </button>
    <button @click="sendAddMovie()" v-else class="primary-button">
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
