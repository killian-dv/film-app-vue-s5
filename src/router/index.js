import { createRouter, createWebHistory } from "vue-router";
import AccountView from "../views/AccountView.vue";
import ActorsView from "../views/ActorsView.vue";
import AddCategoryView from "../views/AddCategoryView.vue";
import AddMovieView from "../views/AddMovieView.vue";
import CategoryView from "../views/CategoryView.vue";
import EditAccountView from "../views/EditAccountView.vue";
import EditActorView from "../views/EditActorView.vue";
import EditCategoryView from "../views/EditCategoryView.vue";
import EditMovieView from "../views/EditMovieView.vue";
import FicheActorView from "../views/FicheActorView.vue";
import FicheCategoryView from "../views/FicheCategoryView.vue";
import FicheMovieView from "../views/FicheMovieView.vue";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import MoviesView from "../views/MoviesView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/account",
      name: "account",
      component: AccountView,
      meta: { requiresAuth: true }, // Cette route nécessite une authentification
    },
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { requiresAuth: true }, // Cette route nécessite une authentification
    },
    {
      path: "/movies",
      name: "movies",
      component: MoviesView,
      meta: { requiresAuth: true }, // Cette route nécessite une authentification
    },
    {
      path: "/movies/:id",
      name: "ficheMovie",
      component: FicheMovieView,
      meta: { requiresAuth: true }, // Cette route nécessite une authentification
    },
    {
      path: "/movies/:id/edit",
      name: "editMovie",
      component: EditMovieView,
      meta: { requiresAuth: true }, // Cette route nécessite une authentification
    },
    {
      path: "/actors",
      name: "actors",
      component: ActorsView,
      meta: { requiresAuth: true }, // Cette route nécessite une authentification
    },
    {
      path: "/actors/:id",
      name: "ficheActor",
      component: FicheActorView,
      meta: { requiresAuth: true }, // Cette route nécessite une authentification
    },
    {
      path: "/actors/:id/edit",
      name: "editActor",
      component: EditActorView,
      meta: { requiresAuth: true }, // Cette route nécessite une authentification
    },
    {
      path: "/categories",
      name: "categories",
      component: CategoryView,
      meta: { requiresAuth: true }, // Cette route nécessite une authentification
    },
    {
      path: "/categories/:id",
      name: "ficheCategory",
      component: FicheCategoryView,
      meta: { requiresAuth: true }, // Cette route nécessite une authentification
    },
    {
      path: "/categories/add",
      name: "addCategories",
      component: AddCategoryView,
      meta: { requiresAuth: true }, // Cette route nécessite une authentification
    },
    {
      path: "/categories/:id/edit",
      name: "editCategories",
      component: EditCategoryView,
      meta: { requiresAuth: true }, // Cette route nécessite une authentification
    },
    {
      path: "/movies/add",
      name: "addMovie",
      component: AddMovieView,
      meta: { requiresAuth: true }, // Cette route nécessite une authentification
    },
    {
      path: "/account/edit",
      name: "editAccount",
      component: EditAccountView,
      meta: { requiresAuth: true }, // Cette route nécessite une authentification
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const token = localStorage.token;
    if (!token) {
      next("/login"); // Redirigez vers la page de connexion
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
