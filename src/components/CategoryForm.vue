<script setup>
import axios from "axios";
import { defineProps, reactive, ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  categoryId: String,
});

const router = useRouter();
let category = ref("");

if (props.categoryId) {
  const fetchCategory = async () => {
    try {
      const responseCategory = await axios.get(
        `http://127.0.0.1:8000/api/categories/${props.categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.token}`, // Ajoutez le token JWT aux en-têtes
          },
        }
      );
      category.value = responseCategory.data;
      console.log(category.value);
      fields.name = category.value.name || "";
    } catch (error) {
      console.error(error);
      if (error.response.data.code === 401) {
        localStorage.removeItem("token");
        router.push({ name: "login" });
      }
    }
  };
  fetchCategory();
}

const fields = reactive({
  name: "",
});

const sendEditCategory = async () => {
  console.log(fields);
  try {
    const response = await axios.patch(
      `http://127.0.0.1:8000/api/categories/${props.categoryId}`,
      {
        name: fields.name,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.token}`, // Ajoutez le token JWT aux en-têtes
          "Content-Type": "application/merge-patch+json",
        },
      }
    );
    console.log("Category added successfully:", response.data);
    router.push({ name: "categories" });
  } catch (error) {
    console.error("Error adding category:", error);
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      router.push({ name: "login" });
    }
  }
};

const sendAddCategory = async () => {
  console.log(fields);
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/categories",
      {
        name: fields.name,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.token}`, // Ajoutez le token JWT aux en-têtes
        },
      }
    );
    console.log("Category added successfully:", response.data);
    router.push({ name: "categories" });
  } catch (error) {
    console.error("Error adding category:", error);
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
      <label for="name">Title</label>
      <input id="name" type="text" v-model="fields.name" />
    </div>
    <button
      @click="sendEditCategory()"
      v-if="props.categoryId"
      class="primary-button"
    >
      Editer
    </button>
    <button @click="sendAddCategory()" v-else class="primary-button">
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
