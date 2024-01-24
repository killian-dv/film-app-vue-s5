<script setup>
import axios from "axios";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const fields = reactive({
  mail: "",
  password: "",
});

let userId = ref(null);

onMounted(() => {
  fetchuser();
});

const fetchuser = async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`, // Ajoutez le token JWT aux en-têtes
      },
    });
    userId.value = response.data.id;
  } catch (error) {
    console.error(error);
    localStorage.removeItem("token");
    router.push({ name: "login" });
  }
};

const sendEditAccount = async () => {
  console.log(fields);
  try {
    const response = await axios.patch(
      `http://127.0.0.1:8000/api/users/${userId.value}`,
      {
        mail: fields.mail,
        password: fields.password,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.token}`, // Ajoutez le token JWT aux en-têtes
          "Content-Type": "application/merge-patch+json",
        },
      }
    );
    console.log("Account edited successfully:", response.data);
    router.push({ name: "account" });
  } catch (error) {
    console.error("Error editing account:", error);
  }
};
</script>

<template>
  <h1>Edit account</h1>
  <div class="form-container">
    <div class="input-group">
      <label for="mail">Email</label>
      <input id="mail" type="email" v-model="fields.mail" />
    </div>
    <div class="input-group">
      <label for="password">Password</label>
      <input id="password" type="password" v-model="fields.password" />
    </div>
    <button @click="sendEditAccount()" class="primary-button">Editer</button>
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
