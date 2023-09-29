import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import MoviesView from "../views/MoviesView.vue";
import FicheMovieView from "../views/FicheMovieView.vue";
import FicheActorView from "../views/FicheActorView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/movies",
      name: "movies",
      component: MoviesView,
    },
    {
      path: "/movies/:id",
      name: "ficheMovie",
      component: FicheMovieView,
    },
    {
      path: "/actors/:id",
      name: "ficheActor",
      component: FicheActorView,
    },
  ],
});

export default router;
